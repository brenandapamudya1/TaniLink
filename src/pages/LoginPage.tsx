import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Sprout, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

type AuthMode = 'login' | 'register'
type UserType = 'user' | 'farmer'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('login')
  const [userType, setUserType] = useState<UserType>('user')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      mode === 'login'
        ? `Login sebagai ${userType === 'user' ? 'User' : 'Petani'} — fitur ini akan segera hadir!`
        : `Daftar sebagai ${userType === 'user' ? 'User' : 'Petani'} — fitur ini akan segera hadir!`
    )
  }

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

        <h1 className="font-display text-title text-soil mb-2">
          {mode === 'login' ? 'Masuk' : 'Daftar'}
        </h1>
        <p className="text-body text-earth mb-6">
          {mode === 'login'
            ? 'Masuk ke akun TaniLink kamu'
            : 'Buat akun TaniLink baru'}
        </p>

        <div className="bg-fog rounded-lg shadow-card p-4 mb-6">
          <p className="text-caption text-earth font-semibold mb-3">Masuk sebagai:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setUserType('user')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                userType === 'user'
                  ? 'border-harvest bg-harvest/5'
                  : 'border-cream hover:border-harvest/50'
              }`}
            >
              <User
                size={32}
                className={userType === 'user' ? 'text-harvest' : 'text-earth'}
              />
              <span
                className={`text-sm font-semibold ${
                  userType === 'user' ? 'text-soil' : 'text-earth'
                }`}
              >
                Pembeli
              </span>
              <span className="text-caption text-earth text-center">
                Belanja sayur & buah segar
              </span>
            </button>

            <button
              onClick={() => setUserType('farmer')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                userType === 'farmer'
                  ? 'border-harvest bg-harvest/5'
                  : 'border-cream hover:border-harvest/50'
              }`}
            >
              <Sprout
                size={32}
                className={userType === 'farmer' ? 'text-harvest' : 'text-earth'}
              />
              <span
                className={`text-sm font-semibold ${
                  userType === 'farmer' ? 'text-soil' : 'text-earth'
                }`}
              >
                Petani
              </span>
              <span className="text-caption text-earth text-center">
                Jual hasil panen langsung
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-fog rounded-lg shadow-card p-4 space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-soil mb-2">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                placeholder={userType === 'user' ? 'Nama kamu' : 'Nama petani'}
                className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-soil mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
              <input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-soil mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-earth hover:text-harvest transition-colors"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'register' && userType === 'farmer' && (
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-soil mb-2">
                Lokasi Kebun
              </label>
              <input
                id="location"
                type="text"
                placeholder="Contoh: Malang, Jawa Timur"
                className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            {mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-caption text-earth">
            {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
          </p>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm font-semibold text-harvest hover:underline mt-1"
          >
            {mode === 'login' ? 'Daftar sekarang' : 'Masuk di sini'}
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
