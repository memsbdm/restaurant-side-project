import { FormEvent } from 'react'
import { tuyau } from '~/core/providers/tuyau'
import { useForm } from '@inertiajs/react'

export function ResetPasswordForm(props: { token: string }) {
  const { token } = props

  const { errors, post, processing, data, setData, reset } = useForm({
    password: '',
    passwordConfirmation: '',
    token,
  })

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('reset.password.update'), {
      onFinish() {
        reset('password', 'passwordConfirmation')
      },
    })
  }

  return (
    <>
      <h1>Reset your password</h1>
      <form onSubmit={submit} className="w-80">
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            value={data.passwordConfirmation}
            onChange={(e) => setData('passwordConfirmation', e.target.value)}
          />
          {errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small>}
        </div>

        <button type="submit" disabled={processing}>
          Change my password
        </button>
      </form>
    </>
  )
}
