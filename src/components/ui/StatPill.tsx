import type { ReactNode } from 'react'

interface StatPillProps {
  icon: ReactNode
  value: string
  label: string
}

export function StatPill({ icon, value, label }: StatPillProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-pill bg-soil/60 backdrop-blur-sm border border-cream/10 flex-shrink-0">
      <span className="text-harvest text-lg">{icon}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-cream font-mono font-bold text-sm">{value}</span>
        <span className="text-cream/70 text-caption">{label}</span>
      </div>
    </div>
  )
}
