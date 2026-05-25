import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PropDef {
  name: string
  type: string
  default: string
  description: string
}

interface ComponentPreviewProps {
  title: string
  description: string
  propsData?: PropDef[]
  children: React.ReactNode
}

export function ComponentPreview({
  title,
  description,
  propsData,
  children,
}: ComponentPreviewProps) {
  return (
    <div
      className="flex flex-col gap-6 mb-12 border-b pb-12 last:border-0 last:pb-0 animate-slide-up opacity-0"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between pb-4">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 space-x-6">
            <TabsTrigger
              value="preview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 font-medium"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="props"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 font-medium"
              disabled={!propsData || propsData.length === 0}
            >
              Props
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="mt-0">
          <div className="rounded-lg border bg-dot-pattern flex min-h-[300px] w-full items-center justify-center p-10 bg-grid-pattern relative overflow-hidden">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] -z-10" />
            <div className="relative z-10 w-full max-w-4xl flex flex-wrap items-center justify-center gap-6">
              {children}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="props" className="mt-0">
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[150px]">Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[150px]">Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propsData?.map((prop) => (
                  <TableRow key={prop.name}>
                    <TableCell className="font-mono text-xs">{prop.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{prop.default}</TableCell>
                    <TableCell className="text-sm">{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
