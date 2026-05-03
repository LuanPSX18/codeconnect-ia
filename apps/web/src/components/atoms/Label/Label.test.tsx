import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label', () => {
  it('renders with correct htmlFor attribute', () => {
    render(<Label htmlFor="email">Email</Label>)
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })

  it('renders children', () => {
    render(<Label htmlFor="pwd">Senha</Label>)
    expect(screen.getByText('Senha')).toBeInTheDocument()
  })
})
