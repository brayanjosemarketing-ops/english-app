import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { useQuizStore } from '@/store/useQuizStore'
import { useUIStore } from '@/store/useUIStore'
import { useAchievementChecker } from '@/hooks/useAchievements'
import { LEVELS } from '@/data/levels'
import { NEURAL_TIPS } from '@/data/neuralTips'
import { HeartDisplay } from '@/HeartDisplay'
import { XPBar } from '@/XPBar'
import type { CEFRLevel, QuizResult } from '@/types'

type AnswerState = 'idle' | 'correct' | 'wrong'

function getNeuralTip(lessonId: string): string {
  const lvl = LEVELS.find((l) => l.lessons.some((ls) => ls.id === lessonId))
  const tips = lvl ? NEURAL_TIPS[lvl.id as CEFRLevel] : NEURAL_TIPS.A1
  return tips[Math.floor(Math.random() * tips.length)]
}

function getLessonMeta(lessonId: string) {
  for (const lvl of LEVELS) {
    const lesson = lvl.lessons.find((l) => l.id === lessonId)
    if (lesson) return { lesson, level: lvl }
  }
  return null
}

export function QuizScreen() {
  const { hearts, removeHeart, addXP, addGems, completeLesson, addMinutes, restoreAllHearts } = useGameStore()
  const { lessonId, questions, idx, lock, lockQuestion, submitAnswer, nextQuestion, getResult, reset } = useQuizStore()
  const { navigateTo } = useUIStore()
  const { check } = useAchievementChecker()

  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null)
  const [fillValue, setFillValue] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [neuralTip, setNeuralTip] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[idx]
  const total = questions.length
  const progress = total > 0 ? Math.round((idx / total) * 100) : 0
  const meta = lessonId ? getLessonMeta(lessonId) : null

  useEffect(() => {
    setAnswerState('idle')
    setSelectedOpt(null)
    setFillValue('')
    setShowFeedback(false)
    if (q?.type === 'fill') setTimeout(() => inputRef.current?.focus(), 100)
  }, [idx, q?.type])

  const handleAnswer = (correct: boolean, chosenOpt?: string) => {
    if (lock) return
    lockQuestion()
    if (chosenOpt) setSelectedOpt(chosenOpt)
    setAnswerState(correct ? 'correct' : 'wrong')
    setNeuralTip(getNeuralTip(lessonId ?? ''))
    setShowFeedback(true)
    submitAnswer(correct)
    if (!correct) removeHeart()

    setTimeout(() => {
      setShowFeedback(false)
      if (idx + 1 >= total) {
        const r = getResult()
        setResult(r)
        addXP(r.xpEarned)
        addGems(r.gemsEarned)
        addMinutes(5)
        completeLesson(lessonId ?? '')
        const isPerfect = r.accuracy === 100
        if (isPerfect) restoreAllHearts()
        check(isPerfect)
        setShowResult(true)
      } else {
        nextQuestion()
      }
    }, 2000)
  }

  const handleMC = (opt: string) => {
    if (lock) return
    handleAnswer(opt === q.ans, opt)
  }

  const handleFill = () => {
    if (lock || !fillValue.trim()) return
    const correct = fillValue.trim().toLowerCase() === q.ans.toLowerCase()
    handleAnswer(correct)
  }

  if (showResult && result) {
    return <ResultScreen result={result} lessonId={lessonId ?? ''} />
  }

  if (!q) return null

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a14]">
      {/* Header */}
      <div className="px-5 pt-14 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => { reset(); navigateTo('map') }}
            className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/50 text-lg active:scale-90 transition-transform flex-shrink-0"
          >
            ✕
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-white truncate">{meta?.lesson.title}</p>
            <p className="text-[10px] text-white/35 truncate">{meta?.lesson.grammar}</p>
          </div>
          <HeartDisplay hearts={hearts} />
        </div>
        <XPBar percent={progress} color="from-violet-500 to-blue-500" height="h-1.5" />
        <p className="text-[10px] font-mono text-white/25 mt-1">
          Pregunta {idx + 1} de {total}
        </p>
      </div>

      {/* Question body */}
      <div className="flex-1 px-5 overflow-y-auto">
        <div className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase mb-2">
          {q.type === 'mc' ? 'Selecciona la respuesta correcta' : 'Completa el espacio'}
        </div>

        <p className="text-lg font-bold text-white leading-relaxed whitespace-pre-line mb-6">{q.q}</p>

        {/* MC options */}
        {q.type === 'mc' && (
          <div className="space-y-3">
            {q.opts?.map((opt) => {
              const isSelected = selectedOpt === opt
              const isCorrect = opt === q.ans
              let style = 'bg-white/5 border-white/12 text-white/80'
              if (showFeedback) {
                if (isCorrect) style = 'bg-green-500/15 border-green-400/50 text-green-300'
                else if (isSelected && !isCorrect) style = 'bg-red-500/15 border-red-400/50 text-red-300'
                else style = 'bg-white/[0.02] border-white/5 text-white/25'
              }
              return (
                <button
                  key={opt}
                  onClick={() => handleMC(opt)}
                  disabled={lock}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm font-medium text-left flex justify-between items-center transition-all duration-200 active:scale-[0.98] ${style}`}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <span className="text-green-400 font-bold">✓</span>}
                  {showFeedback && isSelected && !isCorrect && <span className="text-red-400 font-bold">✗</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* Fill blank */}
        {q.type === 'fill' && (
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFill()}
              disabled={lock}
              placeholder="Escribe tu respuesta..."
              className={`w-full px-4 py-4 rounded-2xl border text-sm outline-none transition-all duration-200 text-white placeholder-white/20 bg-white/5 ${
                showFeedback
                  ? answerState === 'correct'
                    ? 'border-green-400/50 bg-green-500/10'
                    : 'border-red-400/50 bg-red-500/10'
                  : 'border-white/12 focus:border-violet-500/60'
              }`}
            />
            {showFeedback && answerState === 'wrong' && (
              <p className="text-xs text-white/40 px-1">
                ✏️ Respuesta correcta: <span className="text-white/70 font-semibold">{q.ans}</span>
              </p>
            )}
            {!lock && (
              <button
                onClick={handleFill}
                className="w-full py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-violet-600 to-blue-600 active:scale-[0.98] transition-transform"
              >
                Verificar →
              </button>
            )}
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-4 rounded-2xl p-4 border transition-all duration-300 ${
            answerState === 'correct'
              ? 'bg-green-500/10 border-green-500/25'
              : 'bg-red-500/10 border-red-500/25'
          }`}>
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">{answerState === 'correct' ? '✅' : '❌'}</span>
              <div>
                <p className={`text-sm font-bold mb-1 ${answerState === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                  {answerState === 'correct' ? '¡Correcto!' : 'Casi — revisa la pista'}
                </p>
                <p className="text-xs text-white/60 leading-relaxed">
                  {answerState === 'correct' ? q.fb_ok : q.fb_bad}
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2 items-start bg-violet-500/10 border border-violet-500/20 rounded-xl p-3">
              <span className="text-sm flex-shrink-0">🧠</span>
              <p className="text-[11px] text-violet-300/90 leading-relaxed">{neuralTip}</p>
            </div>
          </div>
        )}
        <div className="h-8" />
      </div>
    </div>
  )
}

// ─── Result Screen ──────────────────────────────────────────────────────────

function ResultScreen({ result, lessonId }: { result: QuizResult; lessonId: string }) {
  const { navigateTo } = useUIStore()
  const { reset } = useQuizStore()
  const meta = getLessonMeta(lessonId)
  const tipKey = meta?.level.id as CEFRLevel | undefined
  const tipArr = tipKey ? NEURAL_TIPS[tipKey] : NEURAL_TIPS.A1
  const tip = tipArr[Math.floor(Math.random() * tipArr.length)]

  const emoji = result.accuracy === 100 ? '🏆' : result.accuracy >= 80 ? '⭐' : result.accuracy >= 60 ? '💪' : '🔄'
  const title = result.accuracy === 100 ? '¡Perfecto!' : result.accuracy >= 80 ? '¡Excelente!' : result.accuracy >= 60 ? '¡Bien hecho!' : '¡Sigue practicando!'

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl mb-4">{emoji}</div>
      <h2 className="text-3xl font-black text-white mb-1">{title}</h2>
      <p className="text-sm text-white/35 mb-8">Tu hipocampo consolidó estas memorias 🧠</p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-6">
        {[
          { icon: '🎯', value: `${result.accuracy}%`, label: 'Precisión', color: 'text-amber-400' },
          { icon: '⚡', value: `+${result.xpEarned}`, label: 'XP', color: 'text-blue-400' },
          { icon: '💎', value: `+${result.gemsEarned}`, label: 'Gems', color: 'text-cyan-400' },
        ].map(({ icon, value, label, color }) => (
          <div key={label} className="rounded-2xl p-3 bg-white/[0.04] border border-white/8 text-center">
            <div className="text-lg mb-1">{icon}</div>
            <div className={`text-xl font-black ${color}`}>{value}</div>
            <div className="text-[10px] text-white/30 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-sm mb-6 rounded-2xl p-4 bg-white/[0.03] border border-white/8">
        <p className="text-xs text-white/40 mb-2">Respuestas correctas</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-black text-white">{result.correctCount}/{result.totalCount}</p>
          <div className="flex gap-1">
            {Array.from({ length: result.totalCount }).map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < result.correctCount ? 'bg-green-500' : 'bg-red-500/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm mb-8 flex gap-3 items-start bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 text-left">
        <span className="text-base flex-shrink-0">🧠</span>
        <p className="text-xs text-violet-300/90 leading-relaxed">{tip}</p>
      </div>

      <button
        onClick={() => { reset(); navigateTo('map') }}
        className="w-full max-w-sm py-4 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-red-500 active:scale-95 transition-transform text-base"
      >
        Continuar →
      </button>
    </div>
  )
}
