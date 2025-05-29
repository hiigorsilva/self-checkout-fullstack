import { formatCurrency } from '@/helpers/format-currency'
import type { CONSUMPTION_METHOD, Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'
import { isConsumptionMethodValid } from '../menu.controller'

type ProductListProps = {
  products: Product[]
  selectedCategory: string
  slug: string
}

export const ProductList = ({
  products,
  selectedCategory,
  slug,
}: ProductListProps) => {
  const searchParams = useSearchParams()
  const consumptionMethod = searchParams.get(
    'consumptionMethod'
  ) as CONSUMPTION_METHOD
  if (!isConsumptionMethodValid(consumptionMethod)) return notFound()

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-lg text-foreground tracking-tight px-5">
        {selectedCategory}
      </h2>

      {products.map(product => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex justify-between items-center gap-10 py-3 px-5"
        >
          {/* INFO */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <h3 className="font-semibold text-sm text-foreground text-pretty tracking-tight line-clamp-3 truncate">
                {product.name}
              </h3>

              <p className="text-xs text-muted-foreground text-pretty line-clamp-2 truncate">
                {product.description}
              </p>
            </div>

            <span className="block font-semibold text-sm text-foreground tracking-tight">
              {formatCurrency(Number(product.price))}
            </span>
          </div>

          {/* IMAGE */}
          <div className="relative size-20 shrink-0 rounded-lg shadow-md shadow-foreground/25 overflow-hidden">
            <Image
              className="object-contain"
              src={product.imageUrl}
              alt={product.name}
              fill
            />
          </div>
        </Link>
      ))}
    </div>
  )
}
