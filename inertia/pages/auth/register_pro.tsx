import { FormEvent } from 'react'
import { useForm } from '@inertiajs/react'

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

    post('/auth/register/pro', {
      onFinish() {
        reset('password', 'passwordConfirmation')
      },
    })
  }

  return (
    <>
      <h1>Register pro page</h1>
      <form onSubmit={submit} className="w-80">
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
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
        </div>
        <button type="submit" disabled={processing}>
          Register
        </button>
      </form>
    </>
  )
}
