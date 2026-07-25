import type { Message } from '@/types/message'
import productTomat from '@/assets/products/product-tomat.jpg'
import productBerasMerah from '@/assets/products/product-beras-merah.jpeg'

const buyer = {
  id: 'pembeli@nexira.id',
  name: 'Pembeli',
  avatar: 'icon:user-circle',
  userType: 'buyer' as const,
}

const pakAmin = {
  id: 'farmer-001',
  name: 'Pak Amin Suryadi',
  avatar: 'icon:user-circle',
  userType: 'farmer' as const,
}

const buSari = {
  id: 'farmer-002',
  name: 'Bu Sari Dewi',
  avatar: 'icon:user-circle',
  userType: 'farmer' as const,
}

const distributor = {
  id: 'distributor-001',
  name: 'Agus Logistics',
  avatar: 'icon:user-circle',
  userType: 'distributor' as const,
}

const buHasnah = {
  id: 'farmer-005',
  name: 'Bu Hasnah Rahman',
  avatar: 'icon:user-circle',
  userType: 'farmer' as const,
}

const pakWayan = {
  id: 'farmer-003',
  name: 'Pak Wayan Putra',
  avatar: 'icon:user-circle',
  userType: 'farmer' as const,
}

const b2b = {
  id: 'b2b-001',
  name: 'Warung Sehat Group',
  avatar: 'icon:user-circle',
  userType: 'b2b' as const,
}

export const messages: Message[] = [
  {
    id: 'msg-001-1',
    conversationId: 'conv-001',
    sender: buyer,
    text: 'Pak Amin, stok bayam organik masih ada?',
    timestamp: '10:15',
  },
  {
    id: 'msg-001-2',
    conversationId: 'conv-001',
    sender: pakAmin,
    text: 'Masih ada, mau berapa paket?',
    timestamp: '10:20',
  },
  {
    id: 'msg-001-3',
    conversationId: 'conv-001',
    sender: buyer,
    text: '5 paket saja, bisa dikirim hari ini?',
    timestamp: '10:25',
  },
  {
    id: 'msg-001-4',
    conversationId: 'conv-001',
    sender: pakAmin,
    text: 'Baik, nanti saya siapkan ya',
    timestamp: '10:32',
  },

  {
    id: 'msg-002-1',
    conversationId: 'conv-002',
    sender: buyer,
    text: 'Bu Sari, tomat cherry nya masih segar?',
    timestamp: '09:00',
  },
  {
    id: 'msg-002-2',
    conversationId: 'conv-002',
    sender: buSari,
    text: 'Ini foto tomat cherry panen hari ini',
    timestamp: '09:15',
    image: productTomat,
  },
  {
    id: 'msg-002-3',
    conversationId: 'conv-002',
    sender: buyer,
    text: 'Wah segar sekali! Mau pesan 2 kg',
    timestamp: '09:30',
  },

  {
    id: 'msg-003-1',
    conversationId: 'conv-003',
    sender: pakAmin,
    text: 'Mas Agus, besok bisa ambil barang dari kebun saya?',
    timestamp: '14:00',
  },
  {
    id: 'msg-003-2',
    conversationId: 'conv-003',
    sender: distributor,
    text: 'Bisa, jam berapa siapnya?',
    timestamp: '14:30',
  },
  {
    id: 'msg-003-3',
    conversationId: 'conv-003',
    sender: pakAmin,
    text: 'Jam 8 pagi sudah siap',
    timestamp: '14:45',
  },
  {
    id: 'msg-003-4',
    conversationId: 'conv-003',
    sender: distributor,
    text: 'Baik, jadwal pengambilan hari Kamis jam 8 pagi',
    timestamp: '15:00',
  },

  {
    id: 'msg-004-1',
    conversationId: 'conv-004',
    sender: buyer,
    text: 'Bu Hasnah, ada ubi ungu?',
    timestamp: '11:00',
  },
  {
    id: 'msg-004-2',
    conversationId: 'conv-004',
    sender: buHasnah,
    text: 'Untuk ubi ungu sedang panen raya, stok banyak',
    timestamp: '11:30',
  },

  {
    id: 'msg-005-1',
    conversationId: 'conv-005',
    sender: pakWayan,
    text: 'Foto kemasan beras merah terbaru',
    timestamp: '08:00',
    image: productBerasMerah,
  },
  {
    id: 'msg-005-2',
    conversationId: 'conv-005',
    sender: buyer,
    text: 'Kemasan bagus, berapa harga per kg?',
    timestamp: '08:30',
  },
  {
    id: 'msg-005-3',
    conversationId: 'conv-005',
    sender: pakWayan,
    text: 'Rp 25.000 per kg, minimum order 5 kg',
    timestamp: '09:00',
  },

  {
    id: 'msg-006-1',
    conversationId: 'conv-006',
    sender: b2b,
    text: 'Mau pesan tomat 50 kg untuk warung kami',
    timestamp: '16:00',
  },
  {
    id: 'msg-006-2',
    conversationId: 'conv-006',
    sender: buyer,
    text: 'Baik, kami siapkan besok',
    timestamp: '16:30',
  },
  {
    id: 'msg-006-3',
    conversationId: 'conv-006',
    sender: b2b,
    text: 'Konfirmasi, pesanan 50 kg tomat akan dikirim besok',
    timestamp: '17:00',
  },
]