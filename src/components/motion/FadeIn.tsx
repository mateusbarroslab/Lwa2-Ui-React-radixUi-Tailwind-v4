import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 300,
  style,
  ...props
}: FadeInProps) {
  return (
    <div
      className={cn('animate-fade-in opacity-0', className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: 'forwards',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
