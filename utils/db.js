const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function insertChatRow(role, speaker, message) {
  await client.execute({
    sql: 'INSERT INTO users (Role, Speaker, Message) VALUES (?, ?, ?)',
    args: [role, speaker, message],
  });
}

module.exports = { insertChatRow };
