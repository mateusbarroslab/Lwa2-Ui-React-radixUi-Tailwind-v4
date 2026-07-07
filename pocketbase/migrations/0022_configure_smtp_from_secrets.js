migrate(
  (app) => {
    const host = $secrets.get('SMTP_HOST')
    const port = $secrets.get('SMTP_PORT')
    const username = $secrets.get('SMTP_USERNAME')
    const password = $secrets.get('SMTP_PASSWORD')

    if (!host || !port || !username || !password) {
      console.log('SMTP secrets not fully configured, skipping SMTP setup')
      return
    }

    var smtpConfig = JSON.stringify({
      enabled: true,
      host: host,
      port: parseInt(port, 10),
      username: username,
      password: password,
      tls: false,
    })

    app
      .db()
      .newQuery(
        "UPDATE _params SET value = json_set(value, '$.smtp', json(:smtp)) WHERE key = 'settings'",
      )
      .bind({ smtp: smtpConfig })
      .execute()

    console.log('SMTP settings configured from secrets (STARTTLS port ' + port + ')')
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

    app
      .db()
      .newQuery(
        "UPDATE _params SET value = json_set(value, '$.smtp', json(:smtp)) WHERE key = 'settings'",
      )
      .bind({ smtp: smtpConfig })
      .execute()
  },
)
