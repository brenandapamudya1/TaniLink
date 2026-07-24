import { PageWrapper } from '@/components/layout/PageWrapper'
import { ConversationCard } from '@/components/ui/ConversationCard'
import { conversations } from '@/data/conversations'
import { useAuth } from '@/context/AuthContext'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function InboxPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const filteredConversations = user
    ? conversations.filter((c) => c.participantIds.includes(user.email))
    : []

  return (
    <PageWrapper>
      <div className="px-4 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <h1 className="font-display text-title text-soil mt-2">
          {user ? 'Pesan' : 'Masuk untuk melihat pesan'}
        </h1>
        <p className="text-caption text-earth mt-1">
          {user ? `${filteredConversations.length} percakapan` : 'Silakan masuk terlebih dahulu'}
        </p>
      </div>

      {user ? (
        <div className="divide-y divide-cream">
          {filteredConversations.map((conv) => (
            <ConversationCard key={conv.id} conversation={conv} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4">
            <MessageCircle size={28} className="text-earth/50" />
          </div>
          <p className="text-body text-earth text-center">
            Masuk untuk mulai ngobrol dengan petani atau distributor
          </p>
        </div>
      )}
    </PageWrapper>
  )
}