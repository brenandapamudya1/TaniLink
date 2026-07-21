import { useNavigate } from 'react-router-dom'
import { Package, Truck, DollarSign, Star, ClipboardList, ArrowRight, TrendingUp } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useAuth } from '@/context/AuthContext'

interface StatCardProps {
  icon: typeof Package
  label: string
  value: string
  color: string
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-fog rounded-lg shadow-card p-3 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-caption text-earth">{label}</p>
        <p className="font-mono font-bold text-sm text-soil">{value}</p>
      </div>
    </div>
  )
}

const weeklyData = [
  { day: 'Sen', pickups: 5, deliveries: 3 },
  { day: 'Sel', pickups: 8, deliveries: 6 },
  { day: 'Rab', pickups: 4, deliveries: 4 },
  { day: 'Kam', pickups: 7, deliveries: 5 },
  { day: 'Jum', pickups: 9, deliveries: 7 },
  { day: 'Sab', pickups: 6, deliveries: 6 },
  { day: 'Min', pickups: 3, deliveries: 2 },
]

const maxPickups = Math.max(...weeklyData.map((d) => d.pickups))

export default function DistributorDashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <PageWrapper>
      <div className="px-4 pt-6 pb-4">
        <h1 className="font-display text-title text-soil mb-2">
          Halo, {user?.name?.split(' ')[0] || 'Distributor'}
        </h1>
        <p className="text-body text-earth mb-6">Dashboard Distributor</p>
      </div>

      <div className="px-4 grid grid-cols-2 gap-3 mb-6">
        <StatCard
          icon={Package}
          label="Pengambilan Hari Ini"
          value="5"
          color="bg-harvest"
        />
        <StatCard
          icon={Truck}
          label="Pengiriman Aktif"
          value="3"
          color="bg-leaf"
        />
        <StatCard
          icon={DollarSign}
          label="Pendapatan Bulan Ini"
          value="Rp 7,2 jt"
          color="bg-blue-500"
        />
        <StatCard
          icon={Star}
          label="Rating"
          value="4.8 ⭐"
          color="bg-purple-500"
        />
      </div>

      <div className="px-4 mb-6">
        <h2 className="font-display text-section text-soil mb-4">Aktivitas Mingguan</h2>
        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-harvest" />
              <span className="text-sm font-semibold text-soil">Minggu Ini</span>
            </div>
            <div className="flex items-center gap-3 text-caption text-earth">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-harvest" />
                Pickup
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-leaf" />
                Kirim
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center h-full">
                <div className="flex-1 flex items-end justify-center gap-0.5 w-full">
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-[9px] font-mono font-bold text-soil mb-1">{d.pickups}</span>
                    <div
                      className="w-full rounded-t-sm bg-harvest transition-all duration-300"
                      style={{ height: `${(d.pickups / maxPickups) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-[9px] font-mono font-bold text-soil mb-1">{d.deliveries}</span>
                    <div
                      className="w-full rounded-t-sm bg-leaf transition-all duration-300"
                      style={{ height: `${(d.deliveries / maxPickups) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-earth mt-1.5">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-cream flex justify-between text-caption text-earth">
            <span>Total Pickup: <span className="font-semibold text-soil">42</span></span>
            <span>Total Kirim: <span className="font-semibold text-soil">33</span></span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-cream/60 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-earth/10 flex items-center justify-center">
            <ClipboardList size={20} className="text-earth" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-soil text-sm">4 Tugas Aktif</p>
            <p className="text-caption text-earth">2 baru, 1 diterima, 1 dalam perjalanan</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <h2 className="font-display text-section text-soil mb-4">Aksi Cepat</h2>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/pilih-kendaraan')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-harvest/10 flex items-center justify-center">
                <Truck size={20} className="text-harvest" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Pilih Kendaraan</p>
                <p className="text-caption text-earth">Atur kendaraan operasional</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/tugas-pengambilan')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                <Package size={20} className="text-leaf" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Tugas Pengambilan</p>
                <p className="text-caption text-earth">Lihat & terima tugas pickup</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/rute-pengambilan')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Rute Pengambilan</p>
                <p className="text-caption text-earth">Optimasi rute hari ini</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/pendapatan-distributor')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-harvest/10 flex items-center justify-center">
                <DollarSign size={20} className="text-harvest" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Pendapatan</p>
                <p className="text-caption text-earth">Lihat fee & bonus</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/riwayat-distributor')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <ClipboardList size={20} className="text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Riwayat & Performa</p>
                <p className="text-caption text-earth">Rating, on-time, total order</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
