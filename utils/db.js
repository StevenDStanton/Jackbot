import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function insertChatRow(role, speaker, message) {
  await client.query(
    'INSERT INTO chat (Role, Speaker, Message) VALUES ($1, $2, $3)',
    [role, speaker, message],
  );
}

export { insertChatRow };
