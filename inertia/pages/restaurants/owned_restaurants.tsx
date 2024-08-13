import type Restaurant from '#restaurants/models/restaurant'

export default function OwnedRestaurants(props: { restaurants: Restaurant[] }) {
  return (
    <>
      <h1>Owned restaurants page</h1>
      {JSON.stringify(props.restaurants)}
    </>
  )
}
