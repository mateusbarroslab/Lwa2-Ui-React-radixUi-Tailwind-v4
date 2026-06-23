import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export interface Contact extends RecordModel {
  name: string
  email: string
  whatsapp: string
  message: string
  course_id: string
  expand?: {
    course_id?: {
      title: string
    }
  }
}

export const createContact = async (data: Partial<Contact>) => {
  return pb.collection('contacts').create(data)
}

export const getAdminContacts = async () => {
  return pb.collection<Contact>('contacts').getFullList({
    sort: '-created',
    expand: 'course_id',
  })
}

export const deleteContact = async (id: string) => {
  return pb.collection('contacts').delete(id)
}
