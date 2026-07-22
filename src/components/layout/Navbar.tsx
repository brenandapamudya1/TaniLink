import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, MessageCircle, User } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isB2B = user?.userType === 'b2b'

  return (
    <nav
      className={`
        sticky top-0 z-50 h-14 bg-fog flex items-center justify-between px-4
        transition-shadow duration-200
        ${scrolled ? 'shadow-card' : ''}
      `}
    >
      <Link to="/" className="flex items-center" aria-label="TaniLink beranda">
        <img
          src="/logo_and_text.png"
          alt="TaniLink"
          className="h-12 w-auto"
        />
      </Link>

      <div className="flex items-center gap-3">
        {isB2B ? (
          <>
            <Link
              to="/profil"
              className="flex items-center gap-2 px-3 py-1.5 rounded-pill bg-harvest/10 text-harvest font-semibold text-sm hover:bg-harvest/20 transition-colors"
            >
              <User size={16} />
              <span className="max-w-[100px] truncate">{user?.businessName || user?.name}</span>
            </Link>
            <Link to="/profil" className="relative" aria-label="Pesan">
              <MessageCircle size={22} className="text-soil" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-semibold text-soil hover:text-harvest transition-colors">
              Masuk
            </Link>
            <Link to="/keranjang" className="relative" aria-label="Keranjang belanja">
              <ShoppingCart size={22} className="text-soil" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] rounded-full bg-harvest text-soil text-[10px] font-bold flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
