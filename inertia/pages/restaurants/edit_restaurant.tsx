import type Restaurant from '#restaurants/models/restaurant'
import { useForm } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import { type FormEvent } from 'react'

export default function EditRestaurant(props: { restaurant: Restaurant }) {
  const { restaurant } = props

  const { errors, put, processing, data, setData } = useForm({
    name: restaurant.name,
    phone: restaurant.phone,
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    put(tuyau.$url('restaurant.update', { params: { id: restaurant.id } }))
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
          onChange={(e) => setData('name', e.target.value)}
          value={data.name}
        />
        {errors.name && <small>{errors.name}</small>}

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
          onChange={(e) => setData('phone', e.target.value)}
          value={data.phone}
        />
        {errors.phone && <small>{errors.phone}</small>}

        <button type={'submit'} disabled={processing}>
          Validate changes
        </button>
      </form>
    </>
  )
}
