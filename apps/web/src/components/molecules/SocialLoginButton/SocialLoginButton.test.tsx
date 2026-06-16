import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLoginButton } from './SocialLoginButton'

describe('SocialLoginButton', () => {
  it('renders icon with alt and label', () => {
    render(<SocialLoginButton iconSrc="/github.png" iconAlt="Github" label="Github" />)
    expect(screen.getByAltText('Github')).toBeInTheDocument()
    expect(screen.getByText('Github')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<SocialLoginButton iconSrc="/github.png" iconAlt="Github" label="Github" onClick={handleClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
