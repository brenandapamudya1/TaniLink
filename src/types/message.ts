import type { UserType } from './auth'

export interface ChatParticipant {
  id: string
  name: string
  avatar: string
  userType: UserType
}

export interface Conversation {
  id: string
  participantIds: string[]
  participant: ChatParticipant
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  lastMessageIsImage: boolean
}

export interface Message {
  id: string
  conversationId: string
  sender: ChatParticipant
  text?: string
  image?: string
  timestamp: string
}