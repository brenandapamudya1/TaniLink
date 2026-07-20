import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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

function drawReceipt(ctx: CanvasRenderingContext2D, order: ReceiptData) {
  const width = 600
  const height = 900
  const padding = 40
  const lineHeight = 22
  let y = 0

  const items = order.items

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#1C1A14'
  ctx.fillRect(0, 0, width, 80)

  ctx.fillStyle = '#F5F0E8'
  ctx.font = 'bold 28px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('TaniLink', width / 2, 38)

  ctx.font = '13px sans-serif'
  ctx.fillStyle = '#F5F0E8'
  ctx.fillText('Bukti Pembayaran', width / 2, 62)

  y = 110

  ctx.fillStyle = '#2D5016'
  ctx.beginPath()
  ctx.arc(width / 2, y + 16, 16, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#F5F0E8'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('✓', width / 2, y + 22)

  y += 48
  ctx.fillStyle = '#1C1A14'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('Pembayaran Berhasil!', width / 2, y)

  y += 30
  ctx.strokeStyle = '#F5F0E8'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(padding, y)
  ctx.lineTo(width - padding, y)
  ctx.stroke()
  ctx.setLineDash([])

  y += 24

  ctx.textAlign = 'left'
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#6B4E2A'
  ctx.fillText('No. Pesanan', padding, y)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#1C1A14'
  ctx.font = 'bold 12px sans-serif'
  ctx.fillText(order.orderId, width - padding, y)

  y += lineHeight
  ctx.textAlign = 'left'
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#6B4E2A'
  ctx.fillText('Tanggal', padding, y)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#1C1A14'
  ctx.font = '12px sans-serif'
  ctx.fillText(
    new Date(order.date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    width - padding,
    y
  )

  y += lineHeight + 8
  ctx.textAlign = 'left'
  ctx.fillStyle = '#6B4E2A'
  ctx.font = '12px sans-serif'
  ctx.fillText('Pembayaran', padding, y)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#1C1A14'
  ctx.fillText(paymentLabels[order.paymentMethod] ?? order.paymentMethod, width - padding, y)

  y += lineHeight + 8
  ctx.textAlign = 'left'
  ctx.fillStyle = '#6B4E2A'
  ctx.fillText('Pengiriman', padding, y)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#1C1A14'
  ctx.fillText(shippingLabels[order.shippingMethod] ?? order.shippingMethod, width - padding, y)

  y += lineHeight + 8
  ctx.textAlign = 'left'
  ctx.fillStyle = '#6B4E2A'
  ctx.fillText('Dikirim ke', padding, y)
  y += lineHeight
  ctx.fillStyle = '#1C1A14'
  ctx.font = 'bold 12px sans-serif'
  ctx.fillText(`${order.address.name} (${order.address.phone})`, padding, y)
  y += lineHeight
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#6B4E2A'
  const addrWords = order.address.address.split(' ')
  let addrLine = ''
  for (const word of addrWords) {
    if ((addrLine + ' ' + word).length > 55) {
      ctx.fillText(addrLine.trim(), padding, y)
      y += lineHeight
      addrLine = word
    } else {
      addrLine += ' ' + word
    }
  }
  if (addrLine.trim()) {
    ctx.fillText(addrLine.trim(), padding, y)
  }

  y += lineHeight + 12
  ctx.strokeStyle = '#F5F0E8'
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(padding, y)
  ctx.lineTo(width - padding, y)
  ctx.stroke()
  ctx.setLineDash([])

  y += 20
  ctx.textAlign = 'left'
  ctx.fillStyle = '#1C1A14'
  ctx.font = 'bold 13px sans-serif'
  ctx.fillText('Pesanan', padding, y)
  ctx.textAlign = 'right'
  ctx.fillText('Total', width - padding, y)

  y += 8
  ctx.strokeStyle = '#F5F0E8'
  ctx.setLineDash([2, 2])
  ctx.beginPath()
  ctx.moveTo(padding, y)
  ctx.lineTo(width - padding, y)
  ctx.stroke()
  ctx.setLineDash([])

  y += 16
  for (const item of items) {
    ctx.textAlign = 'left'
    ctx.fillStyle = '#1C1A14'
    ctx.font = '12px sans-serif'
    const itemName = item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name
    ctx.fillText(`${item.quantity}x ${itemName}`, padding, y)
    ctx.textAlign = 'right'
    ctx.font = 'bold 12px sans-serif'
    ctx.fillText(formatPrice(item.price * item.quantity), width - padding, y)
    y += lineHeight + 8
  }

  y += 4
  ctx.strokeStyle = '#F5F0E8'
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(padding, y)
  ctx.lineTo(width - padding, y)
  ctx.stroke()
  ctx.setLineDash([])

  y += 20
  ctx.textAlign = 'left'
  ctx.fillStyle = '#6B4E2A'
  ctx.font = '12px sans-serif'
  ctx.fillText('Subtotal', padding, y)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#1C1A14'
  ctx.font = '12px sans-serif'
  ctx.fillText(formatPrice(order.subtotal), width - padding, y)

  y += lineHeight
  ctx.textAlign = 'left'
  ctx.fillStyle = '#6B4E2A'
  ctx.fillText('Ongkos Kirim', padding, y)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#1C1A14'
  ctx.fillText(formatPrice(order.shippingCost), width - padding, y)

  y += lineHeight + 8
  ctx.strokeStyle = '#1C1A14'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(padding, y)
  ctx.lineTo(width - padding, y)
  ctx.stroke()

  y += 24
  ctx.textAlign = 'left'
  ctx.fillStyle = '#1C1A14'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('TOTAL', padding, y)
  ctx.textAlign = 'right'
  ctx.fillText(formatPrice(order.total), width - padding, y)

  y += 36
  ctx.textAlign = 'center'
  ctx.fillStyle = '#6B4E2A'
  ctx.font = '11px sans-serif'
  ctx.fillText('Terima kasih telah berbelanja di TaniLink!', width / 2, y)
  y += lineHeight
  ctx.fillText('dari kebun langsung ke tanganmu', width / 2, y)
}

export default function ReceiptPage() {
  const navigate = useNavigate()
  const [order, setOrder] = useState<ReceiptData | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder')
    if (storedOrder) {
      try {
        setOrder(JSON.parse(storedOrder))
      } catch {
        navigate('/pesanan', { replace: true })
      }
    } else {
      navigate('/pesanan', { replace: true })
    }
  }, [navigate])

  const handleDownloadReceipt = useCallback(() => {
    if (!order) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawReceipt(ctx, order)

    const link = document.createElement('a')
    link.download = `struk-${order.orderId}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }, [order])

  if (!order) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-caption text-earth">Memuat...</p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <canvas ref={canvasRef} width={600} height={900} className="hidden" />

      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center gap-3">
        <button
          onClick={() => navigate('/pesanan')}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <h1 className="font-display text-section text-soil">Bukti Pembayaran</h1>
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

        <button
          onClick={handleDownloadReceipt}
          className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Unduh Bukti Pembayaran
        </button>
      </div>
    </PageWrapper>
  )
}
