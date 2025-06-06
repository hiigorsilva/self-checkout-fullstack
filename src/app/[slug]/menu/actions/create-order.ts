'use server'

import { db } from '@/lib/prisma'
import { getRestaurantBySlug } from '@/services/restaurant/restaurant'
import type { CONSUMPTION_METHOD } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { removeCpfPunctuation } from '../helpers/cpf'

export type CreateOrderInput = {
  customerName: string
  customerCpf: string
  products: Array<{
    id: string
    quantity: number
  }>
  consumptionMethod: CONSUMPTION_METHOD
  slug: string
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await getRestaurantBySlug(input.slug)
  if (!restaurant)
    return {
      success: false,
      message: 'Restaurant not found',
    }

  const productWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map(product => product.id),
      },
    },
  })

  const productWithPricesAndQuantities = input.products.map(product => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrices.find(p => p.id === product.id)!.price,
  }))

  const total = productWithPricesAndQuantities.reduce(
    (acc, product) => acc + +product.price * product.quantity,
    0
  )

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      status: 'PENDING',
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productWithPricesAndQuantities,
        },
      },
      restaurantId: restaurant.id,
      total: total,
    },
  })
  revalidatePath(`/${input.slug}/orders`)

  return {
    success: true,
    message: 'Pedido realizado com sucesso!',
  }
}
