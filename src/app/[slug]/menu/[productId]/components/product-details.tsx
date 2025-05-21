import type { Prisma } from '@prisma/client'
import { ChefHatIcon } from 'lucide-react'
import { ProductDetailsHeader } from './product-details-header'

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          avatarImageUrl: true
        }
      }
    }
  }>
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <>
      <ProductDetailsHeader product={product} />

      {/* SOBRE */}
      <div className="flex flex-col gap-2 pr-3">
        <h2 className="font-semibold text-sm text-foreground tracking-tight">
          Sobre
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          {product.description}
        </p>
      </div>

      {/* INGREDIENTES */}
      {product.ingredients.length > 0 && (
        <div className="flex flex-col gap-2 pr-3">
          <h2 className="flex items-center gap-1.5 font-semibold text-sm text-foreground tracking-tight">
            <ChefHatIcon className="size-4 shrink-0 text-foreground" />
            Ingredientes
          </h2>
          <ul className="list-disc list-inside list">
            {product.ingredients.map(ingredient => (
              <li
                key={ingredient}
                className="text-sm text-muted-foreground text-pretty px-1"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
