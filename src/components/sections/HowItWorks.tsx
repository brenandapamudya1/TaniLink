import { ShoppingBag, PackageCheck, Truck } from 'lucide-react'
import { StepItem } from '@/components/ui/StepItem'

const steps = [
  {
    icon: <ShoppingBag size={20} />,
    title: 'Pilih produk',
    description: 'Dari petani terverifikasi',
  },
  {
    icon: <PackageCheck size={20} />,
    title: 'Kami kumpulkan',
    description: 'Langsung dari kebun pagi hari pesananmu masuk',
  },
  {
    icon: <Truck size={20} />,
    title: 'Sampai segar',
    description: 'Diantar < 24 jam ke pintumu',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-fog py-10 md:max-w-[480px] md:mx-auto">
      <div className="px-4">
        <h2 className="font-display text-section text-soil mb-6">
          Sesederhana ini
        </h2>

        <div className="flex flex-col">
          {steps.map((step, index) => (
            <StepItem
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
