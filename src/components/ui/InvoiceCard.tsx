import { useState } from 'react'
import { FileText, ChevronRight, X } from 'lucide-react'
import type { B2BInvoice, B2BOrderItem, B2BUnit } from '@/types/b2b'

const unitToKg: Record<B2BUnit, number> = {
  kg: 1,
  karung: 50,
  box: 20,
  ton: 1000,
}

function calcSubtotal(item: B2BOrderItem): number {
  return item.quantity * unitToKg[item.unit] * item.pricePerKg
}

function downloadInvoicePng(invoice: B2BInvoice) {
  const pad = 40
  const rowH = 32
  const headH = 48
  const w = 600
  const initH = 600

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = initH
  const ctx = canvas.getContext('2d')!
  ctx.textBaseline = 'middle'

  // --- header ---
  // bg
  ctx.fillStyle = '#F5F0E8'
  ctx.beginPath()
  ctx.roundRect(0, 0, w, initH, 12)
  ctx.fill()

  // title
  ctx.fillStyle = '#1C1A14'
  ctx.font = '600 26px Fraunces, serif'
  ctx.textAlign = 'left'
  ctx.fillText('INVOICE', pad, 52)

  ctx.font = '14px Plus Jakarta Sans, sans-serif'
  ctx.fillStyle = '#6B4E2A'
  ctx.fillText(invoice.number, pad, 80)

  // status badge
  const statusBg = invoice.status === 'lunas' ? '#2D5016' : invoice.status === 'tempo' ? '#E8A838' : '#FEE2E2'
  const statusTx = invoice.status === 'lunas' ? '#F5F0E8' : invoice.status === 'tempo' ? '#1C1A14' : '#DC2626'
  const statusLb = invoice.status === 'lunas' ? 'Lunas' : invoice.status === 'tempo' ? 'Tempo' : 'Overdue'
  ctx.fillStyle = statusBg
  ctx.beginPath()
  ctx.roundRect(w - pad - 90, 44, 90, 24, 12)
  ctx.fill()
  ctx.fillStyle = statusTx
  ctx.font = '600 12px Plus Jakarta Sans, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(statusLb, w - pad - 45, 57)

  // date
  ctx.fillStyle = '#6B4E2A'
  ctx.font = '13px Plus Jakarta Sans, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`Tanggal: ${invoice.date}`, pad, 120)
  ctx.fillText(`Jatuh Tempo: ${invoice.dueDate}`, pad, 145)
  ctx.textAlign = 'right'
  ctx.fillText(`TaniLink`, w - pad, 120)

  // --- table header ---
  const tableY = 180
  ctx.strokeStyle = '#E8A838'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(pad, tableY)
  ctx.lineTo(w - pad, tableY)
  ctx.stroke()

  const headers = ['Produk', 'Qty', 'Harga/kg', 'Subtotal']
  const hAlign: CanvasTextAlign[] = ['left', 'center', 'right', 'right']
  const hx = [pad, pad + 200, pad + 340, pad + 440]
  ctx.fillStyle = '#6B4E2A'
  ctx.font = '600 12px Plus Jakarta Sans, sans-serif'
  hAlign.forEach((a, i) => {
    ctx.textAlign = a
    ctx.fillText(headers[i], a === 'right' ? hx[i] + 100 : hx[i], tableY + headH / 2)
  })

  // --- items ---
  const yt = tableY + headH
  ctx.font = '13px Plus Jakarta Sans, sans-serif'
  ctx.strokeStyle = '#E8E3D9'
  ctx.lineWidth = 1

  let yy = yt
  invoice.items.forEach((item, idx) => {
    yy = yt + idx * rowH
    ctx.textAlign = 'left'
    ctx.fillStyle = '#1C1A14'
    ctx.fillText(item.productName, pad, yy + rowH / 2)
    ctx.textAlign = 'center'
    const weightKg = item.quantity * unitToKg[item.unit]
    ctx.fillText(`${weightKg} kg`, pad + 270, yy + rowH / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#6B4E2A'
    ctx.fillText(`Rp ${item.pricePerKg.toLocaleString('id-ID')}`, pad + 390, yy + rowH / 2)
    ctx.fillStyle = '#1C1A14'
    ctx.font = '600 13px Plus Jakarta Sans, sans-serif'
    ctx.fillText(`Rp ${calcSubtotal(item).toLocaleString('id-ID')}`, w - pad, yy + rowH / 2)
    ctx.font = '13px Plus Jakarta Sans, sans-serif'

    if (idx < invoice.items.length - 1) {
      ctx.beginPath(); ctx.moveTo(pad, yy + rowH); ctx.lineTo(w - pad, yy + rowH); ctx.stroke()
    }
  })

  // --- totals ---
  const ty = yy + rowH + 12
  const totalLines = [
    { label: 'Subtotal', value: invoice.subtotal, bold: false, color: '#6B4E2A' },
    { label: 'Pajak (10%)', value: invoice.tax, bold: false, color: '#6B4E2A' },
  ]
  totalLines.forEach((line, i) => {
    const ly = ty + i * 28
    ctx.textAlign = 'left'
    ctx.fillStyle = line.color
    ctx.font = line.bold ? '700 13px Plus Jakarta Sans, sans-serif' : '13px Plus Jakarta Sans, sans-serif'
    ctx.fillText(line.label, pad + 380, ly + 14)
    ctx.textAlign = 'right'
    ctx.fillText(`Rp ${line.value.toLocaleString('id-ID')}`, w - pad, ly + 14)
  })

  // separator
  const sepY = ty + totalLines.length * 28
  ctx.strokeStyle = '#1C1A14'
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(pad + 380, sepY); ctx.lineTo(w - pad, sepY); ctx.stroke()

  // total
  ctx.textAlign = 'left'
  ctx.fillStyle = '#1C1A14'
  ctx.font = '700 14px Plus Jakarta Sans, sans-serif'
  ctx.fillText('Total', pad + 380, sepY + 20)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#E8A838'
  ctx.font = '700 16px Plus Jakarta Sans, sans-serif'
  ctx.fillText(`Rp ${invoice.total.toLocaleString('id-ID')}`, w - pad, sepY + 20)

  // --- footer ---
  const fty = sepY + 60
  ctx.textAlign = 'center'
  ctx.fillStyle = '#6B4E2A'
  ctx.font = '11px Plus Jakarta Sans, sans-serif'
  ctx.fillText('Terima kasih telah berbelanja di TaniLink', w / 2, fty)
  ctx.fillText('www.tanilink.id', w / 2, fty + 18)

  // --- export ---
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${invoice.number}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 'image/png')
}

