// ─── CEFR & Course ───────────────────────────────────────────────────────────

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type Screen = 'home' | 'map' | 'quiz' | 'result' | 'profile'
export type QuestionType = 'mc' | 'fill'

export interface Lesson {
  id: string
  title: string
  icon: string
  grammar: string
  tenseNumber?: number // which of the 12 tenses (if applicable)
}

export interface Level {
  id: CEFRLevel
  name: string
  emoji: string
  color: string
  xpReq: number
  tag: string
  lessons: Lesson[]
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  type: QuestionType
  q: string
  ans: string
  opts?: string[]
  fb_ok: string
  fb_bad: string
}

export interface QuizState {
  lessonId: string | null
  questions: QuizQuestion[]
  idx: number
  answers: boolean[]
  lock: boolean
}

export interface QuizResult {
  accuracy: number
  xpEarned: number
  gemsEarned: number
  correctCount: number
  totalCount: number
  lessonId: string
}

// ─── Game State ───────────────────────────────────────────────────────────────

export interface GameState {
  xp: number
  gems: number
  hearts: number
  maxHearts: number
  streak: number
  lastDate: string | null
  completedLessons: string[]
  achievements: string[]
  totalMinutes: number
  totalLessons: number
  perfectLessons: number
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string
  emoji: string
  title: string
  desc: string
  unlocked?: boolean
}

// ─── Neural Tips ──────────────────────────────────────────────────────────────

export type NeuralTipsMap = Record<CEFRLevel, string[]>
