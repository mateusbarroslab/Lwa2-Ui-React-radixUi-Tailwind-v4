import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  Category,
} from '@/services/categories'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [isSlugDirty, setIsSlugDirty] = useState(false)

  const loadCategories = async () => {
    try {
      setCategories(await getAdminCategories())
    } catch {
      toast({ title: 'Erro ao carregar categorias', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])
  useRealtime('categories', loadCategories)

  const handleNameChange = (val: string) => {
    setName(val)
    if (!isSlugDirty) {
      setSlug(
        val
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      )
    }
  }

  const handleOpen = (cat?: Category) => {
    if (cat) {
      setEditingId(cat.id)
      setName(cat.name)
      setSlug(cat.slug)
      setIsActive(cat.is_active)
      setIsSlugDirty(true)
    } else {
      setEditingId(null)
      setName('')
      setSlug('')
      setIsActive(true)
      setIsSlugDirty(false)
    }
    setOpen(true)
  }

  const handleSave = async () => {
    if (!name.trim() || !slug.trim()) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    try {
      if (editingId) {
        await updateCategory(editingId, { name, slug, is_active: isActive })
        toast({ title: 'Categoria atualizada!' })
      } else {
        await createCategory({ name, slug, is_active: isActive })
        toast({ title: 'Categoria criada!' })
      }
      setOpen(false)
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        'Tem certeza que deseja excluir esta categoria? Cursos associados poderão perder a referência.',
      )
    )
      return
    try {
      await deleteCategory(id)
      toast({ title: 'Categoria excluída.' })
    } catch {
      toast({ title: 'Erro ao excluir categoria', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Gerenciar Categorias</h2>
        <Button onClick={() => handleOpen()} size="lg">
          <Plus className="mr-2 h-4 w-4" /> Nova Categoria
        </Button>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  Nenhuma categoria cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-semibold">{cat.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {cat.slug}
                  </TableCell>
                  <TableCell>
                    {cat.is_active ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Ativa</Badge>
                    ) : (
                      <Badge variant="secondary">Inativa</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpen(cat)}
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(cat.id)}
                      title="Excluir"
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

      <Dialog open={open} onOpenChange={(val) => !val && !submitting && setOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Pós-graduação"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value)
                  setIsSlugDirty(true)
                }}
                placeholder="Ex: pos-graduacao"
              />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-4">
              <Label htmlFor="active" className="cursor-pointer">
                Categoria Ativa
              </Label>
              <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={submitting}>
              {submitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
