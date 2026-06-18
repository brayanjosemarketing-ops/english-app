import { useGameStore } from '@/store/useGameStore'
import { useUIStore } from '@/store/useUIStore'
import { LEVELS } from '@/data/levels'
import { ACHIEVEMENTS } from '@/data/neuralTips'
import { getLevelFromXP, getNextLevel, getLevelProgress, getXPToNext } from '@/hooks/useLevelProgress'
import { XPBar } from '@/XPBar'

export function ProfileScreen() {
  const { xp, gems, streak, completedLessons, totalMinutes, achievements } = useGameStore()
  const { navigateTo } = useUIStore()
  const level = getLevelFromXP(xp)
  const nextLevel = getNextLevel(xp)
  const progress = getLevelProgress(xp)
  const xpToNext = getXPToNext(xp)

  const unlockedAch = ACHIEVEMENTS.filter((a) => achievements.includes(a.id))
  const lockedAch = ACHIEVEMENTS.filter((a) => !achievements.includes(a.id))

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
        <h2 className="text-lg font-black text-white">Mi Progreso</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-4">
        {/* Current level card */}
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ background: `${level.color}12`, border: `1px solid ${level.color}30` }}
        >
          <div className="absolute right-3 top-3 text-5xl opacity-10">{level.emoji}</div>
          <div className="flex gap-3 items-center mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${level.color}25` }}
            >
              {level.emoji}
            </div>
            <div>
              <p className="text-[10px] font-mono text-indigo-300/60 uppercase tracking-widest">Tu nivel CEFR</p>
              <p className="text-lg font-black text-white">{level.id} — {level.name}</p>
              <p className="text-xs text-white/35">{level.tag}</p>
            </div>
          </div>
          <XPBar percent={progress} />
          <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1.5">
            <span>{xp} XP</span>
            <span>{nextLevel ? `${xpToNext} XP para ${nextLevel.id}` : '¡Nivel máximo!'}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '📚', val: completedLessons.length, label: 'Lecciones', color: 'text-green-400' },
            { icon: '🔥', val: `${streak} días`, label: 'Racha actual', color: 'text-orange-400' },
            { icon: '⚡', val: xp, label: 'XP Total', color: 'text-blue-400' },
            { icon: '⏱', val: `${totalMinutes}m`, label: 'Tiempo total', color: 'text-violet-400' },
            { icon: '💎', val: gems, label: 'Gems', color: 'text-cyan-400' },
            { icon: '🎯', val: `${Math.round((completedLessons.length / 37) * 100)}%`, label: 'Completado', color: 'text-amber-400' },
          ].map(({ icon, val, label, color }) => (
            <div key={label} className="rounded-2xl p-3.5 bg-white/[0.03] border border-white/8 flex items-center gap-3">
              <span className="text-xl">{icon}</span>
              <div>
                <p className={`text-lg font-black ${color}`}>{val}</p>
                <p className="text-[10px] text-white/30">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <p className="text-sm font-black text-white">Logros</p>
            </div>
            <span className="text-xs font-mono text-white/30">{unlockedAch.length}/{ACHIEVEMENTS.length}</span>
          </div>

          {unlockedAch.length === 0 && (
            <p className="text-xs text-white/25 text-center py-3">Completa tu primera lección 🎯</p>
          )}

          <div className="space-y-2">
            {unlockedAch.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
              >
                <span className="text-2xl">{a.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-amber-300">{a.title}</p>
                  <p className="text-[10px] text-white/35">{a.desc}</p>
                </div>
                <span className="text-amber-400 text-sm">⭐</span>
              </div>
            ))}
            {lockedAch.slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl opacity-25">
                <span className="text-2xl grayscale">{a.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-white/50">{a.title}</p>
                  <p className="text-[10px] text-white/25">{a.desc}</p>
                </div>
              </div>
            ))}
            {lockedAch.length > 3 && (
              <p className="text-[10px] text-white/20 text-center py-1">+{lockedAch.length - 3} logros más por descubrir</p>
            )}
          </div>
        </div>

        {/* Roadmap A1→C1 */}
        <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <span>🗺️</span>
            <p className="text-sm font-black text-white">Roadmap A1 → C1</p>
          </div>
          <div className="space-y-2">
            {LEVELS.map((l) => {
              const unlocked = xp >= l.xpReq
              const isCurrent = l.id === level.id
              const doneCount = l.lessons.filter((ls) => completedLessons.includes(ls.id)).length
              return (
                <div
                  key={l.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isCurrent ? 'border' : 'opacity-' + (unlocked ? '70' : '25')
                  }`}
                  style={isCurrent ? { background: `${l.color}12`, borderColor: `${l.color}40` } : {}}
                >
                  <span className="text-xl">{l.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/30">{l.id}</span>
                      <span className="text-xs font-bold text-white">{l.name}</span>
                      {isCurrent && (
                        <span className="text-[9px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded-full">NOW</span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/25">{doneCount}/{l.lessons.length} lecciones</p>
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{l.xpReq > 0 ? `${l.xpReq}xp` : 'free'}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Neural Protocol */}
        <div className="rounded-2xl p-4 bg-violet-500/8 border border-violet-500/18">
          <div className="flex items-center gap-2 mb-3">
            <span>🧠</span>
            <p className="text-sm font-black text-violet-300">Protocolo Neural</p>
          </div>
          {[
            ['Inmersión sensorial activa', 'vocabulario con contexto'],
            ['Anclaje visual dual coding', 'imagen + palabra'],
            ['Repetición espaciada SRS', '1→3→7→14→30 días'],
            ['Output obligatorio', 'producción fuerza consolidación'],
            ['Ciclo APA', 'Adquirir → Practicar → Ajustar'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-2 py-1.5">
              <span className="text-green-400 text-xs flex-shrink-0 mt-0.5">✅</span>
              <p className="text-xs text-white/50 leading-relaxed">
                <span className="text-white/80 font-semibold">{title}</span> — {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
