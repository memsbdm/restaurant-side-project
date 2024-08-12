import { tuyau } from '~/core/providers/tuyau'
import { FormEvent, useState } from 'react'
import { useForm } from '@inertiajs/react'

export default function EmailVerification() {
  const { errors, post, processing } = useForm()
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
      {'code' in errors && errors.code === 'E_TOO_MANY_REQUESTS' && 'timer' in errors && (
        <span>
          Pleast wait before sending another email ({errors.timer as number} seconds remaining).
        </span>
      )}
      {isEmailSent && <span>We've resent the email.</span>}
    </div>
  )
}
