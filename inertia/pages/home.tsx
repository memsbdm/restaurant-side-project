import { Head, Link } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'
import type User from '#users/models/user'

export default function Home(props: { version: number; user: User }) {
  return (
    <>
      <Head title="Homepage" />
      {props.user?.displayedName}
      <div className="container">
        <div className="title">AdonisJS {props.version} x Inertia x React</div>

        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
        <Link href={tuyau.$url('protected')}>Protected</Link>
      </div>
    </>
  )
}
