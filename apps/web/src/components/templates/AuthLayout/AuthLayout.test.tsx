import { render, screen } from '@testing-library/react'
import { AuthLayout } from './AuthLayout'

describe('AuthLayout', () => {
  it('renders banner with given src and alt', () => {
    render(
      <AuthLayout bannerSrc="/banner-login.png" bannerAlt="Pessoa programando">
        <p>Form here</p>
      </AuthLayout>
    )
    const img = screen.getByAltText('Pessoa programando')
    expect(img).toHaveAttribute('src', '/banner-login.png')
  })

  it('renders children in the content slot', () => {
    render(
      <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner">
        <h1>Login</h1>
      </AuthLayout>
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })
})
