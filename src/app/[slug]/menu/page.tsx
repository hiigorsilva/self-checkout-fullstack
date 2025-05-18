import { getRestaurantDetailsBySlug } from '@/services/restaurant/getRestaurantBySlug'
import type { CONSUMPTION_METHOD } from '@prisma/client'
import { notFound } from 'next/navigation'
import { RestaurantCategories } from './components/restaurant-categories'
import { RestaurantCover } from './components/restaurant-cover'
import { isConsumptionMethodValid } from './menu.controller'

type RestaurantMenuPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ consumptionMethod: CONSUMPTION_METHOD }>
}

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params

  const { consumptionMethod } = await searchParams
  if (!isConsumptionMethodValid(consumptionMethod)) return notFound()

  const restaurant = await getRestaurantDetailsBySlug(slug)
  if (!restaurant) return notFound()

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <RestaurantCover restaurant={restaurant} />
      <div className="flex flex-col gap-6">
        <RestaurantCategories restaurant={restaurant} />
      </div>
    </div>
  )
}

export default RestaurantMenuPage
