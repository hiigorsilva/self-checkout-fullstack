import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { formatCurrency } from '@/helpers/format-currency'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import { CartProductItem } from './cart-product-item'

export const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="max-w-[85vw] w-full flex flex-col gap-4 px-5">
        <SheetHeader>
          <SheetTitle className="text-foreground text-left">Sacola</SheetTitle>
          <SheetDescription className="sr-only">Meu carrinho</SheetDescription>
        </SheetHeader>

        <div className="w-full h-px border-b border-muted-foreground" />

        <ul className="flex flex-col flex-1 gap-3 overflow-y-auto">
          {products.map(product => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </ul>

        <SheetFooter className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 p-4 border border-muted-foreground/50 rounded-xl">
            <p className="flex justify-between items-center gap-4 text-xs">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </p>

            <div className="w-full h-px border-b border-muted-foreground/50" />

            <p className="flex justify-between items-center gap-4 text-xs">
              <span>Desconto</span>
              <span>R$ 0</span>
            </p>

            <div className="w-full h-px border-b border-muted-foreground/50" />

            <p className="flex justify-between items-center gap-4 font-semibold text-xs">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </p>
          </div>

          <Button
            className="w-full rounded-full"
            disabled={products.length === 0}
          >
            Finalizar pedido
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
