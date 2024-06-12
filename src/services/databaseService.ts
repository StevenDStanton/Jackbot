import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_TOKEN || '',
});

async function insertChatRow(
  role: string,
  speaker: string,
  message: string,
  roomId: string,
): Promise<void> {
  try {
    const datetime = formatLocalDateTime();
    await client.execute({
      sql: 'INSERT INTO chat (Role, Speaker, Message, room, created_at) VALUES (?, ?, ?, ?, ?)',
      args: [role, speaker, message, roomId, datetime],
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
    const datetime = formatLocalDateTime();
    await client.execute({
      sql: 'INSERT INTO violations (Speaker, Discriminator, Message, created_at) VALUES (?, ?, ?, ?)',
      args: [speaker, discriminator, message, datetime],
    });
  } catch (error) {
    console.error('Failed to insert mod flag:', error);
  }
}

const formatLocalDateTime = (): string => {
  const now = new Date();
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(now);
};

export { insertChatRow, insertModViolation };
