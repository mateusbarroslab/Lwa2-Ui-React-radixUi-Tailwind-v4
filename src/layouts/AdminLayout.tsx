import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, MessageSquare, LogOut, Tags } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Cursos', href: '/admin/dashboard/courses', icon: BookOpen },
  { name: 'Categorias', href: '/admin/dashboard/categories', icon: Tags },
  { name: 'Contatos', href: '/admin/dashboard/contacts', icon: MessageSquare },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.email}</div>
              <div className="text-xs text-muted-foreground">Administrador</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair do sistema
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
