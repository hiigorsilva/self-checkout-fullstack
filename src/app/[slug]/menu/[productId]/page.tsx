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
      <ProductDetails product={product} />
    </div>
  )
}

export default ProductPage
