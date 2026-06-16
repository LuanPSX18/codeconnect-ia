import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders Login heading', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders banner with correct src', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    const img = screen.getByAltText('Pessoa programando em ambiente tech com tema verde')
    expect(img).toHaveAttribute('src', '/banner-login.png')
  })
})
