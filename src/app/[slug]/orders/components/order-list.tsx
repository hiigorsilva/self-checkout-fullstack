import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/helpers/format-currency'
import type { Prisma } from '@prisma/client'
import Image from 'next/image'
import { formatDate } from '../helpers/format-date'
import { getOrderStatus, getStatusColor } from '../helpers/order-status'

type OrderListProps = {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            avatarImageUrl: true
            name: true
          }
        }
        orderProducts: {
          include: {
            product: true
          }
        }
      }
    }>
  >
}

export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <ul className="flex flex-col gap-3 flex-auto px-5">
      {orders.map(order => (
        <Card key={order.id} className="p-5">
          <CardContent className="flex flex-col gap-3 p-0">
            {/* STATUS */}
            <div className="flex justify-between items-center gap-6">
              <div
                className={`${getStatusColor(order.status)} w-fit flex items-center font-semibold text-xs px-3 py-0.5 rounded-full`}
              >
                {getOrderStatus(order.status)}
              </div>

              <span className="text-xs text-muted-foreground">
                {formatDate(order.createdAt)} atrás
              </span>
            </div>

            {/* RESTAURANT */}
            <div className="flex items-center gap-2">
              <div className="relative size-4 shrink-0 rounded overflow-hidden">
                <Image
                  className="object-cover"
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  sizes="33vw"
                  fill
                />
              </div>
              <h3 className="font-semibold text-sm text-foreground tracking-tight line-clamp-1 truncate">
                {order.restaurant.name}
              </h3>
            </div>

            <Separator />

            {/* PRODUCT LIST */}
            <div className="flex flex-col gap-2">
              {order.orderProducts.map(orderProduct => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <span className="flex justify-center items-center size-5 text-xs text-foreground bg-gray-400/50 rounded-full">
                    {orderProduct.quantity}
                  </span>
                  <h3 className="text-sm text-foreground line-clamp-1 truncate tracking-tight">
                    {orderProduct.product.name}
                  </h3>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center gap-6">
              <p className="font-semibold text-sm text-foreground tracking-tight">
                {formatCurrency(Number(order.total))}
              </p>

              <Button
                className="font-semibold text-xs "
                variant="outline"
                size="sm"
                disabled
              >
                Adicionar à sacola
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </ul>
  )
}
