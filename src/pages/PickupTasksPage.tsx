import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { PickupTaskCard } from '@/components/ui/PickupTaskCard'
import { pickupTasks } from '@/data/pickupTasks'
import type { PickupTaskStatus } from '@/types/pickupTask'

const tabs: { label: string; value: 'all' | PickupTaskStatus }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Baru', value: 'baru' },
  { label: 'Diterima', value: 'diterima' },
  { label: 'Selesai', value: 'selesai' },
]

export default function PickupTasksPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | PickupTaskStatus>('all')
  const [tasks, setTasks] = useState(pickupTasks)
  const [acceptedTask, setAcceptedTask] = useState<string | null>(null)

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)

  useEffect(() => {
    if (acceptedTask) {
      const timer = setTimeout(() => setAcceptedTask(null), 2500)
      return () => clearTimeout(timer)
    }
  }, [acceptedTask])

  const handleAccept = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'diterima' as PickupTaskStatus } : t
      )
    )
    setAcceptedTask(taskId)
  }

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors mb-4"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>

        <h1 className="font-display text-title text-soil mb-1">Tugas Pengambilan</h1>
        <p className="text-body text-earth mb-6">Daftar tugas pickup hari ini</p>

        {acceptedTask && (
          <div className="flex items-center gap-3 bg-leaf/10 border border-leaf/20 rounded-lg px-4 py-3 mb-4 animate-[fadeIn_0.3s_ease-out]">
            <CheckCircle size={20} className="text-leaf flex-shrink-0" />
            <p className="text-sm font-semibold text-leaf">
              Tugas #{acceptedTask} berhasil diterima!
            </p>
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-1.5 rounded-pill text-caption font-semibold whitespace-nowrap transition-colors ${
                filter === tab.value
                  ? 'bg-leaf text-cream'
                  : 'border border-earth/30 text-earth hover:bg-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package size={48} className="text-earth/30 mb-4" />
            <h3 className="font-semibold text-soil text-base mb-1">Tidak ada tugas</h3>
            <p className="text-caption text-earth text-center">
              Tidak ada tugas pengambilan untuk filter ini
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <PickupTaskCard
                key={task.id}
                task={task}
                onAccept={handleAccept}
                onClick={(t) => {
                  if (t.status === 'baru') {
                    navigate(`/verifikasi-pengambilan/${t.id}`)
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
