import { ComponentPreview } from '@/components/catalog/ComponentPreview'
import { AgentPanel } from '@/components/patterns/AgentPanel'
import { MetricCard } from '@/components/patterns/MetricCard'
import { ActivityTimeline } from '@/components/patterns/ActivityTimeline'
import { Users, DollarSign, Activity } from 'lucide-react'

export default function Patterns() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Application Patterns</h1>
        <p className="text-muted-foreground max-w-2xl">
          Complex, composed structures that solve common operational UI needs. Ready to drop into
          your views.
        </p>
      </div>

      <div className="mt-8">
        <ComponentPreview
          title="Agent Panel"
          description="A comprehensive status and control card for automated agents or background processes."
        >
          <AgentPanel />
        </ComponentPreview>

        <ComponentPreview
          title="Metric Cards"
          description="Standardized KPI display cards with trend indicators."
        >
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <MetricCard
              title="Total Revenue"
              value="$45,231.89"
              trend="up"
              trendValue="+20.1%"
              timeframe="from last month"
              icon={DollarSign}
            />
            <MetricCard
              title="Active Users"
              value="+2350"
              trend="up"
              trendValue="+180.1%"
              timeframe="from last month"
              icon={Users}
            />
            <MetricCard
              title="Error Rate"
              value="1.2%"
              trend="down"
              trendValue="-0.5%"
              timeframe="from yesterday"
              icon={Activity}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Activity Timeline"
          description="Chronological feed of system or user events."
        >
          <div className="bg-card p-6 rounded-lg border shadow-sm w-full max-w-md">
            <ActivityTimeline />
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
