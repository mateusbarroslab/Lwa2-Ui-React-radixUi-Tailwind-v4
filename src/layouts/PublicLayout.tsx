import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSettingsContext } from '@/hooks/use-settings'
import { useAuth } from '@/hooks/use-auth'

export default function PublicLayout() {
  const { settings, headerLogoUrl, footerLogoUrl } = useSettingsContext()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cursos Técnicos', path: '/cursos' },
    { name: 'Programa de Estágios', path: '/estagios' },
    { name: 'Para Empresas', path: '/para-empresas' },
    { name: 'Contato', path: '/contato' },
  ]

  const isCourseDetail = Boolean(location.pathname.match(/^\/cursos\/[^/]+$/))
  const whatsappUrl = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`
    : 'https://wa.me/5524992934189'

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          isScrolled ? 'shadow-sm' : '',
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            {headerLogoUrl ? (
              <img
                src={headerLogoUrl}
                alt="Primeira Conquista Logo"
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-bold tracking-tighter text-primary">
                Primeira<span className="text-foreground">Conquista</span>
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      location.pathname === link.path ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="font-bold rounded-full px-6">
              <Link to="/cursos">Matricule-se</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b shadow-lg animate-fade-in-down">
            <nav className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-lg font-medium py-2 border-b border-border/50',
                    location.pathname === link.path ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="w-full mt-4 font-bold h-12 text-lg">
                <Link to="/cursos">Matricule-se</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#F2F2F2] py-12 md:py-16 border-t border-[#d8d8d8]">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              {footerLogoUrl ? (
                <img
                  src={footerLogoUrl}
                  alt="Primeira Conquista Logo"
                  className="h-14 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ) : (
                <span className="text-2xl font-bold tracking-tighter text-primary">
                  Primeira<span className="text-foreground">Conquista</span>
                </span>
              )}
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Sua formação. Seu estágio. Sua primeira conquista. Cursos técnicos e programa de
              estágios para transformar o seu futuro.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contato</h4>
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
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Painel Administrativo
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
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2',
          isCourseDetail && 'hidden lg:flex',
        )}
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
