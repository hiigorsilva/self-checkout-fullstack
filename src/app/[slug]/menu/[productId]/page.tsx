import { Button } from '@/components/ui/button'
import { getProductWithRestaurantById } from '@/services/restaurant/restaurant'
import type { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import { ProductCover } from './components/product-cover'
import { ProductDetails } from './components/product-details'

type ProductPageProps = {
  params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params

  const product = (await getProductWithRestaurantById(
    productId
  )) as Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          avatarImageUrl: true
          slug: true
        }
      }
    }
  }>

  if (!product) return notFound()
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound()
  }

  return (
    <div className="w-full h-dvh flex flex-col">
      <ProductCover product={product} />

      <div className="relative z-50 flex flex-col flex-1 gap-4 -mt-6 p-5 pt-0 rounded-t-3xl bg-background overflow-y-auto">
        <ProductDetails product={product} />
      </div>

      <footer className="w-full px-5 pb-5 pt-2.5">
        <Button className="w-full rounded-full shadow-md shadow-black/20">
          Adicionar à sacola
        </Button>
      </footer>
    </div>
  )
}

export default ProductPage
