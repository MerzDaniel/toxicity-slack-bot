
const { App } = require('@slack/bolt');

const { createClassifier } = require('./toxicity')

let classifier

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const responses = [
  'Woah, that was toxic!',
  'That was MEAN, I like it',
  "You're working on your toxic skill: Approved",
  'Toxicity level: Over 9000',
  "Hope Morty didn't read that",
  'TOOOOOXXIC',
]
app.message(async ({ message, say }) => {
  console.log(`Got msg ${message.text}`)
  const predictions = await classifier.classify([message.text])
  if (predictions.some(p => p.results.some(r => r.match))) {
    await say(responses[Math.floor(Math.random() * responses.length)])
  }
});

(async () => {
  // Start your app
  classifier = await createClassifier()
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

