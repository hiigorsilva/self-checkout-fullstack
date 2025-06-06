'use client'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helpers/format-currency'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import { CartSheet } from './cart-sheet'

export const StatusBarCart = () => {
  const { total, toggleCart, totalQuantity, products } = useContext(CartContext)

  const handleOpenCartClick = () => {
    toggleCart()
  }

  return (
    <>
      {products.length > 0 && (
        <div className="w-full flex justify-between items-center gap-6 bg-background px-5 py-3 border-t border-muted-foreground/20">
          <div className="flex flex-col gap-0">
            <span className="font-normal text-xs text-muted-foreground">
              Total do pedido
            </span>
            <p className="flex items-center gap-2 tracking-tight">
              <span className="font-semibold text-base text-foreground">
                {formatCurrency(Number(total))}
              </span>
              <span className="font-normal text-xs text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? 'itens' : 'item'}
              </span>
            </p>
          </div>
          <Button size="sm" onClick={handleOpenCartClick}>
            Ver sacola
          </Button>
        </div>
      )}

      <CartSheet />
    </>
  )
}
