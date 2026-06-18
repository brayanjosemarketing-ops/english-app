import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameState } from '@/types'
import { LEVELS } from '@/data/levels'

interface GameStore extends GameState {
  addXP: (amount: number) => void
  addGems: (amount: number) => void
  spendGems: (amount: number) => boolean
  removeHeart: () => void
  restoreHeart: () => void
  restoreAllHearts: () => void
  completeLesson: (lessonId: string) => void
  updateStreak: () => void
  unlockAchievement: (id: string) => void
  addMinutes: (min: number) => void
  getCurrentLevel: () => string
  reset: () => void
}

const INITIAL_STATE: GameState = {
  xp: 0,
  gems: 0,
  hearts: 5,
  maxHearts: 5,
  streak: 0,
  lastDate: null,
  completedLessons: [],
  achievements: [],
  totalMinutes: 0,
  totalLessons: 0,
  perfectLessons: 0,
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addXP: (amount) => set((s) => ({ xp: s.xp + amount })),

      addGems: (amount) => set((s) => ({ gems: s.gems + amount })),

      spendGems: (amount) => {
        if (get().gems < amount) return false
        set((s) => ({ gems: s.gems - amount }))
        return true
      },

      removeHeart: () =>
        set((s) => ({ hearts: Math.max(0, s.hearts - 1) })),

      restoreHeart: () =>
        set((s) => ({ hearts: Math.min(s.maxHearts, s.hearts + 1) })),

      restoreAllHearts: () => set((s) => ({ hearts: s.maxHearts })),

      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
          totalLessons: s.completedLessons.includes(lessonId)
            ? s.totalLessons
            : s.totalLessons + 1,
        })),

      updateStreak: () => {
        const today = new Date().toDateString()
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const { lastDate, streak } = get()
        if (lastDate === today) return
        set({
          streak: lastDate === yesterday ? streak + 1 : 1,
          lastDate: today,
        })
      },

      unlockAchievement: (id) =>
        set((s) => ({
          achievements: s.achievements.includes(id)
            ? s.achievements
            : [...s.achievements, id],
        })),

      addMinutes: (min) =>
        set((s) => ({ totalMinutes: s.totalMinutes + min })),

      getCurrentLevel: () => {
        const { xp } = get()
        let current = LEVELS[0]
        for (const l of LEVELS) {
          if (xp >= l.xpReq) current = l
        }
        return current.id
      },

      reset: () => set(INITIAL_STATE),
    }),
    { name: 'english-neural-v2' }
  )
)
