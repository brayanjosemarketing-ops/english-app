import { LEVELS } from '@/data/levels'
import type { Level } from '@/types'

export function getLevelFromXP(xp: number): Level {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.xpReq) current = l
  }
  return current
}

export function getNextLevel(xp: number): Level | null {
  return LEVELS.find((l) => l.xpReq > xp) ?? null
}

export function getLevelProgress(xp: number): number {
  const current = getLevelFromXP(xp)
  const next = getNextLevel(xp)
  if (!next) return 100
  const inLevel = xp - current.xpReq
  const needed = next.xpReq - current.xpReq
  return Math.min(100, Math.round((inLevel / needed) * 100))
}

export function getXPToNext(xp: number): number {
  const next = getNextLevel(xp)
  return next ? next.xpReq - xp : 0
}

export function getLessonStatus(
  lessonId: string,
  lessonIndex: number,
  levelUnlocked: boolean,
  completedLessons: string[],
  firstUncompletedIndex: number
): 'done' | 'active' | 'available' | 'locked' {
  if (!levelUnlocked) return 'locked'
  if (completedLessons.includes(lessonId)) return 'done'
  if (lessonIndex === firstUncompletedIndex) return 'active'
  if (firstUncompletedIndex === -1) return 'available'
  if (lessonIndex > firstUncompletedIndex) return 'locked'
  return 'available'
}
