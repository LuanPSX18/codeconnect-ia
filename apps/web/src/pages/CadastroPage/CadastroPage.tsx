import { AuthLayout } from '../../components/templates/AuthLayout/AuthLayout'
import { CadastroForm } from '../../components/organisms/CadastroForm/CadastroForm'

export function CadastroPage() {
  return (
    <AuthLayout
      bannerSrc="/banner-login.png"
      bannerWebpSrc="/banner-login.webp"
      bannerAlt="Pessoa programando em ambiente tech com tema verde"
      bannerWidth={407}
      bannerHeight={636}
    >
      <CadastroForm />
    </AuthLayout>
  )
}
