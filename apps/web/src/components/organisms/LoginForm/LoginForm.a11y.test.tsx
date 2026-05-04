import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { runAxe } from '../../../testUtils/axe'

describe('LoginForm a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
