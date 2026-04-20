import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ label, hint, error, icon, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'h-9 w-full rounded-xl border bg-surface-2 text-sm text-text-primary',
            'placeholder:text-text-tertiary transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
            'hover:border-border-hover',
            icon ? 'pl-9 pr-3' : 'px-3',
            error ? 'border-red-800/60 focus:ring-red-500/30' : 'border-border',
            className
          )}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs text-text-tertiary">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
