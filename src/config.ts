import { ICallConnectorSettings } from 'botbuilder-calling';

export const CALL_SETTINGS: ICallConnectorSettings = {
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
  callbackUrl: process.env.CALLBACK_URL,
} as any;
