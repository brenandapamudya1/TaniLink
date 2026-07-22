import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Sprout, Truck, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useAuth } from '@/context/AuthContext'
import type { UserType } from '@/types/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [userType, setUserType] = useState<UserType>('buyer')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = login(email, password, userType)
    if (success) {
      if (userType === 'farmer') {
        navigate('/dashboard-petani')
      } else if (userType === 'distributor') {
        navigate('/dashboard-distributor')
      } else if (userType === 'b2b') {
        navigate('/dashboard-b2b')
      } else {
        navigate('/')
      }
    } else {
      setError('Email atau password salah. Coba lagi.')
    }
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

        <h1 className="font-display text-title text-soil mb-2">Masuk</h1>
        <p className="text-body text-earth mb-6">
          Masuk ke akun TaniLink kamu
        </p>

          <div className="bg-fog rounded-lg shadow-card p-4 mb-6">
          <p className="text-caption text-earth font-semibold mb-3">Masuk sebagai:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setUserType('buyer')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                userType === 'buyer'
                  ? 'border-harvest bg-harvest/5'
                  : 'border-cream hover:border-harvest/50'
              }`}
            >
              <User
                size={32}
                className={userType === 'buyer' ? 'text-harvest' : 'text-earth'}
              />
              <span
                className={`text-sm font-semibold ${
                  userType === 'buyer' ? 'text-soil' : 'text-earth'
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

            <button
              onClick={() => setUserType('distributor')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                userType === 'distributor'
                  ? 'border-harvest bg-harvest/5'
                  : 'border-cream hover:border-harvest/50'
              }`}
            >
              <Truck
                size={32}
                className={userType === 'distributor' ? 'text-harvest' : 'text-earth'}
              />
              <span
                className={`text-sm font-semibold ${
                  userType === 'distributor' ? 'text-soil' : 'text-earth'
                }`}
              >
                Distributor
              </span>
              <span className="text-caption text-earth text-center">
                Antar hasil panen ke Hub
              </span>
            </button>

            <button
              onClick={() => setUserType('b2b')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                userType === 'b2b'
                  ? 'border-harvest bg-harvest/5'
                  : 'border-cream hover:border-harvest/50'
              }`}
            >
              <Building2
                size={32}
                className={userType === 'b2b' ? 'text-harvest' : 'text-earth'}
              />
              <span
                className={`text-sm font-semibold ${
                  userType === 'b2b' ? 'text-soil' : 'text-earth'
                }`}
              >
                B2B
              </span>
              <span className="text-caption text-earth text-center">
                Belanja bahan baku bisnis
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-fog rounded-lg shadow-card p-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-soil mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userType === 'buyer' ? 'pembeli@tanilink.id' : userType === 'farmer' ? 'petani@tanilink.id' : userType === 'distributor' ? 'distributor@tanilink.id' : 'b2b@tanilink.id'}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <p className="text-caption text-red-500 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 bg-cream/50 rounded-lg p-4">
          <p className="text-caption text-earth font-semibold mb-2">Demo credentials:</p>
          {userType === 'farmer' ? (
            <div className="space-y-1">
              <p className="text-caption text-soil">Email: <span className="font-mono font-semibold">petani@tanilink.id</span></p>
              <p className="text-caption text-soil">Password: <span className="font-mono font-semibold">petani123</span></p>
            </div>
          ) : userType === 'distributor' ? (
            <div className="space-y-1">
              <p className="text-caption text-soil">Email: <span className="font-mono font-semibold">distributor@tanilink.id</span></p>
              <p className="text-caption text-soil">Password: <span className="font-mono font-semibold">distributor123</span></p>
            </div>
          ) : userType === 'b2b' ? (
            <div className="space-y-1">
              <p className="text-caption text-soil">Email: <span className="font-mono font-semibold">b2b@tanilink.id</span></p>
              <p className="text-caption text-soil">Password: <span className="font-mono font-semibold">b2b123</span></p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-caption text-soil">Email: <span className="font-mono font-semibold">pembeli@tanilink.id</span></p>
              <p className="text-caption text-soil">Password: <span className="font-mono font-semibold">pembeli123</span></p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
