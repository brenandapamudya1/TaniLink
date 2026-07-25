import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, UserCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ChatBubble } from '@/components/ui/ChatBubble'
import { ChatInput } from '@/components/ui/ChatInput'
import { conversations } from '@/data/conversations'
import { messages } from '@/data/messages'
import { useAuth } from '@/context/AuthContext'
import type { Message } from '@/types/message'

export default function ConversationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const conversation = conversations.find((c) => c.id === id) || 
    conversations.find((c) => c.participant.id === id)

  useEffect(() => {
    if (id) {
      setChatMessages(messages.filter((m) => m.conversationId === id))
    }
  }, [id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  if (!conversation) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="font-display text-title text-soil">Percakapan Tidak Ditemukan</h1>
          <button onClick={() => navigate('/inbox')} className="text-sm text-harvest mt-4 underline">
            Kembali ke Inbox
          </button>
        </div>
      </PageWrapper>
    )
  }

  const senderId = user?.email || 'pembeli@nexira.id'

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: id!,
      sender: {
        id: senderId,
        name: user?.name || 'Pembeli',
        avatar: 'icon:user-circle',
        userType: user?.userType || 'buyer',
      },
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }
    setChatMessages((prev) => [...prev, newMessage])
  }

  return (
    <PageWrapper>
      <div className="sticky top-0 z-40 bg-fog border-b border-cream flex items-center gap-3 px-4 h-14">
        <button onClick={() => navigate('/inbox')} aria-label="Kembali" className="flex-shrink-0">
          <ArrowLeft size={20} className="text-soil" />
        </button>
        {conversation.participant.avatar === 'icon:user-circle' ? (
          <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center">
            <UserCircle size={24} className="text-earth/50" />
          </div>
        ) : (
          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.name}
            className="w-9 h-9 rounded-full object-cover bg-cream"
          />
        )}
        <div className="min-w-0 flex-1">
          <h1 className="font-semibold text-soil text-sm truncate">{conversation.participant.name}</h1>
          <p className="text-[11px] text-earth/60 truncate">{conversation.participant.userType}</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3 min-h-[calc(100vh-180px)]">
        {chatMessages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} isOwn={msg.sender.id === senderId} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </PageWrapper>
  )
}