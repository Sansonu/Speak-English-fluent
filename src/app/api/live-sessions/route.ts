import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'

const sqlite = new Database('db.sqlite')

// Initialize database tables
function initializeDatabase() {
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
}

// Initialize on first request
initializeDatabase()

// GET - Get all active sessions
export async function GET() {
  try {
    const sessions = sqlite.prepare('SELECT * FROM live_sessions WHERE is_active = 1 ORDER BY id DESC').all()
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

// POST - Create a new session
export async function POST(request: Request) {
  try {
    const { title, description, category, difficulty, maxParticipants } = await request.json()
    const now = new Date().toISOString()
    
    const result = sqlite.prepare(`
      INSERT INTO live_sessions (title, description, category, difficulty, max_participants, current_participants, is_active, started_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, description || '', category, difficulty || 1, maxParticipants || 10, 0, 1, now, now, now)
    
    return NextResponse.json({ 
      id: result.lastInsertRowid, 
      title, 
      description, 
      category, 
      difficulty: difficulty || 1, 
      maxParticipants: maxParticipants || 10, 
      currentParticipants: 0, 
      isActive: true 
    })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

// DELETE - Delete a session
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    sqlite.prepare('DELETE FROM live_sessions WHERE id = ?').run(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 })
  }
}
