export interface Product {
  id: string
  name: string
  slug: string
  category: string
  farmerId: string
  price: number
  unit: string
  stock: number
  images: string[]
  description: string
  tags: string[]
  harvestDate: string
  rating: number
  reviewCount: number
  grade?: 'A' | 'B' | 'C'
}
