migrate(
  (app) => {
    const courses = app.findCollectionByNameOrId('courses')
    const categories = app.findCollectionByNameOrId('categories')

    courses.fields.add(
      new RelationField({
        name: 'category_id',
        collectionId: categories.id,
        maxSelect: 1,
        cascadeDelete: false,
      }),
    )

    app.save(courses)
  },
  (app) => {
    const courses = app.findCollectionByNameOrId('courses')
    courses.fields.removeByName('category_id')
    app.save(courses)
  },
)
