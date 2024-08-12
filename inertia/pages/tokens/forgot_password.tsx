import { Link, useForm } from '@inertiajs/react'
import { FormEvent, useState } from 'react'
import { tuyau } from '~/core/providers/tuyau'

export default function ForgotPassword() {
  const { errors, post, processing, data, setData, reset } = useForm({
    email: '',
  })

  const [isEmailSent, setIsEmailSent] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('forgot.password.send'), {
      onFinish() {
        reset('email')
      },
      onSuccess() {
        setIsEmailSent(true)
      },
    })
  }

  return (
    <>
      <h1>Forgot your password</h1>
      {isEmailSent && (
        <div>An email has been sent to you with instructions on how to reset your password.</div>
      )}
      <form onSubmit={submit}>
        {errors.email && <small>{errors.email}</small>}

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            required
            onChange={(e) => setData('email', e.target.value)}
          />
        </div>

        <button type="submit" disabled={processing}>
          Send
        </button>
      </form>
      <p>
        Already a member? <Link href={tuyau.$url('auth.login')}>Login</Link>
      </p>
      <p>
        Not a member yet? <Link href={tuyau.$url('auth.register.pro')}>Register</Link>
      </p>
    </>
  )
}
