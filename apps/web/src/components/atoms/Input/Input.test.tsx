import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders with given id, type and placeholder', () => {
    render(<Input id="email" type="email" placeholder="you@example.com" />)
    const input = screen.getByPlaceholderText('you@example.com')
    expect(input).toHaveAttribute('id', 'email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('fires onChange with typed value', async () => {
    const handleChange = vi.fn()
    render(<Input id="test" onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })
})
