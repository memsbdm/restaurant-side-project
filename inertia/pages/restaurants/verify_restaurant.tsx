import type Restaurant from '#restaurants/models/restaurant'
import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import { RestaurantStatus } from '#restaurants/enums/restaurant_status'

export default function VerifyRestaurant(props: { restaurant: Restaurant }) {
  const disabled = props.restaurant.statusId !== RestaurantStatus.Pending
  const { post } = useForm()

  function handleVerify() {
    post(tuyau.$url('admin.restaurants.verify', { params: { id: props.restaurant.id } }))
  }

  function handleReject() {
    post(tuyau.$url('admin.restaurants.reject', { params: { id: props.restaurant.id } }))
  }
  return (
    <>
      <Link href={tuyau.$url('admin.restaurants')}>Go back to restaurants list</Link>
      <h1>Verify restaurant page</h1>
      <div>{JSON.stringify(props.restaurant)}</div>
      <img src={props.restaurant.ownership.url} alt="Ownership proof" style={{ width: '600px' }} />
      <button onClick={handleVerify} disabled={disabled}>
        Verify
      </button>
      <button onClick={handleReject} disabled={disabled}>
        Reject
      </button>
    </>
  )
}
