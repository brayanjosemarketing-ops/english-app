import { useUIStore } from '@/store/useUIStore'
import { useQuizStore } from '@/store/useQuizStore'
import { BottomNav } from '@/components/layout/BottomNav'
import { HomeScreen } from '@/components/home/HomeScreen'
import { MapScreen } from '@/components/map/MapScreen'
import { QuizScreen } from '@/components/quiz/QuizScreen'
import { ProfileScreen } from '@/components/profile/ProfileScreen'
import { useEffect } from 'react'

export default function App() {
  const { screen, quizLessonId } = useUIStore()
  const { startQuiz } = useQuizStore()

  useEffect(() => {
    if (screen === 'quiz' && quizLessonId) {
      startQuiz(quizLessonId)
    }
  }, [screen, quizLessonId])

  const hideNav = screen === 'quiz'

  return (
    <div className="min-h-screen bg-[#0a0a14] max-w-lg mx-auto relative">
      {screen === 'home' && <HomeScreen />}
      {screen === 'map' && <MapScreen />}
      {screen === 'quiz' && <QuizScreen />}
      {screen === 'profile' && <ProfileScreen />}
      {!hideNav && <BottomNav />}
    </div>
  )
}
