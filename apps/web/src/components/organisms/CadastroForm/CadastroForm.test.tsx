import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CadastroForm } from './CadastroForm'

function renderForm(onSubmit?: (data: { name: string; email: string; password: string; remember: boolean }) => void) {
  return render(
    <MemoryRouter>
      <CadastroForm onSubmit={onSubmit} />
    </MemoryRouter>
  )
}

describe('CadastroForm', () => {
  it('calls onSubmit with name, email, password and remember=false by default', async () => {
    const handleSubmit = vi.fn()
    renderForm(handleSubmit)

    await userEvent.type(screen.getByLabelText('Nome'), 'João Silva')
    await userEvent.type(screen.getByLabelText('Email'), 'joao@test.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'João Silva',
      email: 'joao@test.com',
      password: 'secret123',
      remember: false,
    })
  })

  it('reflects remember=true in submit payload when toggled', async () => {
    const handleSubmit = vi.fn()
    renderForm(handleSubmit)

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana')
    await userEvent.type(screen.getByLabelText('Email'), 'ana@test.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'pass')
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ remember: true })
    )
  })

  it('link de login aponta para /login', () => {
    renderForm()
    const link = screen.getByRole('link', { name: /faça seu login/i })
    expect(link).toHaveAttribute('href', '/login')
  })
})
