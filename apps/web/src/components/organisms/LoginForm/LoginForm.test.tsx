import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LoginForm } from './LoginForm'

function renderForm(onSubmit?: (data: { email: string; password: string; remember: boolean }) => void) {
  return render(
    <MemoryRouter>
      <LoginForm onSubmit={onSubmit} />
    </MemoryRouter>
  )
}

describe('LoginForm', () => {
  it('calls onSubmit with email, password and remember=false by default', async () => {
    const handleSubmit = vi.fn()
    renderForm(handleSubmit)

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'user@test.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'secret123',
      remember: false,
    })
  })

  it('reflects remember=true in submit payload when toggled', async () => {
    const handleSubmit = vi.fn()
    renderForm(handleSubmit)

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'a@b.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'pass')
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ remember: true })
    )
  })

  it('link de cadastro aponta para /cadastro', () => {
    renderForm()
    const link = screen.getByRole('link', { name: /crie seu cadastro/i })
    expect(link).toHaveAttribute('href', '/cadastro')
  })
})
