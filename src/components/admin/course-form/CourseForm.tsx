import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { courseFormSchema, type CourseFormValues } from './schema'
import { BasicInfoTab } from './BasicInfoTab'
import { MetadataTab } from './MetadataTab'
import { CurriculumTab } from './CurriculumTab'
import { BenefitsTab } from './BenefitsTab'
import { PaymentsTab } from './PaymentsTab'

export function CourseForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  initialFile,
}: {
  initialValues: CourseFormValues
  onSubmit: (values: CourseFormValues, file: File | null) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
  initialFile?: File | null
}) {
  const [file, setFile] = useState<File | null>(initialFile || null)
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && !form.getFieldState('slug').isDirty) {
        const slug = value.title
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
        form.setValue('slug', slug || '')
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(v, file))} className="space-y-6 pt-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 p-1.5 bg-muted">
            <TabsTrigger value="basic" className="flex-1">
              Informações Básicas
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex-1">
              Ficha Técnica
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="flex-1">
              Grade Curricular
            </TabsTrigger>
            <TabsTrigger value="benefits" className="flex-1">
              Diferenciais
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex-1">
              Investimento
            </TabsTrigger>
          </TabsList>

          <div className="pt-6">
            <TabsContent value="basic" className="m-0 focus-visible:outline-none">
              <BasicInfoTab form={form} file={file} setFile={setFile} />
            </TabsContent>
            <TabsContent value="metadata" className="m-0 focus-visible:outline-none">
              <MetadataTab form={form} />
            </TabsContent>
            <TabsContent value="curriculum" className="m-0 focus-visible:outline-none">
              <CurriculumTab form={form} />
            </TabsContent>
            <TabsContent value="benefits" className="m-0 focus-visible:outline-none">
              <BenefitsTab form={form} />
            </TabsContent>
            <TabsContent value="payments" className="m-0 focus-visible:outline-none">
              <PaymentsTab form={form} />
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t mt-8">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? 'Salvando...' : 'Salvar Curso'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
