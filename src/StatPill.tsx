interface StatPillProps {
  icon: string
  value: string | number
  color?: string
}

export function StatPill({ icon, value, color = 'text-white' }: StatPillProps) {
  return (
    <div className={`flex items-center gap-1.5 bg-white/8 rounded-full px-3 py-1.5 text-sm font-bold ${color}`}>
      <span>{icon}</span>
      <span>{value}</span>
    </div>
  )
}
