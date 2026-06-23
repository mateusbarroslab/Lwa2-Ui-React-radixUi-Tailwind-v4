import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon, Copy } from 'lucide-react'
import {
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  Course,
  getCourseImageUrl,
} from '@/services/courses'
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
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { CourseForm } from '@/components/admin/course-form/CourseForm'
import type { CourseFormValues } from '@/components/admin/course-form/schema'

export default function CoursesManager() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState<CourseFormValues | null>(null)
  const [initialFile, setInitialFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const loadCourses = async () => {
    try {
      setCourses(await getAdminCourses())
    } catch {
      toast({ title: 'Erro ao carregar cursos', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])
  useRealtime('courses', loadCourses)

  const handleOpen = (course?: Course) => {
    setInitialFile(null)
    if (course) {
      setEditingId(course.id)
      setInitialValues({
        title: course.title,
        slug: course.slug,
        short_description: course.short_description || '',
        description: course.description,
        workload: course.workload || '',
        category: course.category || 'Other',
        is_active: course.is_active,
        curriculum: course.curriculum || '',
        regulatory_title: course.regulatory_title || '',
        regulatory_link_text: course.regulatory_link_text || '',
        regulatory_url: course.regulatory_url || '',
        completion_time: course.completion_time || '',
        national_validity: course.national_validity || false,
        council_registration: course.council_registration || '',
        technical_skill_title: course.technical_skill_title || '',
        technical_skill_subtitle: course.technical_skill_subtitle || '',
        commercial_observation: course.commercial_observation || '',
        material_included: course.material_included || false,
        fixed_monthly_fee: course.fixed_monthly_fee || false,
        whatsapp_number: course.whatsapp_number || '',
        curriculum_json: (course.curriculum_json || []).map((m: any) => ({
          ...m,
          items: m.items.map((i: string) => ({ value: i })),
        })),
        benefits_json: course.benefits_json || [],
        payment_options_json: course.payment_options_json || [],
      })
    } else {
      setEditingId(null)
      setInitialValues({
        title: '',
        slug: '',
        short_description: '',
        description: '',
        workload: '',
        category: 'Other',
        is_active: true,
        curriculum: '',
        regulatory_title: '',
        regulatory_link_text: '',
        regulatory_url: '',
        completion_time: '',
        national_validity: false,
        council_registration: '',
        technical_skill_title: '',
        technical_skill_subtitle: '',
        commercial_observation: '',
        material_included: false,
        fixed_monthly_fee: false,
        whatsapp_number: '',
        curriculum_json: [],
        benefits_json: [],
        payment_options_json: [],
      })
    }
    setOpen(true)
  }

  const onSubmit = async (values: CourseFormValues, file: File | null) => {
    setSubmitting(true)
    try {
      const formData = new FormData()

      const toSend = {
        ...values,
        curriculum_json: values.curriculum_json.map((m) => ({
          title: m.title,
          items: m.items.map((i) => i.value),
        })),
      }

      Object.entries(toSend).forEach(([k, v]) => {
        if (typeof v === 'boolean') formData.append(k, v ? 'true' : 'false')
        else if (typeof v === 'object') formData.append(k, JSON.stringify(v))
        else if (v !== undefined) formData.append(k, String(v))
      })

      if (file) formData.append('image', file)

      if (editingId) {
        await updateCourse(editingId, formData)
        toast({ title: 'Curso atualizado com sucesso!' })
      } else {
        await createCourse(formData)
        toast({ title: 'Curso criado com sucesso!' })
      }
      setOpen(false)
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDuplicate = async (course: Course) => {
    setEditingId(null)
    setInitialFile(null)

    if (course.image) {
      try {
        const url = getCourseImageUrl(course, course.image)
        const res = await fetch(url)
        const blob = await res.blob()
        const file = new File([blob], course.image, { type: blob.type })
        setInitialFile(file)
      } catch (err) {
        console.error('Failed to load image for duplication', err)
      }
    }

    setInitialValues({
      title: `${course.title} (Cópia)`,
      slug: `${course.slug}-copia-${Math.floor(Math.random() * 10000)}`,
      short_description: course.short_description || '',
      description: course.description,
      workload: course.workload || '',
      category: course.category || 'Other',
      is_active: false,
      curriculum: course.curriculum || '',
      regulatory_title: course.regulatory_title || '',
      regulatory_link_text: course.regulatory_link_text || '',
      regulatory_url: course.regulatory_url || '',
      completion_time: course.completion_time || '',
      national_validity: course.national_validity || false,
      council_registration: course.council_registration || '',
      technical_skill_title: course.technical_skill_title || '',
      technical_skill_subtitle: course.technical_skill_subtitle || '',
      commercial_observation: course.commercial_observation || '',
      material_included: course.material_included || false,
      fixed_monthly_fee: course.fixed_monthly_fee || false,
      whatsapp_number: course.whatsapp_number || '',
      curriculum_json: (course.curriculum_json || []).map((m: any) => ({
        ...m,
        items: m.items.map((i: string) => ({ value: i })),
      })),
      benefits_json: course.benefits_json || [],
      payment_options_json: course.payment_options_json || [],
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir permanentemente este curso?')) return
    try {
      await deleteCourse(id)
      toast({ title: 'Curso excluído com sucesso.' })
    } catch {
      toast({ title: 'Erro ao excluir curso', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Gerenciar Cursos</h2>
        <Button onClick={() => handleOpen()} size="lg">
          <Plus className="mr-2 h-4 w-4" /> Novo Curso
        </Button>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px]">Capa</TableHead>
              <TableHead>Curso</TableHead>
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
            ) : courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  Nenhum curso cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    {course.image ? (
                      <img
                        src={getCourseImageUrl(course, course.image)}
                        alt=""
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md border">
                        <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">{course.title}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      /{course.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.is_active ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDuplicate(course)}
                      title="Duplicar"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpen(course)}
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(course.id)}
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>{' '}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={(val) => !val && !submitting && setOpen(false)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl">
              {editingId ? 'Editar Curso' : 'Criar Novo Curso'}
            </DialogTitle>
          </DialogHeader>
          {initialValues && (
            <CourseForm
              key={editingId || 'new'}
              initialValues={initialValues}
              onSubmit={onSubmit}
              onCancel={() => setOpen(false)}
              isSubmitting={submitting}
              initialFile={initialFile}
            />
          )}{' '}
        </DialogContent>
      </Dialog>
    </div>
  )
}
