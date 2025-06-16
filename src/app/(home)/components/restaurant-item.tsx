import { Card } from '@/components/ui/card'
import type { Restaurant } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type RestaurantItemProps = {
  restaurant: Restaurant
}

export const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link
      href={`/${restaurant.slug}`}
      className="max-w-lg w-full h-fit transition hover:scale-[98%]"
    >
      <Card className="w-full h-fit flex flex-col gap-2 shrink-0 p-4">
        {/* IMAGE */}
        <div className="relative w-full h-52 rounded-sm overflow-hidden">
          <Image
            className="object-cover"
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Image
              className="shrink-0 rounded-full"
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={20}
              height={20}
              sizes="33vw"
            />
            <h2 className="font-semibold text-sm text-foreground tracking-tight line-clamp-1 truncate">
              {restaurant.name}
            </h2>
          </div>

          {restaurant.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 truncate">
              {restaurant.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
