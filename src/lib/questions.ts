import { sqlite } from './db'

// Initialize database tables
export function initializeDatabase() {
  try {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS practice_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS mcqs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        explanation TEXT,
        category TEXT NOT NULL,
        difficulty INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS live_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        difficulty INTEGER NOT NULL DEFAULT 1,
        max_participants INTEGER NOT NULL DEFAULT 10,
        current_participants INTEGER NOT NULL DEFAULT 0,
        is_active INTEGER NOT NULL DEFAULT 1,
        started_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS session_participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        joined_at TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES live_sessions (id)
      )
    `)
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS live_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'practice',
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES live_sessions (id)
      )
    `)
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        answer TEXT NOT NULL,
        is_correct INTEGER,
        submitted_at TEXT NOT NULL,
        FOREIGN KEY (question_id) REFERENCES live_questions (id)
      )
    `)
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
}

export const questionsApi = {
  // Practice Questions
  async addPracticeQuestion(question: string, answer: string, category: string, difficulty: number) {
    const result = sqlite.prepare(`
      INSERT INTO practice_questions (question, answer, category, difficulty, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(question, answer, category, difficulty, new Date().toISOString(), new Date().toISOString())
    
    return { id: result.lastInsertRowid, question, answer, category, difficulty }
  },

  async getPracticeQuestions(category: string | null = null, difficulty: number | null = null) {
    let query = 'SELECT * FROM practice_questions'
    const params: any[] = []
    
    if (category || difficulty) {
      const conditions: string[] = []
      if (category) {
        conditions.push('category = ?')
        params.push(category)
      }
      if (difficulty) {
        conditions.push('difficulty = ?')
        params.push(difficulty)
      }
      query += ' WHERE ' + conditions.join(' AND ')
    }
    
    query += ' ORDER BY id ASC'
    
    return sqlite.prepare(query).all(...params)
  },

  async getPracticeQuestionById(id: number) {
    return sqlite.prepare('SELECT * FROM practice_questions WHERE id = ?').get(id)
  },

  async updatePracticeQuestion(id: number, updates: any) {
    const { question, answer, category, difficulty } = updates
    sqlite.prepare(`
      UPDATE practice_questions 
      SET question = ?, answer = ?, category = ?, difficulty = ?, updated_at = ?
      WHERE id = ?
    `).run(question, answer, category, difficulty, new Date().toISOString(), id)
    
    return this.getPracticeQuestionById(id)
  },

  async deletePracticeQuestion(id: number) {
    return sqlite.prepare('DELETE FROM practice_questions WHERE id = ?').run(id)
  },

  // MCQs
  async addMCQ(question: string, options: string, correctAnswer: string, explanation: string, category: string, difficulty: number) {
    const result = sqlite.prepare(`
      INSERT INTO mcqs (question, options, correct_answer, explanation, category, difficulty, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(question, options, correctAnswer, explanation, category, difficulty, new Date().toISOString(), new Date().toISOString())
    
    return { id: result.lastInsertRowid, question, options, correctAnswer, explanation, category, difficulty }
  },

  async getMCQs(category: string | null = null, difficulty: number | null = null) {
    let query = 'SELECT * FROM mcqs'
    const params: any[] = []
    
    if (category || difficulty) {
      const conditions: string[] = []
      if (category) {
        conditions.push('category = ?')
        params.push(category)
      }
      if (difficulty) {
        conditions.push('difficulty = ?')
        params.push(difficulty)
      }
      query += ' WHERE ' + conditions.join(' AND ')
    }
    
    query += ' ORDER BY id ASC'
    
    return sqlite.prepare(query).all(...params)
  },

  async getMCQById(id: number) {
    return sqlite.prepare('SELECT * FROM mcqs WHERE id = ?').get(id)
  },

  async updateMCQ(id: number, updates: any) {
    const { question, options, correctAnswer, explanation, category, difficulty } = updates
    sqlite.prepare(`
      UPDATE mcqs 
      SET question = ?, options = ?, correct_answer = ?, explanation = ?, category = ?, difficulty = ?, updated_at = ?
      WHERE id = ?
    `).run(question, options, correctAnswer, explanation, category, difficulty, new Date().toISOString(), id)
    
    return this.getMCQById(id)
  },

  async deleteMCQ(id: number) {
    return sqlite.prepare('DELETE FROM mcqs WHERE id = ?').run(id)
  }
}
