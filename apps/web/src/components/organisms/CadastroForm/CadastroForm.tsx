import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Divider } from '../../atoms/Divider/Divider'
import { TextLink } from '../../atoms/TextLink/TextLink'
import { FormField } from '../../molecules/FormField/FormField'
import { SocialLoginButton } from '../../molecules/SocialLoginButton/SocialLoginButton'

interface CadastroFormData {
  name: string
  email: string
  password: string
  remember: boolean
}

interface CadastroFormProps {
  onSubmit?: (data: CadastroFormData) => void
}

export function CadastroForm({ onSubmit }: CadastroFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const data = { name, email, password, remember }
    if (onSubmit) {
      onSubmit(data)
    } else {
      console.log('Cadastro payload:', data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Cadastro</h1>
        <p className="text-sm text-text-muted">Olá! Preencha seus dados.</p>
      </div>

      <FormField
        id="name"
        label="Nome"
        type="text"
        placeholder="Nome completo"
        value={name}
        onChange={setName}
        required
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={setEmail}
        required
      />

      <div className="flex flex-col gap-2">
        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={setPassword}
          required
        />
        <Checkbox id="remember" label="Lembrar-me" checked={remember} onChange={setRemember} />
      </div>

      <Button type="submit" endIcon={<>→</>}>Cadastrar</Button>

      <Divider>ou entre com outras contas</Divider>

      <div className="grid grid-cols-2 gap-3">
        <SocialLoginButton iconSrc="/github.png" iconAlt="Github" label="Github" />
        <SocialLoginButton iconSrc="/gmail.png" iconAlt="Gmail" label="Gmail" />
      </div>

      <p className="text-sm text-center text-text-muted">
        Já tem conta?{' '}
        <TextLink to="/login">Faça seu login!</TextLink>
      </p>
    </form>
  )
}
