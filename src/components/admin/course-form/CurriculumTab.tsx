import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { CourseFormValues } from './schema'
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, GripVertical } from 'lucide-react'

function ModuleItems({
  moduleIndex,
  form,
}: {
  moduleIndex: number
  form: UseFormReturn<CourseFormValues>
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `curriculum_json.${moduleIndex}.items` as const,
  })
  return (
    <div className="pl-6 space-y-2 mt-4 border-l-2 border-primary/20">
      {fields.map((f, i) => (
        <div key={f.id} className="flex gap-2 items-center">
          <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-move" />
          <FormField
            control={form.control}
            name={`curriculum_json.${moduleIndex}.items.${i}.value` as const}
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl>
                  <Input placeholder="Nome do Tópico ou Disciplina" {...field} className="h-9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-destructive"
            onClick={() => remove(i)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 mt-2"
        onClick={() => append({ value: '' })}
      >
        <Plus className="mr-2 h-3 w-3" /> Adicionar Tópico
      </Button>
    </div>
  )
}

export function CurriculumTab({ form }: { form: UseFormReturn<CourseFormValues> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'curriculum_json',
  })
  const legacyHtml = form.getValues('curriculum')

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Construtor de Grade Curricular</h3>
          <p className="text-sm text-muted-foreground">
            Crie os módulos e disciplinas do curso visualmente.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => append({ title: 'Novo Módulo', items: [{ value: '' }] })}
        >
          <Plus className="mr-2 h-4 w-4" /> Módulo
        </Button>
      </div>

      {legacyHtml && fields.length === 0 && (
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 text-orange-600 rounded-lg text-sm mb-4">
          <strong>Aviso:</strong> Este curso possui uma grade curricular no formato antigo (HTML).
          Por favor, reescreva-a utilizando os módulos abaixo para melhor visualização na página.
        </div>
      )}

      {fields.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
          Nenhum módulo cadastrado ainda.
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-5 border rounded-xl bg-card shadow-sm">
            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name={`curriculum_json.${index}.title` as const}
                render={({ field: inputField }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        className="font-semibold text-lg h-12 bg-muted/50"
                        placeholder="Nome do Módulo (ex: Módulo 1 - Introdução)"
                        {...inputField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                className="text-destructive h-12"
                onClick={() => remove(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remover Módulo
              </Button>
            </div>
            <ModuleItems moduleIndex={index} form={form} />
          </div>
        ))}
      </div>
    </div>
  )
}
