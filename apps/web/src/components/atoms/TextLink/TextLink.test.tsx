import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('renders an anchor with href matching to prop', () => {
    render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: 'Crie seu cadastro!' })
    expect(link).toHaveAttribute('href', '/cadastro')
  })

  it('renders children', () => {
    render(
      <MemoryRouter>
        <TextLink to="#">Esqueci a senha</TextLink>
      </MemoryRouter>
    )
    expect(screen.getByText('Esqueci a senha')).toBeInTheDocument()
  })
})
