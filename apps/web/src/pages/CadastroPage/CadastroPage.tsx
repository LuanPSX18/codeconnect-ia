import { AuthLayout } from '../../components/templates/AuthLayout/AuthLayout'
import { CadastroForm } from '../../components/organisms/CadastroForm/CadastroForm'

export function CadastroPage() {
  return (
    <AuthLayout bannerSrc="/banner-login.png" bannerAlt="Pessoa programando em ambiente tech com tema verde">
      <CadastroForm />
    </AuthLayout>
  )
}
