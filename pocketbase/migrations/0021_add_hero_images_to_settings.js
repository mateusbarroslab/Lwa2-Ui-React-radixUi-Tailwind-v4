migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('settings')
    col.fields.add(
      new FileField({
        name: 'hero_courses_image',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
      }),
    )
    col.fields.add(
      new FileField({
        name: 'hero_internships_image',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
      }),
    )
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('settings')
    col.fields.removeByName('hero_courses_image')
    col.fields.removeByName('hero_internships_image')
    app.save(col)
  },
)
