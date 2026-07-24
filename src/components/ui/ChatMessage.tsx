import { Link } from 'react-router-dom'
import { ChatProductCard } from '@/components/ui/ChatProductCard'
import { ChatQuickReplies } from '@/components/ui/ChatQuickReplies'
import type { ChatMessage as ChatMessageType } from '@/types/chat'
import maskotHappy from '@/assets/mascot/maskot-happy.png'
import maskotConfused from '@/assets/mascot/maskot-confused.png'

interface ChatMessageProps {
  message: ChatMessageType
  onQuickReply?: (text: string) => void
}

export function ChatMessage({ message, onQuickReply }: ChatMessageProps) {
  const isBot = message.sender === 'bot'
  const isError = isBot && message.text.startsWith('Maaf')

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 items-end gap-2`}>
      {isBot && (
        <img
          src={isError ? maskotConfused : maskotHappy}
          alt=""
          className="w-7 h-7 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div className={`max-w-[85%]`}>
        <div
          className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
            isBot
              ? 'bg-cream text-soil rounded-bl-sm'
              : 'bg-harvest text-soil rounded-br-sm'
          }`}
        >
          {message.text}
        </div>

        {message.products && message.products.length > 0 && isBot && (
          <div className="flex flex-col gap-1.5 mt-2">
            {message.products.map((product) => (
              <ChatProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {message.links && message.links.length > 0 && isBot && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="px-3 py-1.5 rounded-pill bg-leaf text-cream text-xs font-semibold hover:bg-leaf/90 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {message.quickReplies && message.quickReplies.length > 0 && onQuickReply && (
          <ChatQuickReplies replies={message.quickReplies} onSelect={onQuickReply} />
        )}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-cream rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-earth/40 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-earth/40 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-earth/40 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
