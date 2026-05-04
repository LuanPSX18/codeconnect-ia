interface SocialLoginButtonProps {
  iconSrc: string
  iconAlt: string
  label: string
  onClick?: () => void
}

export function SocialLoginButton({ iconSrc, iconAlt, label, onClick }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 py-3 px-4 rounded-lg border border-border-subtle bg-transparent hover:bg-input transition-colors"
    >
      <img src={iconSrc} alt={iconAlt} className="w-7 h-7 object-contain" />
      <span className="text-xs text-text-muted">{label}</span>
    </button>
  )
}
