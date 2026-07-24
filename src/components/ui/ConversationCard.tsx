import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'
import type { Conversation } from '@/types/message'

interface ConversationCardProps {
  conversation: Conversation
}

export function ConversationCard({ conversation }: ConversationCardProps) {
  return (
    <Link
      to={`/inbox/${conversation.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-cream/50 transition-colors"
    >
      <div className="relative flex-shrink-0">
        {conversation.participant.avatar === 'icon:user-circle' ? (
          <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center">
            <UserCircle size={36} className="text-earth/50" />
          </div>
        ) : (
          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.name}
            className="w-12 h-12 rounded-full object-cover bg-cream"
          />
        )}
        {conversation.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-harvest text-soil text-[10px] font-bold flex items-center justify-center px-1">
            {conversation.unreadCount}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-soil text-sm truncate">
            {conversation.participant.name}
          </h3>
          <span className="text-[11px] text-earth/60 flex-shrink-0 ml-2">
            {conversation.lastMessageTime}
          </span>
        </div>
        <p className={`text-caption truncate mt-0.5 ${conversation.unreadCount > 0 ? 'text-soil font-medium' : 'text-earth'}`}>
          {conversation.lastMessage}
        </p>
      </div>
    </Link>
  )
}