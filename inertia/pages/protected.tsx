import { Head, Link, useForm } from '@inertiajs/react'
import type User from '#users/models/user'
import { FormEvent } from 'react'
import { tuyau } from '~/core/providers/tuyau'
import { UserRole } from '#users/enums/user_role'

export default function Protected(props: { user: User }) {
  const { user } = props
  const { delete: destroy, processing } = useForm()

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    destroy(tuyau.$url('auth.logout'))
  }

  return (
    <>
      <Head title="Homepage" />
      <h1>Protected page</h1>
      <p>Welcome {user.displayedName}</p>
      <Link href={'/'}>Homepage</Link>
      {user.roleId === UserRole.Pro && (
        <Link href={tuyau.$url('owned.restaurants')}>Owned restaurants</Link>
      )}
      <form onSubmit={submit}>
        <button type={'submit'} disabled={processing}>
          Logout
        </button>
      </form>
    </>
  )
}
