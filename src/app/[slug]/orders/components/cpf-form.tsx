'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { notFound, useParams, usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { toast } from 'sonner'
import { isValidCpf, removeCpfPunctuation } from '../../menu/helpers/cpf'
import { type CpfFormType, cpfFormSchema } from '../schemas/cpf-form'

export const CpfForm = () => {
  const { slug } = useParams<{ slug: string }>()
  const pathname = usePathname()
  const router = useRouter()

  if (!slug) return notFound()

  const form = useForm<CpfFormType>({
    resolver: zodResolver(cpfFormSchema),
    defaultValues: {
      cpf: '',
    },
    shouldUnregister: true,
  })

  const onSubmit = (data: CpfFormType) => {
    if (!isValidCpf(data.cpf)) {
      toast.error('CPF inválido')
      return
    }

    router.replace(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`)
  }

  const handleToBackMenuClick = () => {
    router.push(`/${slug}`)
  }

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF para visualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 pt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="cpf"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        className={`text-sm border outline-none focus-visible:ring-0 focus:border-primary ${fieldState.error ? 'border-destructive' : 'border-muted-foreground'} `}
                        placeholder="Digite seu CPF"
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button className="w-full text-sm rounded-full">
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="size-4 shrink-0 animate-spin" />
                  )}
                  {!form.formState.isSubmitting && 'Ver pedidos'}
                </Button>

                <Button
                  className="w-full text-sm rounded-full"
                  variant="outline"
                  onClick={handleToBackMenuClick}
                >
                  Voltar ao menu
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
