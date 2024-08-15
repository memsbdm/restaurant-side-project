import { ChangeEvent, FormEvent } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import type Restaurant from '#restaurants/models/restaurant'

export default function CreateRestaurant(props: { restaurants: Restaurant[] }) {
  const { errors, post, processing, data, setData } = useForm({
    name: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    ownershipDocument: null as File | null,
  })
  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('restaurant.create'))
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setData('ownershipDocument', e.target.files[0])
    }
  }
  return (
    <>
      <h1>Create restaurant page</h1>
      {props.restaurants.length > 0 && <Link href="/">Go back to homepage</Link>}
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required={true}
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            required={true}
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
          />
          {errors.address && <small>{errors.address}</small>}
        </div>

        <div>
          <label htmlFor="postalCode">Postal code</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            required={true}
            value={data.postalCode}
            onChange={(e) => setData('postalCode', e.target.value)}
          />
          {errors.postalCode && <small>{errors.postalCode}</small>}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            required={true}
            value={data.city}
            onChange={(e) => setData('city', e.target.value)}
          />
          {errors.city && <small>{errors.city}</small>}
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            required={true}
            value={data.country}
            onChange={(e) => setData('country', e.target.value)}
          />
          {errors.country && <small>{errors.country}</small>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required={true}
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
          />
          {errors.phone && <small>{errors.phone}</small>}
        </div>
        <div>
          <label htmlFor="ownershipDocument">Ownership Document</label>
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </div>
        {errors.ownershipDocument && <small>{errors.ownershipDocument}</small>}
        <button type="submit" disabled={processing}>
          Create
        </button>
      </form>
    </>
  )
}
