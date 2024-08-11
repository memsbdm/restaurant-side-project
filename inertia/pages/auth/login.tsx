import { Link, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'
import { tuyau } from '~/core/providers/tuyau'

export default function LoginPage() {
  const { errors, post, processing, data, setData, reset } = useForm({
    login: '',
    password: '',
    isRememberMe: false,
  })

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('auth.login'), {
      onFinish() {
        reset('password')
      },
    })
  }

  return (
    <>
      <h1>Login page</h1>

      {'code' in errors && errors.code === 'E_INVALID_CREDENTIALS' && (
        <small>No account found with provided credentials</small>
      )}

      <form method="POST" onSubmit={submit} className="w-80">
        <div className={'flex flex-col'}>
          <label htmlFor="username">Login</label>
          <input
            id="login"
            name="login"
            type="text"
            required={true}
            value={data.login}
            onChange={(e) => setData('login', e.target.value)}
          />
          {errors.login && <small>{errors.login}</small>}
        </div>

        <div className={'flex flex-col'}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required={true}
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>
        <div>
          <label htmlFor="isRememberMe">Remember me</label>
          <input
            type="checkbox"
            id="isRememberMe"
            name="isRememberMe"
            onChange={(e) => setData('isRememberMe', e.target.checked)}
          />
        </div>
        <button type="submit" disabled={processing}>
          Login
        </button>
      </form>
      <Link href={tuyau.$url('auth.register.pro')}>Or create a new pro account</Link>
    </>
  )
}
