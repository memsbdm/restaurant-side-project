import { Head, Link } from '@inertiajs/react'
import type User from '#users/models/user'

export default function Protected(props: { user: User }) {
  return (
    <>
      <Head title="Homepage" />
      <h1>Protected page</h1>
      <p>Welcome {props.user.displayedName}</p>
      <Link href={'/'}>Homepage</Link>
    </>
  )
}
