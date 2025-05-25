'use client'

import { Button } from '@/components/ui/button'
import type { Prisma } from '@prisma/client'
import { ChefHatIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { useContext, useState } from 'react'
import { CartSheet } from '../../components/cart-sheet'
import { CartContext } from '../../contexts/cart'
import { ProductDetailsHeader } from './product-details-header'

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

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const { toggleCart, addProduct } = useContext(CartContext)

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

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity: quantity,
    })
    toggleCart()
  }

  return (
    <>
      <div className="relative z-50 flex flex-col flex-1 gap-4 -mt-6 p-5 pt-0 rounded-t-3xl bg-background overflow-y-auto">
        <ProductDetailsHeader
          product={product}
          descreaseQuantity={handleDescreaseQuantity}
          increaseQuantity={handleIncreaseQuantity}
          quantity={quantity}
        />

        {/* SOBRE */}
        <div className="flex flex-col gap-2 pr-3">
          <h2 className="font-semibold text-sm text-foreground tracking-tight">
            Sobre
          </h2>
          <p className="text-sm text-muted-foreground text-pretty">
            {product.description}
          </p>
        </div>

        {/* INGREDIENTES */}
        {product.ingredients.length > 0 && (
          <div className="flex flex-col gap-2 pr-3">
            <h2 className="flex items-center gap-1.5 font-semibold text-sm text-foreground tracking-tight">
              <ChefHatIcon className="size-4 shrink-0 text-foreground" />
              Ingredientes
            </h2>
            <ul className="list-disc list-inside list">
              {product.ingredients.map(ingredient => (
                <li
                  key={ingredient}
                  className="text-sm text-muted-foreground text-pretty px-1"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ADD TO CART BUTTON */}
      <footer className="w-full px-5 pb-5 pt-2.5">
        <Button
          className="w-full rounded-full shadow-md shadow-black/20"
          onClick={handleAddToCart}
        >
          Adicionar à sacola
        </Button>
      </footer>

      <CartSheet />
    </>
  )
}
