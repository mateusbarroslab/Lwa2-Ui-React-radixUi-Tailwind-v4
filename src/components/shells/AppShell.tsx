import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface AppShellProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  className?: string
}

export function AppShell({ children, header, footer, className }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {header && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}
      <main className={cn('flex-1 flex flex-col', className)}>{children}</main>
      {footer && <footer className="border-t bg-muted/20">{footer}</footer>}
    </div>
  )
}
