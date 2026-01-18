import Database from 'better-sqlite3';

export const db = new Database('data.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS mood (
    id INTEGER PRIMARY KEY,
    name TEXT,
    prompt TEXT,
    expiresAt INTEGER
  )
`).run();
