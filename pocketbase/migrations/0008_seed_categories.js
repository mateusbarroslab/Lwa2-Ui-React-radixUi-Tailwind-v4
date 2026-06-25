migrate(
  (app) => {
    const categoriesCol = app.findCollectionByNameOrId('categories')

    const cats = [
      { name: 'Industrial', slug: 'industrial' },
      { name: 'Saúde', slug: 'health' },
      { name: 'Negócios', slug: 'business' },
      { name: 'Tecnologia', slug: 'technology' },
      { name: 'Outros', slug: 'other' },
    ]

    const catMap = {}

    for (const c of cats) {
      let rec
      try {
        rec = app.findFirstRecordByData('categories', 'slug', c.slug)
      } catch (_) {
        rec = new Record(categoriesCol)
        rec.set('name', c.name)
        rec.set('slug', c.slug)
        rec.set('is_active', true)
        app.save(rec)
      }
      catMap[c.slug] = rec.id
    }

    // Migrate existing courses
    const allCourses = app.findRecordsByFilter('courses', '1=1', '', 1000, 0)
    for (const course of allCourses) {
      const oldCat = course.getString('category') || 'Other'
      const mappedSlug = oldCat.toLowerCase()
      if (catMap[mappedSlug]) {
        course.set('category_id', catMap[mappedSlug])
        app.save(course)
      }
    }
  },
  (app) => {
    // Revert not strictly needed for data migrations
  },
)
