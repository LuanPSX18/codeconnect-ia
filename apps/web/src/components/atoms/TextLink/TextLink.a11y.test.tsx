import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TextLink } from './TextLink'
import { runAxe } from '../../../testUtils/axe'

describe('TextLink a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro</TextLink>
      </MemoryRouter>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
