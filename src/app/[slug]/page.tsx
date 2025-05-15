import { ContainerPage } from '@/components/container-page'
import {} from '@/components/ui/card'
import { getRestaurantBySlug } from '@/services/restaurant/getRestaurantBySlug'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ConsumptionMethodOption } from './components/consumption-method-option'

type RestaurentPageProps = {
  params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurentPageProps) => {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) {
    return notFound()
  }

  return (
    <ContainerPage className="justify-center items-center gap-20">
      {/* LOGO RESTAURANT */}
      <div className="flex flex-col items-center space-y-1">
        <div className="relative h-[80px] w-[80px]">
          <Image
            className="object-cover"
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </div>
        <h2 className="font-semibold text-lg text-center text-foreground tracking-tight">
          {restaurant.name}
        </h2>
      </div>

      {/* WELCOME */}
      <div className="flex flex-col items-center space-y-1">
        <h1 className="font-semibold text-2xl text-center text-foreground tracking-tight">
          Seja bem-vindo!
        </h1>
        <p className="text-sm text-center text-muted-foreground text-pretty">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      {/* CONSUMPTION METHOD */}
      <div className="grid grid-cols-2 gap-6">
        <ConsumptionMethodOption
          imageUrl="/images/dine-in.webp"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
          consumptionOption="DINE_IN"
        />

        <ConsumptionMethodOption
          imageUrl="/images/takeaway.webp"
          imageAlt="Para levar"
          buttonText="Para levar"
          consumptionOption="TAKEAWAY"
        />
      </div>
    </ContainerPage>
  )
}

export default RestaurantPage
