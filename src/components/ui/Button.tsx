interface ButtonProps {
  label: string
  variant?: 'primary' | 'ghost' | 'dark'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const variantClass: Record<string, string> = {
  primary: 'bg-harvest text-soil shadow-cta hover:brightness-105',
  ghost:   'bg-transparent text-cream border border-cream hover:bg-cream/10',
  dark:    'bg-soil text-cream hover:bg-soil/90',
}

export function Button({ label, variant = 'primary', onClick, className = '', type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-7 py-3.5 rounded-pill font-sans font-bold text-base
        transition-all duration-150 active:scale-95
        ${variantClass[variant]} ${className}
      `}
    >
      {label}
    </button>
  )
}
