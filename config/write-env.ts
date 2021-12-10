import * as fs from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

const dotenv = config()?.parsed;

// (default) get environmental variables from system.
const env = {
  mailSendURL: process.env.MAIL_SEND_URL,
  mailSendKey: process.env.MAIL_SEND_KEY
};

// overwrite with the content in .env file
if (dotenv) {
  env.mailSendURL = dotenv.MAIL_SEND_URL;
  env.mailSendKey = dotenv.MAIL_SEND_KEY;
}

// write in dynamic.ts
const contents = 'export const dynamic = ' + JSON.stringify(env);
fs.writeFileSync(
  join(__dirname, '../src/environments/dynamic.ts'),
  contents
);
