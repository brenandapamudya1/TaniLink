import type { Product } from '@/types/product'

export interface QuickReply {
  label: string
  text: string
}

export interface ChatLink {
  label: string
  path: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
  products?: Product[]
  quickReplies?: QuickReply[]
  links?: ChatLink[]
}
