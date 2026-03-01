import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'

const sqlite = new Database('db.sqlite')

// Initialize database tables
function initializeDatabase() {
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
}

// Initialize on first request
initializeDatabase()

// GET - Get questions (practice or MCQ)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const type = searchParams.get('type')
    
    if (type === 'practice' || (!category && !difficulty && type !== 'mcq')) {
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
          params.push(parseInt(difficulty))
        }
        query += ' WHERE ' + conditions.join(' AND ')
      }
      
      query += ' ORDER BY id DESC'
      
      return NextResponse.json(sqlite.prepare(query).all(...params))
    } else if (type === 'mcq') {
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
          params.push(parseInt(difficulty))
        }
        query += ' WHERE ' + conditions.join(' AND ')
      }
      
      query += ' ORDER BY id DESC'
      
      return NextResponse.json(sqlite.prepare(query).all(...params))
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

// POST - Add question (practice or MCQ)
export async function POST(request: Request) {
  try {
    const { question, answer, category, difficulty, type } = await request.json()
    
    if (type === 'practice') {
      const result = sqlite.prepare(`
        INSERT INTO practice_questions (question, answer, category, difficulty, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(question, answer, category, difficulty || 1, new Date().toISOString(), new Date().toISOString())
      
      return NextResponse.json({ id: result.lastInsertRowid, question, answer, category, difficulty: difficulty || 1 })
    } else if (type === 'mcq') {
      const { options, correctAnswer, explanation } = await request.json()
      const result = sqlite.prepare(`
        INSERT INTO mcqs (question, options, correct_answer, explanation, category, difficulty, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(question, options, correctAnswer, explanation || '', category, difficulty || 1, new Date().toISOString(), new Date().toISOString())
      
      return NextResponse.json({ id: result.lastInsertRowid, question, options, correctAnswer, explanation, category, difficulty: difficulty || 1 })
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('Error adding question:', error)
    return NextResponse.json({ error: 'Failed to add question' }, { status: 500 })
  }
}

// DELETE - Delete question (practice or MCQ)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    const type = searchParams.get('type')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    if (type === 'practice') {
      sqlite.prepare('DELETE FROM practice_questions WHERE id = ?').run(id)
    } else if (type === 'mcq') {
      sqlite.prepare('DELETE FROM mcqs WHERE id = ?').run(id)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 })
  }
}
