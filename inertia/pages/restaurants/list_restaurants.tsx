import type Restaurant from '#restaurants/models/restaurant'
import type { SimplePaginatorMetaKeys } from '@adonisjs/lucid/types/querybuilder'
import { router } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import type { ListRestaurantsQs } from '#restaurants/controllers/list_restaurants_controller'
import {
  restaurantStatusDbValues,
  type RestaurantStatusId,
} from '#restaurants/enums/restaurant_status'
import { type ChangeEvent, useEffect, useState } from 'react'

interface ListRestaurantsProps {
  restaurants: { meta: SimplePaginatorMetaKeys; data: Restaurant[] }
  qs: ListRestaurantsQs
}

export default function ListRestaurants(props: ListRestaurantsProps) {
  const { meta, data: restaurants } = props.restaurants
  let { page, name, statusId }: ListRestaurantsQs = props.qs

  const [nameFilter, setNameFilter] = useState(name)
  const [statusIdFilter, setStatusFilter] = useState<RestaurantStatusId | string | undefined>(
    statusId
  )
  const [pageFilter, setPageFilter] = useState(page)

  useEffect(() => {
    router.get(
      tuyau.$url('admin.restaurants', {
        query: { name: nameFilter, page: pageFilter, status_id: statusIdFilter },
      }),
      {},
      {
        preserveState: true,
      }
    )
  }, [nameFilter, statusIdFilter, pageFilter])

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(e.target.value)
  }

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setNameFilter(e.target.value)
  }

  function handleNext() {
    setPageFilter(pageFilter ? +pageFilter + 1 : 2)
  }

  function handlePrevious() {
    setPageFilter(+pageFilter! - 1)
  }
  return (
    <>
      <h1>List restaurants page</h1>

      <input
        type="text"
        placeholder={'Restaurant name'}
        value={nameFilter}
        onChange={handleNameInput}
      />

      <select onChange={handleSelect} defaultValue={statusIdFilter}>
        <option value={''}>-- Select a status --</option>
        {restaurantStatusDbValues.map((status) => (
          <option value={status.id} key={status.id}>
            {status.name}
          </option>
        ))}
      </select>

      {restaurants && !restaurants.length && <p>No restaurant found</p>}
      {restaurants && restaurants.map((restaurant) => <p key={restaurant.id}>{restaurant.name}</p>)}

      {meta && meta.nextPageUrl && <button onClick={handleNext}>Next</button>}
      {meta && meta.previousPageUrl && <button onClick={handlePrevious}>Previous</button>}
    </>
  )
}
