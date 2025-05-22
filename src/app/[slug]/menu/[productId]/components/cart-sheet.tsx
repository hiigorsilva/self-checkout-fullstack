import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type CartSheetProps = {
  isOpen: boolean
  toggleCart: () => void
}

export const CartSheet = ({ isOpen, toggleCart }: CartSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-foreground text-left">Sacola</SheetTitle>
          <SheetDescription className="sr-only">Meu carrinho</SheetDescription>
        </SheetHeader>

        <div className="w-full h-px border-b border-muted-foreground" />

        <div>SheetContent</div>
      </SheetContent>
    </Sheet>
  )
}
