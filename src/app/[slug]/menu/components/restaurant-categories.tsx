import { Badge } from '@/components/ui/badge'
import type { Restaurant } from '@prisma/client'
import { ClockIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'

type RestaurantCategoriesProps = {
  restaurant: Restaurant
}

export const RestaurantCategories = ({
  restaurant,
}: RestaurantCategoriesProps) => {
  return (
    <header className="relative z-50 p-5 rounded-t-3xl bg-background -mt-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* LOGO */}
          <div className="relative size-11 shrink-0 rounded-xl overflow-hidden">
            <Image src={restaurant.avatarImageUrl} alt={restaurant.name} fill />
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="font-semibold text-lg text-foreground leading-none tracking-tight line-clamp-2 truncate">
                {restaurant.name}
              </h1>

              <p className="text-xs text-muted-foreground line-clamp-2 truncate">
                {restaurant.description}
              </p>
            </div>

            {/* WORKING STATUS */}
            <div className="flex items-center gap-1">
              <ClockIcon className="size-3 shrink-0 text-green-500" />
              <span className="text-xs text-green-500">Aberto</span>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div>
          <Badge variant="outline">
            <StarIcon className="text-green-500 size-3 shrink-0" />
            <span className="font-semibold text-xs text-foreground">5.0</span>
          </Badge>
        </div>
      </div>
    </header>
  )
}
