import { Link } from 'react-router-dom'
import { Target, Users, Building, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/hooks/use-seo'

export default function Internship() {
  useSEO(
    'Programa de Estágios',
    'Conectamos nossos alunos diretamente com o mercado de trabalho através de parcerias com grandes empresas.',
  )

  return (
    <div className="pb-24 animate-fade-in">
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container text-center space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Programa de Estágios
          </h1>
          <p className="text-xl opacity-90">
            Acreditamos que a teoria ganha vida na prática. Por isso, mantemos um departamento
            exclusivo para conectar você à sua primeira oportunidade na área.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-4 bg-muted/30 p-8 rounded-3xl border">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Empresas Parceiras</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Temos convênios com diversas empresas da região, de todos os portes. As vagas são
              repassadas diretamente aos nossos alunos antes mesmo de irem a público.
            </p>
          </div>

          <div className="space-y-4 bg-muted/30 p-8 rounded-3xl border">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Orientação Profissional</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ajudamos você a montar seu currículo, se preparar para entrevistas de emprego e
              desenvolver as soft-skills exigidas pelas empresas.
            </p>
          </div>

          <div className="space-y-4 bg-muted/30 p-8 rounded-3xl border">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Encaminhamento Direto</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Acompanhamos seu desempenho nas aulas e encaminhamos os currículos diretamente ao RH
              das empresas solicitantes, acelerando a contratação.
            </p>
          </div>
        </div>
      </section>

      <section className="container max-w-4xl mx-auto text-center space-y-8 py-12 border-t">
        <h2 className="text-3xl font-bold">Não perca mais tempo.</h2>
        <p className="text-xl text-muted-foreground">
          Escolha um de nossos cursos técnicos, invista no seu conhecimento e deixe-nos ajudar a
          abrir as portas do mercado para você.
        </p>
        <Button size="lg" asChild className="mt-4">
          <Link to="/cursos">
            Escolher meu Curso <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
