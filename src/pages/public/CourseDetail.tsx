import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useSEO } from '@/hooks/use-seo'
import { getCourseBySlug, Course, getCourseImageUrl } from '@/services/courses'

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-expect-error
  const Icon = Icons[name] || Icons.CheckCircle
  return <Icon className={className} />
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const paymentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getCourseBySlug(slug)
      .then(setCourse)
      .catch(() => navigate('/cursos'))
      .finally(() => setLoading(false))
  }, [slug, navigate])

  useSEO(
    course?.title || 'Carregando...',
    course?.short_description ||
      course?.description?.substring(0, 160) ||
      'Detalhes do curso técnico.',
  )

  if (loading || !course)
    return (
      <div className="container py-12 space-y-8 animate-pulse">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-20 w-3/4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )

  const wppNum = course.whatsapp_number || '5511999999999'
  const wppText = encodeURIComponent(`Olá, tenho interesse no curso ${course.title}.`)
  const wppUrl = `https://wa.me/${wppNum}?text=${wppText}`

  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const highlightOption =
    course.payment_options_json?.find((o) => o.highlight) || course.payment_options_json?.[0]
  const hasPayments = course.payment_options_json && course.payment_options_json.length > 0

  return (
    <article className="animate-fade-in bg-background pb-32">
      {/* Hero */}
      <div className="bg-muted/30 border-b relative overflow-hidden">
        <div className="container pt-12 pb-24 lg:pb-32 relative z-10">
          <Button
            variant="ghost"
            asChild
            className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
          >
            <Link to="/cursos">
              <Icons.ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Cursos
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {course.category}
                  </Badge>
                  {course.regulatory_title && (
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary bg-primary/5 px-3 py-1"
                    >
                      <Icons.Award className="w-3 h-3 mr-1.5" /> {course.regulatory_title}
                    </Badge>
                  )}
                  {course.workload && (
                    <Badge variant="outline" className="px-3 py-1">
                      <Icons.Clock className="w-3 h-3 mr-1.5" /> {course.workload}
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                  {course.title}
                </h1>
                {course.short_description && (
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    {course.short_description}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-1"
                  asChild
                >
                  <a href={wppUrl} target="_blank" rel="noreferrer">
                    <Icons.MessageCircle className="mr-2 h-6 w-6" /> Falar no WhatsApp
                  </a>
                </Button>

                {hasPayments && (
                  <button
                    onClick={scrollToPayment}
                    className="text-sm font-medium underline text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    Ver opções de pagamento
                  </button>
                )}
              </div>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-background/50 ring-1 ring-border">
              {course.image ? (
                <img
                  src={getCourseImageUrl(course, course.image)}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Icons.GraduationCap className="h-32 w-32 text-muted-foreground/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Card (Commercial Summary Block) */}
      {highlightOption && (
        <div className="container relative z-20 -mt-12 lg:-mt-16 mb-16">
          <div className="bg-card border shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 animate-slide-up">
            <div className="flex-1 space-y-2 text-center lg:text-left">
              <Badge className="mb-2">{highlightOption.badge || 'Condição Especial'}</Badge>
              <h3 className="text-2xl lg:text-3xl font-bold">{highlightOption.title}</h3>
              <div className="text-4xl lg:text-5xl font-extrabold text-primary">
                {highlightOption.current_price}
              </div>
              {highlightOption.description && (
                <p className="text-muted-foreground text-lg">{highlightOption.description}</p>
              )}
            </div>
            <div className="w-full lg:w-auto flex flex-col gap-4 min-w-[280px]">
              <Button
                asChild
                size="lg"
                className="w-full h-14 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg"
              >
                <a href={wppUrl} target="_blank" rel="noreferrer">
                  <Icons.MessageCircle className="mr-2 h-5 w-5" /> Garantir Vaga
                </a>
              </Button>
              <button
                onClick={scrollToPayment}
                className="text-sm font-semibold underline text-center text-muted-foreground hover:text-primary transition-colors"
              >
                Ver mais formas de pagamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Benefits */}
      {course.benefits_json && course.benefits_json.length > 0 && (
        <div className="container py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.benefits_json
              .filter((b) => b.visible)
              .sort((a, b) => a.order - b.order)
              .map((benefit) => (
                <div
                  key={benefit.id}
                  className="p-6 rounded-2xl border bg-card hover:border-primary/30 transition-all hover:shadow-md group flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={benefit.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
                    {benefit.text && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Main Content Split */}
      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            {/* Technical Skills Block */}
            {course.technical_skill_title && (
              <section className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Icons.Award className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                    Habilitação Profissional
                  </h3>
                  <p className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                    {course.technical_skill_title}
                  </p>
                  {course.technical_skill_subtitle && (
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                      {course.technical_skill_subtitle}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* About Course */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Icons.Info className="h-8 w-8 text-primary" /> Sobre o Curso
              </h2>
              <div
                className="prose prose-slate prose-orange dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </section>

            {/* Regulatory Info Block */}
            {course.regulatory_title && (
              <section className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                    <Icons.Landmark className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {course.regulatory_title}
                    </h3>
                    {(course.regulatory_info || course.council_registration) && (
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {course.regulatory_info}
                        {course.regulatory_info && course.council_registration && ' • '}
                        {course.council_registration && `Registro: ${course.council_registration}`}
                      </p>
                    )}
                  </div>
                  {course.regulatory_url && course.regulatory_link_text && (
                    <Button asChild variant="outline" className="shrink-0 bg-background">
                      <a href={course.regulatory_url} target="_blank" rel="noopener noreferrer">
                        {course.regulatory_link_text}{' '}
                        <Icons.ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </section>
            )}

            {/* Curriculum Viewer */}
            {course.curriculum_json && course.curriculum_json.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  <Icons.BookOpen className="h-8 w-8 text-primary" /> Grade Curricular
                </h2>
                <Accordion type="multiple" className="w-full space-y-4">
                  {course.curriculum_json.map((mod, idx) => (
                    <AccordionItem
                      value={`mod-${idx}`}
                      key={idx}
                      className="border rounded-2xl px-6 bg-card data-[state=open]:border-primary/30 transition-colors shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                        {mod.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pt-2">
                        <ul className="space-y-4">
                          {mod.items.map((item, i) => (
                            <li key={i} className="flex gap-4 items-start text-muted-foreground">
                              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                              <span className="text-[1.05rem] leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {course.curriculum &&
              (!course.curriculum_json || course.curriculum_json.length === 0) && (
                <section className="space-y-8">
                  <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Icons.BookOpen className="h-8 w-8 text-primary" /> Conteúdo Curricular
                  </h2>
                  <div
                    className="prose prose-slate prose-orange dark:prose-invert max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: course.curriculum }}
                  />
                </section>
              )}
          </div>

          <div className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-28">
            {/* Payment Options Section */}
            {hasPayments && (
              <div ref={paymentRef} id="investimento" className="space-y-6 scroll-mt-28">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Icons.CreditCard className="h-6 w-6 text-primary" /> Investimento
                </h3>
                <div className="grid gap-6">
                  {course.payment_options_json
                    ?.sort((a, b) => a.order - b.order)
                    .map((opt) => (
                      <div
                        key={opt.id}
                        className={`p-8 rounded-3xl border relative bg-card ${opt.highlight ? 'border-primary ring-4 ring-primary/10 shadow-2xl' : 'shadow-md'}`}
                      >
                        {opt.badge && (
                          <Badge className="absolute -top-3.5 left-8 shadow-sm text-sm px-3 py-1 bg-primary text-primary-foreground">
                            {opt.badge}
                          </Badge>
                        )}
                        <h4 className="font-semibold text-xl mb-3">{opt.title}</h4>
                        <div className="mb-6">
                          {opt.old_price && (
                            <div className="text-sm text-muted-foreground line-through mb-1.5">
                              {opt.old_price}
                            </div>
                          )}
                          <div className="text-4xl font-extrabold text-foreground">
                            {opt.current_price}
                          </div>
                        </div>
                        {opt.description && (
                          <p className="text-[0.95rem] text-muted-foreground mb-8 leading-relaxed">
                            {opt.description}
                          </p>
                        )}
                        <Button
                          className="w-full h-12 text-base font-bold shadow-sm"
                          variant={opt.highlight ? 'default' : 'outline'}
                          asChild
                        >
                          <a href={wppUrl} target="_blank" rel="noreferrer">
                            {opt.button_text || 'Garantir Vaga'}{' '}
                            <Icons.ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                        {opt.observation && (
                          <p className="text-xs text-center text-muted-foreground/80 mt-5 font-medium">
                            {opt.observation}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Doubt / Support Card */}
            {(!hasPayments || course.payment_options_json?.length === 0) && (
              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center space-y-6 shadow-sm">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icons.Headset className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Ficou com dúvida?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fale com nossa equipe agora mesmo e receba todas as informações sobre valores,
                  turmas e matrículas.
                </p>
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20"
                  asChild
                >
                  <a href={wppUrl} target="_blank" rel="noreferrer">
                    <Icons.MessageCircle className="mr-2 h-6 w-6" /> Falar no WhatsApp
                  </a>
                </Button>
              </div>
            )}

            {course.commercial_observation && (
              <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 text-sm text-muted-foreground text-center">
                {course.commercial_observation}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t lg:hidden z-50 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-none">
        <Button
          size="lg"
          className="w-full h-14 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl shadow-[#25D366]/20"
          asChild
        >
          <a href={wppUrl} target="_blank" rel="noreferrer">
            <Icons.MessageCircle className="mr-2 h-6 w-6" /> Falar no WhatsApp
          </a>
        </Button>
      </div>
    </article>
  )
}
