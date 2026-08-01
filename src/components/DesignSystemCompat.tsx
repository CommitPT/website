import { createElement, type ComponentPropsWithoutRef, type ElementType } from 'react'
import FeatureCard from '@/src/components/FeatureCard'

interface TypographyProps extends ComponentPropsWithoutRef<'p'> {
  as?: ElementType
  variant?: string
  color?: 'default' | 'secondary' | 'muted' | 'primary' | 'destructive'
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'premium'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: 'default' | 'secondary' | 'outline' | 'primary' | 'destructive' | 'premium'
}

interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  variant?: string
  size?: string
  tooltip?: string
}

interface AvatarImageProps extends ComponentPropsWithoutRef<'img'> {}

interface AvatarFallbackProps extends ComponentPropsWithoutRef<'span'> {}

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function getTypographyTag(variant?: string) {
  switch (variant) {
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'h5':
      return 'h5'
    case 'h6':
      return 'h6'
    case 'small':
    case 'large':
    case 'lead':
    case 'muted':
    case 'blockquote':
    case 'code':
    case 'overline':
    case 'caption':
      return 'p'
    default:
      return 'p'
  }
}

function getTypographyClasses(variant?: string, color?: TypographyProps['color']) {
  const base = {
    h1: 'text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl',
    h2: 'text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl',
    h3: 'text-xl font-semibold text-text-primary',
    h4: 'text-lg font-semibold text-text-primary',
    h5: 'text-base font-semibold text-text-primary',
    h6: 'text-sm font-semibold text-text-primary',
    p: 'text-sm leading-6 text-muted',
    small: 'text-sm text-muted',
    large: 'text-lg leading-7 text-muted',
    lead: 'text-lg leading-7 text-muted',
    blockquote: 'border-l border-border pl-4 italic text-muted',
    code: 'font-mono text-sm text-text-primary',
    muted: 'text-sm text-muted',
    overline: 'font-mono text-[11px] uppercase tracking-[0.24em] text-git-amber',
    caption: 'text-xs uppercase tracking-[0.2em] text-muted',
  }

  const colorClasses = {
    default: 'text-text-primary',
    secondary: 'text-git-amber',
    muted: 'text-muted',
    primary: 'text-git-add',
    destructive: 'text-git-del',
  }

  return cn(base[variant as keyof typeof base] ?? base.p, color ? colorClasses[color] : undefined)
}

export function Typography({
  as,
  variant = 'p',
  color = 'default',
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = (as ?? getTypographyTag(variant)) as ElementType
  return createElement(Component, { className: cn(getTypographyClasses(variant, color), className), ...props }, children)
}

export function buttonVariants({
  variant = 'default',
  size = 'md',
  className,
}: { variant?: string; size?: string; className?: string } = {}) {
  const base = 'group inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors'
  const variantClasses = {
    default: 'border border-git-add bg-git-add text-ink hover:bg-git-add/90',
    secondary: 'border border-border bg-ink-light text-text-primary hover:border-git-add hover:text-git-add',
    outline: 'border border-border bg-transparent text-text-primary hover:border-git-add hover:text-git-add',
    ghost: 'border border-transparent bg-transparent text-text-primary hover:bg-ink-light',
    destructive: 'border border-git-del bg-git-del text-ink hover:bg-git-del/90',
    premium: 'border border-git-amber/20 bg-git-amber/10 text-git-amber hover:bg-git-amber/20',
  }
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    icon: 'h-10 w-10 p-0',
  }

  return cn(
    base,
    variantClasses[variant as keyof typeof variantClasses] ?? variantClasses.default,
    sizeClasses[size as keyof typeof sizeClasses] ?? sizeClasses.md,
    className
  )
}

export function Button({ variant = 'default', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variantClasses = {
    default: 'border border-border bg-ink-light text-text-primary',
    secondary: 'border border-border bg-ink text-muted',
    outline: 'border border-border bg-transparent text-text-primary',
    primary: 'border border-git-add/20 bg-git-add/10 text-git-add',
    destructive: 'border border-git-del/20 bg-git-del/10 text-git-del',
    premium: 'border border-git-amber/20 bg-git-amber/10 text-git-amber',
  }

  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', variantClasses[variant as keyof typeof variantClasses] ?? variantClasses.default, className)} {...props}>
      {children}
    </span>
  )
}

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-ink-light', className)} {...props}>
      {children}
    </div>
  )
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <img className={cn('aspect-square h-full w-full object-cover', className)} {...props} />
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <span className={cn('flex h-full w-full items-center justify-center text-sm font-medium text-muted', className)} {...props}>
      {children}
    </span>
  )
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-ink-light shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export default Typography
export { FeatureCard }
