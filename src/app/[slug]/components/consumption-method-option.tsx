import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { CONSUMPTION_METHOD } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type ConsumptionMethodProps = {
  slug: string
  imageUrl: string
  buttonText: string
  imageAlt: string
  consumptionOption: CONSUMPTION_METHOD
}

export const ConsumptionMethodOption = ({
  slug,
  consumptionOption,
  buttonText,
  imageUrl,
  imageAlt,
}: ConsumptionMethodProps) => {
  return (
    <Card className="p-0">
      <CardContent className="p-6 space-y-8">
        <div className="relative h-[80px] w-[80px] mx-auto">
          <Image
            className="object-contain"
            src={imageUrl}
            alt={imageAlt}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </div>

        <Button
          className="w-full font-semibold text-xs tracking-tight rounded-full"
          variant="secondary"
          asChild
        >
          <Link href={`${slug}/menu?consumptionMethod=${consumptionOption}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
