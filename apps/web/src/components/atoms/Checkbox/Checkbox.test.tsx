import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('reflects checked prop', () => {
    render(<Checkbox id="cb" label="Lembrar-me" checked={true} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange with toggled value when checkbox clicked', async () => {
    const handleChange = vi.fn()
    render(<Checkbox id="cb" label="Lembrar-me" checked={false} onChange={handleChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange when label is clicked', async () => {
    const handleChange = vi.fn()
    render(<Checkbox id="cb" label="Lembrar-me" checked={false} onChange={handleChange} />)
    await userEvent.click(screen.getByText('Lembrar-me'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })
})
