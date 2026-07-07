import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react'
import { useSEO } from '@/hooks/use-seo'
import { useSettingsContext } from '@/hooks/use-settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { createContact } from '@/services/contacts'
import { getCourses, Course } from '@/services/courses'
import { getErrorMessage } from '@/lib/pocketbase/errors'

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido').or(z.literal('')),
  whatsapp: z.string().refine((v) => {
    const digits = v.replace(/\D/g, '')
    return digits.length === 10 || digits.length === 11
  }, 'Telefone deve ter 10 ou 11 dígitos (DDD + número)'),
  message: z.string().min(10, 'A mensagem deve ter no mínimo 10 caracteres'),
  course_id: z.string().optional(),
})

export default function Contact() {
  useSEO(
    'Contato',
    'Fale com a Primeira Conquista. Tire suas dúvidas, peça informações ou agende uma visita.',
  )

  const [submitting, setSubmitting] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])

  const { settings } = useSettingsContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', whatsapp: '', message: '', course_id: '' },
  })

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(() => {})
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    try {
      const { email, course_id, ...rest } = values
      const payload: Record<string, unknown> = { ...rest }
      if (email) payload.email = email
      if (course_id) payload.course_id = course_id
      await createContact(payload)
      toast({
        title: 'Mensagem enviada!',
        description: 'Entraremos em contato com você o mais breve possível.',
        variant: 'default',
      })
      form.reset()
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Fale Conosco</h1>
          <p className="text-lg text-muted-foreground">
            Estamos prontos para tirar todas as suas dúvidas.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-primary/5 border-primary/20 border p-8 rounded-3xl space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-6 text-primary">Informações de Contato</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Endereço</p>
                      <div className="text-sm text-muted-foreground mt-1">
                        {settings?.address ? (
                          settings.address.split('\n').map((line, i) => <div key={i}>{line}</div>)
                        ) : (
                          <>
                            <div>Rua Coronel Carvalho, 13, 2º Pavimento, Sobreloja 1:A</div>
                            <div>Centro - Angra dos Reis</div>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Telefone / WhatsApp</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {settings?.phone || '(24) 99293-4189'}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {settings?.email || 'contato@primeiraconquista.com.br'}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative border bg-card p-8 rounded-3xl shadow-sm">
              {submitting && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-background/40 backdrop-blur-sm animate-fade-in">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" disabled={submitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu Telefone Whatsapp"
                              disabled={submitting}
                              {...field}
                              onChange={(e) => field.onChange(maskPhone(e.target.value))}
                              inputMode="numeric"
                            />
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
                        <FormLabel>E-mail (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="seu@email.com"
                            disabled={submitting}
                            {...field}
                          />{' '}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="course_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Curso de Interesse (opcional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger disabled={submitting}>
                              <SelectValue placeholder="Selecione um curso" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.title}
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Como podemos te ajudar?"
                            className="min-h-[150px] resize-none"
                            disabled={submitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <span className="inline-flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
