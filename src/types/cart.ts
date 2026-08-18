import type { Product } from './product'
import type { B2BDealProduct } from './b2bDeal'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  addDeal: (deal: B2BDealProduct) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
