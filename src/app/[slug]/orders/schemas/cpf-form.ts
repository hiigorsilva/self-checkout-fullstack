import { z } from 'zod'
import { isValidCpf } from '../../menu/helpers/cpf'

export const cpfFormSchema = z.object({
  cpf: z
    .string({ required_error: 'O CPF é obrigatório' })
    .trim()
    .refine(cpf => isValidCpf(cpf), { message: 'CPF inválido' }),
})
export type CpfFormType = z.infer<typeof cpfFormSchema>
