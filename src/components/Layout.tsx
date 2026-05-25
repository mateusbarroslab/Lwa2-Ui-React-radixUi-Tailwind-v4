import { Link, Outlet, useLocation } from 'react-router-dom'
import { Hexagon, Moon, Sun, Search, Menu } from 'lucide-react'
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
  SidebarInput,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { NAVIGATION } from '@/content/data'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

export default function Layout() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  // Generate breadcrumbs from path
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-grid-pattern overflow-hidden text-foreground">
        <Sidebar
          variant="sidebar"
          className="border-r border-border/50 bg-background/60 backdrop-blur-xl"
        >
          <SidebarHeader className="h-14 flex items-center px-4 border-b border-border/50">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
                <Hexagon className="h-4 w-4" />
              </div>
              <span className="tracking-tight">LWA2 Factory</span>
            </Link>
          </SidebarHeader>
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <SidebarInput
                placeholder="Search catalog..."
                className="pl-9 bg-muted/50 border-border/50 shadow-none focus-visible:ring-1"
              />
            </div>
          </div>
          <SidebarContent>
            {NAVIGATION.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel className="text-xs font-mono tracking-wider text-muted-foreground/70 uppercase mb-1">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const isActive =
                        location.pathname === item.href ||
                        (item.href !== '/' && location.pathname.startsWith(item.href))
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className={`h-9 text-sm ${isActive ? 'bg-secondary font-medium text-secondary-foreground' : 'text-muted-foreground'}`}
                          >
                            <Link to={item.href}>
                              <item.icon className="h-4 w-4 mr-2" />
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter className="border-t border-border/50 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>v1.0.0-alpha</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col relative z-0 min-w-0">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/50 bg-background/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-2 md:hidden" />
              <Separator orientation="vertical" className="h-4 hidden md:block" />
              <Breadcrumb className="hidden sm:block">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Catalog</BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathnames.length > 0 && <BreadcrumbSeparator />}
                  {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
                    const isLast = index === pathnames.length - 1
                    const title = name.charAt(0).toUpperCase() + name.slice(1)

                    return (
                      <div key={name} className="flex items-center gap-1.5">
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={routeTo}>{title}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </div>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-8 lg:p-12">
            <div className="mx-auto max-w-[1200px] pb-24">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
