'use server'

import { db } from '@/lib/prisma'
import { isValidCpf, removeCpfPunctuation } from '../../menu/helpers/cpf'

export const getOrdersByCustomerCpf = async (cpf: string) => {
  if (!isValidCpf(cpf)) throw new Error('Inválid CPF')

  const orders = await db.order.findMany({
    where: { customerCpf: removeCpfPunctuation(cpf) },
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true,
          name: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return orders
}
