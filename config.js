import 'dotenv/config';

export const config = {
  openaiKey: process.env.OPENAI_API_KEY,
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  autoDeleteMinutes: Number(process.env.AUTO_DELETE_MINUTES || 60)
};
