export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const botToken = Netlify.env.get('TELEGRAM_BOT_TOKEN')

  if (!botToken) {
    return Response.json(
      { error: 'Telegram bot token is missing' },
      { status: 500 },
    )
  }

  try {
    const update = await request.json()

    const callback = update.callback_query

    if (!callback) {
      return Response.json({ ok: true })
    }

    const action = callback.data

    let text = '🧪 Demo action received'

    if (action === 'approve_demo') {
      text = '✅ Demo application approved'
    } else if (action === 'reject_demo') {
      text = '❌ Demo application rejected'
    } else if (action === 'reset_demo') {
      text = '🔄 Demo application reset'
    }

    // Tell Telegram that the button press was received
    await fetch(
      `https://api.telegram.org/bot${botToken}/answerCallbackQuery`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callback_query_id: callback.id,
          text,
        }),
      },
    )

    // Change the message status
    await fetch(
      `https://api.telegram.org/bot${botToken}/editMessageText`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: callback.message?.chat.id,
          message_id: callback.message?.message_id,
          text: text,
        }),
      },
    )

    return Response.json({ ok: true })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Webhook error' },
      { status: 500 },
    )
  }
}

export const config = {
  path: '/.netlify/functions/telegram-webhook',
}
