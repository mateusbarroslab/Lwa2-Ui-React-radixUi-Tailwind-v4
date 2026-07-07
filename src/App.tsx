import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { SettingsProvider } from '@/hooks/use-settings'
import { ScrollToTop } from '@/components/ScrollToTop'

import PublicLayout from '@/layouts/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout'

import Home from '@/pages/public/Home'
import Courses from '@/pages/public/Courses'
import CourseDetail from '@/pages/public/CourseDetail'
import Internship from '@/pages/public/Internship'
import Contact from '@/pages/public/Contact'

import Login from '@/pages/admin/Login'
import CoursesManager from '@/pages/admin/CoursesManager'
import CategoriesManager from '@/pages/admin/CategoriesManager'
import ContactsManager from '@/pages/admin/ContactsManager'
import SettingsManager from '@/pages/admin/SettingsManager'

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
        </TooltipProvider>
      </BrowserRouter>
    </SettingsProvider>
  </AuthProvider>
)

export default App
