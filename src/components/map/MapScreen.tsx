import { useGameStore } from '@/store/useGameStore'
import { useUIStore } from '@/store/useUIStore'
import { LEVELS } from '@/data/levels'
import { getLevelFromXP, getLessonStatus } from '@/hooks/useLevelProgress'

const BUBBLE_ALIGNS = ['justify-start', 'justify-center', 'justify-end', 'justify-center']

export function MapScreen() {
  const { xp, completedLessons } = useGameStore()
  const { navigateTo } = useUIStore()
  const currentLevel = getLevelFromXP(xp)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a14] pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 border-b border-white/6">
        <button
          onClick={() => navigateTo('home')}
          className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/60 text-lg active:scale-90 transition-transform"
        >
          ‹
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-black text-white">Mapa de Aprendizaje</h2>
          <p className="text-[10px] font-mono text-white/30">A1 → C1 · 37 lecciones · 12 tiempos verbales</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/25 rounded-full px-3 py-1.5">
          <span className="text-amber-400 text-xs">⚡</span>
          <span className="text-amber-400 font-bold text-sm">{xp}</span>
        </div>
      </div>

      {/* Level sections */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-8">
        {LEVELS.map((lvl) => {
          const unlocked = xp >= lvl.xpReq
          const doneCount = lvl.lessons.filter((l) => completedLessons.includes(l.id)).length
          const firstUndone = lvl.lessons.findIndex((l) => !completedLessons.includes(l.id))
          const pct = Math.round((doneCount / lvl.lessons.length) * 100)
          const isCurrent = lvl.id === currentLevel.id

          return (
            <div key={lvl.id} className={`transition-opacity duration-300 ${!unlocked ? 'opacity-40' : ''}`}>
              {/* Level header */}
              <div
                className="rounded-2xl p-4 flex items-center gap-3 mb-3"
                style={{
                  background: unlocked ? `${lvl.color}12` : '#111118',
                  border: `1px solid ${lvl.color}${isCurrent ? '50' : '22'}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${lvl.color}20` }}
                >
                  {lvl.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/30">{lvl.id}</span>
                    {!unlocked && <span className="text-[10px] text-white/20">🔒</span>}
                    {isCurrent && (
                      <span className="text-[9px] font-black bg-amber-500 text-black px-2 py-0.5 rounded-full">ACTUAL</span>
                    )}
                  </div>
                  <p className="text-sm font-black text-white">{lvl.name}</p>
                  <p className="text-[10px] text-white/35">{lvl.tag}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black" style={{ color: lvl.color }}>{doneCount}/{lvl.lessons.length}</p>
                  <p className="text-[10px] text-white/25 font-mono">{lvl.xpReq > 0 ? `${lvl.xpReq} XP` : 'Libre'}</p>
                </div>
              </div>

              {/* Progress bar */}
              {unlocked && (
                <div className="h-1 bg-white/6 rounded-full mb-4 mx-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: lvl.color }}
                  />
                </div>
              )}

              {/* Lesson bubbles */}
              <div className="flex flex-col gap-5 px-2">
                {lvl.lessons.map((lesson, i) => {
                  const status = getLessonStatus(lesson.id, i, unlocked, completedLessons, firstUndone)
                  const align = BUBBLE_ALIGNS[i % 4]

                  return (
                    <div key={lesson.id} className={`flex ${align}`}>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => status !== 'locked' && navigateTo('quiz', lesson.id)}
                          disabled={status === 'locked'}
                          className={`
                            relative w-16 h-16 rounded-[20px] text-2xl flex items-center justify-center
                            transition-all duration-200 active:scale-90
                            ${status === 'done' ? 'bg-green-600 shadow-lg shadow-green-600/30' : ''}
                            ${status === 'active' ? 'bg-amber-500 shadow-xl shadow-amber-500/40 scale-110' : ''}
                            ${status === 'available' ? 'bg-white/8 border border-white/15' : ''}
                            ${status === 'locked' ? 'bg-white/4 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                        >
                          {status === 'locked' ? '🔒' : lesson.icon}

                          {/* Status badge */}
                          {status === 'done' && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-[10px] font-black text-green-900">
                              ✓
                            </span>
                          )}
                          {status === 'active' && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] text-amber-500 font-black">
                              ▶
                            </span>
                          )}
                        </button>

                        {/* Label */}
                        <div className="text-center max-w-[80px]">
                          <p className={`text-[10px] font-semibold leading-tight ${
                            status === 'done' ? 'text-green-400' :
                            status === 'active' ? 'text-amber-400' :
                            status === 'locked' ? 'text-white/15' : 'text-white/50'
                          }`}>
                            {lesson.title}
                          </p>
                          {lesson.tenseNumber && (
                            <p className="text-[9px] font-mono text-violet-400/60 mt-0.5">
                              Tiempo #{lesson.tenseNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div className="h-4" />
      </div>
    </div>
  )
}
