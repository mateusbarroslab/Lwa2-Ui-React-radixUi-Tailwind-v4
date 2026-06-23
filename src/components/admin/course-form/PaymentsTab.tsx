import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { CourseFormValues } from './schema'
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash2 } from 'lucide-react'

export function PaymentsTab({ form }: { form: UseFormReturn<CourseFormValues> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'payment_options_json',
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Formas de Pagamento</h3>
          <p className="text-sm text-muted-foreground">
            Cadastre as opções de pagamento como cards (ex: À vista, Parcelado).
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              title: 'Nova Opção',
              current_price: 'R$ 0,00',
              highlight: false,
              order: fields.length,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Opção
        </Button>
      </div>

      <div className="grid gap-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 border rounded-xl space-y-4 bg-card shadow-sm relative"
          >
            <div className="flex justify-between items-start mb-2">
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.highlight` as const}
                render={({ field: inputField }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <FormLabel className="font-semibold text-primary text-xs cursor-pointer">
                      Destacar Card
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={inputField.value}
                        onCheckedChange={inputField.onChange}
                        className="scale-75 data-[state=unchecked]:bg-primary/20"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive h-8"
                onClick={() => remove(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remover
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.title` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Título (ex: Cartão 12x)</FormLabel>
                    <FormControl>
                      <Input {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.badge` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Badge (ex: Mais Popular)</FormLabel>
                    <FormControl>
                      <Input placeholder="Opcional" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.button_text` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Texto do Botão</FormLabel>
                    <FormControl>
                      <Input placeholder="Matricule-se" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.old_price` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Preço Antigo (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 1.500,00" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.current_price` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Preço Atual</FormLabel>
                    <FormControl>
                      <Input placeholder="12x de R$ 100,00" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.description` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Descrição Curta</FormLabel>
                    <FormControl>
                      <Input placeholder="Opcional" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`payment_options_json.${index}.observation` as const}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Observação (Rodapé)</FormLabel>
                    <FormControl>
                      <Input placeholder="Sujeito a análise" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
            Nenhuma forma de pagamento cadastrada.
          </div>
        )}
      </div>
    </div>
  )
}
