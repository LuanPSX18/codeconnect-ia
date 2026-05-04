import { render } from '@testing-library/react'
import { Checkbox } from './Checkbox'
import { runAxe } from '../../../testUtils/axe'

describe('Checkbox a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <Checkbox id="remember" label="Lembrar-me" checked={false} onChange={() => {}} />
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations when checked', async () => {
    const { container } = render(
      <Checkbox id="remember" label="Lembrar-me" checked={true} onChange={() => {}} />
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
