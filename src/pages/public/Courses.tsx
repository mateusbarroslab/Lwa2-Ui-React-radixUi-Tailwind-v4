import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, FileText, ArrowRight, GraduationCap, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSEO } from '@/hooks/use-seo'
import { useRealtime } from '@/hooks/use-realtime'
import { getCourses, searchCourses, Course, getCourseImageUrl } from '@/services/courses'
import { useDebounce } from '@/hooks/use-debounce'

export default function Courses() {
  useSEO(
    'Cursos Técnicos',
    'Encontre o curso técnico ideal para a sua carreira. Explore nossas opções nas áreas de Saúde, Gestão e Tecnologia.',
  )

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Create a custom debounce hook implementation inline since it might not exist
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      if (debouncedSearch) {
        const res = await searchCourses(debouncedSearch)
        setCourses(res as Course[])
      } else {
        const res = await getCourses()
        setCourses(res)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [debouncedSearch])

  useRealtime('courses', () => {
    fetchCourses()
  })

  return (
    <div className="container py-12 md:py-16 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">Cursos Técnicos</h1>
          <p className="text-lg text-muted-foreground">
            Explore nossa lista de cursos e encontre a formação perfeita para iniciar sua carreira.
            Digite o que você tem interesse e nossa busca inteligente ajudará a encontrar.
          </p>
        </div>
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="O que você quer aprender?..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
          <p className="text-muted-foreground">Tente buscar por outras palavras-chave.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                {course.image ? (
                  <img
                    src={getCourseImageUrl(course, course.image)}
                    alt={course.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <GraduationCap className="h-12 w-12 text-primary/40" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur font-medium">
                    {course.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2 leading-tight">{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <div
                  className="text-sm text-muted-foreground line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: course.description.replace(/<[^>]*>?/gm, '') }}
                />

                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground pt-2">
                  {course.workload && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      {course.workload}
                    </div>
                  )}
                  {course.regulatory_info && (
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-primary" />
                      {course.regulatory_info}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button asChild className="w-full group/btn" variant="outline">
                  <Link to={`/cursos/${course.slug}`}>
                    Saiba Mais
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
