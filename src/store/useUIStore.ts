import { create } from 'zustand'
import type { Screen } from '@/types'

interface UIStore {
  screen: Screen
  quizLessonId: string | null
  navigateTo: (screen: Screen, lessonId?: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  screen: 'home',
  quizLessonId: null,
  navigateTo: (screen, lessonId) =>
    set({ screen, quizLessonId: lessonId ?? null }),
}))
