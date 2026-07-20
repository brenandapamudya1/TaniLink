import type { Farmer } from '@/types/farmer'

import farmerAminAvatar from '@/assets/farmers/farmer-amin.jpeg'
import farmerSariAvatar from '@/assets/farmers/farmer-sari.jpeg'
import farmerWayanAvatar from '@/assets/farmers/farmer-wayan.jpeg'
import farmerTogasAvatar from '@/assets/farmers/farmer-togas.jpeg'
import farmerHasnahAvatar from '@/assets/farmers/farmer-hasnah.jpg'
import coverAmin from '@/assets/farmers/cover-amin.jpeg'
import coverSari from '@/assets/farmers/cover-sari.jpeg'
import coverWayan from '@/assets/farmers/cover-wayan.jpeg'
import coverTogas from '@/assets/farmers/cover-togas.jpeg'
import coverHasnah from '@/assets/farmers/cover-hasnah.jpeg'

export const farmers: Farmer[] = [
  {
    id: 'farmer-001',
    name: 'Pak Amin Suryadi',
    slug: 'pak-amin-suryadi',
    location: 'Malang, Jawa Timur',
    avatar: farmerAminAvatar,
    coverImage: coverAmin,
    bio: 'Petani sayur organik generasi kedua. Mengelola lahan 2 hektar di lereng Arjuno dengan metode tanam rotasi.',
    since: '2021',
    productCount: 12,
    rating: 4.8,
    speciality: ['Sayur Daun', 'Organik'],
    verified: true,
  },
  {
    id: 'farmer-002',
    name: 'Bu Sari Dewi',
    slug: 'bu-sari-dewi',
    location: 'Lembang, Jawa Barat',
    avatar: farmerSariAvatar,
    coverImage: coverSari,
    bio: 'Spesialis tomat dan paprika hidroponik. Pionir pertanian urban di dataran tinggi Lembang.',
    since: '2020',
    productCount: 8,
    rating: 4.9,
    speciality: ['Buah Segar', 'Hidroponik'],
    verified: true,
  },
  {
    id: 'farmer-003',
    name: 'Pak Wayan Putra',
    slug: 'pak-wayan-putra',
    location: 'Tabanan, Bali',
    avatar: farmerWayanAvatar,
    coverImage: coverWayan,
    bio: 'Petani subak tradisional Bali. Melestarikan varietas beras lokal dan rempah organik.',
    since: '2022',
    productCount: 6,
    rating: 4.7,
    speciality: ['Rempah', 'Biji-bijian'],
    verified: true,
  },
  {
    id: 'farmer-004',
    name: 'Pak Togas Siregar',
    slug: 'pak-togas-siregar',
    location: 'Berastagi, Sumatera Utara',
    avatar: farmerTogasAvatar,
    coverImage: coverTogas,
    bio: 'Membudidayakan jeruk dan markisa dataran tinggi Karo. Menggerakkan koperasi petani lokal.',
    since: '2019',
    productCount: 9,
    rating: 4.6,
    speciality: ['Buah Segar'],
    verified: true,
  },
  {
    id: 'farmer-005',
    name: 'Bu Hasnah Rahman',
    slug: 'bu-hasnah-rahman',
    location: 'Malino, Sulawesi Selatan',
    avatar: farmerHasnahAvatar,
    coverImage: coverHasnah,
    bio: 'Petani sayur dan umbi dataran tinggi Malino. Aktif memberdayakan kelompok tani perempuan.',
    since: '2023',
    productCount: 7,
    rating: 4.8,
    speciality: ['Sayur Daun', 'Umbi-umbian'],
    verified: false,
  },
]
