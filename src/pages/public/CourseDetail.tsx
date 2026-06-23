import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Clock, FileText, CheckCircle, ArrowLeft, MessageCircle, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useSEO } from '@/hooks/use-seo'
import { getCourseBySlug, Course, getCourseImageUrl } from '@/services/courses'

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getCourseBySlug(slug)
      .then((data) => {
        setCourse(data)
      })
      .catch(() => {
        navigate('/cursos')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug, navigate])

  useSEO(
    course?.title || 'Carregando...',
    course?.description?.replace(/<[^>]*>?/gm, '').substring(0, 160) ||
      'Detalhes do curso técnico.',
  )

  if (loading) {
    return (
      <div className="container py-12 space-y-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-20 w-3/4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (!course) return null

  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(`Olá, tenho interesse no curso ${course.title} e gostaria de receber mais informações.`)}`

  return (
    <article className="animate-fade-in pb-24">
      <div className="bg-muted/30 border-b">
        <div className="container py-12 md:py-20">
          <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground">
            <Link to="/cursos">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Cursos
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm font-medium">
                {course.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground bg-background/50 p-4 rounded-xl border w-fit">
                {course.workload && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Carga Horária: <span className="text-foreground">{course.workload}</span>
                  </div>
                )}
                {course.regulatory_info && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Regulação: <span className="text-foreground">{course.regulatory_info}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-semibold bg-green-500 hover:bg-green-600 text-white"
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-3xl bg-muted border shadow-lg">
              {course.image ? (
                <img
                  src={getCourseImageUrl(course, course.image)}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <GraduationCap className="h-24 w-24 text-primary/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight border-b pb-4">Sobre o Curso</h2>
              <div
                className="prose prose-slate prose-orange dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </section>

            {course.curriculum && (
              <section className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight border-b pb-4">
                  Grade Curricular
                </h2>
                <div
                  className="prose prose-slate prose-orange dark:prose-invert max-w-none bg-muted/20 p-6 md:p-8 rounded-2xl border"
                  dangerouslySetInnerHTML={{ __html: course.curriculum }}
                />
              </section>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border bg-card p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-xl mb-4">Por que fazer este curso?</h3>
              <ul className="space-y-4">
                {[
                  'Alta demanda de profissionais',
                  'Formação rápida e prática',
                  'Mensalidades acessíveis',
                  'Encaminhamento para vagas',
                  'Certificado reconhecido em todo o Brasil',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm font-medium mb-4 text-center">
                  Garantia sua vaga na próxima turma!
                </p>
                <Button
                  className="w-full font-semibold bg-green-500 hover:bg-green-600 text-white"
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Matricule-se Agora
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
