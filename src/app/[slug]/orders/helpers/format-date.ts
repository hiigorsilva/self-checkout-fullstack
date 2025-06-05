import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: Date) => {
  return formatDistanceToNowStrict(date, { locale: ptBR })
}
