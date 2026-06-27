import { Link } from 'react-router-dom'
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  UserCircle2,
  Building2,
  Landmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/hooks/use-seo'

export default function Home() {
  useSEO(
    'Início',
    'Sua formação. Seu estágio. Sua primeira conquista. Cursos técnicos e programa de estágios.',
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 pt-24 pb-16 lg:pb-32">
        <div className="container text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Sua formação. Seu estágio.{' '}
            <span className="text-primary block sm:inline">Sua primeira conquista.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Cursos técnicos reconhecidos e programa de estágios em parceria com a CEINEE para
            aproximar estudantes, empresas e oportunidades.
          </p>
        </div>

        <div className="container mt-16 grid lg:grid-cols-2 gap-8 relative z-10 animate-slide-up">
          {/* Card 1: Cursos Técnicos */}
          <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-xl shadow-primary/5 flex flex-col items-start space-y-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="p-4 bg-primary/10 text-primary rounded-2xl">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold">Cursos Técnicos</h2>
            <p className="text-lg text-muted-foreground flex-1">
              Para quem quer se qualificar profissionalmente e conquistar novas oportunidades no
              mercado.
            </p>
            <Button size="lg" asChild className="w-full sm:w-auto font-semibold">
              <Link to="/cursos">
                Ver Cursos Técnicos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Card 2: Programa de Estágios */}
          <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-xl shadow-amber-500/5 flex flex-col items-start space-y-6 relative overflow-hidden group hover:border-amber-400/50 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
              <div className="p-4 bg-amber-400/10 text-amber-500 rounded-2xl shrink-0">
                <Briefcase className="h-8 w-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 py-1.5 px-3.5 rounded-full border border-amber-200 dark:border-amber-500/30 text-center">
                Em parceria com a CEINEE
              </span>
            </div>
            <h2 className="text-3xl font-bold">Programa de Estágios</h2>
            <p className="text-lg text-muted-foreground flex-1">
              Para estudantes, empresas e instituições que buscam uma ponte segura com o mercado de
              trabalho.
            </p>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="w-full sm:w-auto font-semibold border-amber-200 hover:bg-amber-50 hover:text-amber-900 dark:border-amber-900/50 dark:hover:bg-amber-950/50 dark:hover:text-amber-100"
            >
              <Link to="/estagios">
                Conhecer Programa de Estágios <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Escolha seu Caminho Section */}
      <section className="container py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Escolha seu Caminho</h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Descubra as vantagens de cada modalidade e dê o próximo passo na sua jornada.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Block 1 */}
          <div className="space-y-8 p-8 md:p-10 rounded-3xl bg-secondary/50 border hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <GraduationCap className="h-7 w-7 text-primary" /> Cursos Técnicos
            </h3>
            <ul className="space-y-5">
              {[
                'Formação prática',
                'Cursos reconhecidos',
                'Professores especialistas',
                'Conteúdo voltado ao mercado',
                'Válido em todo o Brasil',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-muted-foreground font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="w-full">
              <Link to="/cursos">Encontrar meu curso</Link>
            </Button>
          </div>

          {/* Block 2 */}
          <div className="space-y-8 p-8 md:p-10 rounded-3xl bg-secondary/50 border hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Briefcase className="h-7 w-7 text-amber-500" /> Programa de Estágios CEINEE
            </h3>
            <ul className="space-y-5">
              {[
                'Integração entre estudantes e empresas',
                'Apoio para instituições de ensino',
                'Apoio para empresas contratantes',
                'Conformidade com a Lei do Estágio',
                'Encaminhamento para oportunidades',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0" />
                  <span className="text-muted-foreground font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-amber-200 hover:bg-amber-50 hover:text-amber-900 dark:border-amber-900/50 dark:hover:bg-amber-950/50 dark:hover:text-amber-100"
            >
              <Link to="/estagios">Quero conhecer o programa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Como a Parceria Funciona Section */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Como a Parceria Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              A união perfeita entre qualificação teórica e experiência prática.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border z-0" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-5">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-primary flex items-center justify-center text-primary shadow-xl">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">1. Você se qualifica</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cursos técnicos ajudam o aluno a se preparar para o mercado com formação prática e
                direcionada.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-5">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-amber-400 flex items-center justify-center text-amber-500 shadow-xl">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">2. Você se conecta</h3>
              <p className="text-muted-foreground leading-relaxed">
                A parceria com a CEINEE aproxima estudantes, empresas e instituições de ensino.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-5">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-xl">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">3. Você avança</h3>
              <p className="text-muted-foreground leading-relaxed">
                Formação e experiência caminham juntas para aumentar as chances de inserção
                profissional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEINEE Authority Section */}
      <section className="container py-24">
        <div className="rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-900/40 z-0" />
          <div className="relative z-10 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300 border border-amber-500/30">
                <Award className="mr-2 h-4 w-4" /> Parceria oficial com a CEINEE
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Conectando talentos <br className="hidden md:block" /> ao mercado.
              </h2>
              <p className="text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A CEINEE atua na integração entre estudantes, instituições de ensino, empresas e
                organizações comunitárias, fortalecendo o acesso a programas de estágio.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold border-none h-14 px-8 text-lg"
              >
                <Link to="/estagios">Conhecer Programa de Estágios</Link>
              </Button>
            </div>
            <div className="w-full lg:w-auto">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10 text-center shadow-2xl">
                <div className="text-5xl md:text-7xl font-black text-amber-400 mb-3 tracking-tighter">
                  +11.000
                </div>
                <div className="text-xl font-medium text-slate-300 uppercase tracking-widest">
                  Estudantes inseridos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É Section */}
      <section className="container pb-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Para Quem É</h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Nossas soluções atendem a todos os envolvidos no processo educacional e profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 md:p-10 rounded-[2rem] bg-card border hover:shadow-xl hover:border-primary/30 transition-all text-center flex flex-col items-center group">
            <div className="p-5 bg-primary/10 rounded-full mb-6 text-primary group-hover:scale-110 transition-transform">
              <UserCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Estudantes</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Cursos técnicos e oportunidades de estágio para começar ou evoluir na carreira.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-[2rem] bg-card border hover:shadow-xl hover:border-amber-400/30 transition-all text-center flex flex-col items-center group">
            <div className="p-5 bg-amber-400/10 rounded-full mb-6 text-amber-500 group-hover:scale-110 transition-transform">
              <Building2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Empresas</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Apoio na conexão com estudantes e no processo de estágio.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-[2rem] bg-card border hover:shadow-xl hover:border-emerald-500/30 transition-all text-center flex flex-col items-center group">
            <div className="p-5 bg-emerald-500/10 rounded-full mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
              <Landmark className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instituições</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Parceria para fortalecer a formação prática e a visibilidade institucional.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-24 rounded-t-[3rem]">
        <div className="container text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Qual é o seu próximo passo?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-[600px] mx-auto font-medium">
            Escolha o caminho ideal para começar agora.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
            <Button asChild size="lg" variant="secondary" className="font-bold h-14 px-8 text-lg">
              <Link to="/cursos">Ver Cursos Técnicos</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-amber-950 hover:bg-amber-500 font-bold h-14 px-8 text-lg border-none shadow-xl shadow-amber-500/20"
            >
              <Link to="/estagios">Conhecer Programa de Estágios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
