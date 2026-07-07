import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { SettingsProvider } from '@/hooks/use-settings'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PageLoader } from '@/components/PageLoader'

import PublicLayout from '@/layouts/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout'

const Home = lazy(() => import('@/pages/public/Home'))
const Courses = lazy(() => import('@/pages/public/Courses'))
const CourseDetail = lazy(() => import('@/pages/public/CourseDetail'))
const Internship = lazy(() => import('@/pages/public/Internship'))
const Contact = lazy(() => import('@/pages/public/Contact'))

const Login = lazy(() => import('@/pages/admin/Login'))
const CoursesManager = lazy(() => import('@/pages/admin/CoursesManager'))
const CategoriesManager = lazy(() => import('@/pages/admin/CategoriesManager'))
const ContactsManager = lazy(() => import('@/pages/admin/ContactsManager'))
const SettingsManager = lazy(() => import('@/pages/admin/SettingsManager'))

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/admin" replace />
  return <>{children}</>
}

const App = () => (
  <AuthProvider>
    <SettingsProvider>
      <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
        <ScrollToTop />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cursos" element={<Courses />} />
                <Route path="/cursos/:slug" element={<CourseDetail />} />
                <Route path="/estagios" element={<Internship />} />
                <Route path="/para-empresas" element={<Internship />} />
                <Route path="/contato" element={<Contact />} />
              </Route>

              <Route path="/admin" element={<Login />} />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard/courses" replace />} />
                <Route path="courses" element={<CoursesManager />} />
                <Route path="categories" element={<CategoriesManager />} />
                <Route path="contacts" element={<ContactsManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </BrowserRouter>
    </SettingsProvider>
  </AuthProvider>
)

export default App
