migrate(
  (app) => {
    const host = $secrets.get('SMTP_HOST')
    const port = $secrets.get('SMTP_PORT')
    const username = $secrets.get('SMTP_USER') || $secrets.get('SMTP_USERNAME')
    const password = $secrets.get('SMTP_PASS') || $secrets.get('SMTP_PASSWORD')
    const senderName = $secrets.get('SMTP_SENDER_NAME') || 'Site Primeira Conquista'
    const senderAddress =
      $secrets.get('SMTP_SENDER_ADDRESS') || username || 'contato@primeiraconquista.com.br'

    if (!host || !port || !username || !password) {
      console.log('SMTP secrets not fully configured, skipping STARTTLS configuration')
      return
    }

    const portInt = parseInt(port, 10)

    // Try app.settings() API first (preferred — persists via PocketBase model layer)
    var configured = false
    try {
      const settings = app.settings()
      settings.smtp.enabled = true
      settings.smtp.host = host
      settings.smtp.port = portInt
      settings.smtp.username = username
      settings.smtp.password = password
      settings.smtp.tls = false
      settings.meta.senderName = senderName
      settings.meta.senderAddress = senderAddress
      app.save(settings)
      configured = true
      console.log('SMTP configured via app.settings() API — STARTTLS on port ' + portInt)
    } catch (e) {
      console.log('app.settings() unavailable, falling back to raw SQL: ' + e.message)
    }

    if (!configured) {
      var smtpConfig = JSON.stringify({
        enabled: true,
        host: host,
        port: portInt,
        username: username,
        password: password,
        tls: false,
      })

      app
        .db()
        .newQuery(
          "UPDATE _params SET value = json_set(value, '$.smtp', json({:smtp})) WHERE id = 'settings'",
        )
        .bind({ smtp: smtpConfig })
        .execute()

      app
        .db()
        .newQuery(
          "UPDATE _params SET value = json_set(value, '$.meta.senderName', {:senderName}, '$.meta.senderAddress', {:senderAddress}) WHERE id = 'settings'",
        )
        .bind({ senderName: senderName, senderAddress: senderAddress })
        .execute()

      console.log('SMTP configured via raw SQL — STARTTLS on port ' + portInt)
    }
  },
  (app) => {
    var smtpConfig = JSON.stringify({
      enabled: false,
      host: '',
      port: 0,
      username: '',
      password: '',
      tls: false,
    })

    try {
      app
        .db()
        .newQuery(
          "UPDATE _params SET value = json_set(value, '$.smtp', json({:smtp})) WHERE id = 'settings'",
        )
        .bind({ smtp: smtpConfig })
        .execute()
    } catch (_) {}
  },
)
