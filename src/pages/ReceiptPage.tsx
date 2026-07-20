import { useNavigate, useLocation, Link } from 'react-router-dom'
import { CheckCircle, Package, ArrowLeft, MapPin, CreditCard, Truck, Download } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { formatPrice } from '@/utils/formatPrice'

interface ReceiptItem {
  name: string
  image: string
  quantity: number
  price: number
}

interface ReceiptData {
  orderId: string
  date: string
  items: ReceiptItem[]
  subtotal: number
  shippingCost: number
  total: number
  paymentMethod: string
  shippingMethod: string
  address: {
    name: string
    phone: string
    address: string
  }
}

const paymentLabels: Record<string, string> = {
  transfer: 'Transfer Bank',
  ewallet: 'E-Wallet',
  cod: 'COD (Bayar di Tempat)',
}

const shippingLabels: Record<string, string> = {
  regular: 'Regular (2-3 hari)',
  instant: 'Instant (Hari ini sampai)',
}

export default function ReceiptPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const order = (location.state as { order?: ReceiptData })?.order

  if (!order) {
    navigate('/pesanan')
    return null
  }

  const handleDownloadReceipt = () => {
    alert('Download receipt (dummy)')
  }

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/pesanan')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} className="text-soil" />
          </button>
          <h1 className="font-display text-section text-soil">Bukti Pembayaran</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="bg-leaf/10 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-leaf flex items-center justify-center mb-3">
            <CheckCircle size={32} className="text-cream" />
          </div>
          <h2 className="font-display text-section text-soil mb-1">Pembayaran Berhasil!</h2>
          <p className="text-caption text-earth">
            Pesananmu sedang diproses oleh petani
          </p>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-caption text-earth">No. Pesanan</p>
              <p className="text-soil font-bold text-sm">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-caption text-earth">Tanggal</p>
              <p className="text-soil text-sm">
                {new Date(order.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-harvest" />
            <h2 className="font-semibold text-soil text-base">Dikirim ke</h2>
          </div>
          <div className="bg-cream rounded-lg p-3">
            <p className="text-soil font-semibold text-sm">{order.address.name}</p>
            <p className="text-caption text-earth mt-1">{order.address.phone}</p>
            <p className="text-body text-earth mt-2">{order.address.address}</p>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} className="text-harvest" />
            <h2 className="font-semibold text-soil text-base">Pesanan</h2>
          </div>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-soil font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-caption text-earth">
                    {item.quantity}x {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-mono text-sm font-bold text-soil">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <h2 className="font-semibold text-soil text-base mb-3">Ringkasan Pembayaran</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-earth">Subtotal</span>
              <span className="text-soil font-mono">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-earth">Ongkos Kirim</span>
              <span className="text-soil font-mono">{formatPrice(order.shippingCost)}</span>
            </div>
            <div className="border-t border-cream pt-2 flex justify-between">
              <span className="text-soil font-semibold">Total</span>
              <span className="font-mono text-price text-soil font-bold">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-harvest flex-shrink-0" />
              <div>
                <p className="text-caption text-earth">Metode Pembayaran</p>
                <p className="text-soil font-semibold text-sm">
                  {paymentLabels[order.paymentMethod] ?? order.paymentMethod}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-harvest flex-shrink-0" />
              <div>
                <p className="text-caption text-earth">Pengiriman</p>
                <p className="text-soil font-semibold text-sm">
                  {shippingLabels[order.shippingMethod] ?? order.shippingMethod}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 py-3 rounded-pill border-2 border-harvest text-harvest font-bold text-sm hover:bg-harvest/5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Unduh Bukti
          </button>
          <Link to="/pesanan">
            <button className="flex-1 py-3 rounded-pill bg-harvest text-soil font-bold text-sm shadow-cta hover:brightness-105 active:scale-95 transition-all">
              Lacak Pesanan
            </button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
