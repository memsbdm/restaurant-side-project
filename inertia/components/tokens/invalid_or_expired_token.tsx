import { tuyau } from '~/core/providers/tuyau'
import { Link } from '@inertiajs/react'

export function InvalidOrExpiredToken() {
  return (
    <div>
      <h1>Your token is invalid or expired</h1>
      <p>
        Please <Link href={tuyau.$url('forgot.password')}>try again.</Link>
      </p>
    </div>
  )
}
