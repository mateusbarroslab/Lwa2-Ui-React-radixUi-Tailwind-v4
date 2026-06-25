import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export interface CourseModule {
  title: string
  items: string[]
}

export interface CourseBenefit {
  id: string
  icon: string
  title: string
  text?: string
  link?: string
  visible: boolean
  order: number
}

export interface CoursePaymentOption {
  id: string
  badge?: string
  title: string
  old_price?: string
  current_price: string
  description?: string
  observation?: string
  button_text?: string
  highlight: boolean
  order: number
}

export interface Course extends RecordModel {
  title: string
  slug: string
  short_description?: string
  description: string
  workload?: string
  regulatory_info?: string
  regulatory_title?: string
  regulatory_link_text?: string
  regulatory_url?: string
  category: string
  category_id: string
  expand?: {
    category_id?: {
      id: string
      name: string
      slug: string
    }
  }
  image: string
  curriculum?: string
  curriculum_json?: CourseModule[]
  is_active: boolean

  completion_time?: string
  national_validity?: boolean
  council_registration?: string
  technical_skill_title?: string
  technical_skill_subtitle?: string
  commercial_observation?: string
  material_included?: boolean
  fixed_monthly_fee?: boolean
  whatsapp_number?: string
  benefits_json?: CourseBenefit[]
  payment_options_json?: CoursePaymentOption[]
}

export const getCourses = async () => {
  return pb.collection<Course>('courses').getFullList({
    filter: 'is_active = true',
    sort: '-created',
    expand: 'category_id',
  })
}

export const getCourseBySlug = async (slug: string) => {
  return pb.collection<Course>('courses').getFirstListItem(`slug="${slug}" && is_active = true`, {
    expand: 'category_id',
  })
}

export const searchCourses = async (query: string) => {
  const res = await pb.send('/backend/v1/search/courses', {
    method: 'POST',
    body: JSON.stringify({ query, k: 12 }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.items || []
}

export const getAdminCourses = async () => {
  return pb.collection<Course>('courses').getFullList({ sort: '-created', expand: 'category_id' })
}

export const createCourse = async (data: FormData) => {
  return pb.collection('courses').create(data)
}

export const updateCourse = async (id: string, data: FormData) => {
  return pb.collection('courses').update(id, data)
}

export const deleteCourse = async (id: string) => {
  return pb.collection('courses').delete(id)
}

export const getCourseImageUrl = (record: RecordModel, filename: string) => {
  return pb.files.getURL(record, filename)
}
