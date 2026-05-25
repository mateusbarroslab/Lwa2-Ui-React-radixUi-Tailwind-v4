import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  id: string | number
  title: string
  description: string
  time: string
  status: 'success' | 'pending' | 'error'
  user: string
}

export interface ActivityTimelineProps {
  items?: TimelineItem[]
  className?: string
}

const DEFAULT_TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: 'Deployment Successful',
    description: 'Production build completed and deployed to main branch.',
    time: '12 mins ago',
    status: 'success',
    user: 'System',
  },
  {
    id: 2,
    title: 'Review Requested',
    description: 'Pull request #402 needs review from core team.',
    time: '2 hours ago',
    status: 'pending',
    user: 'Alex',
  },
  {
    id: 3,
    title: 'Build Failed',
    description: 'Integration tests failed on e2e suite.',
    time: 'Yesterday',
    status: 'error',
    user: 'CI/CD',
  },
]

export function ActivityTimeline({
  items = DEFAULT_TIMELINE_DATA,
  className,
}: ActivityTimelineProps) {
  return (
    <div
      className={cn(
        'w-full max-w-md space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent',
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.id} className="relative flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 shrink-0 bg-background rounded-full border z-10 shadow-sm">
            {item.status === 'success' && <CheckCircle2 className="h-5 w-5 text-success" />}
            {item.status === 'pending' && <Circle className="h-5 w-5 text-info" />}
            {item.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
          </div>
          <div className="flex flex-col flex-1 pt-1 min-w-0">
            <div className="flex justify-between items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-foreground truncate">{item.title}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            <div className="mt-2 text-xs font-mono text-muted-foreground/60">by {item.user}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
