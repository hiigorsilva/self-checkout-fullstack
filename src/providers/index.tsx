'use client'

import { CartProvider } from '@/app/[slug]/menu/contexts/cart'
import { Toaster } from '@/components/ui/sonner'

type ProvidersProps = {
  children: React.ReactNode
}

export const RootProviders = ({ children }: ProvidersProps) => {
  return (
    <CartProvider>
      {children}
      <Toaster richColors />
    </CartProvider>
  )
}
