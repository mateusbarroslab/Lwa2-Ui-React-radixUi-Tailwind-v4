import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Briefcase, GraduationCap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/hooks/use-seo'

export default function Home() {
  useSEO(
    'Início',
    'Acelere sua carreira com os cursos técnicos da Primeira Conquista. Educação de qualidade para o seu futuro.',
  )

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 pt-24 pb-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
                Matrículas Abertas 2026
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Sua carreira técnica começa na{' '}
                <span className="text-primary">Primeira Conquista</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Cursos técnicos focados na prática e nas necessidades do mercado de trabalho.
                Professores qualificados, laboratórios modernos e encaminhamento para estágios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="font-semibold">
                  <Link to="/cursos">
                    Ver Cursos Disponíveis <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contato">Fale com um Consultor</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none animate-slide-up">
              <div className="aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-muted relative">
                <img
                  src="https://img.usecurling.com/p/800/800?q=students%20studying&dpr=2"
                  alt="Estudantes"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-xl bg-background p-6 shadow-xl border animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">92%</p>
                    <p className="text-sm text-muted-foreground">Empregabilidade</p>
                  </div>
                </div>
              </div>
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
              className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card hover:shadow-elevation transition-shadow"
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

      {/* CTA Section */}
      <section className="container">
        <div className="rounded-3xl bg-secondary text-secondary-foreground p-8 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold md:text-4xl">Pronto para dar o próximo passo?</h2>
            <p className="text-lg opacity-90">
              Conheça nosso programa de estágios e veja como auxiliamos nossos alunos a conquistarem
              a primeira vaga no mercado de trabalho.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/estagios">Conheça o Programa de Estágios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
