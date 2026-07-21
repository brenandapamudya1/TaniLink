import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Package, Map, AlertTriangle, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { monthlyEarnings } from '@/data/distributorEarnings'

interface MetricCardProps {
  icon: typeof Star
  label: string
  value: string
  color: string
  subtext?: string
}

function MetricCard({ icon: Icon, label, value, color, subtext }: MetricCardProps) {
  return (
    <div className="bg-fog rounded-lg shadow-card p-4 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="font-mono font-bold text-base text-soil">{value}</p>
        <p className="text-caption text-earth">{label}</p>
        {subtext && <p className="text-caption text-earth/60">{subtext}</p>}
      </div>
    </div>
  )
}

export default function DistributorHistoryPage() {
  const navigate = useNavigate()
  const [showDetail, setShowDetail] = useState(false)

  const maxAmount = Math.max(...monthlyEarnings.map((m) => m.amount))

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

        <h1 className="font-display text-title text-soil mb-1">Riwayat & Performa</h1>
        <p className="text-body text-earth mb-6">Statistik kinerja distributormu</p>

        <div className="space-y-3 mb-6">
          <MetricCard
            icon={Star}
            label="Rating"
            value="⭐ 4.8 / 5"
            color="bg-purple-500"
          />
          <MetricCard
            icon={Clock}
            label="On-Time Delivery"
            value="96%"
            color="bg-leaf"
            subtext="Ketepatan waktu"
          />
          <MetricCard
            icon={Package}
            label="Completed Orders"
            value="128"
            color="bg-harvest"
            subtext="Pesanan selesai"
          />
          <MetricCard
            icon={Map}
            label="Total Kilometer"
            value="2.450 km"
            color="bg-blue-500"
          />
          <MetricCard
            icon={AlertTriangle}
            label="Jumlah Komplain"
            value="3"
            color="bg-red-500"
            subtext="0.2% dari total order"
          />
        </div>

        <h2 className="font-semibold text-soil text-sm mb-3">Pendapatan 6 Bulan</h2>
        <div className="bg-fog rounded-lg shadow-card p-4 mb-6">
          <div className="flex items-end justify-between gap-2 h-40">
            {monthlyEarnings.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[9px] font-mono font-semibold text-earth mb-1">
                  Rp{(m.amount / 1000000).toFixed(1)}jt
                </span>
                <div
                  className="w-full rounded-t-md bg-harvest transition-all duration-300"
                  style={{ height: `${(m.amount / maxAmount) * 100}%` }}
                />
                <span className="text-[10px] font-semibold text-earth mt-1.5">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full py-3 rounded-pill border border-cream text-earth font-semibold text-sm hover:bg-cream transition-colors flex items-center justify-center gap-2"
        >
          {showDetail ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showDetail ? 'Sembunyikan Detail' : 'Lihat Detail Lengkap'}
        </button>

        {showDetail && (
          <div className="mt-4 space-y-4">
            <div className="bg-fog rounded-lg shadow-card p-4">
              <h3 className="font-semibold text-soil text-sm mb-3 flex items-center gap-2">
                <TrendingUp size={16} className="text-harvest" />
                Breakdown Bulanan
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-caption">
                  <thead>
                    <tr className="border-b border-cream">
                      <th className="text-left py-2 pr-3 font-semibold text-earth">Bulan</th>
                      <th className="text-right py-2 pr-3 font-semibold text-earth">Pickup</th>
                      <th className="text-right py-2 pr-3 font-semibold text-earth">Delivery</th>
                      <th className="text-right py-2 font-semibold text-earth">Bonus</th>
                      <th className="text-right py-2 font-semibold text-harvest">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyEarnings.map((m, i) => {
                      const pickup = m.amount * 0.4
                      const delivery = m.amount * 0.35
                      const bonus = m.amount * 0.25
                      return (
                        <tr key={m.month} className={i < monthlyEarnings.length - 1 ? 'border-b border-cream' : ''}>
                          <td className="py-2.5 pr-3 font-semibold text-soil">{m.month}</td>
                          <td className="py-2.5 pr-3 text-right text-soil">Rp{(pickup / 1000000).toFixed(1)}jt</td>
                          <td className="py-2.5 pr-3 text-right text-soil">Rp{(delivery / 1000000).toFixed(1)}jt</td>
                          <td className="py-2.5 pr-3 text-right text-leaf">Rp{(bonus / 1000000).toFixed(1)}jt</td>
                          <td className="py-2.5 text-right font-mono font-bold text-harvest">Rp{(m.amount / 1000000).toFixed(1)}jt</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-fog rounded-lg shadow-card p-4">
              <h3 className="font-semibold text-soil text-sm mb-3">Performa Bulan Ini</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-caption text-earth mb-1">
                    <span>Pickup Tepat Waktu</span>
                    <span className="font-semibold text-soil">96%</span>
                  </div>
                  <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                    <div className="h-full bg-leaf rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-caption text-earth mb-1">
                    <span>Kualitas Produk Baik</span>
                    <span className="font-semibold text-soil">94%</span>
                  </div>
                  <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                    <div className="h-full bg-harvest rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-caption text-earth mb-1">
                    <span>Pengambilan Selesai</span>
                    <span className="font-semibold text-soil">128/132</span>
                  </div>
                  <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '97%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
