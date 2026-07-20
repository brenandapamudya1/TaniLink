export interface WishlistContextType {
  wishlistIds: Set<string>
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  wishlistCount: number
}
