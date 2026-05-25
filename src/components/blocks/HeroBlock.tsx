import { Button } from '@/components/ui/button'
import { ArrowRight, Terminal } from 'lucide-react'

export function HeroBlock() {
  return (
    <div className="w-full rounded-xl border bg-background overflow-hidden flex flex-col md:flex-row shadow-sm">
      <div className="flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-16 gap-6">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit bg-muted/50 text-muted-foreground">
          <Terminal className="mr-1.5 h-3 w-3" /> v2.0 Release Candidate
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Next-generation tooling for modern teams.
        </h1>
        <p className="text-muted-foreground text-lg max-w-[500px]">
          Streamline your workflow with high-density components, powerful application patterns, and
          seamless integrations.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <Button size="lg" className="h-12 px-8">
            Start Building
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 group">
            Documentation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-[300px] md:min-h-auto bg-muted/30 relative overflow-hidden border-l">
        {/* Placeholder abstract technical visualization */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-primary/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-primary/20 shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)]" />
      </div>
    </div>
  )
}
