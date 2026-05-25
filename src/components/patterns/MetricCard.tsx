import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string
  trend: 'up' | 'down' | 'neutral'
  trendValue: string
  timeframe: string
  icon?: React.ElementType
}

export function MetricCard({
  title,
  value,
  trend,
  trendValue,
  timeframe,
  icon: Icon = Activity,
}: MetricCardProps) {
  return (
    <Card className="w-full max-w-[280px] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground/50" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono tracking-tight">{value}</div>
        <div className="flex items-center text-xs mt-1">
          <span
            className={cn(
              'flex items-center font-medium',
              trend === 'up' && 'text-emerald-500',
              trend === 'down' && 'text-rose-500',
              trend === 'neutral' && 'text-muted-foreground',
            )}
          >
            {trend === 'up' && <ArrowUpRight className="mr-1 h-3.5 w-3.5" />}
            {trend === 'down' && <ArrowDownRight className="mr-1 h-3.5 w-3.5" />}
            {trendValue}
          </span>
          <span className="ml-1.5 text-muted-foreground/70">{timeframe}</span>
        </div>
      </CardContent>
    </Card>
  )
}
