import { Component, Palette, Layers, Box, Blocks, Activity } from 'lucide-react'

export const NAVIGATION = [
  {
    title: 'Overview',
    items: [
      { title: 'Introduction', href: '/', icon: Layers },
      { title: 'Tokens', href: '/tokens', icon: Palette },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { title: 'Core Components', href: '/components', icon: Component },
      { title: 'Application Patterns', href: '/patterns', icon: Box },
      { title: 'Layout Blocks', href: '/blocks', icon: Blocks },
      { title: 'Motion & Interaction', href: '/motion', icon: Activity },
    ],
  },
]

export const COMPONENT_PROPS = {
  Button: [
    {
      name: 'variant',
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      default: "'default'",
      description: 'The visual style of the button.',
    },
    {
      name: 'size',
      type: "'default' | 'sm' | 'lg' | 'icon'",
      default: "'default'",
      description: 'The size of the button.',
    },
    {
      name: 'asChild',
      type: 'boolean',
      default: 'false',
      description: 'Whether to render as a child slot (useful for wrapping links).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables interaction and applies muted styling.',
    },
  ],
  Badge: [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline'",
      default: "'default'",
      description: 'The visual style of the badge.',
    },
  ],
  Card: [
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Additional CSS classes to apply.',
    },
  ],
}

export const STATS = [
  { label: 'Core Components', value: '42', trend: '+3 this week' },
  { label: 'App Patterns', value: '14', trend: '+1 this week' },
  { label: 'Layout Blocks', value: '8', trend: 'Stable' },
  { label: 'Design Tokens', value: '128', trend: 'Synced' },
]
