import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export interface Category extends RecordModel {
  name: string
  slug: string
  is_active: boolean
}

export const getCategories = async () => {
  return pb.collection<Category>('categories').getFullList({
    filter: 'is_active = true',
    sort: 'name',
  })
}

export const getAdminCategories = async () => {
  return pb.collection<Category>('categories').getFullList({ sort: 'name' })
}

export const createCategory = async (data: Partial<Category>) => {
  return pb.collection('categories').create(data)
}

export const updateCategory = async (id: string, data: Partial<Category>) => {
  return pb.collection('categories').update(id, data)
}

export const deleteCategory = async (id: string) => {
  return pb.collection('categories').delete(id)
}
