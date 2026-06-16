import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders centered children when provided', () => {
    render(<Divider>ou entre com outras contas</Divider>)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })

  it('renders two hr lines without children', () => {
    const { container } = render(<Divider />)
    const lines = container.querySelectorAll('hr')
    expect(lines).toHaveLength(2)
  })
})
