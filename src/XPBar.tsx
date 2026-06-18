interface XPBarProps {
  percent: number
  color?: string
  height?: string
}

export function XPBar({ percent, color = 'from-amber-400 to-red-500', height = 'h-2' }: XPBarProps) {
  return (
    <div className={`w-full ${height} bg-white/10 rounded-full overflow-hidden`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, percent)}%` }}
      />
    </div>
  )
}
