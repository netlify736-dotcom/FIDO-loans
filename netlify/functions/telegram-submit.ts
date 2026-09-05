export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const botToken = Netlify.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Netlify.env.get('TELEGRAM_CHAT_ID')

  if (!botToken || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return Response.json({ error: 'Telegram is not configured' }, { status: 500 })
  }

  try {
    const form = await request.formData()
    const get = (name: string) => String(form.get(name) ?? '').trim()

    if (get('bot-field')) {
      return Response.json({ ok: true })
    }

    const required = [
      'full-name',
      'phone-number',
      'national-id',
      'mobile-money-number',
      'loan-amount',
      'repayment-period',
      'monthly-net-income',
      'employment-status',
      'applicant-consent',
    ]

    for (const field of required) {
      if (!get(field)) {
        return Response.json({ error: `Missing field: ${field}` }, { status: 400 })
      }
    }

    // Keep authentication secrets out of the application flow.
    // Never collect, store, or send a Mobile Money PIN or OTP.
    // Match the compact, sectioned Telegram layout requested by the user,
    // while deliberately excluding PINs, OTPs, passwords, or other credentials.
    const message = [
      '🔔 LOAN APPLICATION RECEIVED',
      '',
      'USER DETAILS:',
      `• Full name: ${get('full-name')}`,
      `• Phone Number: ${get('phone-number')}`,
      `• National ID: ${get('national-id')}`,
      `• Mobile Money Number: ${get('mobile-money-number')}`,
      '',
      'LOAN DETAILS:',
      `• Loan Amount: UGX ${get('loan-amount')}`,
      `• Repayment Period: ${get('repayment-period')}`,
      '',
      'INCOME DETAILS:',
      `• Monthly Income: UGX ${get('monthly-net-income')}`,
      `• Employment Status: ${get('employment-status')}`,
      '',
      'APPLICATION STATUS:',
      '• Status: REVIEW NEEDED',
      `• Time: ${new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' })}`,
      '',
      '🔒 SECURITY:',
      '• PIN/OTP: Not collected or requested.',
    ].join('\n')

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ Mark Received', callback_data: 'mark_received' },
            { text: '⚠️ Needs Review', callback_data: 'needs_review' },
          ], [
            { text: '🕒 Follow Up', callback_data: 'follow_up' },
          ]],
        },
      }),
    })

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text()
      console.error('Telegram API error:', details)
      return Response.json({ error: 'Telegram delivery failed' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Submission error:', error)
    return Response.json({ error: 'Invalid submission' }, { status: 400 })
  }
}

export const config = {
  path: '/.netlify/functions/telegram-submit',
}
