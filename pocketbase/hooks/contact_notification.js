onRecordAfterCreateSuccess((e) => {
  const recipientEmail = 'contato@primeiraconquista.com.br'
  const smtpUsername = $secrets.get('SMTP_USERNAME') || recipientEmail
  const name = e.record.getString('name')
  const senderEmail = e.record.getString('email') || 'Não informado'
  const whatsapp = e.record.getString('whatsapp')
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
    'E-mail: ' + senderEmail,
    'Curso de Interesse: ' + courseTitle,
    'Mensagem: ' + messageText,
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
      'course',
      courseTitle,
    )

  try {
    const msg = new Message({
      from: { name: 'Site Primeira Conquista', address: smtpUsername },
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
