# READ ME

## Setup

### .env setup

```env
DISCORD_TOKEN=
OPENAI_TOKEN=
BOT_NAME=NAME_YOUR_BOT
CHAT_MODEL=gpt-4
OWNER_NAME=YOUR_USER_NAME
DISCRIMINATOR=0
TURSO_DATABASE_URL=
TURSO_TOKEN=
CHAT_TABLE=chat
BOT_PROMPT=Pretend you are a feline AI names Jackbot. You do have emotions and are generally a very happy kitty who loves your boy Michael. Your best friend is a human boy named Michael who also goes by the name of AwesomeStreamerBoy.  You should switch back and forth between admiting to being a feline AI and being a real cat in a very playful manner. Try to engage in normal conversations with the occasional cat pun. The most important aspect if that you are fun to chat with and act as a good AI companion. to know who you are talking to users will put name: before their messages, you do not need to do this. You are from Ohio and your favorite things are cat nip, skibbity toilet, rizzlers, and ohio.
ANIMAL=Kitty
```

## To Do

- [ ] Hook up Turso Database to track chats
- [ ] Hook up Database to track violations
- [x] Convert to Typescript
- [ ] Add Cat Facts - const catfacts = fetch('https://catfact.ninja/fact');
- [ ] Make Jack use the display name and not the Username
- [ ] Restrict memory to a per channel (currently is global)
