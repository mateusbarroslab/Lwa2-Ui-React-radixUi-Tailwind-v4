import pb from '@/lib/pocketbase/client'

export interface Settings {
  id: string
  collectionId: string
  collectionName: string
  whatsapp: string
  phone: string
  email: string
  address: string
  logo_header: string
  logo_footer: string
  hero_courses_image?: string
  hero_internships_image?: string
  created: string
  updated: string
}

export const getSettings = async () => {
  const records = await pb.collection('settings').getList<Settings>(1, 1)
  return records.items[0] || null
}

export const updateSettings = async (id: string, data: FormData) => {
  return pb.collection('settings').update<Settings>(id, data)
}

export const getSettingsImageUrl = (record: Settings, filename: string) => {
  return pb.files.getURL(record, filename)
}
