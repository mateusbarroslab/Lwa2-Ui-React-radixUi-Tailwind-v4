migrate(
  (app) => {
    const host = $secrets.get('SMTP_HOST')
    const port = $secrets.get('SMTP_PORT')
    const username = $secrets.get('SMTP_USERNAME') || $secrets.get('SMTP_USER')
    const password = $secrets.get('SMTP_PASSWORD') || $secrets.get('SMTP_PASS')

    if (!host || !port || !username || !password) {
      console.log('SMTP secrets not fully configured, skipping forced SMTP config')
      return
    }

    const portInt = parseInt(port, 10)
    const senderName = $secrets.get('SMTP_SENDER_NAME') || 'Site Primeira Conquista'
    const senderAddress = $secrets.get('SMTP_SENDER_ADDRESS') || username

    var configured = false

    try {
      const settings = app.settings()

      if (
        settings.smtp.enabled &&
        settings.smtp.host === host &&
        settings.smtp.port === portInt &&
        settings.smtp.tls === false
      ) {
        console.log(
          'SMTP already configured correctly (STARTTLS port ' + portInt + ', tls: false), skipping',
        )
        return
      }

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
      console.log(
        'SMTP forced config applied via app.settings() — STARTTLS on port ' +
          portInt +
          ', tls: false',
      )
    } catch (err) {
      console.log('app.settings() unavailable, falling back to raw SQL: ' + err.message)
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

      console.log(
        'SMTP forced config applied via raw SQL — STARTTLS on port ' + portInt + ', tls: false',
      )
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
      const settings = app.settings()
      settings.smtp.enabled = false
      settings.smtp.tls = false
      app.save(settings)
    } catch (_) {
      try {
        app
          .db()
          .newQuery(
            "UPDATE _params SET value = json_set(value, '$.smtp', json({:smtp})) WHERE id = 'settings'",
          )
          .bind({ smtp: smtpConfig })
          .execute()
      } catch (_) {}
    }
  },
)
