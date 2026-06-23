import { CheckCircle2, GraduationCap, Building2, BookOpen, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSEO } from '@/hooks/use-seo'

const CeineeLogo = ({ className = 'w-32 h-32' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className={className}>
    {/* Head */}
    <circle cx="150" cy="70" r="50" fill="#FFED00" stroke="#000" strokeWidth="8" />
    {/* Mask under head */}
    <path d="M 108 90 C 120 120 180 120 192 90 Z" fill="#000" />
    {/* Arms embracing */}
    <path
      d="M 150 130 C 50 130 20 200 35 280 C 37 290 50 290 55 280 C 70 220 90 165 150 165 C 210 165 230 220 245 280 C 250 290 263 290 265 280 C 280 200 250 130 150 130 Z"
      fill="#FFED00"
      stroke="#000"
      strokeWidth="8"
      strokeLinejoin="round"
    />
    {/* Globe */}
    <circle cx="150" cy="215" r="60" fill="#000" stroke="#000" strokeWidth="4" />
    {/* Map details */}
    <path d="M 120 170 Q 150 160 160 190 T 130 240 Q 100 210 120 170 Z" fill="#FFED00" />
    <path d="M 175 185 Q 200 180 190 220 Q 170 230 175 185 Z" fill="#FFED00" />
  </svg>
)

export default function Internship() {
  useSEO(
    'Programa de Estágios - CEINEE',
    'Conectamos nossos alunos diretamente com o mercado de trabalho através de parcerias com o CEINEE.',
  )

  const whatsappUrl = 'https://wa.me/+5524992013654'

  return (
    <div className="pb-24 animate-fade-in overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-[#FFED00] text-black py-20 md:py-32 relative overflow-hidden border-b-4 border-black">
        <div className="container relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-bold mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-black mr-2 animate-pulse"></span>
            Representante Oficial
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full inline-flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black w-40 h-40">
              <CeineeLogo className="w-full h-full" />
            </div>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl uppercase drop-shadow-sm">
            Conheça a Ceinee
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-90 leading-relaxed max-w-3xl mx-auto">
            O CEINEE uma instituição que visa promover integração entre Estudantes, Instituições
            Educacionais, Empresariais e Comunitárias...
          </p>
          <div className="pt-6">
            <div className="inline-block bg-black text-[#FFED00] px-8 py-4 rounded-full text-xl font-black shadow-xl transform transition-transform hover:scale-105 border-4 border-black">
              +11.000 estudantes inseridos
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Por que escolher o CEINEE?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Nosso programa oferece vantagens exclusivas para todos os envolvidos no processo de
            estágio.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Para o Estagiário */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all w-full">
            <CardHeader className="text-center pb-4 border-b-4 border-black bg-[#FFED00]/10">
              <div className="mx-auto bg-[#FFED00] border-2 border-black p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <GraduationCap className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-2xl font-black uppercase">Para o Estagiário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <ul className="space-y-4">
                {['Bolsa auxílio', 'Auxílio transporte', 'treinamento profissional'].map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-black shrink-0 mt-0.5" />
                      <span className="text-black font-semibold text-lg">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Para Empresa */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all w-full">
            <CardHeader className="text-center pb-4 border-b-4 border-black bg-[#FFED00]/10">
              <div className="mx-auto bg-[#FFED00] border-2 border-black p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Building2 className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-2xl font-black uppercase">Para Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <ul className="space-y-4">
                {[
                  'Seleção de candidatos',
                  'Conformidade legal (Lei do Estágio)',
                  'Sem encargos sociais',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-black shrink-0 mt-0.5" />
                    <span className="text-black font-semibold text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instituição de Ensino */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all w-full">
            <CardHeader className="text-center pb-4 border-b-4 border-black bg-[#FFED00]/10">
              <div className="mx-auto bg-[#FFED00] border-2 border-black p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-2xl font-black uppercase">Instituição de Ensino</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <ul className="space-y-4">
                {['Auxílio no relatório de estágio', 'Visibilidade institucional'].map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-black shrink-0 mt-0.5" />
                      <span className="text-black font-semibold text-lg">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-4xl mx-auto text-center space-y-8 py-16 px-4">
        <div className="bg-black text-[#FFED00] rounded-3xl p-8 md:p-16 shadow-[16px_16px_0px_0px_#FFED00] space-y-8 border-4 border-black relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight relative z-10">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-xl text-white relative z-10 max-w-2xl mx-auto font-medium">
            Fale conosco agora mesmo pelo WhatsApp e descubra como o CEINEE pode transformar o seu
            futuro.
          </p>
          <div className="relative z-10">
            <Button
              size="lg"
              className="bg-[#FFED00] text-black hover:bg-white text-lg h-16 px-8 rounded-full font-black uppercase w-full sm:w-auto border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-3 h-7 w-7" />
                QUERO CONHECER O CEINEE
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
