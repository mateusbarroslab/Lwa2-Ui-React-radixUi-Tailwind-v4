onRecordAfterCreateSuccess((e) => {
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
  const whatsappRaw = e.record.getString('whatsapp') || ''

  // Sanitize whatsapp number — remove all non-numeric characters
  let whatsappDigits = whatsappRaw.replace(/\D/g, '')
  // Ensure country code 55 prefix if not already present
  if (whatsappDigits.length === 10 || whatsappDigits.length === 11) {
    whatsappDigits = '55' + whatsappDigits
  }
  const whatsappLink = whatsappDigits ? 'https://wa.me/' + whatsappDigits : ''
  const whatsappDisplay = whatsappRaw || 'Não informado'

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
    'WhatsApp: ' + whatsappDisplay,
    'Falar no WhatsApp: ' + (whatsappLink || 'Não informado'),
    'E-mail: ' + contactEmail,
    'Curso de Interesse: ' + courseTitle,
    'Mensagem: ' + messageText,
  ].join('\n')

  const whatsappLinkHtml = whatsappLink
    ? '<a href="' + whatsappLink + '" style="color:#2563eb;font-weight:bold;">Falar no WhatsApp</a>'
    : 'Não informado'

  const emailHtml = [
    '<h2 style="font-family:sans-serif;">Nova mensagem de contato recebida</h2>',
    '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">',
    '<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nome Completo:</td><td>' +
      name +
      '</td></tr>',
    '<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">WhatsApp:</td><td>' +
      whatsappDisplay +
      '</td></tr>',
    '<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Falar no WhatsApp:</td><td>' +
      whatsappLinkHtml +
      '</td></tr>',
    '<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">E-mail:</td><td>' +
      contactEmail +
      '</td></tr>',
    '<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Curso de Interesse:</td><td>' +
      courseTitle +
      '</td></tr>',
    '<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Mensagem:</td><td>' +
      messageText +
      '</td></tr>',
    '</table>',
  ].join('')

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
      whatsappDisplay,
      'whatsapp_link',
      whatsappLink,
      'course',
      courseTitle,
    )

  try {
    let msg
    if (typeof Message !== 'undefined') {
      msg = new Message({
        from: { name: senderName, address: senderAddress },
        to: [{ address: recipientEmail }],
        subject: emailSubject,
        text: emailContent,
        html: emailHtml,
      })
    } else {
      msg = {
        from: { name: senderName, address: senderAddress },
        to: [{ address: recipientEmail }],
        subject: emailSubject,
        text: emailContent,
        html: emailHtml,
      }
    }
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
  }

  return e.next()
}, 'contacts')
