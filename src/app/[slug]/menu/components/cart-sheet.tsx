import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import { CartProductItem } from './cart-product-item'

export const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="max-w-[85vw] w-full flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-foreground text-left">Sacola</SheetTitle>
          <SheetDescription className="sr-only">Meu carrinho</SheetDescription>
        </SheetHeader>

        <div className="w-full h-px border-b border-muted-foreground" />

        {products.length > 0 && (
          <ul className="flex flex-col gap-3">
            {products.map(product => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  )
}
