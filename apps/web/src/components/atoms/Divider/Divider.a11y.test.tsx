import { render } from '@testing-library/react'
import { Divider } from './Divider'
import { runAxe } from '../../../testUtils/axe'

describe('Divider a11y', () => {
  it('has no WCAG 2 AA violations (no label)', async () => {
    const { container } = render(<Divider />)
    expect(await runAxe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations (with label)', async () => {
    const { container } = render(<Divider>ou entre com outras contas</Divider>)
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
