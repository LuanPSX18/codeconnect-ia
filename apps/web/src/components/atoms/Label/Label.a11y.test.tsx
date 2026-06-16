import { render } from '@testing-library/react'
import { Label } from './Label'
import { runAxe } from '../../../testUtils/axe'

describe('Label a11y', () => {
  it('has no WCAG 2 AA violations when associated with an input', async () => {
    const { container } = render(
      <>
        <Label htmlFor="name">Nome</Label>
        <input id="name" type="text" />
      </>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
