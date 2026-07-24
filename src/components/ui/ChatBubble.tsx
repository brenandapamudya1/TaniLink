import type { Message } from '@/types/message'

interface ChatBubbleProps {
  message: Message
  isOwn: boolean
}

export function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] ${
          isOwn
            ? 'bg-harvest text-soil rounded-2xl rounded-br-sm'
            : 'bg-cream text-soil rounded-2xl rounded-bl-sm'
        } px-4 py-2.5`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="gambar chat"
            className="rounded-lg mb-2 w-full object-cover max-h-48"
          />
        )}
        {message.text && (
          <p className="text-sm leading-relaxed">{message.text}</p>
        )}
        <span className={`text-[10px] mt-1 block ${isOwn ? 'text-soil/60' : 'text-earth/60'}`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}