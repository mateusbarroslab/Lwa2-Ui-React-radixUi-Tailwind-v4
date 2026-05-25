import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function PricingBlock() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: 'Hobby',
          price: '$0',
          desc: 'Perfect for side projects and learning.',
          features: ['Up to 3 projects', 'Basic analytics', 'Community support'],
          cta: 'Start Free',
          variant: 'outline' as const,
        },
        {
          title: 'Pro',
          price: '$29',
          desc: 'For professionals and small teams.',
          features: [
            'Unlimited projects',
            'Advanced analytics',
            '24/7 priority support',
            'Custom domains',
          ],
          cta: 'Upgrade to Pro',
          variant: 'default' as const,
          popular: true,
        },
        {
          title: 'Enterprise',
          price: '$99',
          desc: 'For large scale organizations.',
          features: ['Everything in Pro', 'SSO & SAML', 'Dedicated success manager', 'Custom SLAs'],
          cta: 'Contact Sales',
          variant: 'outline' as const,
        },
      ].map((plan, i) => (
        <Card
          key={i}
          className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-md' : 'shadow-sm'}`}
        >
          {plan.popular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{plan.title}</CardTitle>
            <CardDescription>{plan.desc}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              <span className="text-muted-foreground ml-1">/mo</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant={plan.variant} className="w-full">
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
