import { useState } from 'react'
import { Send, ImagePlus } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim())
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-fog border-t border-cream">
      <button
        className="w-9 h-9 rounded-full flex items-center justify-center text-earth hover:text-harvest transition-colors"
        aria-label="Kirim gambar"
      >
        <ImagePlus size={20} />
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ketik pesan..."
        className="flex-1 h-10 px-4 rounded-pill bg-cream text-soil text-sm placeholder:text-earth/50 outline-none focus:ring-2 focus:ring-harvest/40"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="w-9 h-9 rounded-full bg-harvest flex items-center justify-center text-soil disabled:opacity-40 hover:bg-harvest/80 transition-colors"
        aria-label="Kirim pesan"
      >
        <Send size={16} />
      </button>
    </div>
  )
}