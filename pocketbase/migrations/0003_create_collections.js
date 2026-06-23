migrate(
  (app) => {
    const courses = new Collection({
      name: 'courses',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'description', type: 'editor', required: true },
        { name: 'workload', type: 'text' },
        { name: 'regulatory_info', type: 'text' },
        {
          name: 'category',
          type: 'select',
          values: ['Industrial', 'Health', 'Business', 'Technology', 'Other'],
          maxSelect: 1,
        },
        {
          name: 'image',
          type: 'file',
          maxSelect: 1,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
        },
        { name: 'curriculum', type: 'editor' },
        { name: 'is_active', type: 'bool' },
        { name: 'embedding', type: 'vector', dimensions: 1536, distance: 'cosine' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_courses_slug ON courses (slug)'],
    })
    app.save(courses)

    const contacts = new Collection({
      name: 'contacts',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email' },
        { name: 'whatsapp', type: 'text', required: true },
        { name: 'message', type: 'text' },
        { name: 'course_id', type: 'relation', collectionId: courses.id, maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(contacts)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('contacts'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('courses'))
    } catch (_) {}
  },
)
