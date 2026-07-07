import { useEffect, useMemo } from 'react'

export function useSEO(
  title: string,
  description: string,
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null,
) {
  const jsonLdString = useMemo(() => (jsonLd ? JSON.stringify(jsonLd) : ''), [jsonLd])

  useEffect(() => {
    document.title = `${title} | Primeira Conquista`

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]')
    existingScripts.forEach((s) => s.remove())

    if (jsonLdString) {
      try {
        const parsed = JSON.parse(jsonLdString)
        const items = Array.isArray(parsed) ? parsed : [parsed]
        for (const item of items) {
          const script = document.createElement('script')
          script.setAttribute('type', 'application/ld+json')
          script.setAttribute('data-seo-jsonld', 'true')
          script.textContent = JSON.stringify(item)
          document.head.appendChild(script)
        }
      } catch {
        // Invalid JSON-LD, skip
      }
    }
  }, [title, description, jsonLdString])
}
