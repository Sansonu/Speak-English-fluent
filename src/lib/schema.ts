import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const practiceQuestions = sqliteTable('practice_questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').notNull(),
  difficulty: integer('difficulty').notNull().default(1),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString())
})

export const mcqs = sqliteTable('mcqs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  options: text('options').notNull(),
  correctAnswer: text('correct_answer').notNull(),
  explanation: text('explanation'),
  category: text('category').notNull(),
  difficulty: integer('difficulty').notNull().default(1),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString())
})

export const liveSessions = sqliteTable('live_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  difficulty: integer('difficulty').notNull().default(1),
  maxParticipants: integer('max_participants').notNull().default(10),
  currentParticipants: integer('current_participants').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  startedAt: text('started_at').notNull().default(new Date().toISOString()),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString())
})

export const sessionParticipants = sqliteTable('session_participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: integer('session_id').notNull(),
  userId: text('user_id').notNull(),
  joinedAt: text('joined_at').notNull().default(new Date().toISOString())
})

export const liveQuestions = sqliteTable('live_questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: integer('session_id').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  type: text('type').notNull().default('practice'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull().default(new Date().toISOString())
})

export const answers = sqliteTable('answers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id').notNull(),
  userId: text('user_id').notNull(),
  answer: text('answer').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }),
  submittedAt: text('submitted_at').notNull().default(new Date().toISOString())
})
