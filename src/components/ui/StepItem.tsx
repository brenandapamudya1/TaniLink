import type { ReactNode } from 'react'

interface StepItemProps {
  icon: ReactNode
  title: string
  description: string
  isLast?: boolean
}

export function StepItem({ icon, title, description, isLast = false }: StepItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-harvest/10 flex items-center justify-center flex-shrink-0">
          <span className="text-harvest">{icon}</span>
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-harvest/20 min-h-8 mt-2" />
        )}
      </div>

      <div className={`flex-1 ${!isLast ? 'pb-8' : ''}`}>
        <h3 className="text-soil font-semibold text-base">{title}</h3>
        <p className="text-earth text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