interface InvoiceCardProps {
  invoice: B2BInvoice
}

const statusColors: Record<string, string> = {
  lunas: 'bg-leaf/10 text-leaf',
  tempo: 'bg-harvest/10 text-harvest',
  overdue: 'bg-red-100 text-red-600',
}

const statusLabels: Record<string, string> = {
  lunas: 'Lunas',
  tempo: 'Tempo',
  overdue: 'Overdue',
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowDetail(true)}
        className="w-full bg-fog rounded-lg shadow-card p-4 text-left hover:shadow-card-hover transition-shadow"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-harvest" />
            <span className="font-mono font-bold text-sm text-soil">{invoice.number}</span>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${statusColors[invoice.status]}`}>
            {statusLabels[invoice.status]}
          </span>
        </div>

        <div className="flex items-center justify-between text-caption">
          <span className="text-earth">{invoice.date} · {invoice.items.length} item</span>
          <div className="flex items-center gap-1">
            <span className="font-mono font-bold text-sm text-soil">Rp {invoice.total.toLocaleString('id-ID')}</span>
            <ChevronRight size={14} className="text-earth/40" />
          </div>
        </div>
      </button>

      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-soil/50" onClick={() => setShowDetail(false)} />
          <div className="relative bg-fog rounded-t-xl w-full max-w-[430px] max-h-[80vh] overflow-y-auto shadow-hero pb-safe">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-earth/20" />
            </div>
            <div className="flex items-center justify-between px-4 pb-3 border-b border-cream">
              <h3 className="font-semibold text-soil text-base">Detail Invoice</h3>
              <button
                onClick={() => setShowDetail(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
                aria-label="Tutup"
              >
                <X size={18} className="text-earth" />
              </button>
            </div>

            <div className="px-4 py-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-caption">
                  <span className="text-earth">No. Invoice</span>
                  <span className="font-mono font-semibold text-soil">{invoice.number}</span>
                </div>
                <div className="flex items-center justify-between text-caption">
                  <span className="text-earth">Tanggal</span>
                  <span className="font-semibold text-soil">{invoice.date}</span>
                </div>
                <div className="flex items-center justify-between text-caption">
                  <span className="text-earth">Jatuh Tempo</span>
                  <span className="font-semibold text-soil">{invoice.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-caption">
                  <span className="text-earth">Status</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${statusColors[invoice.status]}`}>
                    {statusLabels[invoice.status]}
                  </span>
                </div>
              </div>

              <div className="border-t border-cream pt-3">
                <h4 className="font-semibold text-soil text-sm mb-2">Item</h4>
                <div className="space-y-2">
                  {invoice.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-caption">
                      <span className="text-earth">{item.productName}</span>
                      <span className="font-semibold text-soil">
                        {item.quantity} {item.unit} ({item.quantity * unitToKg[item.unit]} kg) × Rp{item.pricePerKg.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-cream pt-3 space-y-1.5">
                <div className="flex justify-between text-caption">
                  <span className="text-earth">Subtotal</span>
                  <span className="font-semibold text-soil">Rp {invoice.subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-caption">
                  <span className="text-earth">Pajak (10%)</span>
                  <span className="font-semibold text-soil">Rp {invoice.tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-cream">
                  <span className="font-semibold text-soil">Total</span>
                  <span className="font-mono font-bold text-harvest">Rp {invoice.total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={() => downloadInvoicePng(invoice)}
                className="w-full py-3 rounded-pill bg-harvest text-soil font-bold text-sm shadow-cta hover:brightness-105 active:scale-95 transition-all"
              >
                Unduh PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
