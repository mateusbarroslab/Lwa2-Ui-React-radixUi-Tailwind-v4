onRecordAfterCreateSuccess((e) => {
  const recipientEmail = 'contato@primeiraconquista.com.br'
  const name = e.record.getString('name')
  const senderEmail = e.record.getString('email') || 'Não informado'
  const whatsapp = e.record.getString('whatsapp')
  const message = e.record.getString('message') || 'sem mensagem'

  const emailSubject = 'Nova mensagem de contato - ' + name
  const emailContent = [
    'Nova mensagem de contato recebida:',
    '',
    'Nome Completo: ' + name,
    'WhatsApp: ' + whatsapp,
    'Mensagem: ' + message,
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
      'body',
      emailContent,
      'sender_name',
      name,
      'sender_email',
      senderEmail,
      'sender_whatsapp',
      whatsapp,
    )

  e.next()
}, 'contacts')
