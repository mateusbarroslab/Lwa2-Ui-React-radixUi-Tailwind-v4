import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export interface Course extends RecordModel {
  title: string
  slug: string
  description: string
  workload: string
  regulatory_info: string
  category: string
  image: string
  curriculum: string
  is_active: boolean
}

export const getCourses = async () => {
  return pb.collection<Course>('courses').getFullList({
    filter: 'is_active = true',
    sort: '-created',
  })
}

export const getCourseBySlug = async (slug: string) => {
  return pb.collection<Course>('courses').getFirstListItem(`slug="${slug}" && is_active = true`)
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
  return pb.collection<Course>('courses').getFullList({ sort: '-created' })
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
  return pb.files.getUrl(record, filename)
}
