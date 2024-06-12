import { createClient } from '@libsql/client';
import { format, toZonedTime } from 'date-fns-tz';

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
    const datetime = new Date().toISOString();
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
    const datetime = getDateTime();
    await client.execute({
      sql: 'INSERT INTO violations (Speaker, Discriminator, Message, created_at) VALUES (?, ?, ?, ?)',
      args: [speaker, discriminator, message, datetime],
    });
  } catch (error) {
    console.error('Failed to insert mod flag:', error);
  }
}

function getDateTime(): string {
  const date = new Date();
  const timeZone = 'America/New_York';

  const zonedDate = toZonedTime(date, timeZone);

  const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone,
  });

  return formattedDate;
}

export { insertChatRow, insertModViolation };
