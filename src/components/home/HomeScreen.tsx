import { useGameStore } from '@/store/useGameStore'
import { useUIStore } from '@/store/useUIStore'
import { getLevelFromXP, getNextLevel, getLevelProgress, getXPToNext } from '@/hooks/useLevelProgress'
import { XPBar } from '@/XPBar'
import { StatPill } from '@/StatPill'


export function HomeScreen() {
  const { xp, gems, hearts, streak, completedLessons, totalMinutes, updateStreak } = useGameStore()
  const { navigateTo } = useUIStore()
  const level = getLevelFromXP(xp)
  const nextLevel = getNextLevel(xp)
  const progress = getLevelProgress(xp)
  const xpToNext = getXPToNext(xp)

  const protocolActive = completedLessons.length

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a14] pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-0">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-widest text-white/35 uppercase">English Neural</p>
            <h1 className="text-2xl font-black text-white mt-1">Hola, Bracko 👋</h1>
          </div>
          <div className="flex gap-2 mt-1">
            <StatPill icon="🔥" value={streak} color="text-orange-400" />
            <StatPill icon="💎" value={gems} color="text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Level card */}
      <div className="px-5 mt-4">
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${level.color}18, ${level.color}08)`, border: `1px solid ${level.color}30` }}
        >
          <div className="absolute right-4 top-3 text-6xl opacity-10 select-none">{level.emoji}</div>
          <div className="flex gap-3 items-start">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${level.color}25` }}
            >
              {level.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono font-bold tracking-widest text-indigo-300/70 uppercase">Nivel actual</p>
              <p className="text-lg font-black text-white mt-0.5">{level.id} — {level.name}</p>
              <p className="text-xs text-white/40 mt-0.5">{level.tag}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1.5">
              <span>{xp} XP</span>
              <span>{nextLevel ? `${xpToNext} XP para ${nextLevel.id}` : '¡Nivel máximo!'}</span>
            </div>
            <XPBar percent={progress} />
          </div>
        </div>
      </div>

      {/* Neural Protocol */}
      <div className="px-5 mt-4">
        <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">🧠</span>
            <p className="text-[10px] font-mono font-bold tracking-widest text-violet-400/80 uppercase">Protocolo Neural</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '🎯 Anclaje visual', active: true },
              { label: '⏰ Repetición espaciada', active: true },
              { label: '🗣️ Práctica activa', active: protocolActive > 0 },
              { label: '🔄 Ciclo APA', active: protocolActive > 2 },
            ].map(({ label, active }) => (
              <div
                key={label}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition-all duration-500 ${
                  active
                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                    : 'bg-white/[0.03] text-white/20 border border-white/5'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: '📚', value: completedLessons.length, label: 'Lecciones', color: 'text-green-400' },
          { icon: '⚡', value: xp, label: 'XP Total', color: 'text-blue-400' },
          { icon: '⏱', value: `${totalMinutes}m`, label: 'Minutos', color: 'text-violet-400' },
        ].map(({ icon, value, label, color }) => (
          <div key={label} className="rounded-2xl p-3 bg-white/[0.03] border border-white/8 text-center">
            <div className="text-lg mb-1">{icon}</div>
            <div className={`text-xl font-black ${color}`}>{value}</div>
            <div className="text-[10px] text-white/30 mt-0.5 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Hearts */}
      <div className="px-5 mt-4">
        <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white/60">Corazones</p>
            <p className="text-[10px] text-white/25 mt-0.5">Se recuperan con el tiempo</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-xl transition-all ${i < hearts ? 'text-red-500' : 'text-white/10'}`}>❤</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-5 mt-5 flex flex-col gap-3">
        <button
          onClick={() => { updateStreak(); navigateTo('map') }}
          className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-amber-500 to-red-500 active:scale-95 transition-transform shadow-lg shadow-amber-500/20"
        >
          📖 Continuar aprendiendo →
        </button>
        <button
          onClick={() => navigateTo('profile')}
          className="w-full py-3 rounded-2xl font-semibold text-sm text-white/60 bg-white/[0.04] border border-white/10 active:scale-95 transition-transform"
        >
          ⭐ Mi progreso y logros
        </button>
      </div>
    </div>
  )
}
