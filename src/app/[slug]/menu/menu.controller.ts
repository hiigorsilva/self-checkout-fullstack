import { CONSUMPTION_METHOD } from '@prisma/client'

const isConsumptionMethodValid = (consumptionMethod: string) => {
  const takeaway = CONSUMPTION_METHOD.TAKEAWAY
  const dineIn = CONSUMPTION_METHOD.DINE_IN

  return [takeaway, dineIn].includes(
    consumptionMethod.toUpperCase() as CONSUMPTION_METHOD
  )
}

export { isConsumptionMethodValid }
