import { ComponentPreview } from '@/components/catalog/ComponentPreview'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { PricingBlock } from '@/components/blocks/PricingBlock'

export default function Blocks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Layout Blocks</h1>
        <p className="text-muted-foreground max-w-2xl">
          Large-scale page sections. These are isolated macro-components usually taking up the full
          width of their container.
        </p>
      </div>

      <div className="mt-8">
        <ComponentPreview
          title="Hero Block"
          description="A commanding introductory section for landing pages or internal dashboards."
        >
          <HeroBlock />
        </ComponentPreview>

        <ComponentPreview
          title="Pricing Grid"
          description="A standard 3-tier pricing comparison block."
        >
          <PricingBlock />
        </ComponentPreview>
      </div>
    </div>
  )
}
