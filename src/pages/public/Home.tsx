import { Link } from 'react-router-dom'
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Users,
  TrendingUp,
  UserCircle2,
  Building2,
  Landmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/hooks/use-seo'
import logoCeinee from '@/assets/logo-ciene-2ed4a.jpg'

export default function Home() {
  useSEO(
    'Início',
    'Sua formação. Seu estágio. Sua primeira conquista. Cursos técnicos e programa de estágios.',
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 pt-24 pb-16 lg:pb-32">
        <div className="container text-center max-w-4xl mx-auto space-y-8 animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold border shadow-sm">
            <span className="text-muted-foreground mr-2">Em parceria com</span>
            <img
              src={logoCeinee}
              alt="CEINEE"
              className="h-5 w-auto rounded-sm mix-blend-multiply"
            />
          </div>
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
          <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-xl flex flex-col items-start space-y-6 relative overflow-hidden group hover:border-border transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
              <div className="p-4 bg-secondary text-foreground rounded-2xl shrink-0">
                <Briefcase className="h-8 w-8" />
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm text-xs font-bold uppercase tracking-wider">
                <img
                  src={logoCeinee}
                  alt="CEINEE"
                  className="h-4 w-auto rounded-sm mix-blend-multiply"
                />
                <span className="text-foreground">Programa oficial de estágios</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold">Programa de Estágios</h2>
            <p className="text-lg text-muted-foreground flex-1">
              Para estudantes, empresas e instituições que buscam uma ponte segura com o mercado de
              trabalho.
            </p>
            <Button size="lg" asChild variant="outline" className="w-full sm:w-auto font-semibold">
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
              <Briefcase className="h-7 w-7 text-foreground" /> Programa de Estágios CEINEE
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
                  <CheckCircle2 className="h-6 w-6 text-foreground shrink-0" />
                  <span className="text-muted-foreground font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="outline" className="w-full">
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
              <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center text-foreground shadow-xl">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">2. Você se conecta</h3>
              <p className="text-muted-foreground leading-relaxed">
                A parceria com a CEINEE aproxima estudantes, empresas e instituições de ensino.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-5">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-primary/50 flex items-center justify-center text-primary shadow-xl">
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
        <div className="rounded-[2.5rem] bg-white border shadow-2xl overflow-hidden relative">
          <div className="relative z-10 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
                Parceria oficial com a CEINEE
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A CEINEE atua na integração entre estudantes, instituições de ensino, empresas e
                organizações comunitárias, fortalecendo o acesso a programas de estágio.
              </p>
              <Button asChild size="lg" variant="default" className="font-bold h-14 px-8 text-lg">
                <Link to="/estagios">Conhecer Programa de Estágios</Link>
              </Button>
            </div>
            <div className="w-full lg:w-auto flex flex-col items-center gap-8">
              <div className="bg-white p-4 rounded-full border shadow-xl w-48 h-48 flex items-center justify-center overflow-hidden">
                <img
                  src={logoCeinee}
                  alt="CEINEE"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">+11.000</div>
                <div className="text-sm font-medium uppercase tracking-widest opacity-90">
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

          <div className="p-8 md:p-10 rounded-[2rem] bg-card border hover:shadow-xl hover:border-border transition-all text-center flex flex-col items-center group">
            <div className="p-5 bg-muted rounded-full mb-6 text-foreground group-hover:scale-110 transition-transform">
              <Building2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Empresas</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Apoio na conexão com estudantes e no processo de estágio.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-[2rem] bg-card border hover:shadow-xl hover:border-border transition-all text-center flex flex-col items-center group">
            <div className="p-5 bg-muted rounded-full mb-6 text-foreground group-hover:scale-110 transition-transform">
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
              variant="outline"
              className="font-bold h-14 px-8 text-lg text-primary hover:text-primary"
            >
              <Link to="/estagios">Conhecer Programa de Estágios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
