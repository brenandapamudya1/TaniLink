import { MapPin, Package, Weight } from 'lucide-react'
import type { PickupTask } from '@/types/pickupTask'

interface PickupTaskCardProps {
  task: PickupTask
  onAccept?: (taskId: string) => void
  onClick?: (task: PickupTask) => void
}

const statusBadge: Record<string, { label: string; color: string }> = {
  baru: { label: 'Baru', color: 'bg-harvest/10 text-harvest' },
  diterima: { label: 'Diterima', color: 'bg-leaf/10 text-leaf' },
  dalam_perjalanan: { label: 'Dalam Perjalanan', color: 'bg-blue-100 text-blue-600' },
  selesai: { label: 'Selesai', color: 'bg-earth/10 text-earth' },
}

export function PickupTaskCard({ task, onAccept, onClick }: PickupTaskCardProps) {
  const badge = statusBadge[task.status]

  return (
    <article
      onClick={() => onClick?.(task)}
      className="bg-fog rounded-lg shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-soil">#{task.id}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        <span className="text-caption text-earth">{task.scheduledTime.split('T')[1]?.slice(0, 5)}</span>
      </div>

      <div className="flex items-start gap-2 mb-2">
        <MapPin size={14} className="text-earth mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-soil">{task.farmerName}</p>
          <p className="text-caption text-earth">{task.farmerLocation}</p>
        </div>
      </div>

      <div className="bg-cream rounded-lg p-3 mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Package size={14} className="text-earth" />
          <span className="text-caption font-semibold text-earth">Item:</span>
        </div>
        <ul className="space-y-1 pl-5">
          {task.items.map((item, i) => (
            <li key={i} className="text-caption text-soil list-disc">
              {item.name} — {item.qty} {item.unit}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-cream">
          <Weight size={14} className="text-earth" />
          <span className="text-caption font-semibold text-soil">
            Total: {task.totalWeight} kg
          </span>
        </div>
      </div>

      {task.status === 'baru' && (
        <button
          onClick={(e) => { e.stopPropagation(); onAccept?.(task.id) }}
          className="w-full py-2.5 rounded-pill bg-harvest text-soil font-semibold text-sm hover:brightness-105 active:scale-95 transition-all"
        >
          Terima Tugas
        </button>
      )}
    </article>
  )
}
