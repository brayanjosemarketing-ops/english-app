import type { ReactElement } from 'react'
import type { Screen } from '@/types'
import { useUIStore } from '@/store/useUIStore'

const NAV_ITEMS: { id: Screen; label: string; icon: ReactElement }[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'Lecciones',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export function BottomNav() {
  const { screen, navigateTo } = useUIStore()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a14]/95 border-t border-white/8 backdrop-blur-xl">
      <div className="flex justify-around items-center px-2 pb-safe pt-2 pb-5">
        {NAV_ITEMS.map((item) => {
          const active = screen === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center gap-1 px-5 py-1 rounded-xl transition-all duration-200 ${
                active ? 'text-amber-400' : 'text-white/35 hover:text-white/60'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
