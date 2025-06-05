import { ScrollTextIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { isValidCpf } from '../menu/helpers/cpf'
import { getOrdersByCustomerCpf } from './actions/get-orders-by-customer-cpf'
import { BackToMenuButton } from './components/back-to-menu-button'
import { CpfForm } from './components/cpf-form'
import { OrderList } from './components/order-list'

type OrdersPageProps = {
  searchParams: Promise<{ cpf: string }>
  params: Promise<{ slug: string }>
}

const OrdersPage = async ({ searchParams, params }: OrdersPageProps) => {
  const { slug } = await params
  if (!slug) return notFound()

  const { cpf } = await searchParams
  if (!cpf || !isValidCpf(cpf)) return <CpfForm />

  const orders = await getOrdersByCustomerCpf(cpf)

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <div className="flex flex-col gap-6 p-5">
        {/* NAVIGATION BUTTON*/}
        <BackToMenuButton />

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
