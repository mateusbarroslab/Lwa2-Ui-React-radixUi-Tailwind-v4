import { Bot, MoreVertical, Play, Square, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export interface AgentPanelProps {
  title?: string
  description?: string
  version?: string
  statusText?: string
  queueCurrent?: number
  queueTotal?: number
  isActive?: boolean
  className?: string
  onStop?: () => void
  onRestart?: () => void
  onConfig?: () => void
}

export function AgentPanel({
  title = 'Triage Intelligence',
  description = 'System routing & labeling',
  version = '2.4.1',
  statusText = 'Active (Processing)',
  queueCurrent = 1204,
  queueTotal = 5000,
  isActive = true,
  className,
  onStop,
  onRestart,
  onConfig,
}: AgentPanelProps) {
  const progress = Math.min(100, Math.max(0, (queueCurrent / queueTotal) * 100))

  return (
    <Card className={cn('w-full max-w-md shadow-sm border-border/50', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mt-2">
          {isActive ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
          ) : (
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-muted-foreground"></span>
            </span>
          )}
          <span className="text-sm font-medium text-muted-foreground">{statusText}</span>
          <Badge variant="secondary" className="ml-auto font-mono text-[10px] uppercase">
            v{version}
          </Badge>
        </div>

        <div className="space-y-2 rounded-md bg-muted/50 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Current Queue</span>
            <span className="font-mono font-medium">
              {queueCurrent.toLocaleString()} / {queueTotal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2 border-t bg-muted/20 px-6 py-3">
        <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={onStop}>
          <Square className="mr-1.5 h-3.5 w-3.5" /> Stop
        </Button>
        <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={onRestart}>
          <Play className="mr-1.5 h-3.5 w-3.5" /> Restart
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
          onClick={onConfig}
        >
          <Settings2 className="mr-1.5 h-3.5 w-3.5" /> Config
        </Button>
      </CardFooter>
    </Card>
  )
}
