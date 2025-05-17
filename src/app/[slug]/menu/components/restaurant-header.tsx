'use client'

import { Button } from '@/components/ui/button'
import type { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type RestaurantCoverProps = {
  restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>
}

export const RestaurantHeader = ({ restaurant }: RestaurantCoverProps) => {
  const router = useRouter()

  const handleBackPageClick = () => router.back()

  return (
    <div className="relative w-full h-[250px]">
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
      >
        <ScrollTextIcon className="size-4 shrink-0" />
      </Button>

      <Image
        className="object-cover"
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
      />
    </div>
  )
}
