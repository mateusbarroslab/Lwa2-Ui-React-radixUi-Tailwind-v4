import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/hooks/use-seo'
import { useSettingsContext } from '@/hooks/use-settings'
import { getSettingsImageUrl } from '@/services/settings'

export default function Home() {
  useSEO(
    'Início',
    'Acelere sua carreira com os cursos técnicos da Primeira Conquista. Educação de qualidade para o seu futuro.',
  )

  const { settings } = useSettingsContext()

  const heroCoursesImg = settings?.hero_courses_image
    ? getSettingsImageUrl(settings, settings.hero_courses_image)
    : 'https://img.usecurling.com/p/800/800?q=students%20studying&dpr=2'

  const heroInternshipsImg = settings?.hero_internships_image
    ? getSettingsImageUrl(settings, settings.hero_internships_image)
    : 'https://img.usecurling.com/p/800/800?q=internship%20office&dpr=2'

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Hero Section */}
      <section className="container pt-8 md:pt-16">
        <div className="mb-10 animate-fade-in text-center md:text-left space-y-4">
          <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            Matrículas Abertas 2026
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Sua formação, seu estágio, <br className="hidden md:block" />
            Sua <span className="text-primary">Primeira Conquista</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-[700px] md:mx-0 mx-auto">
            <span>
              Cursos técnicos reconhecidos pelo MEC e Programa de Estágios em parceria com CEINEE
              para aproximar estudantes, empresas e oportunidades.
            </span>
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Cursos Técnicos Card */}
          <div className="relative flex flex-col justify-end min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden p-4 md:p-8 group animate-fade-in-up">
            <img
              src={heroCoursesImg}
              alt="Cursos Técnicos"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="relative z-10 bg-background rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Cursos Técnicos</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Formação rápida e prática para quem quer entrar no mercado de trabalho com uma
                profissão definida.
              </p>
              <Button size="lg" asChild className="w-full sm:w-auto font-semibold">
                <Link to="/cursos">
                  Ver Cursos Disponíveis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Programa de Estágios Card */}
          <div
            className="relative flex flex-col justify-end min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden p-4 md:p-8 group animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <img
              src={heroInternshipsImg}
              alt="Programa de Estágios"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="relative z-10 bg-background rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Programa de Estágios</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                <span>
                  Para estudantes, empresas e instituições que buscam uma ponte segura com o mercado
                  de trabalho.
                </span>
              </p>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto font-semibold border-2"
              >
                <Link to="/estagios">
                  Conhecer o Programa <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Por que escolher a Primeira Conquista?
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Nossa metodologia é desenvolvida para garantir que você saia pronto para atuar e se
            destacar.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: 'Aulas Práticas',
              desc: 'Laboratórios equipados para você vivenciar a rotina profissional desde o primeiro dia de aula.',
            },
            {
              icon: GraduationCap,
              title: 'Professores Especialistas',
              desc: 'Corpo docente formado por profissionais que atuam no mercado e conhecem a realidade da profissão.',
            },
            {
              icon: CheckCircle,
              title: 'Reconhecimento MEC',
              desc: 'Todos os nossos cursos são autorizados e reconhecidos pelos órgãos reguladores oficiais.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="rounded-full bg-primary/10 p-4 text-primary mb-6">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Parceria CEINEE */}
      <section className="container">
        <div className="rounded-[2.5rem] bg-card border shadow-md p-6 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-8 justify-between">
          <div className="space-y-6 max-w-xl text-center lg:text-left z-10">
            <h2 className="text-3xl font-extrabold md:text-4xl lg:text-5xl text-[#1E293B] tracking-tight">
              Parceria oficial com CEINEE
            </h2>
            <p className="text-lg text-muted-foreground">
              A CEINEE atua na integração entre estudantes, instituições de ensino, empresas e
              organizações comunitárias, fortalecendo o acesso a programas de estágio.
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                asChild
                className="bg-[#F97316] text-white hover:bg-[#EA580C] border-none shadow-md rounded-xl font-bold w-full sm:w-auto h-14 px-8 text-base"
              >
                <Link to="/estagios">Conhecer Programa de Estágios</Link>
              </Button>
            </div>
          </div>

          <div className="relative w-full max-w-sm flex flex-col items-center gap-6 lg:items-end z-10">
            {/* CEINEE Badge */}
            <div className="w-56 h-56 md:w-64 md:h-64 bg-[#FDE047] rounded-full border-[10px] border-white shadow-xl flex items-center justify-center relative flex-shrink-0">
              <div className="w-32 h-32 text-black">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <circle cx="50" cy="28" r="16" />
                  <path d="M 15 80 C 15 45, 85 45, 85 80" />
                  <circle cx="50" cy="65" r="17" fill="black" stroke="none" />
                  <path
                    d="M 40 55 Q 46 60 52 56 T 60 62 Q 55 70 45 66 Z"
                    fill="#FDE047"
                    stroke="none"
                  />
                  <path
                    d="M 55 74 Q 60 76 65 72"
                    fill="none"
                    stroke="#FDE047"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-[#F97316] text-white rounded-2xl p-6 shadow-xl text-center transform lg:-translate-y-16 lg:-translate-x-8 min-w-[240px]">
              <p className="text-4xl font-extrabold mb-1">+11.000</p>
              <p className="text-xs font-bold tracking-wider uppercase opacity-90">
                Estudantes Inseridos
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
