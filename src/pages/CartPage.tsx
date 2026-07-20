import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/formatPrice'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, updateQty, removeItem, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <ShoppingCart size={64} className="text-earth/30 mb-4" />
          <h1 className="font-display text-title text-soil mb-2">Keranjang Belanja</h1>
          <p className="text-body text-soil font-semibold">Keranjangmu masih kosong</p>
          <p className="text-caption text-earth mt-2 text-center">
            Yuk, mulai belanja sayur dan buah segar dari petani!
          </p>
          <div className="mt-6">
            <Link to="/produk">
              <Button label="Mulai Belanja" variant="primary" />
            </Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <h1 className="font-display text-title text-soil mb-6">Keranjang Belanja</h1>

        <div className="flex flex-col gap-3 pb-40">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-fog rounded-lg shadow-card p-3 flex gap-3"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-[60px] h-[60px] rounded-md object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-soil font-semibold text-sm truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-caption text-earth mt-0.5">
                      {formatPrice(item.product.price)} /{item.product.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
                    aria-label={`Hapus ${item.product.name}`}
                  >
                    <Trash2 size={16} className="text-earth" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded-full border border-earth flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream transition-colors"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus size={14} className="text-earth" />
                    </button>
                    <span className="text-soil font-semibold text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-8 h-8 rounded-full border border-earth flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream transition-colors"
                      aria-label="Tambah jumlah"
                    >
                      <Plus size={14} className="text-earth" />
                    </button>
                  </div>
                  <span className="font-mono text-base font-bold text-soil">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 bg-fog border-t border-cream shadow-card p-4 md:hidden z-30">
        <div className="md:max-w-[480px] md:mx-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-body text-soil font-semibold">
              Total ({totalItems} item)
            </span>
            <span className="font-mono text-price text-soil font-bold">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-caption text-earth">Ongkir</span>
            <span className="text-caption text-earth">Segera</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            Checkout
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
