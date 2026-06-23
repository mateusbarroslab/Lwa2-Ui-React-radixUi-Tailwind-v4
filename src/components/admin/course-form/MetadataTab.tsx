import { UseFormReturn } from 'react-hook-form'
import { CourseFormValues } from './schema'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export function MetadataTab({ form }: { form: UseFormReturn<CourseFormValues> }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4 border p-4 rounded-lg bg-card">
        <h3 className="font-semibold border-b pb-2">Informações Regulatórias</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="regulatory_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título (Ex: Reconhecido pelo MEC)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="council_registration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conselho (Ex: CREA, COREN)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regulatory_link_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto do Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regulatory_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="national_validity"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-4 border rounded-lg col-span-2">
                <FormLabel>Validade Nacional</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4 border p-4 rounded-lg bg-card">
        <h3 className="font-semibold border-b pb-2">Comercial & Conversão</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="whatsapp_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp (Somente números, ex: 5511999999999)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="completion_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempo de Conclusão (Ex: 18 meses)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commercial_observation"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Observação Comercial</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material_included"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-4 border rounded-lg">
                <FormLabel>Material Incluso</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fixed_monthly_fee"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-4 border rounded-lg">
                <FormLabel>Mensalidade Fixa</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
