import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        sticky top-0 z-50 h-14 bg-fog flex items-center justify-between px-4
        transition-shadow duration-200
        ${scrolled ? 'shadow-card' : ''}
      `}
    >
      <Link to="/" className="flex items-center gap-2" aria-label="TaniLink beranda">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:hidden">
          <path d="M16 4C16 4 8 10 8 18C8 22 11 26 16 28C21 26 24 22 24 18C24 10 16 4 16 4Z" fill="#E8A838" opacity="0.3"/>
          <path d="M16 8C16 8 10 13 10 19C10 22.5 12.5 25 16 26.5C19.5 25 22 22.5 22 19C22 13 16 8 16 8Z" fill="#E8A838"/>
          <path d="M16 12V24M12 18H20" stroke="#1C1A14" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        <div className="hidden md:flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C16 4 8 10 8 18C8 22 11 26 16 28C21 26 24 22 24 18C24 10 16 4 16 4Z" fill="#E8A838" opacity="0.3"/>
            <path d="M16 8C16 8 10 13 10 19C10 22.5 12.5 25 16 26.5C19.5 25 22 22.5 22 19C22 13 16 8 16 8Z" fill="#E8A838"/>
            <path d="M16 12V24M12 18H20" stroke="#1C1A14" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-sans font-bold text-lg text-soil">TaniLink</span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <button className="text-sm font-semibold text-soil hover:text-harvest transition-colors">
          Masuk
        </button>

        <Link to="/keranjang" className="relative" aria-label="Keranjang belanja">
          <ShoppingCart size={22} className="text-soil" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] rounded-full bg-harvest text-soil text-[10px] font-bold flex items-center justify-center px-1">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
