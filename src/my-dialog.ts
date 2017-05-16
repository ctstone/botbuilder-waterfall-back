import { CallSession, Dialog, IDialogResult, Prompts, ResumeReason } from 'botbuilder-calling';

export class CustomDialog extends Dialog {
  begin(session: CallSession, args: any) {
    Prompts.confirm(session, 'Say "Yes" to intercept. Say "no" to continue.');
  }

  replyReceived(session: CallSession): void {
    throw new Error("Method not implemented.");
  }

  dialogResumed(session: CallSession, result: IDialogResult<any>): void {
    if (result.childId === 'BotBuilder:Prompts') {
      if (result.response === true) {
        // response was intercepted. caller should repeat prior waterfall step
        session.endDialogWithResult({resumed: ResumeReason.back});
      } else {
        // response handled normally. continue waterfall
        session.endDialogWithResult({resumed: ResumeReason.completed, response: 'some data'});
      }
    }
  }
}
