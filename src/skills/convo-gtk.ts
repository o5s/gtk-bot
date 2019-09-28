import { messageEvent$, say, showSenderAction } from '@leesiongchan/botstream';

import { getRandomFact } from '../utils/gtk-api-client';

const gtkConvo$ = messageEvent$.pipe(
  showSenderAction('typing_on'),
  say(ev => getRandomFact()),
);

export default gtkConvo$;
