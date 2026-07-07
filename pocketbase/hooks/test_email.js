routerAdd(
  'POST',
  '/backend/v1/test-email',
  (e) => {
    const host = $secrets.get('SMTP_HOST')
    const port = $secrets.get('SMTP_PORT')
    const username = $secrets.get('SMTP_USERNAME') || $secrets.get('SMTP_USER')
    const password = $secrets.get('SMTP_PASSWORD') || $secrets.get('SMTP_PASS')

    if (!host || !port || !username || !password) {
      return e.json(500, {
        success: false,
        error:
          'SMTP secrets not fully configured. Required: SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD',
      })
    }

    const portInt = parseInt(port, 10)
    const senderName = $secrets.get('SMTP_SENDER_NAME') || 'Site Primeira Conquista'
    const senderAddress = $secrets.get('SMTP_SENDER_ADDRESS') || username
    const recipientEmail = username || 'lwa2.ltda@gmail.com'

    const emailSubject = 'Teste de Conexão SMTP - Primeira Conquista'
    const emailContent = [
      'Este é um e-mail de teste para verificar a conectividade SMTP.',
      '',
      'Servidor: ' + host,
      'Porta: ' + portInt,
      'Usuário: ' + username,
      'TLS: false (STARTTLS)',
      '',
      'Se você recebeu este e-mail, a configuração SMTP está funcionando corretamente.',
    ].join('\n')

    try {
      const msg = new Message({
        from: { name: senderName, address: senderAddress },
        to: [{ address: recipientEmail }],
        subject: emailSubject,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      })
      $app.newMailClient().send(msg)

      $app
        .logger()
        .info('Test email sent successfully', 'to', recipientEmail, 'host', host, 'port', portInt)

      return e.json(200, {
        success: true,
        message: 'E-mail de teste enviado com sucesso para ' + recipientEmail,
        details: {
          host: host,
          port: portInt,
          username: username,
          tls: false,
        },
      })
    } catch (err) {
      $app
        .logger()
        .error(
          'Test email failed',
          'error',
          err.message,
          'host',
          host,
          'port',
          portInt,
          'username',
          username,
        )

      return e.json(500, {
        success: false,
        error: err.message,
        details:
          'Falha ao enviar e-mail de teste via SMTP (' + host + ':' + portInt + '): ' + err.message,
      })
    }
  },
  $apis.requireAuth(),
)
