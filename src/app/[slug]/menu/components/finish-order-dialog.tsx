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
import { useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
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
  const form = useForm<FinishOrderFormType>({
    resolver: zodResolver(finishOrderFormSchema),
    defaultValues: {
      name: '',
      cpf: '',
    },
    shouldUnregister: true,
  })

  const onSubmit = (data: FinishOrderFormType) => {
    console.log({ data })
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
                <Button className="w-full text-sm rounded-full">
                  Finalizar
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
