'use client'

import { Button } from '@/components/ui/button'
import type { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

type RestaurantCoverProps = {
  restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>
}

export const RestaurantCover = ({ restaurant }: RestaurantCoverProps) => {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()

  const handleBackPageClick = () => router.back()

  const handleRedirectToOrdersPage = () => {
    router.push(`/${slug}/orders`)
  }

  return (
    <div className="relative w-full min-h-[250px] h-fit">
      <Button
        className="absolute top-4 left-4 rounded-full z-10"
        size="icon"
        variant="secondary"
        onClick={handleBackPageClick}
      >
        <ChevronLeftIcon className="size-4 shrink-0" />
      </Button>

      <Button
        className="absolute top-4 right-4 rounded-full z-10"
        size="icon"
        variant="secondary"
        onClick={handleRedirectToOrdersPage}
      >
        <ScrollTextIcon className="size-4 shrink-0" />
      </Button>

      <Image
        className="object-cover"
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-foreground/30 to-90%" />
    </div>
  )
}
