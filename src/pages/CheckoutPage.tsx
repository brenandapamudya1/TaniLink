import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, CreditCard, Truck } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/formatPrice'

type PaymentMethod = 'transfer' | 'ewallet' | 'cod'
type ShippingMethod = 'instant' | 'regular'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('regular')
  const isProcessingRef = useRef(false)

  const shippingCost = shippingMethod === 'instant' ? 15000 : 8000
  const finalTotal = totalPrice + shippingCost

  const handleBayar = () => {
    isProcessingRef.current = true
    const orderData = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      items: items.map((item) => ({
        name: item.product.name,
        image: item.product.images[0],
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: totalPrice,
      shippingCost,
      total: finalTotal,
      paymentMethod,
      shippingMethod,
      address: {
        name: 'Budi Santoso',
        phone: '0812-3456-7890',
        address: 'Jl. Melati No. 45, RT 03/RW 07, Kel. Sukamaju, Kec. Cilandak, Jakarta Selatan, DKI Jakarta 12430',
      },
    }
    // Store order data in localStorage for receipt page
    localStorage.setItem('lastOrder', JSON.stringify(orderData))
    clearCart()
    navigate('/receipt')
  }

  if (items.length === 0 && !isProcessingRef.current) {
    navigate('/keranjang')
    return null
  }

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <h1 className="font-display text-section text-soil">Checkout</h1>
      </div>

      <div className="px-4 py-6 space-y-6 pb-32">
        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-harvest" />
            <h2 className="font-semibold text-soil text-base">Alamat Pengiriman</h2>
          </div>
          <div className="bg-cream rounded-lg p-3">
            <p className="text-soil font-semibold text-sm">Budi Santoso</p>
            <p className="text-caption text-earth mt-1">0812-3456-7890</p>
            <p className="text-body text-earth mt-2">
              Jl. Melati No. 45, RT 03/RW 07, Kel. Sukamaju, Kec. Cilandak,
              Jakarta Selatan, DKI Jakarta 12430
            </p>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <h2 className="font-semibold text-soil text-base mb-3">Pesanan</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-soil font-semibold text-sm truncate">
                    {item.product.name}
                  </p>
                  <p className="text-caption text-earth">
                    {item.quantity}x {formatPrice(item.product.price)}
                  </p>
                </div>
                <p className="font-mono text-sm font-bold text-soil">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={18} className="text-harvest" />
            <h2 className="font-semibold text-soil text-base">Metode Pembayaran</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: 'transfer' as PaymentMethod, label: 'Transfer Bank', desc: 'BCA, BNI, Mandiri, BRI' },
              { id: 'ewallet' as PaymentMethod, label: 'E-Wallet', desc: 'GoPay, OVO, Dana, ShopeePay' },
              { id: 'cod' as PaymentMethod, label: 'COD (Bayar di Tempat)', desc: 'Bayar saat barang sampai' },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                  paymentMethod === method.id
                    ? 'border-harvest bg-harvest/5'
                    : 'border-cream hover:border-harvest/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === method.id ? 'border-harvest' : 'border-earth/30'
                  }`}
                >
                  {paymentMethod === method.id && (
                    <div className="w-3 h-3 rounded-full bg-harvest" />
                  )}
                </div>
                <div>
                  <p className="text-soil font-semibold text-sm">{method.label}</p>
                  <p className="text-caption text-earth">{method.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck size={18} className="text-harvest" />
            <h2 className="font-semibold text-soil text-base">Pengiriman</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: 'regular' as ShippingMethod, label: 'Regular', desc: '2-3 hari', cost: 8000 },
              { id: 'instant' as ShippingMethod, label: 'Instant', desc: 'Hari ini sampai', cost: 15000 },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setShippingMethod(method.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                  shippingMethod === method.id
                    ? 'border-harvest bg-harvest/5'
                    : 'border-cream hover:border-harvest/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === method.id ? 'border-harvest' : 'border-earth/30'
                    }`}
                  >
                    {shippingMethod === method.id && (
                      <div className="w-3 h-3 rounded-full bg-harvest" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-soil font-semibold text-sm">{method.label}</p>
                    <p className="text-caption text-earth">{method.desc}</p>
                  </div>
                </div>
                <p className="font-mono text-sm font-bold text-soil">
                  {formatPrice(method.cost)}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <h2 className="font-semibold text-soil text-base mb-3">Ringkasan</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-earth">Subtotal</span>
              <span className="text-soil font-mono">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-earth">Ongkos Kirim</span>
              <span className="text-soil font-mono">{formatPrice(shippingCost)}</span>
            </div>
            <div className="border-t border-cream pt-2 flex justify-between">
              <span className="text-soil font-semibold">Total</span>
              <span className="font-mono text-price text-soil font-bold">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 bg-fog border-t border-cream shadow-card p-4 md:hidden z-30">
        <div className="md:max-w-[480px] md:mx-auto">
          <button
            onClick={handleBayar}
            className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            Bayar {formatPrice(finalTotal)}
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
