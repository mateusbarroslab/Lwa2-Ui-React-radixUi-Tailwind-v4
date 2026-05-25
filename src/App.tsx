import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import Tokens from './pages/Tokens'
import Components from './pages/Components'
import Patterns from './pages/Patterns'
import Blocks from './pages/Blocks'
import Motion from './pages/Motion'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/components" element={<Components />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/motion" element={<Motion />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
