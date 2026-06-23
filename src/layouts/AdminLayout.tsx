import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, Users, LogOut, GraduationCap, LayoutDashboard } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

const ADMIN_LINKS = [
  { title: 'Cursos', href: '/admin/dashboard/courses', icon: BookOpen },
  { title: 'Contatos', href: '/admin/dashboard/contacts', icon: Users },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <Sidebar className="border-r">
          <SidebarHeader className="h-16 flex items-center px-4 border-b">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
            >
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold">Painel CMS</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="py-4">
            <SidebarGroup>
              <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ADMIN_LINKS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.href}
                        className="font-medium"
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair do Painel
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="font-semibold flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                Administração
              </h1>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="mx-auto max-w-5xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
