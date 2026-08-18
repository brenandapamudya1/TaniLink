import type { B2BDealProduct } from '@/types/b2bDeal'

import dealCapcay from '@/assets/b2b-deals/deal-capcay.jpg'
import dealCaesarSalad from '@/assets/b2b-deals/deal-caesar-salad.jpeg'
import dealSupJamur from '@/assets/b2b-deals/deal-sup-jamur.jpeg'
import dealNasiGoreng from '@/assets/b2b-deals/deal-nasi-goreng.jpeg'
import dealGadoGado from '@/assets/b2b-deals/deal-gado-gado.jpeg'
import dealSotoAyam from '@/assets/b2b-deals/deal-soto-ayam.jpg'

export const b2bDeals: B2BDealProduct[] = [
  {
    id: 'deal-001',
    name: 'Capcay Sayur Segar',
    description: 'Capcay dengan sayuran segar pilihan dan saus spesial, dimasak setiap pagi oleh koki kami.',
    partner: {
      id: 'b2b-001',
      name: 'Warung Sehat Group',
      type: 'restoran',
      location: 'Jakarta',
    },
    originalPrice: 28000,
    discountedPrice: 26600,
    unit: 'porsi',
    stock: 25,
    image: dealCapcay,
    rating: 4.8,
    category: 'masakan-nusantara',
  },
  {
    id: 'deal-002',
    name: 'Caesar Salad Premium',
    description: 'Selada romaine segar, crouton renyah, dan dressing caesar homemade dari UMKM lokal.',
    partner: {
      id: 'b2b-002',
      name: 'Fresh Bowl Jakarta',
      type: 'umkm',
      location: 'Jakarta',
    },
    originalPrice: 25000,
    discountedPrice: 23500,
    unit: 'porsi',
    stock: 12,
    image: dealCaesarSalad,
    rating: 4.7,
    category: 'salad',
  },
  {
    id: 'deal-003',
    name: 'Sup Jamur Truffle',
    description: 'Sup krim jamur dengan sentuhan truffle oil, hangat dan creamy untuk menemani harimu.',
    partner: {
      id: 'b2b-003',
      name: 'Dapur Nusantara',
      type: 'restoran',
      location: 'Bandung',
    },
    originalPrice: 24000,
    discountedPrice: 22800,
    unit: 'porsi',
    stock: 18,
    image: dealSupJamur,
    rating: 4.9,
    category: 'sup',
  },
  {
    id: 'deal-004',
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan topping ayam suwir, telur, dan kerupuk. Resep rahasia keluarga.',
    partner: {
      id: 'b2b-001',
      name: 'Warung Sehat Group',
      type: 'restoran',
      location: 'Jakarta',
    },
    originalPrice: 20000,
    discountedPrice: 18400,
    unit: 'porsi',
    stock: 30,
    image: dealNasiGoreng,
    rating: 4.6,
    category: 'masakan-nusantara',
  },
  {
    id: 'deal-005',
    name: 'Gado-Gado Jakarta',
    description: 'Gado-gado lengkap dengan lontong, sayuran rebus, dan bumbu kacang gurih.',
    partner: {
      id: 'b2b-003',
      name: 'Dapur Nusantara',
      type: 'restoran',
      location: 'Bandung',
    },
    originalPrice: 20000,
    discountedPrice: 18800,
    unit: 'porsi',
    stock: 22,
    image: dealGadoGado,
    rating: 4.7,
    category: 'masakan-nusantara',
  },
  {
    id: 'deal-006',
    name: 'Soto Ayam Kampung',
    description: 'Soto ayam kampung dengan kuah kuning segar, sambal, dan koya yang gurih.',
    partner: {
      id: 'b2b-004',
      name: 'Sajian Nusantara',
      type: 'catering',
      location: 'Surabaya',
    },
    originalPrice: 25000,
    discountedPrice: 23000,
    unit: 'porsi',
    stock: 15,
    image: dealSotoAyam,
    rating: 4.8,
    category: 'masakan-nusantara',
  },
]