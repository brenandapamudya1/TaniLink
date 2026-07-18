import { useState, useEffect } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    const finishTimer = setTimeout(() => {
      onFinish()
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-soil flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src="/main_logo_trans.png"
          alt="TaniLink"
          className="w-32 h-32 object-contain"
        />
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-display text-2xl text-cream font-bold">
            TaniLink
          </h1>
          <p className="text-caption text-cream/70">
            Dari kebun langsung ke tanganmu
          </p>
        </div>
      </div>
    </div>
  )
}
