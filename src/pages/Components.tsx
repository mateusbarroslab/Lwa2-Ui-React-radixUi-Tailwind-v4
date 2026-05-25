import { ComponentPreview } from '@/components/catalog/ComponentPreview'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { COMPONENT_PROPS } from '@/content/data'
import { Mail } from 'lucide-react'

export default function Components() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Core Components</h1>
        <p className="text-muted-foreground max-w-2xl">
          Fundamental UI elements like buttons, inputs, and badges. Reusable building blocks for all
          interfaces.
        </p>
      </div>

      <div className="mt-8">
        <ComponentPreview
          title="Button"
          description="Displays a button or a component that looks like a button."
          propsData={COMPONENT_PROPS.Button}
        >
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center border-t border-border/50 pt-6">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center border-t border-border/50 pt-6">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Badge"
          description="Displays a badge or a component that looks like a badge."
          propsData={COMPONENT_PROPS.Badge}
        >
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Form Elements"
          description="Inputs, toggles, and labels used to collect data."
        >
          <div className="flex flex-col gap-8 w-full max-w-sm mx-auto bg-card p-6 border rounded-lg shadow-sm">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
              <p className="text-[0.8rem] text-muted-foreground">Enter your work email address.</p>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email-error" className="text-destructive">
                Email
              </Label>
              <Input
                type="email"
                id="email-error"
                placeholder="Email"
                className="border-destructive focus-visible:ring-destructive"
                defaultValue="invalid@email"
              />
              <p className="text-[0.8rem] text-destructive font-medium">
                Please enter a valid email.
              </p>
            </div>

            <div className="flex items-center space-x-2 border-t pt-6">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </div>
        </ComponentPreview>
      </div>
    </div>
  )
}
