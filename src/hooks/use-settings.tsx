import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Settings, getSettings } from '@/services/settings'
import { useRealtime } from '@/hooks/use-realtime'

interface SettingsContextType {
  settings: Settings | null
  loading: boolean
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettingsContext must be used within a SettingsProvider')
  return context
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  const loadSettings = async () => {
    try {
      const data = await getSettings()
      setSettings(data)
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  useRealtime('settings', () => {
    loadSettings()
  })

  return (
    <SettingsContext.Provider value={{ settings, loading }}>{children}</SettingsContext.Provider>
  )
}
