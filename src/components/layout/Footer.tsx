import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-soil px-4 py-6">
      <div className="md:max-w-[480px] md:mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C16 4 8 10 8 18C8 22 11 26 16 28C21 26 24 22 24 18C24 10 16 4 16 4Z" fill="#E8A838" opacity="0.3"/>
            <path d="M16 8C16 8 10 13 10 19C10 22.5 12.5 25 16 26.5C19.5 25 22 22.5 22 19C22 13 16 8 16 8Z" fill="#E8A838"/>
            <path d="M16 12V24M12 18H20" stroke="#1C1A14" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-sans font-bold text-base text-cream">TaniLink</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
          <Link to="/tentang" className="text-caption text-cream/70 hover:text-cream transition-colors">Tentang</Link>
          <Link to="/petani" className="text-caption text-cream/70 hover:text-cream transition-colors">Petani</Link>
          <button className="text-caption text-cream/70 hover:text-cream transition-colors">Kontak</button>
          <button className="text-caption text-cream/70 hover:text-cream transition-colors">Kebijakan Privasi</button>
        </div>

        <p className="text-caption text-cream/50">&copy; 2025 TaniLink</p>
      </div>
    </footer>
  )
}
