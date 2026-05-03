import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Divider } from '../../atoms/Divider/Divider'
import { TextLink } from '../../atoms/TextLink/TextLink'
import { FormField } from '../../molecules/FormField/FormField'
import { SocialLoginButton } from '../../molecules/SocialLoginButton/SocialLoginButton'

interface LoginFormData {
  email: string
  password: string
  remember: boolean
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const data = { email, password, remember }
    if (onSubmit) {
      onSubmit(data)
    } else {
      console.log('Login payload:', data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-1">Login</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Boas-vindas! Faça seu login.</p>
      </div>

      <FormField
        id="email"
        label="Email ou usuário"
        type="text"
        placeholder="usuario123"
        value={email}
        onChange={setEmail}
        required
      />

      <FormField
        id="password"
        label="Senha"
        type="password"
        placeholder="••••••"
        value={password}
        onChange={setPassword}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox id="remember" label="Lembrar-me" checked={remember} onChange={setRemember} />
        <TextLink to="#">Esqueci a senha</TextLink>
      </div>

      <Button type="submit" endIcon={<>→</>}>Login</Button>

      <Divider>ou entre com outras contas</Divider>

      <div className="grid grid-cols-2 gap-3">
        <SocialLoginButton iconSrc="/github.png" iconAlt="Github" label="Github" />
        <SocialLoginButton iconSrc="/gmail.png" iconAlt="Gmail" label="Gmail" />
      </div>

      <p className="text-sm text-center text-[var(--color-text-muted)]">
        Ainda não tem conta?{' '}
        <TextLink to="/cadastro">Crie seu cadastro! 📋</TextLink>
      </p>
    </form>
  )
}
