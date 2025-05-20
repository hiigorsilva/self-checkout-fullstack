import { getProductById } from '@/services/restaurant/restaurant'
import type { Product } from '@prisma/client'
import { notFound } from 'next/navigation'
import { ProductCover } from './components/product-cover'
import { ProductDetails } from './components/product-details'

type ProductPageProps = {
  params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params

  const product = (await getProductById(productId)) as Product
  if (!product) return notFound()

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <ProductCover product={product} />

      <div className="flex flex-col gap-6 -mt-6">
        <ProductDetails product={product} slug={slug} />
      </div>
    </div>
  )
}

export default ProductPage
