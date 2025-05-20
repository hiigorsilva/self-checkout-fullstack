'use client'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helpers/format-currency'
import type { Prisma } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useState } from 'react'

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
}

export const ProductDetailsHeader = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1)

  if (!product) return notFound()

  const handleDescreaseQuantity = () => {
    setQuantity(prev => {
      if (prev === 1) return 1
      return prev - 1
    })
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  return (
    <header className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-4">
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
              onClick={handleDescreaseQuantity}
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
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon className="size-4 shrink-0 text-background" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
