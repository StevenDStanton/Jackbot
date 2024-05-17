import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_TOKEN || '',
});

async function insertChatRow(
  role: string,
  speaker: string,
  message: string,
): Promise<void> {
  try {
    await client.execute({
      sql: 'INSERT INTO chat (Role, Speaker, Message) VALUES (?, ?, ?)',
      args: [role, speaker, message],
    });
  } catch (error) {
    console.error('Failed to insert chat row:', error);
  }
}

async function insertModViolation(
  speaker: string,
  discriminator: string,
  message: string,
): Promise<void> {
  try {
    await client.execute({
      sql: 'INSERT INTO violations (Speaker, Discriminator, Message) VALUES (?, ?, ?)',
      args: [speaker, discriminator, message],
    });
  } catch (error) {
    console.error('Failed to insert mod flag:', error);
  }
}

export { insertChatRow, insertModViolation };
