import { z } from 'zod'
import { isValidCpf } from '../helpers/cpf'

export const finishOrderFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .trim()
    .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' }),
  cpf: z
    .string({ required_error: 'O CPF é obrigatório' })
    .trim()
    .refine(cpf => isValidCpf(cpf), { message: 'CPF inválido' }),
})
export type FinishOrderFormType = z.infer<typeof finishOrderFormSchema>
