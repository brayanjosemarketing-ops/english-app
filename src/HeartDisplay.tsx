interface HeartDisplayProps {
  hearts: number
  max?: number
}

export function HeartDisplay({ hearts, max = 5 }: HeartDisplayProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-sm transition-all duration-300 ${i < hearts ? 'text-red-500' : 'text-white/15'}`}
        >
          ❤
        </span>
      ))}
    </div>
  )
}
