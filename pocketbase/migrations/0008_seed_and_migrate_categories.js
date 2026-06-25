migrate(
  (app) => {
    const categories = app.findCollectionByNameOrId('categories')
    const defaultCats = [
      { name: 'Saúde', slug: 'health', legacy: 'Health' },
      { name: 'Negócios', slug: 'business', legacy: 'Business' },
      { name: 'Tecnologia', slug: 'technology', legacy: 'Technology' },
      { name: 'Industrial', slug: 'industrial', legacy: 'Industrial' },
      { name: 'Outros', slug: 'other', legacy: 'Other' },
    ]

    const catMap = {}

    for (const cat of defaultCats) {
      let record
      try {
        record = app.findFirstRecordByData('categories', 'slug', cat.slug)
      } catch (_) {
        record = new Record(categories)
        record.set('name', cat.name)
        record.set('slug', cat.slug)
        record.set('is_active', true)
        app.save(record)
      }
      catMap[cat.legacy] = record.id
    }

    // Migrate existing courses
    const courses = app.findRecordsByFilter('courses', '1=1', '', 0, 0)
    for (const course of courses) {
      const legacyCat = course.getString('category')
      if (legacyCat && catMap[legacyCat]) {
        course.set('category_id', catMap[legacyCat])
        app.saveNoValidate(course)
      }
    }
  },
  (app) => {
    // Data migrations cannot be safely rolled back in an automated way
  },
)
