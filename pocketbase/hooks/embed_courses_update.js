onRecordAfterUpdateSuccess((e) => {
  const titleChanged = e.record.getString('title') !== e.record.original().getString('title')
  const descChanged =
    e.record.getString('description') !== e.record.original().getString('description')
  const catChanged = e.record.getString('category') !== e.record.original().getString('category')
  const currChanged =
    e.record.getString('curriculum') !== e.record.original().getString('curriculum')

  if (!titleChanged && !descChanged && !catChanged && !currChanged) return e.next()
  const text = (
    e.record.getString('title') +
    '\n\n' +
    e.record.getString('description') +
    '\n\n' +
    e.record.getString('category') +
    '\n\n' +
    e.record.getString('curriculum')
  ).trim()
  if (!text) return e.next()
  try {
    const res = $ai.embed({ input: text })
    const record = $app.findRecordById('courses', e.record.id)
    record.set('embedding', res.data[0].embedding)
    $app.save(record)
  } catch (err) {
    console.log('embedding failed for record ' + e.record.id, err.message)
  }
  return e.next()
}, 'courses')
