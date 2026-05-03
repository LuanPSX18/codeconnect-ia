import { AuthLayout } from '../../components/templates/AuthLayout/AuthLayout'

export function CadastroPage() {
  return (
    <AuthLayout bannerSrc="/banner-login.png" bannerAlt="Cadastro CodeConnect">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Cadastro em breve</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Essa página será implementada em breve.
        </p>
      </div>
    </AuthLayout>
  )
}
