import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { EarningsSummary } from '@/components/ui/EarningsSummary'
import { recentEarnings } from '@/data/distributorEarnings'

export default function DistributorEarningsPage() {
  const navigate = useNavigate()

  const totalThisMonth = recentEarnings
    .filter((e) => e.date.startsWith('2026-07'))
    .reduce((sum, e) => sum + e.total, 0)

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

        <h1 className="font-display text-title text-soil mb-1">Pendapatan</h1>
        <p className="text-body text-earth mb-6">Pendapatan Distributor</p>

        <div className="mb-6">
          <EarningsSummary
            pickupFee={150000}
            deliveryFee={100000}
            performanceBonus={25000}
            qualityBonus={20000}
            total={totalThisMonth}
          />
        </div>

        <h2 className="font-semibold text-soil text-sm mb-3">Riwayat Transaksi</h2>

        <div className="space-y-3">
          {recentEarnings.map((earning) => (
            <div key={earning.id} className="bg-fog rounded-lg shadow-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-soil">#{earning.taskRef}</span>
                <span className="text-caption text-earth">{earning.date}</span>
              </div>
              <div className="space-y-1 text-caption text-earth">
                <div className="flex justify-between">
                  <span>Pickup Fee</span>
                  <span className="font-semibold text-soil">Rp {earning.pickupFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-soil">Rp {earning.deliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Performance Bonus</span>
                  <span className="font-semibold text-soil">Rp {earning.performanceBonus.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality Bonus</span>
                  <span className="font-semibold text-soil">Rp {earning.qualityBonus.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-cream flex justify-between">
                <span className="font-semibold text-soil text-sm">Total</span>
                <span className="font-mono font-bold text-sm text-harvest">Rp {earning.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
