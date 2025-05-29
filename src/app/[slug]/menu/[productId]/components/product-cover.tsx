'use client'

import { Button } from '@/components/ui/button'
import type { Product } from '@prisma/client'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

type ProductCoverProps = {
  product: Pick<Product, 'name' | 'imageUrl'>
}

export const ProductCover = ({ product }: ProductCoverProps) => {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()

  const handleBackPageClick = () => router.back()

  const handleRedirectToOrdersPage = () => {
    router.push(`/${slug}/orders`)
  }

  return (
    <div className="relative w-full min-h-[300px] max-h-[320px]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-foreground/15 to-90%" />

      <Button
        className="absolute top-4 left-4 rounded-full z-10 shadow shadow-black/20"
        size="icon"
        variant="secondary"
        onClick={handleBackPageClick}
      >
        <ChevronLeftIcon className="size-4 shrink-0" />
      </Button>

      <Button
        className="absolute top-4 right-4 rounded-full z-10 shadow shadow-black/20"
        size="icon"
        variant="secondary"
        onClick={handleRedirectToOrdersPage}
      >
        <ScrollTextIcon className="size-4 shrink-0" />
      </Button>

      <Image
        className="object-cover"
        src={product.imageUrl}
        alt={product.name}
        fill
      />
    </div>
  )
}
