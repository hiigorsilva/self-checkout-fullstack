import { CONSUMPTION_METHOD } from '@prisma/client'

export const isConsumptionMethodValid = (consumptionMethod: string) => {
  if (!consumptionMethod) return false

  try {
    const normalizedMethod = consumptionMethod.toUpperCase()
    return (
      normalizedMethod === CONSUMPTION_METHOD.TAKEAWAY ||
      normalizedMethod === CONSUMPTION_METHOD.DINE_IN
    )
  } catch (error) {
    console.error('VALIDATING_CONSUMPTION_METHOD_ERROR:', error)
    return false
  }
}
