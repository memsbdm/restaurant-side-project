import { tuyau } from '~/core/providers/tuyau'
import { FormEvent, useState } from 'react'
import { useForm } from '@inertiajs/react'

export default function EmailVerification() {
  const { post, processing } = useForm()
  const [isEmailSent, setIsEmailSent] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('verify.email.resend'), {
      onSuccess: () => {
        setIsEmailSent(true)
      },
    })
  }
  return (
    <div>
      <p>
        We've sent you an email with a link to verify your email, please click on that link to
        continue.
      </p>

      <p>
        If you haven't received the email, please check your spam folder, or click on the button
        below.
      </p>

      <form onSubmit={submit}>
        <button type="submit" disabled={processing}>
          Resend
        </button>
      </form>
      {isEmailSent && <span>We've resent the email.</span>}
    </div>
  )
}
