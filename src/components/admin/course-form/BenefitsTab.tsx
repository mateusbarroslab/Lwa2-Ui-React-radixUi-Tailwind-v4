import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { CourseFormValues } from './schema'
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash2 } from 'lucide-react'

export function BenefitsTab({ form }: { form: UseFormReturn<CourseFormValues> }) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'benefits_json' })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Diferenciais do Curso</h3>
          <p className="text-sm text-muted-foreground">
            Destaque os benefícios que convertem alunos.
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              icon: 'CheckCircle',
              title: 'Novo Diferencial',
              visible: true,
              order: fields.length,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Diferencial
        </Button>
      </div>

      <div className="grid gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border rounded-lg grid gap-4 grid-cols-12 items-start bg-card"
          >
            <div className="col-span-12 md:col-span-2">
              <FormField
                control={form.control}
                name={`benefits_json.${index}.icon` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Ícone</FormLabel>
                    <Select onValueChange={inputField.onChange} defaultValue={inputField.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CheckCircle">Check</SelectItem>
                        <SelectItem value="Star">Estrela</SelectItem>
                        <SelectItem value="Award">Medalha</SelectItem>
                        <SelectItem value="BookOpen">Livro</SelectItem>
                        <SelectItem value="Briefcase">Maleta</SelectItem>
                        <SelectItem value="Clock">Relógio</SelectItem>
                        <SelectItem value="Shield">Escudo</SelectItem>
                        <SelectItem value="Zap">Raio</SelectItem>
                        <SelectItem value="TrendingUp">Gráfico</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FormField
                control={form.control}
                name={`benefits_json.${index}.title` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FormField
                control={form.control}
                name={`benefits_json.${index}.text` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Texto Opcional</FormLabel>
                    <FormControl>
                      <Input {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-2 h-full justify-between">
              <FormField
                control={form.control}
                name={`benefits_json.${index}.visible` as const}
                render={({ field: inputField }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 mt-2">
                    <FormLabel className="text-xs font-semibold">Exibir</FormLabel>
                    <FormControl>
                      <Switch checked={inputField.value} onCheckedChange={inputField.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive mt-auto"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Remover
              </Button>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
            Nenhum diferencial cadastrado.
          </div>
        )}
      </div>
    </div>
  )
}
