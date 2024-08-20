import type Restaurant from '#restaurants/models/restaurant'
import { useForm } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import { type FormEvent } from 'react'
import { RestaurantStatus } from '#restaurants/enums/restaurant_status'

export default function EditRestaurant(props: { restaurant: Restaurant }) {
  const { restaurant } = props

  const updateForm = useForm({
    name: restaurant.name,
    phone: restaurant.phone,
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (updateForm.processing || deleteForm.processing) {
      return
    }

    updateForm.put(tuyau.$url('restaurant.update', { params: { id: restaurant.id } }))
  }

  const deleteForm = useForm()

  function deleteRestaurant() {
    if (updateForm.processing || deleteForm.processing) return

    deleteForm.delete(tuyau.$url('restaurant.delete', { params: { id: restaurant.id } }))
  }
  return (
    <>
      <h1>Edit restaurant page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id={'name'}
          name={'name'}
          required={true}
          onChange={(e) => updateForm.setData('name', e.target.value)}
          value={updateForm.data.name}
        />
        {updateForm.errors.name && <small>{updateForm.errors.name}</small>}

        <p>{restaurant.address}</p>
        <p>{restaurant.postalCode}</p>
        <p>{restaurant.city}</p>
        <p>{restaurant.country}</p>

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id={'phone'}
          name={'phone'}
          required={true}
          onChange={(e) => updateForm.setData('phone', e.target.value)}
          value={updateForm.data.phone}
        />
        {updateForm.errors.phone && <small>{updateForm.errors.phone}</small>}

        <button type={'submit'} disabled={updateForm.processing || deleteForm.processing}>
          Validate changes
        </button>
      </form>
      {restaurant.statusId !== RestaurantStatus.Pending &&
        restaurant.statusId !== RestaurantStatus.Deleted && (
          <button onClick={deleteRestaurant}>Delete</button>
        )}
    </>
  )
}
