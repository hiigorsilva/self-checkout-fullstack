'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Prisma } from '@prisma/client'
import { useState } from 'react'
import { ProductList } from './product-list'
import { RestaurantCategoriesHeader } from './restaurant-categories-header'

type RestaurantCategoriesProps = {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true }
      }
    }
  }>
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true
  }
}>

export const RestaurantCategories = ({
  restaurant,
}: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0])
  const handleCategoryClick = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category)
  }

  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return category.id === selectedCategory.id ? 'default' : 'secondary'
  }

  return (
    <>
      <RestaurantCategoriesHeader restaurant={restaurant} />
      <ScrollArea className="w-full">
        <div className="w-max flex items-center gap-2 px-5">
          {restaurant.menuCategories.map(category => (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="font-semibold text-sm size-fit px-4 py-2 rounded-full"
              variant={getCategoryButtonVariant(category)}
              size="sm"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-0.5" />
      </ScrollArea>

      <ProductList
        products={selectedCategory.products}
        selectedCategory={selectedCategory.name}
        slug={restaurant.slug}
      />
    </>
  )
}
