import type { Prisma } from '@prisma/client'
import { ChefHatIcon } from 'lucide-react'
import { ProductDetailsHeader } from './product-details-header'

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true; avatarImageUrl: true }
      }
    }
  }>
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <>
      <ProductDetailsHeader product={product} />

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-sm text-foreground tracking-tight">
          Sobre
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          {product.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-1.5 font-semibold text-sm text-foreground tracking-tight">
          <ChefHatIcon className="size-4 shrink-0 text-foreground" />
          Ingredientes
        </h2>
        <ul className="flex flex-col gap-1 text-sm text-muted-foreground text-pretty">
          {product.ingredients.map(ingredient => (
            <li
              key={ingredient}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <div className="size-1 shrink-0 bg-muted-foreground rounded-full" />
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
