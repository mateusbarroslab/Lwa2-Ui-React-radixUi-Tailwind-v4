onRecordCreate((e) => {
  const recipientEmail = 'contato@primeiraconquista.com.br'
  const senderName = $secrets.get('SMTP_SENDER_NAME') || 'Site Primeira Conquista'
  const senderAddress =
    $secrets.get('SMTP_SENDER_ADDRESS') ||
    $secrets.get('SMTP_USERNAME') ||
    $secrets.get('SMTP_USER') ||
    recipientEmail

  const name = e.record.getString('name')
  const contactEmailRaw = e.record.getString('email')
  const contactEmail =
    contactEmailRaw && contactEmailRaw.trim() !== '' ? contactEmailRaw : 'Não informado'
  const whatsapp = e.record.getString('whatsapp') || 'Não informado'
  const messageText = e.record.getString('message') || 'sem mensagem'

  let courseTitle = 'Não informado'
  const courseId = e.record.getString('course_id')
  if (courseId) {
    try {
      const course = $app.findRecordById('courses', courseId)
      courseTitle = course.getString('title')
    } catch (_) {}
  }

  const emailSubject = 'Nova mensagem de contato - ' + name
  const emailContent = [
    'Nova mensagem de contato recebida:',
    '',
    'Nome Completo: ' + name,
    'WhatsApp: ' + whatsapp,
    'E-mail: ' + contactEmail,
    'Curso de Interesse: ' + courseTitle,
    'Mensagem: ' + messageText,
  ].join('\n')

  $app
    .logger()
    .info(
      'Contact notification email triggered',
      'to',
      recipientEmail,
      'from',
      senderAddress,
      'subject',
      emailSubject,
      'sender_name',
      name,
      'sender_email',
      contactEmail,
      'sender_whatsapp',
      whatsapp,
      'course',
      courseTitle,
    )

  try {
    const msg = new Message({
      from: { name: senderName, address: senderAddress },
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
        'recordName',
        name,
        'from',
        senderAddress,
        'to',
        recipientEmail,
      )
    throw new BadRequestError('Falha ao enviar notificação por e-mail: ' + err.message)
  }

  return e.next()
}, 'contacts')
