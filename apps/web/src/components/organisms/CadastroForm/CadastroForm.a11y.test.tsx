import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CadastroForm } from './CadastroForm'
import { runAxe } from '../../../testUtils/axe'

describe('CadastroForm a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
