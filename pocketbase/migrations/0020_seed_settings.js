migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('settings')
    try {
      app.findFirstRecordByData('settings', 'email', 'contato@primeiraconquista.com.br')
    } catch (_) {
      const record = new Record(col)
      record.set('whatsapp', '5524992934189')
      record.set('phone', '(24) 99293-4189')
      record.set('email', 'contato@primeiraconquista.com.br')
      record.set(
        'address',
        'Rua Coronel Carvalho, 13, 2º Pavimento, Sobreloja 1:A\nCentro - Angra dos Reis',
      )
      app.save(record)
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData(
        'settings',
        'email',
        'contato@primeiraconquista.com.br',
      )
      app.delete(record)
    } catch (_) {}
  },
)
