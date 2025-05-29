'use client'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helpers/format-currency'
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext, type CartProduct } from '../contexts/cart'

type CartProductItemProps = {
  product: CartProduct
}

export const CartProductItem = ({ product }: CartProductItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext)

  return (
    <li className="w-full flex justify-between items-center gap-3">
      <div className="w-full flex items-center gap-2">
        {/* IMAGE */}
        <div className="relative size-16 shrink-0 rounded-lg overflow-hidden">
          <Image
            className="object-cover shrink-0"
            src={product.imageUrl}
            alt={product.name}
            fill
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-1">
          {/* NAME AND PRICE */}
          <div>
            <h3 className="text-xs text-foreground text-wrap tracking-tight line-clamp-1 truncate">
              {product.name}
            </h3>
            <p className="font-semibold text-sm text-foreground tracking-tight">
              {formatCurrency(Number(product.price))}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-1">
            <Button
              className="size-7 shrink-0"
              variant="outline"
              size="icon"
              onClick={() => decreaseProductQuantity(product.id)}
              disabled={product.quantity === 1}
            >
              <ChevronLeftIcon className="size-4 shrink-0 text-foreground" />
            </Button>

            <span className="flex justify-center items-center size-7 shrink-0 text-sm text-foreground bg-gray-100 rounded-md">
              {product.quantity}
            </span>

            <Button
              className="size-7 shrink-0 bg-rose-500 hover:bg-rose-600 hover:text-foreground"
              variant="outline"
              size="icon"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon className="size-4 shrink-0 text-background" />
            </Button>
          </div>
        </div>
      </div>

      {/* DELETE */}
      <Button
        className="shrink-0 shadow-sm shadow-black/15"
        variant="outline"
        size="icon"
        onClick={() => removeProduct(product.id)}
      >
        <Trash2Icon className="size-4 shrink-0 text-foreground hover:text-rose-500" />
      </Button>
    </li>
  )
}
