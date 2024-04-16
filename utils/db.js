const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_TOKEN,
});

async function insertChatRow(role, speaker, message) {
  await client
    .execute({
      sql: 'INSERT INTO users (Role, Speaker, Message) VALUES (?, ?, ?)',
      args: [role, speaker, message],
    })
    .catch((error) => {
      console.error('Failed to insert chat row:', error);
    });
}

module.exports = { insertChatRow };
