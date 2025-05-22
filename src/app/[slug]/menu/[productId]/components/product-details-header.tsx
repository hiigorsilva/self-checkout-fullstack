'use client'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helpers/format-currency'
import type { Prisma } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          avatarImageUrl: true
        }
      }
    }
  }>
  descreaseQuantity: () => void
  increaseQuantity: () => void
  quantity: number
}

export const ProductDetailsHeader = ({
  product,
  descreaseQuantity,
  increaseQuantity,
  quantity,
}: ProductDetailsProps) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex flex-col gap-1 pt-5 bg-background">
      {/* RESTAURANT NAME */}
      <div className="flex items-center gap-1">
        <Image
          className="object-cover rounded-full shrink-0"
          src={product.restaurant.avatarImageUrl}
          alt={product.restaurant.name}
          width={18}
          height={18}
        />
        <span className="text-xs text-muted-foreground tracking-tight leading-none">
          {product.restaurant.name}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {/* PRODUCT NAME */}
        <h1 className="font-semibold text-foreground tracking-tight line-clamp-2 truncate">
          {product.name}
        </h1>

        {/* PRICE AND QUANTITY */}
        <div className="flex items-center justify-between gap-6">
          <span className="block font-semibold text-lg text-foreground tracking-tight">
            {formatCurrency(Number(product.price))}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={descreaseQuantity}
              disabled={quantity === 1}
            >
              <ChevronLeftIcon className="size-4 shrink-0 text-foreground" />
            </Button>

            <span className="flex justify-center items-center h-10 w-11 text-sm text-center">
              {quantity}
            </span>

            <Button
              className="bg-rose-500 hover:bg-rose-600 hover:text-foreground"
              variant="outline"
              size="icon"
              onClick={increaseQuantity}
            >
              <ChevronRightIcon className="size-4 shrink-0 text-background" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
