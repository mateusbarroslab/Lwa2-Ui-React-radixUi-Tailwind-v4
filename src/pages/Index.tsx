import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Layers, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { STATS } from '@/content/data'

export default function Index() {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="space-y-4">
        <div className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-2 shadow-sm">
          <Zap className="mr-2 h-4 w-4" />
          Technical UI Factory
        </div>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Build better products, faster.
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px]">
          A modular visual catalog for LWA2 internal projects. High-density, premium, and reusable
          components built on top of Radix UI and Tailwind CSS.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="bg-background/60 backdrop-blur shadow-sm border-border/50 transition-colors hover:border-primary/20"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tighter">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="border-t border-border/50 pt-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Quick Navigation</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow group cursor-pointer border-border/50">
            <Link to="/components">
              <CardHeader>
                <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle>Core Components</CardTitle>
                <CardDescription>
                  Browse all primitives, inputs, and interactive elements.
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow group cursor-pointer border-border/50">
            <Link to="/patterns">
              <CardHeader>
                <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>Application Patterns</CardTitle>
                <CardDescription>
                  Complex structures ready to drop into your operational views.
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
