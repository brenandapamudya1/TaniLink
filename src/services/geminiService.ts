import type { Product } from '@/types/product'
import { products } from '@/data/products'

export interface GeminiResponse {
  text: string
  products: Product[]
  links: { label: string; path: string }[]
  quickReplies: { label: string; text: string }[]
}

function parseResponse(text: string): GeminiResponse {
  const extractedProducts: Product[] = []
  const links: { label: string; path: string }[] = []
  const quickReplies: { label: string; text: string }[] = []

  const idRegex = /\[ID:\s*(prod-\d+)\]/g
  let match: RegExpExecArray | null
  while ((match = idRegex.exec(text)) !== null) {
    const product = products.find((p) => p.id === match![1])
    if (product) {
      extractedProducts.push(product)
    }
  }
  text = text.replace(/\[ID:\s*prod-\d+\]/g, '').trim()

  const linkRegex = /\[LINK:\s*([^\]|]+)\|([^\]]+)\]/g
  while ((match = linkRegex.exec(text)) !== null) {
    links.push({ path: match![1], label: match![2] })
  }
  text = text.replace(/\[LINK:\s*[^\]]+\]/g, '').trim()

  const quickRegex = /\[QUICK:\s*([^\]]+)\]/
  const quickMatch = quickRegex.exec(text)
  if (quickMatch) {
    const pairs = quickMatch[1].split(',').map((s) => s.trim())
    for (const pair of pairs) {
      const [label, replyText] = pair.split('|').map((s) => s.trim())
      if (label && replyText) {
        quickReplies.push({ label, text: replyText })
      }
    }
    text = text.replace(quickRegex, '').trim()
  }

  return { text, products: extractedProducts, links, quickReplies }
}

export async function sendMessage(
  userMessage: string
): Promise<GeminiResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  const { text } = await response.json()
  return parseResponse(text)
}

export function getFallbackResponse(): GeminiResponse {
  return {
    text: 'Maaf, sepertinya ada gangguan. Coba lagi ya! Atau kamu bisa tanya saya tentang:\n\n- Rekomendasi produk\n- Info petani\n- Cara order\n- Pengiriman & pembayaran',
    products: [],
    links: [],
    quickReplies: [
      { label: 'Rekomendasi', text: 'Rekomendasi produk terlaris' },
      { label: 'Cara Order', text: 'Bagaimana cara order di Nexira?' },
      { label: 'Petani', text: 'Siapa saja petani di Nexira?' },
      { label: 'Bantuan', text: 'Saya butuh bantuan' },
    ],
  }
}
