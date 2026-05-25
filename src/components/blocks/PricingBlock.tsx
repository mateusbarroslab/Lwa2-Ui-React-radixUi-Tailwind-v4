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
import { cn } from '@/lib/utils'

export interface PricingPlan {
  title: string
  price: string
  interval?: string
  description: string
  features: string[]
  ctaText: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  isPopular?: boolean
  popularBadgeText?: string
  onSelect?: () => void
}

export interface PricingBlockProps {
  plans?: PricingPlan[]
  className?: string
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    title: 'Hobby',
    price: '$0',
    interval: '/mo',
    description: 'Perfect for side projects and learning.',
    features: ['Up to 3 projects', 'Basic analytics', 'Community support'],
    ctaText: 'Start Free',
    variant: 'outline',
  },
  {
    title: 'Pro',
    price: '$29',
    interval: '/mo',
    description: 'For professionals and small teams.',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      '24/7 priority support',
      'Custom domains',
    ],
    ctaText: 'Upgrade to Pro',
    variant: 'default',
    isPopular: true,
  },
  {
    title: 'Enterprise',
    price: '$99',
    interval: '/mo',
    description: 'For large scale organizations.',
    features: ['Everything in Pro', 'SSO & SAML', 'Dedicated success manager', 'Custom SLAs'],
    ctaText: 'Contact Sales',
    variant: 'outline',
  },
]

export function PricingBlock({ plans = DEFAULT_PLANS, className }: PricingBlockProps) {
  return (
    <div className={cn('w-full grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {plans.map((plan, i) => (
        <Card
          key={i}
          className={cn(
            'relative flex flex-col',
            plan.isPopular ? 'border-primary shadow-md' : 'shadow-sm',
          )}
        >
          {plan.isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {plan.popularBadgeText || 'Most Popular'}
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{plan.title}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              {plan.interval && <span className="text-muted-foreground ml-1">{plan.interval}</span>}
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
            <Button variant={plan.variant || 'outline'} className="w-full" onClick={plan.onSelect}>
              {plan.ctaText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
