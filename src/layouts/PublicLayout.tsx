import { Link, Outlet, useLocation } from 'react-router-dom'
import { GraduationCap, MessageCircle, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { useSettingsContext } from '@/hooks/use-settings'
import { getSettingsImageUrl } from '@/services/settings'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Cursos Técnicos', href: '/cursos' },
  { label: 'Programa de Estágios', href: '/estagios' },
  { label: 'Contato', href: '/contato' },
]

export default function PublicLayout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { settings } = useSettingsContext()

  const isInternshipPage = location.pathname === '/estagios'
  const whatsappUrl = isInternshipPage
    ? 'https://wa.me/5524992013654'
    : settings?.whatsapp
      ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Olá, gostaria de saber mais sobre a Primeira Conquista.')}`
      : `https://wa.me/5524992934189?text=${encodeURIComponent('Olá, gostaria de saber mais sobre a Primeira Conquista.')}`

  const isCourseDetail = location.pathname.match(/^\/cursos\/[^/]+$/)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {settings?.logo_header ? (
              <img
                src={getSettingsImageUrl(settings, settings.logo_header)}
                alt="Logo"
                className="h-8 w-auto max-w-[180px] object-contain"
              />
            ) : (
              <>
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold tracking-tight">Primeira Conquista</span>
              </>
            )}
          </Link>

          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.href ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-4 items-center">
            {isAuthenticated && (
              <Button variant="ghost" asChild>
                <Link to="/admin/dashboard">Painel Admin</Link>
              </Button>
            )}
            <Button asChild>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Matricule-se
              </a>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    {settings?.logo_header ? (
                      <img
                        src={getSettingsImageUrl(settings, settings.logo_header)}
                        alt="Logo"
                        className="h-6 w-auto max-w-[150px] object-contain"
                      />
                    ) : (
                      <>
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Primeira Conquista
                      </>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        'text-lg font-medium',
                        location.pathname === link.href ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Button asChild className="w-full">
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      Matricule-se
                    </a>
                  </Button>
                  {isAuthenticated && (
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/admin/dashboard">Painel Admin</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t py-12 md:py-16 bg-[#F2F2F2] dark:bg-muted/30">
        <div className="container grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              {settings?.logo_footer ? (
                <img
                  src={getSettingsImageUrl(settings, settings.logo_footer)}
                  alt="Logo Footer"
                  className="h-10 w-auto max-w-[200px] object-contain"
                />
              ) : (
                <>
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold tracking-tight">Primeira Conquista</span>
                </>
              )}
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Formando profissionais para o mercado de trabalho com excelência e estrutura de
              qualidade. Dê o primeiro passo rumo ao seu futuro.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/cursos" className="hover:text-primary">
                  Cursos Técnicos
                </Link>
              </li>
              <li>
                <Link to="/estagios" className="hover:text-primary">
                  Programa de Estágios
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-primary">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                {settings?.address ? (
                  settings.address.split('\n').map((line, i) => <div key={i}>{line}</div>)
                ) : (
                  <>
                    <div>Rua Coronel Carvalho, 13, 2º Pavimento, Sobreloja 1:A</div>
                    <div>Centro - Angra dos Reis</div>
                  </>
                )}
              </li>
              <li>{settings?.phone || '(24) 99293-4189'}</li>
              <li>{settings?.email || 'contato@primeiraconquista.com.br'}</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Primeira Conquista. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <Link to="/admin" className="text-xs text-muted-foreground hover:text-primary">
                Acesso Restrito
              </Link>
            )}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
          isCourseDetail ? 'hidden lg:flex' : 'flex',
        )}
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
