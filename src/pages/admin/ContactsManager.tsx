import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { getAdminContacts, deleteContact, Contact } from '@/services/contacts'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  const loadContacts = async () => {
    try {
      const data = await getAdminContacts()
      setContacts(data)
    } catch (err) {
      toast({ title: 'Erro ao carregar contatos', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])
  useRealtime('contacts', () => {
    loadContacts()
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir esta mensagem?')) return
    try {
      await deleteContact(id)
      toast({ title: 'Mensagem excluída' })
    } catch (err: any) {
      toast({ title: 'Erro ao excluir', description: err.message, variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Mensagens de Contato</h2>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Nenhuma mensagem recebida.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact.id} className="group">
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(contact.created), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{contact.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    <div>{contact.whatsapp}</div>
                    {contact.email && <div>{contact.email}</div>}
                  </TableCell>
                  <TableCell className="text-sm max-w-xs truncate" title={contact.message}>
                    {contact.message}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
