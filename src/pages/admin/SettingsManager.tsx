import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { Settings, getSettings, updateSettings, getSettingsImageUrl } from '@/services/settings'

const formSchema = z.object({
  whatsapp: z.string().min(1, 'WhatsApp é obrigatório'),
  phone: z.string().optional(),
  email: z.string().email('E-mail inválido'),
  address: z.string().optional(),
})

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [logoHeader, setLogoHeader] = useState<File | null>(null)
  const [logoFooter, setLogoFooter] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { whatsapp: '', phone: '', email: '', address: '' },
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await getSettings()
      setSettings(data)
      if (data) {
        form.reset({
          whatsapp: data.whatsapp || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
        })
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar configurações',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!settings) return
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('whatsapp', values.whatsapp)
      formData.append('phone', values.phone || '')
      formData.append('email', values.email)
      formData.append('address', values.address || '')

      if (logoHeader) formData.append('logo_header', logoHeader)
      if (logoFooter) formData.append('logo_footer', logoFooter)

      await updateSettings(settings.id, formData)
      toast({ title: 'Sucesso', description: 'Configurações atualizadas com sucesso!' })
      setLogoHeader(null)
      setLogoFooter(null)
      loadSettings()
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao salvar configurações', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="p-8 animate-pulse text-muted-foreground">Carregando configurações...</div>
    )
  if (!settings)
    return <div className="p-8 text-muted-foreground">Nenhuma configuração encontrada.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configurações Globais</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-card border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp (Apenas números)</FormLabel>
                    <FormControl>
                      <Input placeholder="5524992934189" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (Exibição)</FormLabel>
                    <FormControl>
                      <Input placeholder="(24) 99293-4189" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="contato@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Rua..." rows={4} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                'Salvando...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Salvar Alterações
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Logo do Cabeçalho</h2>
            <div className="flex flex-col gap-4">
              {settings.logo_header && !logoHeader && (
                <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-center h-32 border border-dashed">
                  <img
                    src={getSettingsImageUrl(settings, settings.logo_header)}
                    alt="Logo Header"
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              )}
              {logoHeader && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-center">
                  Nova imagem selecionada: <span className="font-semibold">{logoHeader.name}</span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoHeader(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Logo do Rodapé</h2>
            <div className="flex flex-col gap-4">
              {settings.logo_footer && !logoFooter && (
                <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-center h-32 border border-dashed">
                  <img
                    src={getSettingsImageUrl(settings, settings.logo_footer)}
                    alt="Logo Footer"
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              )}
              {logoFooter && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-center">
                  Nova imagem selecionada: <span className="font-semibold">{logoFooter.name}</span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFooter(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
