require('dotenv').config();

const Slack = require('slack');
const CronJob = require('cron').CronJob;
const moment = require('moment');

const token = process.env.SLACK_BOT_TOKEN;
const botface = new Slack({ token });

const standup = () => {
  console.log('Standup');
  const today = moment().format('dddd MMMM Do');
  const message = {
    as_user: true,
    channel: 'development',
    text: `*Daily Check-in, ${today}*
Please take a moment to let everyone know what you’re up to.

> Did you achieve what you set out to yesterday?

> What do you plan to work on today?

> Are there any problems preventing you from making progress?`,
  };
  botface.chat.postMessage(message).then(console.log);
}

new CronJob('0 0 10 * * 1-5', standup, null, true, 'Europe/London');

console.log("Started.");
