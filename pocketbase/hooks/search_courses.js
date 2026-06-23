routerAdd('POST', '/backend/v1/search/courses', (e) => {
  const body = e.requestInfo().body || {}
  const query = (body.query || '').trim()
  if (!query) return e.badRequestError('missing query')

  try {
    const embedRes = $ai.embed({ input: query })
    const results = $vectors.search(e, 'courses', {
      field: 'embedding',
      query: embedRes.data[0].embedding,
      k: body.k || 10,
      filter: 'is_active = true',
    })
    return e.json(200, results)
  } catch (err) {
    return e.json(500, { error: err.message })
  }
})
