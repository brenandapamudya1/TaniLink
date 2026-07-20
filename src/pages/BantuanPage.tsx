import { ChevronDown } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'Apa itu TaniLink?',
    answer:
      'TaniLink adalah marketplace sayur dan buah yang menghubungkan petani lokal langsung ke konsumen. Kami memotong rantai distribusi sehingga petani mendapat harga yang lebih adil dan konsumen mendapat produk segar dengan harga terjangkau.',
  },
  {
    question: 'Bagaimana cara memesan?',
    answer:
      'Pilih produk yang kamu inginkan, tambahkan ke keranjang, lalu lakukan checkout. Pesananmu akan langsung diteruskan ke petani mitra untuk diproses.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Saat ini kami menerima transfer bank, e-wallet (GoPay, OVO, Dana), dan COD (bayar di tempat) untuk area tertentu. Metode pembayaran akan terus ditambah.',
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer:
      'Pengiriman dilakukan dalam waktu kurang dari 24 jam setelah pesanan dikonfirmasi. Produk dikirim langsung dari kebun petani ke alamatmu menggunakan kurir terpercaya.',
  },
  {
    question: 'Bagaimana jika produk yang diterima tidak segar?',
    answer:
      'Kami menjamin kesegaran produk. Jika produk yang kamu terima tidak segar atau rusak, hubungi customer service dalam 24 jam dan kami akan memberikan penggantian atau refund.',
  },
  {
    question: 'Bagaimana cara menghubungi customer service?',
    answer:
      'Kamu bisa menghubungi kami melalui WhatsApp di 0812-3456-7890 (Senin–Sabtu, 08.00–20.00 WIB) atau email ke halo@tanilink.id. Tim kami siap membantu!',
  },
]

export default function BantuanPage() {
  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <h1 className="font-display text-title text-soil mb-6">Pusat Bantuan</h1>

        <div className="bg-fog rounded-lg shadow-card overflow-hidden">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className={`group ${index < faqs.length - 1 ? 'border-b border-cream' : ''}`}
            >
              <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                <span className="text-soil font-semibold text-sm pr-4">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className="text-earth flex-shrink-0 transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="px-4 pb-4">
                <p className="text-body text-earth leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-caption text-earth">
            Masih ada pertanyaan?
          </p>
          <p className="text-soil font-semibold text-sm mt-1">
            WhatsApp: 0812-3456-7890
          </p>
          <p className="text-caption text-earth mt-1">
            Senin–Sabtu, 08.00–20.00 WIB
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
