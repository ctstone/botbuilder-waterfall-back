import { ICallConnector, IDialogResult, UniversalCallBot } from 'botbuilder-calling';
import { CustomDialog } from './my-dialog';

export default function createBot(connector: ICallConnector): UniversalCallBot {
  const bot = new UniversalCallBot(connector);
  bot.on('error', console.error);
  bot.dialog('/', [
    (session, args, next) => {
      session.beginDialog('custom', 'some args');
    },
    (session, args: IDialogResult<string>, next) => {

      // custom dialog returned normally
      if (args.response === 'some data') {
        session.endDialog('goodbye');

      // never executes when custom dialog passes ResumeReason.back
      // even if it did execute, args are not relevant
      } else {
        const err = new Error('wrong args!');
        session.error(err);
        throw err;
      }
    },
  ]);
  bot.dialog('custom', new CustomDialog());
  return bot;
}
