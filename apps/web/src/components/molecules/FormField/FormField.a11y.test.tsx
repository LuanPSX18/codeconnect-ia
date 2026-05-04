import { render } from '@testing-library/react'
import { FormField } from './FormField'
import { runAxe } from '../../../testUtils/axe'

describe('FormField a11y', () => {
  it('has no WCAG 2 AA violations (text)', async () => {
    const { container } = render(
      <FormField id="name" label="Nome" value="" onChange={() => {}} placeholder="Nome completo" />
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations (password, required)', async () => {
    const { container } = render(
      <FormField
        id="password"
        label="Senha"
        type="password"
        value=""
        onChange={() => {}}
        placeholder="••••••"
        required
      />
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
