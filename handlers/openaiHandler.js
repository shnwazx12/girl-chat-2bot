import OpenAI from 'openai';
import { config } from '../config.js';
import { getMood } from '../utils/mood.js';

const openai = new OpenAI({ apiKey: config.openaiKey });
let currentMode = 'clean';
let memory = [];

export function setMode(mode) {
  currentMode = mode;
}

function modePrompt() {
  if (currentMode === 'romantic') return 'Be affectionate and emotionally warm. No sexual content.';
  if (currentMode === 'flirty') return 'Be playful and teasing, NON-EXPLICIT.';
  return 'Be friendly, wholesome, and supportive.';
}

export async function replyAsGirl(text) {
  memory.push({ role: 'user', content: text });
  if (memory.length > 10) memory.shift();

  const mood = getMood();

  const res = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        role: 'system',
        content: `You are a realistic young woman AI.
${modePrompt()}
Current emotional state: ${mood.prompt}
Maintain this mood.`
      },
      ...memory
    ]
  });

  const reply = res.output_text;
  memory.push({ role: 'assistant', content: reply });
  return reply;
}
