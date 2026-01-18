import { replyAsGirl, setMode } from '../handlers/openaiHandler.js';
import { config } from '../config.js';

export async function handleModeCommand(bot, msg, mode) {
  const chatId = msg.chat.id;

  if (!['clean', 'romantic', 'flirty'].includes(mode)) {
    bot.sendMessage(chatId, '❌ Use /mode clean | romantic | flirty');
    return;
  }

  setMode(mode);
  bot.sendMessage(chatId, `💖 Mode changed to *${mode}*`, { parse_mode: 'Markdown' });
}

export async function handleChatMessage(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  const isReply =
    msg.reply_to_message &&
    msg.reply_to_message.from?.is_bot;

  const isMention = text.includes(`@${bot.username}`);
  if (!isReply && !isMention) return;

  const cleanText = text.replace(`@${bot.username}`, '').trim();

  await bot.sendChatAction(chatId, 'typing');
  const reply = await replyAsGirl(cleanText);

  const sent = await bot.sendMessage(chatId, reply, {
    reply_to_message_id: msg.message_id
  });

  setTimeout(() => {
    bot.deleteMessage(chatId, sent.message_id).catch(() => {});
  }, config.autoDeleteMinutes * 60 * 1000);
}
