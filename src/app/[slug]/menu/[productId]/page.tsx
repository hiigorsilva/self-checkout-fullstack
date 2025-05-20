import { Button } from '@/components/ui/button'
import { getProductWithRestaurantById } from '@/services/restaurant/restaurant'
import type { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import { ProductCover } from './components/product-cover'
import { ProductDetails } from './components/product-details'

type ProductPageProps = {
  params: Promise<{ productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params

  const product = (await getProductWithRestaurantById(
    productId
  )) as Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          avatarImageUrl: true
        }
      }
    }
  }>

  if (!product) return notFound()

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <ProductCover product={product} />

      <div className="relative z-50 flex flex-col flex-1 gap-4 -mt-6 p-5 rounded-t-3xl bg-background">
        <div className="flex flex-col flex-1 gap-4">
          <ProductDetails product={product} />
        </div>

        <footer>
          <Button className="w-full rounded-full">Adicionar à sacola</Button>
        </footer>
      </div>
    </div>
  )
}

export default ProductPage
