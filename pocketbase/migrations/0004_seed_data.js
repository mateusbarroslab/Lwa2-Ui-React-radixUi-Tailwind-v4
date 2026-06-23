migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'lwa2.ltda@gmail.com')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('lwa2.ltda@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin')
      app.save(record)
    }

    const courses = app.findCollectionByNameOrId('courses')
    const sampleCourses = [
      {
        title: 'Técnico em Administração',
        slug: 'tecnico-em-administracao',
        description:
          'Formação completa em gestão de negócios, finanças e recursos humanos. O mercado de trabalho sempre precisará de bons gestores.',
        workload: '1200h',
        regulatory_info: 'MEC/SISTEC Autorizado',
        category: 'Business',
        curriculum:
          '<ul><li>Fundamentos da Administração</li><li>Gestão de Pessoas</li><li>Finanças Corporativas</li><li>Marketing e Vendas</li><li>Logística e Cadeia de Suprimentos</li></ul>',
        is_active: true,
      },
      {
        title: 'Técnico em Informática',
        slug: 'tecnico-em-informatica',
        description:
          'Desenvolvimento de software, redes e manutenção de computadores. Uma das áreas que mais cresce no Brasil e no mundo.',
        workload: '1000h',
        regulatory_info: 'MEC/SISTEC Reconhecido',
        category: 'Technology',
        curriculum:
          '<ul><li>Lógica de Programação</li><li>Redes de Computadores</li><li>Desenvolvimento Web (Frontend e Backend)</li><li>Manutenção de Hardware</li><li>Segurança da Informação</li></ul>',
        is_active: true,
      },
      {
        title: 'Técnico em Enfermagem',
        slug: 'tecnico-em-enfermagem',
        description:
          'Capacitação para atuar na área da saúde com excelência e cuidado humanizado. Aprenda na prática com laboratórios modernos.',
        workload: '1800h',
        regulatory_info: 'COREN/MEC Aprovado',
        category: 'Health',
        curriculum:
          '<ul><li>Anatomia e Fisiologia Humana</li><li>Fundamentos de Enfermagem</li><li>Primeiros Socorros</li><li>Enfermagem Cirúrgica e Centro Cirúrgico</li><li>Estágio Supervisionado</li></ul>',
        is_active: true,
      },
    ]

    for (const data of sampleCourses) {
      try {
        app.findFirstRecordByData('courses', 'slug', data.slug)
      } catch (_) {
        const record = new Record(courses)
        record.set('title', data.title)
        record.set('slug', data.slug)
        record.set('description', data.description)
        record.set('workload', data.workload)
        record.set('regulatory_info', data.regulatory_info)
        record.set('category', data.category)
        record.set('curriculum', data.curriculum)
        record.set('is_active', data.is_active)
        app.save(record)
      }
    }
  },
  (app) => {},
)
