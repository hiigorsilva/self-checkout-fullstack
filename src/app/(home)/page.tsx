import { db } from '@/lib/prisma'
import { RestaurantItem } from './components/restaurant-item'

const HomePage = async () => {
  const restaurants = await db.restaurant.findMany({
    orderBy: {
      slug: 'asc',
    },
  })

  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center gap-6 flex-auto px-5 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="flex flex-col gap-0 text-center tracking-tight">
          <span className="font-normal text-sm text-muted-foreground">
            Olá, bem vindo!
          </span>
          <span className="font-semibold text-xl text-foreground text-balance">
            Serei seu atalho para um lanche rápido e sem filas.
          </span>
        </h1>

        <p className="text-sm text-muted-foreground text-center text-balance">
          Escolha seu restaurante favorito abaixo e peça seu lanche 🍔
        </p>
      </div>

      <ul className="w-full flex justify-center items-center flex-wrap flex-auto gap-4">
        {restaurants.map(restaurant => (
          <>
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          </>
        ))}

        {restaurants.length === 0 && (
          <p className="text-sm text-muted-foreground text-center text-balance py-8">
            Nenhum restaurante encontrado
          </p>
        )}
      </ul>
    </div>
  )
}

export default HomePage
