# About
This is a simple bot to show inability to move backward in a calling bot waterfall from a custom dialog.

# Run
1. `npm install`
1. `set port=3001`
1. `set MICROSOFT_APP_ID=YOUR_ID`
1. `set MICROSOFT_APP_PASSWORD=YOUR_PW`
1. `set CALLBACK_URL=https://YOUR_NGROK.ngrok.io/api/calls`
1. `node ./dist`
1. `ngrok http -subdomain=YOUR_NGROK %port%`

> Use [ngrok][1] to proxy localhost:3001 to Internet

# Use Case
A caller might answer a specific prompt ("what is your username?") with a completely separate intent ("i want to change my password"). The bot should be able to fork the conversation, handle the intent (begin a dialog to change the password), and then return to the original prompt ("what is your username?").

# Repro
1. Call the bot
1. Say "yes" to launch a subdialog that intercepts and reinterprets the original message.

## Expected behavior
1. Subdialog completes and waterfall replays step 0 when response is "yes"

## Actual behavior
1. Waterfall [internally decrements][2] `step` from `0` to `-1`, which is an invalid value.
1. Waterfall calls `endDialogWithResult({ resumed: ResumeReason.completed })` without replaying step 0 or moving forward to step 1.



[1]: https://ngrok.com/
[2]: https://github.com/Microsoft/BotBuilder/blob/master/Node/calling/src/dialogs/DialogAction.ts#L118-L129