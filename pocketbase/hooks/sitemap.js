routerAdd('GET', '/backend/v1/sitemap', (e) => {
  const baseUrl = 'https://primeiraconquista.com.br'

  function escapeXml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  function formatDate(dateStr) {
    try {
      return new Date(dateStr).toISOString()
    } catch (_) {
      return new Date().toISOString()
    }
  }

  var urls = []

  urls.push({
    loc: baseUrl + '/',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '1.0',
  })

  try {
    var categories = $app.findRecordsByFilter('categories', 'is_active = true', '-updated', 0, 0)
    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i]
      urls.push({
        loc: baseUrl + '/categoria/' + cat.getString('slug'),
        lastmod: formatDate(cat.getString('updated')),
        changefreq: 'weekly',
        priority: '0.8',
      })
    }
  } catch (_) {}

  try {
    var courses = $app.findRecordsByFilter('courses', 'is_active = true', '-updated', 0, 0)
    for (var j = 0; j < courses.length; j++) {
      var course = courses[j]
      urls.push({
        loc: baseUrl + '/cursos/' + course.getString('slug'),
        lastmod: formatDate(course.getString('updated')),
        changefreq: 'weekly',
        priority: '0.9',
      })
    }
  } catch (_) {}

  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (var k = 0; k < urls.length; k++) {
    var u = urls[k]
    xml += '  <url>\n'
    xml += '    <loc>' + escapeXml(u.loc) + '</loc>\n'
    xml += '    <lastmod>' + u.lastmod + '</lastmod>\n'
    xml += '    <changefreq>' + u.changefreq + '</changefreq>\n'
    xml += '    <priority>' + u.priority + '</priority>\n'
    xml += '  </url>\n'
  }

  xml += '</urlset>'

  e.response.header().set('Content-Type', 'application/xml')
  return e.string(200, xml)
})
