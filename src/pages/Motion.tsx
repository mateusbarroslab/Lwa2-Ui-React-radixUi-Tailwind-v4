import { ComponentPreview } from '@/components/catalog/ComponentPreview'
import { Card, CardContent } from '@/components/ui/card'
import { MousePointerClick } from 'lucide-react'

export default function Motion() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Motion & Interaction</h1>
        <p className="text-muted-foreground max-w-2xl">
          CSS-based animations and transitions to provide feedback and guide attention.
        </p>
      </div>

      <div className="mt-8">
        <ComponentPreview
          title="Entrance Animations"
          description="Standard animations for elements entering the viewport."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
            <div className="space-y-2 text-center">
              <div className="text-sm font-mono text-muted-foreground mb-4">.animate-fade-in</div>
              <Card className="h-32 flex items-center justify-center bg-primary/5 animate-fade-in shadow-sm border-primary/20">
                <span className="font-medium">Fades In</span>
              </Card>
            </div>

            <div className="space-y-2 text-center">
              <div className="text-sm font-mono text-muted-foreground mb-4">.animate-slide-up</div>
              <Card className="h-32 flex items-center justify-center bg-primary/5 animate-slide-up shadow-sm border-primary/20">
                <span className="font-medium">Slides Up</span>
              </Card>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Micro-interactions"
          description="Hover and active states for interactive elements."
        >
          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            <div className="flex flex-col items-center gap-3">
              <button className="h-16 px-8 rounded-lg bg-card border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm active:scale-95 flex items-center gap-2 font-medium">
                <MousePointerClick className="h-5 w-5 text-primary" /> Lift & Press
              </button>
              <span className="text-xs text-muted-foreground font-mono">
                hover:-translate-y-1 active:scale-95
              </span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="group relative h-16 px-8 rounded-lg bg-card border shadow-sm flex items-center justify-center overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-primary/10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 font-medium">Reveal Background</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                group-hover:translate-y-0
              </span>
            </div>
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
