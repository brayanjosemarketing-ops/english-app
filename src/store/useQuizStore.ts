import { create } from 'zustand'
import type { QuizState, QuizResult } from '@/types'
import { QUIZ_BANK } from '@/data/quizBank'

interface QuizStore extends QuizState {
  startQuiz: (lessonId: string) => void
  submitAnswer: (correct: boolean) => void
  nextQuestion: () => void
  lockQuestion: () => void
  getResult: () => QuizResult
  reset: () => void
}

const INITIAL: QuizState = {
  lessonId: null,
  questions: [],
  idx: 0,
  answers: [],
  lock: false,
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...INITIAL,

  startQuiz: (lessonId) => {
    const questions = QUIZ_BANK[lessonId] ?? []
    set({ lessonId, questions, idx: 0, answers: [], lock: false })
  },

  lockQuestion: () => set({ lock: true }),

  submitAnswer: (correct) =>
    set((s) => ({ answers: [...s.answers, correct] })),

  nextQuestion: () =>
    set((s) => ({ idx: s.idx + 1, lock: false })),

  getResult: (): QuizResult => {
    const { answers, lessonId } = get()
    const correct = answers.filter(Boolean).length
    const total = answers.length
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
    const xpEarned = 30 + Math.round((accuracy / 100) * 20)
    const gemsEarned = accuracy === 100 ? 10 : accuracy >= 80 ? 5 : 2
    return { accuracy, xpEarned, gemsEarned, correctCount: correct, totalCount: total, lessonId: lessonId ?? '' }
  },

  reset: () => set(INITIAL),
}))
