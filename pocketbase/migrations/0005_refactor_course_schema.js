migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('courses')

    col.fields.add(new JSONField({ name: 'curriculum_json', maxSize: 2000000 }))
    col.fields.add(new TextField({ name: 'short_description' }))
    col.fields.add(new TextField({ name: 'regulatory_title' }))
    col.fields.add(new TextField({ name: 'regulatory_link_text' }))
    col.fields.add(new URLField({ name: 'regulatory_url', exceptDomains: [], onlyDomains: [] }))
    col.fields.add(new TextField({ name: 'completion_time' }))
    col.fields.add(new BoolField({ name: 'national_validity' }))
    col.fields.add(new TextField({ name: 'council_registration' }))
    col.fields.add(new TextField({ name: 'technical_skill_title' }))
    col.fields.add(new TextField({ name: 'technical_skill_subtitle' }))
    col.fields.add(new TextField({ name: 'commercial_observation' }))
    col.fields.add(new BoolField({ name: 'material_included' }))
    col.fields.add(new BoolField({ name: 'fixed_monthly_fee' }))
    col.fields.add(new TextField({ name: 'whatsapp_number' }))
    col.fields.add(new JSONField({ name: 'benefits_json', maxSize: 2000000 }))
    col.fields.add(new JSONField({ name: 'payment_options_json', maxSize: 2000000 }))

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('courses')

    col.fields.removeByName('curriculum_json')
    col.fields.removeByName('short_description')
    col.fields.removeByName('regulatory_title')
    col.fields.removeByName('regulatory_link_text')
    col.fields.removeByName('regulatory_url')
    col.fields.removeByName('completion_time')
    col.fields.removeByName('national_validity')
    col.fields.removeByName('council_registration')
    col.fields.removeByName('technical_skill_title')
    col.fields.removeByName('technical_skill_subtitle')
    col.fields.removeByName('commercial_observation')
    col.fields.removeByName('material_included')
    col.fields.removeByName('fixed_monthly_fee')
    col.fields.removeByName('whatsapp_number')
    col.fields.removeByName('benefits_json')
    col.fields.removeByName('payment_options_json')

    app.save(col)
  },
)
