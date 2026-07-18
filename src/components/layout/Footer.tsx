import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-soil px-4 py-6">
      <div className="md:max-w-[480px] md:mx-auto">
        <div className="flex items-center mb-4">
          <img
            src="/logo_and_text.png"
            alt="TaniLink"
            className="h-10 w-auto brightness-0 invert"
          />
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
