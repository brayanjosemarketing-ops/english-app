import { useGameStore } from '@/store/useGameStore'
import { LEVELS } from '@/data/levels'

export function useAchievementChecker() {
  const { completedLessons, streak, achievements, xp, unlockAchievement, perfectLessons } = useGameStore()

  const check = (isPerfect: boolean) => {
    const unlock = (id: string) => {
      if (!achievements.includes(id)) unlockAchievement(id)
    }

    if (completedLessons.length >= 1) unlock('first_lesson')
    if (isPerfect) unlock('first_perfect')
    if (streak >= 3) unlock('streak_3')
    if (streak >= 7) unlock('streak_7')
    if (streak >= 30) unlock('streak_30')
    if (completedLessons.length >= 10) unlock('ten_lessons')
    if (xp >= 200) unlock('level_a2')
    if (xp >= 500) unlock('level_b1')
    if (xp >= 1000) unlock('level_b2')
    if (xp >= 1800) unlock('level_c1')
    if (perfectLessons >= 5) unlock('grammar_king')

    // Level completion achievements
    for (const lvl of LEVELS) {
      const allDone = lvl.lessons.every((l) => completedLessons.includes(l.id))
      if (allDone) unlock(`all_${lvl.id.toLowerCase()}`)
    }

    if (xp >= 1000 && streak >= 30) unlock('neural_master')
  }

  return { check }
}
