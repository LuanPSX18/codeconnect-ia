import { render } from '@testing-library/react'
import { Button } from './Button'
import { runAxe } from '../../../testUtils/axe'

describe('Button a11y', () => {
  it('has no WCAG 2 AA violations (default)', async () => {
    const { container } = render(<Button>Entrar</Button>)
    expect(await runAxe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations (with endIcon)', async () => {
    const { container } = render(
      <Button endIcon={<span>→</span>}>Entrar</Button>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations (disabled)', async () => {
    const { container } = render(<Button disabled>Entrar</Button>)
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
