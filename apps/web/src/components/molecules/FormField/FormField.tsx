import { Label } from '../../atoms/Label/Label'
import { Input } from '../../atoms/Input/Input'

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function FormField({ id, label, type = 'text', placeholder, value, onChange, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}
