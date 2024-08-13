import { FormEvent } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/providers/tuyau'

export default function RegisterPro() {
  const { errors, post, processing, data, setData, reset } = useForm({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('auth.register.pro'), {
      onFinish() {
        reset('password', 'passwordConfirmation')
      },
    })
  }

  return (
    <>
      <h1>Register pro page</h1>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required={true}
            value={data.firstName}
            onChange={(e) => setData('firstName', e.target.value)}
          />
          {errors.firstName && <small>{errors.firstName}</small>}
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required={true}
            value={data.lastName}
            onChange={(e) => setData('lastName', e.target.value)}
          />
          {errors.lastName && <small>{errors.lastName}</small>}
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required={true}
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required={true}
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <small>{errors.email}</small>}
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
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            required={true}
            value={data.passwordConfirmation}
            onChange={(e) => setData('passwordConfirmation', e.target.value)}
          />
        </div>
        <button type="submit" disabled={processing}>
          Register
        </button>
      </form>
      <Link href={tuyau.$url('auth.login')}>Or login</Link>
    </>
  )
}
