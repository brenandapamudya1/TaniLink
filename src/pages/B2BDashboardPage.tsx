import { useNavigate } from 'react-router-dom'
import { Package, Truck, DollarSign, TrendingUp, ArrowRight, Building2, FileText, ClipboardList } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useAuth } from '@/context/AuthContext'
import { b2bAnalytics } from '@/data/b2bAnalytics'

const maxSpending = Math.max(...b2bAnalytics.monthlySpending.map((m) => m.spending))

export default function B2BDashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <PageWrapper>
      <div className="px-4 pt-6 pb-4">
        <h1 className="font-display text-title text-soil mb-1">
          Good Morning, {user?.businessName || user?.name || 'Bisnis'}
        </h1>
        <p className="text-body text-earth">Dashboard B2B</p>
      </div>

      <div className="px-4 grid grid-cols-2 gap-3 mb-6">
        <div className="bg-fog rounded-lg shadow-card p-3 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-harvest flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-caption text-earth">Pesanan Aktif</p>
            <p className="font-mono font-bold text-sm text-soil">3</p>
          </div>
        </div>
        <div className="bg-fog rounded-lg shadow-card p-3 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-leaf flex items-center justify-center">
            <Truck size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-caption text-earth">Pengiriman Hari Ini</p>
            <p className="font-mono font-bold text-sm text-soil">1</p>
          </div>
        </div>
        <div className="bg-fog rounded-lg shadow-card p-3 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <DollarSign size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-caption text-earth">Pembelian Bulan Ini</p>
            <p className="font-mono font-bold text-sm text-soil">Rp 11,2 jt</p>
          </div>
        </div>
        <div className="bg-fog rounded-lg shadow-card p-3 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-caption text-earth">Pengeluaran</p>
            <p className="font-mono font-bold text-sm text-soil">Rp 9,5 jt</p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <h2 className="font-semibold text-soil text-sm mb-3">Pengeluaran 6 Bulan</h2>
        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-end justify-between gap-2 h-32">
            {b2bAnalytics.monthlySpending.map((m) => {
              const barH = Math.round((m.spending / maxSpending) * 100)
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center">
                  <span className="text-[8px] font-mono font-semibold text-earth mb-1">
                    Rp{(m.spending / 1000000).toFixed(1)}jt
                  </span>
                  <div
                    className="w-full rounded-t-md bg-harvest transition-all duration-300"
                    style={{ height: `${barH}px` }}
                  />
                  <span className="text-[10px] font-semibold text-earth mt-1.5">{m.month}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 pt-2 border-t border-cream flex justify-between text-caption text-earth">
            <span>Bulan lalu: <span className="font-semibold text-soil">Rp 9,5 jt</span></span>
            <span className={b2bAnalytics.lastMonthChange > 0 ? 'text-red-500' : 'text-leaf'}>
              {b2bAnalytics.lastMonthChange > 0 ? '↑' : '↓'} {Math.abs(b2bAnalytics.lastMonthChange)}%
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <h2 className="font-semibold text-soil text-sm mb-3">Aksi Cepat</h2>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/b2b/pesanan-bulk')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-harvest/10 flex items-center justify-center">
                <Package size={20} className="text-harvest" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Bulk Order</p>
                <p className="text-caption text-earth">Pesan bahan baku dalam jumlah besar</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/b2b/pesanan-berulang')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                <FileText size={20} className="text-leaf" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Pesanan Berulang</p>
                <p className="text-caption text-earth">Atur pesanan rutin mingguan</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/b2b/kontrak-tani')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Kontrak Tani</p>
                <p className="text-caption text-earth">Kontrak pasokan langsung dengan petani</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>

          <button
            onClick={() => navigate('/b2b/rfq')}
            className="w-full flex items-center justify-between p-4 bg-fog rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <ClipboardList size={20} className="text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil text-sm">Ajukan RFQ</p>
                <p className="text-caption text-earth">Minta penawaran dari petani mitra</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-earth/40" />
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
