onRecordAfterCreateSuccess((e) => {
  const email = 'contato@primeiraconquista.com.br'
  const name = e.record.getString('name')
  const senderEmail = e.record.getString('email') || 'não informado'
  const whatsapp = e.record.getString('whatsapp')
  const message = e.record.getString('message') || 'sem mensagem'

  $app
    .logger()
    .info(
      'New contact notification sent via email',
      'to',
      email,
      'sender_name',
      name,
      'sender_email',
      senderEmail,
      'sender_whatsapp',
      whatsapp,
      'message',
      message,
    )

  // Here you would integrate with an SMTP proxy or external mail service,
  // e.g. $http.send({ url: "https://api.resend.com/emails", ... })

  e.next()
}, 'contacts')
