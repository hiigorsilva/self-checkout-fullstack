import { ORDER_STATUS } from '@prisma/client'

export const getOrderStatus = (order: ORDER_STATUS) => {
  switch (order) {
    case ORDER_STATUS.FINISH:
      return 'Finalizado'
    case ORDER_STATUS.PENDING:
      return 'Pendente'
    case ORDER_STATUS.IN_PREPARATION:
      return 'Em preparação'
    default:
      return 'Desconhecido'
  }
}

export const getStatusColor = (order: ORDER_STATUS) => {
  switch (order) {
    case ORDER_STATUS.FINISH:
      return 'bg-green-600 text-green-50'
    case ORDER_STATUS.IN_PREPARATION:
      return 'bg-yellow-400/25 text-yellow-400'
    case ORDER_STATUS.PENDING:
      return 'bg-blue-400/25 text-blue-400'
    default:
      return 'bg-gray-400/25 text-gray-400'
  }
}
