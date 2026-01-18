import TelegramBot from 'node-telegram-bot-api';
import { config } from './config.js';
import { handleModeCommand, handleChatMessage } from './handlers/messageHandler.js';

const bot = new TelegramBot(config.telegramToken, { polling: true });

bot.onText(/\/mode (.+)/, (msg, match) => {
  handleModeCommand(bot, msg, match[1]);
});

bot.on('message', (msg) => {
  if (msg.text?.startsWith('/mode')) return;
  handleChatMessage(bot, msg);
});

console.log('💖 Real Girl Feel AI running...');
