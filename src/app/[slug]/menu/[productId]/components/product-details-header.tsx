import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { currencyToBRL } from '@/utils/currency-format'
import type { Prisma } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true; avatarImageUrl: true }
      }
    }
  }>
}

export const ProductDetailsHeader = ({ product }: ProductDetailsProps) => {
  const { restaurant } = product
  if (!restaurant) return null

  return (
    <header className="flex flex-col gap-1">
      {/* RESTAURANT NAME */}
      <div className="flex items-center gap-1">
        <Image
          className="object-cover rounded-full shrink-0"
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={18}
          height={18}
        />
        <span className="text-xs text-muted-foreground tracking-tight leading-none">
          {restaurant.name}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {/* PRODUCT NAME */}
        <h1 className="font-semibold text-foreground tracking-tight line-clamp-2 truncate">
          {product.name}
        </h1>

        {/* PRICE AND QUANTITY */}
        <div className="flex items-center justify-between gap-6">
          <span className="block font-semibold text-lg text-foreground tracking-tight">
            {currencyToBRL(Number(product.price))}
          </span>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon">
              <ChevronLeftIcon className="size-4 shrink-0 text-foreground" />
            </Button>

            <Input
              className="size-10 text-sm text-center"
              type="text"
              defaultValue="1"
              min={1}
              max={10}
            />

            <Button variant="outline" size="icon">
              <ChevronRightIcon className="size-4 shrink-0 text-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
