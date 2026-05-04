import { render } from '@testing-library/react'
import { SocialLoginButton } from './SocialLoginButton'
import { runAxe } from '../../../testUtils/axe'

describe('SocialLoginButton a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <SocialLoginButton iconSrc="/github.png" iconAlt="Github" label="Github" />
    )
    expect(await runAxe(container)).toHaveNoViolations()
  })
})
