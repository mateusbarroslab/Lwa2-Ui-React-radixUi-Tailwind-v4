import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DashboardShellProps {
  children: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  className?: string
}

export function DashboardShell({ children, sidebar, header, className }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {sidebar && <aside className="flex-shrink-0 border-r bg-muted/20">{sidebar}</aside>}
      <main className={cn('flex-1 flex flex-col min-w-0', className)}>
        {header && (
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            {header}
          </header>
        )}
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
