onRecordAfterCreateSuccess((e) => {
  const recipientEmail = 'contato@primeiraconquista.com.br'
  const name = e.record.getString('name')
  const senderEmail = e.record.getString('email') || 'Não informado'
  const whatsapp = e.record.getString('whatsapp')
  const messageText = e.record.getString('message') || 'sem mensagem'

  const emailSubject = 'Nova mensagem de contato - ' + name
  const emailContent = [
    'Nova mensagem de contato recebida:',
    '',
    'Nome Completo: ' + name,
    'WhatsApp: ' + whatsapp,
    'Mensagem: ' + messageText,
    'E-mail: ' + senderEmail,
  ].join('\n')

  $app
    .logger()
    .info(
      'Contact notification email triggered',
      'to',
      recipientEmail,
      'subject',
      emailSubject,
      'sender_name',
      name,
      'sender_email',
      senderEmail,
      'sender_whatsapp',
      whatsapp,
    )

  try {
    const msg = new Message({
      from: { name: 'Site Primeira Conquista', address: recipientEmail },
      to: [{ address: recipientEmail }],
      subject: emailSubject,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    })
    $app.newMailClient().send(msg)
  } catch (err) {
    $app
      .logger()
      .error(
        'Failed to send contact notification email',
        'error',
        err.message,
        'recordId',
        e.record.id,
      )
  }

  return e.next()
}, 'contacts')
