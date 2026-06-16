import { AuthLayout } from '../../components/templates/AuthLayout/AuthLayout'
import { LoginForm } from '../../components/organisms/LoginForm/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout
      bannerSrc="/banner-login.png"
      bannerWebpSrc="/banner-login.webp"
      bannerAlt="Pessoa programando em ambiente tech com tema verde"
      bannerWidth={407}
      bannerHeight={636}
    >
      <LoginForm />
    </AuthLayout>
  )
}
