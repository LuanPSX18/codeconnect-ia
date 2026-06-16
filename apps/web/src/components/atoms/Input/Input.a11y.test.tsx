import { render } from '@testing-library/react'
import { Input } from './Input'
import { runAxe } from '../../../testUtils/axe'

describe('Input a11y', () => {
  it('has no WCAG 2 AA violations when paired with a label', async () => {
    const { container } = render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" placeholder="usuario@dominio.com" />
      </>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations when standalone', async () => {
    // Standalone input — axe should flag missing accessible name (label).
    const { container } = render(<Input id="standalone" placeholder="placeholder não substitui label" />)
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
