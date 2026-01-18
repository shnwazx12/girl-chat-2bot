import { db } from '../database/db.js';

const moods = [
  { name: 'happy', prompt: 'cheerful and optimistic' },
  { name: 'soft', prompt: 'gentle, calm, and affectionate' },
  { name: 'shy', prompt: 'shy and reserved' },
  { name: 'moody', prompt: 'thoughtful and sensitive' },
  { name: 'playful', prompt: 'playful and teasing' }
];

export function getMood() {
  const now = Date.now();
  const row = db.prepare('SELECT * FROM mood WHERE id = 1').get();

  if (row && now < row.expiresAt) return row;

  const mood = moods[Math.floor(Math.random() * moods.length)];
  const hours = Math.floor(Math.random() * 4) + 2;

  db.prepare('DELETE FROM mood').run();
  db.prepare(
    'INSERT INTO mood (id, name, prompt, expiresAt) VALUES (1, ?, ?, ?)'
  ).run(mood.name, mood.prompt, now + hours * 60 * 60 * 1000);

  return mood;
}
