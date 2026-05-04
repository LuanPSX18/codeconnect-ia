import { render } from '@testing-library/react'
import { AuthLayout } from './AuthLayout'
import { runAxe } from '../../../testUtils/axe'

describe('AuthLayout a11y', () => {
  it('has no WCAG 2 AA violations with main content', async () => {
    const { container } = render(
      <AuthLayout bannerSrc="/banner.png" bannerAlt="Ilustração de boas-vindas">
        <main>
          <h1>Login</h1>
          <p>Conteúdo de exemplo.</p>
        </main>
      </AuthLayout>
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
