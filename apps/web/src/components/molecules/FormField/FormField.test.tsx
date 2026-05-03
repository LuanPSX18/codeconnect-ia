import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { FormField } from './FormField'

function Wrapper({ onChange }: { onChange?: (v: string) => void }) {
  const [value, setValue] = useState('')
  return (
    <FormField
      id="email"
      label="Email"
      value={value}
      onChange={(v) => { setValue(v); onChange?.(v) }}
    />
  )
}

describe('FormField', () => {
  it('associates label with input via htmlFor/id', () => {
    render(<FormField id="email" label="Email ou usuário" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })

  it('fires onChange and input reflects typed value', async () => {
    render(<Wrapper />)
    await userEvent.type(screen.getByRole('textbox'), 'test@test.com')
    expect(screen.getByRole('textbox')).toHaveValue('test@test.com')
  })

  it('passes type to input', () => {
    render(<FormField id="pwd" label="Senha" type="password" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })
})
