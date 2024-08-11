import { InvalidOrExpiredToken } from '~/components/tokens/invalid_or_expired_token'
import { ResetPasswordForm } from '~/components/tokens/reset_password_form'

export default function ResetPassword(props: { token: string; isValid: boolean }) {
  const { token } = props

  return <>{props.isValid ? <ResetPasswordForm token={token} /> : <InvalidOrExpiredToken />}</>
}
