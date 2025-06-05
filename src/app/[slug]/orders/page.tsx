import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import { isValidCpf } from '../menu/helpers/cpf'
import { getOrdersByCustomerCpf } from './actions/get-orders-by-customer-cpf'
import { CpfForm } from './components/cpf-form'
import { OrderList } from './components/order-list'

type OrdersPageProps = {
  searchParams: Promise<{ cpf: string }>
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams
  if (!cpf || !isValidCpf(cpf)) return <CpfForm />

  const orders = await getOrdersByCustomerCpf(cpf)

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <div className="flex flex-col gap-6 p-5">
        {/* NAVIGATION BUTTON*/}
        <Button className="rounded-full z-10" size="icon" variant="secondary">
          <ChevronLeftIcon className="size-4 shrink-0" />
        </Button>

        {/* TTILE PAGE */}
        <div className="flex items-center gap-3">
          <ScrollTextIcon className="size-4 shrink-0" />
          <h1 className="font-semibold text-lg text-foreground leading-none tracking-tight line-clamp-2 truncate">
            Meus pedidos
          </h1>
        </div>
      </div>

      <OrderList orders={orders} />
    </div>
  )
}

export default OrdersPage
