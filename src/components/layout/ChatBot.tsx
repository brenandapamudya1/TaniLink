import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { ChatMessage, TypingIndicator } from '@/components/ui/ChatMessage'
import { sendMessage, getFallbackResponse } from '@/services/geminiService'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  sender: 'bot',
  text: 'Halo! Saya Kak Brenanda, asisten Nexira. Ada yang bisa saya bantu? Kamu bisa tanya tentang produk, petani, atau cara order!',
  timestamp: new Date(),
  quickReplies: [
    { label: 'Rekomendasi', text: 'Rekomendasi produk terlaris dong' },
    { label: 'Cara Order', text: 'Bagaimana cara order di Nexira?' },
    { label: 'Petani', text: 'Siapa saja petani di Nexira?' },
    { label: 'Sayur Murah', text: 'Sayur apa yang paling murah?' },
  ],
}

let idCounter = 0
function generateId(): string {
  idCounter++
  return `msg-${Date.now()}-${idCounter}`
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [lastQuickReplies, setLastQuickReplies] = useState(WELCOME_MESSAGE.quickReplies)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMessage: ChatMessageType = {
      id: generateId(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLastQuickReplies(undefined)
    setIsTyping(true)

    try {
      const response = await sendMessage(text.trim())

      const botMessage: ChatMessageType = {
        id: generateId(),
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        products: response.products.length > 0 ? response.products : undefined,
        links: response.links.length > 0 ? response.links : undefined,
        quickReplies: response.quickReplies.length > 0 ? response.quickReplies : undefined,
      }

      setMessages((prev) => [...prev, botMessage])
      setLastQuickReplies(response.quickReplies.length > 0 ? response.quickReplies : undefined)
    } catch {
      const fallback = getFallbackResponse()
      const errorMessage: ChatMessageType = {
        id: generateId(),
        sender: 'bot',
        text: fallback.text,
        timestamp: new Date(),
        quickReplies: fallback.quickReplies,
      }
      setMessages((prev) => [...prev, errorMessage])
      setLastQuickReplies(fallback.quickReplies)
    } finally {
      setIsTyping(false)
    }
  }, [isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const handleQuickReply = (text: string) => {
    handleSend(text)
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-[76px] right-4 z-50 w-14 h-14 rounded-full bg-harvest text-soil shadow-cta flex items-center justify-center hover:brightness-105 active:scale-95 transition-all md:bottom-6"
          aria-label="Buka chat Kak Brenanda"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-[68px] left-0 right-0 z-50 flex flex-col bg-fog border-t border-cream rounded-t-xl shadow-hero md:bottom-6 md:left-auto md:right-4 md:w-[380px] md:h-[520px] md:rounded-xl md:border md:bottom-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-cream bg-fog rounded-t-xl md:rounded-t-xl flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-harvest/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-harvest" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-soil leading-tight">Kak Brenanda</h3>
                <p className="text-[10px] text-leaf font-medium">Online</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
              aria-label="Tutup chat"
            >
              <X size={18} className="text-earth" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onQuickReply={handleQuickReply} />
            ))}

            {!isTyping && lastQuickReplies && lastQuickReplies.length > 0 && messages.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {lastQuickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.text)}
                    className="px-3 py-1.5 rounded-pill border border-harvest/30 text-xs font-semibold text-harvest bg-harvest/5 hover:bg-harvest/15 transition-colors"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-cream bg-fog flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan..."
              className="flex-1 h-10 px-4 rounded-pill bg-cream text-soil text-sm placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-harvest/30"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-harvest text-soil flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:scale-95 transition-all flex-shrink-0"
              aria-label="Kirim pesan"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={toggleChat}
        />
      )}
    </>
  )
}
