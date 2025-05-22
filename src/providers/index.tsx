'use client'

import { CartProvider } from '@/app/[slug]/menu/contexts/cart'

type ProvidersProps = {
  children: React.ReactNode
}

export const RootProviders = ({ children }: ProvidersProps) => {
  return <CartProvider>{children}</CartProvider>
}
