import { db } from '@/lib/prisma'

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
  })
  return restaurant
}

export const getRestaurantDetailsBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  })
  return JSON.parse(JSON.stringify(restaurant))
}

export const getProductById = async (productId: string) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  })
  return JSON.parse(JSON.stringify(product))
}

export const getProductWithRestaurantById = async (productId: string) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  })
  return JSON.parse(JSON.stringify(product))
}
