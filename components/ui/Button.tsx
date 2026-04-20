import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
}

const variants: Record<Variant, string> = {
  primary:   'bg-accent text-white hover:bg-accent-hover shadow-glow-sm hover:shadow-glow',
  secondary: 'bg-surface-3 text-text-primary hover:bg-surface-4 border border-border',
  ghost:     'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-2',
  danger:    'bg-transparent text-red-400 hover:bg-red-950/50 border border-red-900/50 hover:border-red-800',
  outline:   'bg-transparent text-text-primary border border-border hover:border-border-hover hover:bg-surface-2',
}

const sizes: Record<Size, string> = {
  xs: 'h-7  px-2.5 text-xs  gap-1.5 rounded-lg',
  sm: 'h-8  px-3   text-sm  gap-2   rounded-lg',
  md: 'h-9  px-4   text-sm  gap-2   rounded-xl',
  lg: 'h-11 px-5   text-base gap-2  rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-150 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-surface-1 disabled:opacity-40 disabled:cursor-not-allowed',
        'active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading
        ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        : icon && <span className="flex-shrink-0">{icon}</span>
      }
      {children}
    </button>
  )
}
