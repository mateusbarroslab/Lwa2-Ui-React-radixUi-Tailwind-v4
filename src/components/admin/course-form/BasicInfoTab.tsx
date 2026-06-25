import { UseFormReturn } from 'react-hook-form'
import { CourseFormValues } from './schema'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useState, useEffect } from 'react'
import { getCategories, Category } from '@/services/categories'

export function BasicInfoTab({
  form,
  setFile,
}: {
  form: UseFormReturn<CourseFormValues>
  file: File | null
  setFile: (f: File | null) => void
}) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (URL)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={loading ? 'Carregando...' : 'Selecione uma categoria'}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carga Horária</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1200h" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="short_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Curta (Resumo)</FormLabel>
            <FormControl>
              <Textarea className="h-16" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Completa (Sobre o Curso)</FormLabel>
            <FormControl>
              <Textarea className="h-32" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="space-y-2">
          <FormLabel>Imagem de Capa</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between p-4 border rounded-lg h-auto">
              <div className="space-y-0.5">
                <FormLabel>Curso Ativo</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
