import { sqlite } from './db'

export const liveLearningApi = {
  // Live Session Management
  async createLiveSession(title: string, description: string, category: string, difficulty: number, maxParticipants: number = 10) {
    const now = new Date().toISOString()
    const result = sqlite.prepare(`
      INSERT INTO live_sessions (title, description, category, difficulty, max_participants, current_participants, is_active, started_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, description, category, difficulty, maxParticipants, 0, 1, now, now, now)
    
    return { id: result.lastInsertRowid, title, description, category, difficulty, maxParticipants, currentParticipants: 0, isActive: true }
  },

  async getActiveSessions() {
    return sqlite.prepare('SELECT * FROM live_sessions WHERE is_active = 1 ORDER BY id DESC').all()
  },

  async getSessionById(id: number) {
    return sqlite.prepare('SELECT * FROM live_sessions WHERE id = ?').get(id)
  },

  async joinSession(sessionId: number, userId: string) {
    const session = await this.getSessionById(sessionId) as any
    if (!session || !session.is_active) return { error: 'Session not found or inactive' }
    
    if (session.current_participants >= session.max_participants) {
      return { error: 'Session is full' }
    }
    
    // Update participant count
    sqlite.prepare(`
      UPDATE live_sessions SET current_participants = current_participants + 1 WHERE id = ?
    `).run(sessionId)
    
    // Add participant record
    sqlite.prepare(`
      INSERT INTO session_participants (session_id, user_id, joined_at)
      VALUES (?, ?, ?)
    `).run(sessionId, userId, new Date().toISOString())
    
    return { success: true }
  },

  async leaveSession(sessionId: number, userId: string) {
    // Remove participant record
    sqlite.prepare(`
      DELETE FROM session_participants WHERE session_id = ? AND user_id = ?
    `).run(sessionId, userId)
    
    // Update participant count
    sqlite.prepare(`
      UPDATE live_sessions SET current_participants = MAX(0, current_participants - 1) WHERE id = ?
    `).run(sessionId)
    
    return { success: true }
  },

  // Live Questions
  async addLiveQuestion(sessionId: number, question: string, answer: string, type: string = 'practice') {
    const now = new Date().toISOString()
    const result = sqlite.prepare(`
      INSERT INTO live_questions (session_id, question, answer, type, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(sessionId, question, answer, type, 'pending', now)
    
    return { id: result.lastInsertRowid, sessionId, question, answer, type, status: 'pending' }
  },

  async getLiveQuestions(sessionId: number) {
    return sqlite.prepare('SELECT * FROM live_questions WHERE session_id = ? ORDER BY id ASC').all(sessionId)
  },

  async answerLiveQuestion(questionId: number, userId: string, answer: string) {
    const now = new Date().toISOString()
    const result = sqlite.prepare(`
      INSERT INTO answers (question_id, user_id, answer, submitted_at)
      VALUES (?, ?, ?, ?)
    `).run(questionId, userId, answer, now)
    
    return { id: result.lastInsertRowid, questionId, userId, answer, isCorrect: null }
  },

  // Real-time Features
  async getParticipants(sessionId: number) {
    return sqlite.prepare('SELECT * FROM session_participants WHERE session_id = ?').all(sessionId)
  },

  async getSessionStats(sessionId: number) {
    const session = await this.getSessionById(sessionId)
    const participants = await this.getParticipants(sessionId)
    const questions = await this.getLiveQuestions(sessionId)
    const answers = sqlite.prepare('SELECT * FROM answers WHERE question_id IN (SELECT id FROM live_questions WHERE session_id = ?)').all(sessionId)
    
    return {
      session,
      participants: participants.length,
      questions: questions.length,
      answers: answers.length
    }
  }
}
