import type Restaurant from '#restaurants/models/restaurant'
import { Link } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import { RestaurantStatus } from '#restaurants/enums/restaurant_status'

export default function OwnedRestaurants(props: { restaurants: Restaurant[] }) {
  const { restaurants } = props
  return (
    <>
      <h1>Owned restaurants page</h1>

      {restaurants &&
        restaurants.map((restaurant) => (
          <>
            <div key={restaurant.id}>
              <p>
                {restaurant.name}
                <Link href={tuyau.$url('restaurant.details', { params: { id: restaurant.id } })}>
                  Details
                </Link>
              </p>
              {restaurant.statusId === RestaurantStatus.Rejected && (
                <p>Submit a new proof document</p>
              )}
            </div>
          </>
        ))}
    </>
  )
}
