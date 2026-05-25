import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SlideUpProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
  distance?: number
}

export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 400,
  distance = 20,
  style,
  ...props
}: SlideUpProps) {
  return (
    <div
      className={cn('animate-slide-up opacity-0', className)}
      style={
        {
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}ms`,
          animationFillMode: 'forwards',
          '--slide-distance': `${distance}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}
