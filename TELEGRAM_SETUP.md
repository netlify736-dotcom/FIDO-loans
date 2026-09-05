# Telegram setup

This project sends each submitted loan application to a Telegram chat through a Netlify Function. The Telegram bot token is kept server-side and is never placed in the browser code.

## 1. Create a Telegram bot

1. Open Telegram and search for **@BotFather**.
2. Send `/newbot`.
3. Follow the prompts and copy the bot token.
4. Open the new bot and send it `/start` (or send any message to it).

## 2. Get your Telegram chat ID

The easiest method is to open this URL in a browser after messaging the bot:

`https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates`

Replace `YOUR_BOT_TOKEN` with the token from BotFather. In the JSON response, find `message.chat.id`. That number is your `TELEGRAM_CHAT_ID`.

For a group, add the bot to the group and send a message in the group, then use `getUpdates` to find the group's chat ID (usually a negative number).

## 3. Add the two Netlify environment variables

In your Netlify site:

**Site configuration → Environment variables → Add a variable**

Add:

- `TELEGRAM_BOT_TOKEN` = your BotFather token
- `TELEGRAM_CHAT_ID` = your Telegram chat ID

Do not put the bot token into the website's React code.

## 4. Redeploy

After saving the variables, trigger a new deploy. Then submit a test application. The application should arrive in the Telegram chat.


## Security note
Never collect or send a Mobile Money PIN or one-time password (OTP) through this form, Telegram, or Netlify. The application flow is designed to request the phone number only.
