'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
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
import type { CONSUMPTION_METHOD } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { notFound, useParams, useSearchParams } from 'next/navigation'
import { useContext, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { toast } from 'sonner'
import { createOrder } from '../actions/create-order'
import { CartContext } from '../contexts/cart'
import { isConsumptionMethodValid } from '../menu.controller'
import {
  type FinishOrderFormType,
  finishOrderFormSchema,
} from '../schemas/finish-order'

type FinishOrderDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const FinishOrderDialog = ({
  open,
  onOpenChange,
}: FinishOrderDialogProps) => {
  const { products } = useContext(CartContext)
  const { slug } = useParams<{ slug: string }>()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FinishOrderFormType>({
    resolver: zodResolver(finishOrderFormSchema),
    defaultValues: {
      name: '',
      cpf: '',
    },
    shouldUnregister: true,
  })

  const onSubmit = async (data: FinishOrderFormType) => {
    try {
      const consumptionMethod = searchParams.get(
        'consumptionMethod'
      ) as CONSUMPTION_METHOD
      if (!isConsumptionMethodValid(consumptionMethod)) return notFound()

      startTransition(async () => {
        const order = await createOrder({
          customerCpf: data.cpf,
          customerName: data.name,
          products: products.map(product => ({
            id: product.id,
            quantity: product.quantity,
          })),
          consumptionMethod: consumptionMethod,
          slug: slug,
        })

        onOpenChange(false)
        if (!order.success) {
          toast.error(order.message)
          return
        }
        toast.success(order.message)
      })
    } catch (err) {
      console.error('CREATE_ORDER_ERROR', err)
      if (err instanceof Error) {
        toast.error('Ocorreu um erro ao finalizar o pedido.')
      }
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quase lá!</DrawerTitle>
          <DrawerDescription>
            Para finalizar o seu pedido, insira os seus dados abaixo.
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
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input
                        className={`text-sm border outline-none focus-visible:ring-0 focus:border-primary ${fieldState.error ? 'border-destructive' : 'border-muted-foreground'} `}
                        placeholder="Digite seu nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

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
                <Button
                  className="w-full text-sm rounded-full"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="size-4 shrink-0 animate-spin" />
                  )}
                  {!isPending && 'Finalizar'}
                </Button>

                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full text-sm rounded-full"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
