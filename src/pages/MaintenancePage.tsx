/**
 * MaintenancePage — Halaman maintenance saat website di-pause
 */
export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full space-y-4">
        <p className="text-soil text-base sm:text-lg font-medium leading-relaxed">
          sorry the website is currently on maintenance
        </p>
        <p className="text-soil text-sm sm:text-base leading-relaxed">
          if you have something please call to this number :{' '}
          <a
            href="tel:08122836095"
            className="font-semibold underline hover:text-earth transition-colors"
          >
            08122836095
          </a>{' '}
          (Brenanda), thank youu ^_^
        </p>
      </div>
    </main>
  )
}
