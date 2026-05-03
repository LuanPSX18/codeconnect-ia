import { AuthLayout } from '../../components/templates/AuthLayout/AuthLayout'
import { LoginForm } from '../../components/organisms/LoginForm/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout bannerSrc="/banner-login.png" bannerAlt="Pessoa programando em ambiente tech com tema verde">
      <LoginForm />
    </AuthLayout>
  )
}
