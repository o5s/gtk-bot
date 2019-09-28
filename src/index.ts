import './setup';

import botstream from '@leesiongchan/botstream';

import gtkConvo$ from './skills/convo-gtk';

if (!process.env.FACEBOOK_ACCESS_TOKEN || !process.env.FACEBOOK_VERIFY_TOKEN) {
  throw new Error('You need to have both `FACEBOOK_ACCESS_TOKEN` and `FACEBOOK_VERIFY_TOKEN` configured.');
}
const bot = botstream({
  facebookAccessToken: process.env.FACEBOOK_ACCESS_TOKEN,
  facebookApiVersion: process.env.FACEBOOK_API_VERSION,
  facebookVerifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
});

bot.loadSkills(gtkConvo$);
