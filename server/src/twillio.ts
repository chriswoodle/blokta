const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

import * as twilio from 'twilio';
const client = twilio(accountSid, authToken);

export function call(to: string) {
  return client.calls
    .create({
      url: 'https://woodle.ngrok.io/call.xml',
      to: `+${to}`,
      from: `+${fromNumber}`
    });
}
export function sms(message: string, to: string) {
  return client.messages
    .create({
      body: message,
      from: `+${fromNumber}`,
      to: `+${to}`,
    });
}