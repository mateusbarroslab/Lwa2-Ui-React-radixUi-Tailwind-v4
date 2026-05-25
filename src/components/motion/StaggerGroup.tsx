import { HTMLAttributes, Children, isValidElement } from 'react'
import { cn } from '@/lib/utils'

export interface StaggerGroupProps extends HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number
  initialDelay?: number
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  ...props
}: StaggerGroupProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <div
              className="animate-slide-up opacity-0"
              style={{
                animationDelay: `${initialDelay + index * staggerDelay}ms`,
                animationFillMode: 'forwards',
              }}
            >
              {child}
            </div>
          )
        }
        return child
      })}
    </div>
  )
}
