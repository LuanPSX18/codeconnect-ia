interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border border-[var(--color-border-subtle)] accent-[var(--color-brand)] cursor-pointer"
      />
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
    </label>
  )
}
