interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`relative h-px bg-gradient-to-r from-transparent via-border to-transparent ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
    </div>
  )
}
