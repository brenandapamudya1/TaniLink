import type { QuickReply } from '@/types/chat'

interface ChatQuickRepliesProps {
  replies: QuickReply[]
  onSelect: (text: string) => void
}

export function ChatQuickReplies({ replies, onSelect }: ChatQuickRepliesProps) {
  if (replies.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 px-1 py-2">
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onSelect(reply.text)}
          className="px-3 py-1.5 rounded-pill border border-harvest/30 text-xs font-semibold text-harvest bg-harvest/5 hover:bg-harvest/15 transition-colors"
        >
          {reply.label}
        </button>
      ))}
    </div>
  )
}
