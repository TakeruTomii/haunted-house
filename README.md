# HauntedHouse

This is a portfolio site that introduce myself to Recruiters.

[Click here if you'd like to confirm this project immidiately.](https://www.samayou.net/)

## Environment

- Node.js 14
- npm 6
- Angular 11

## Deployment

**\*Only for the first time**

- Create `.env` file right under the `haunted-house` directory.
- Copy and paste the dummy values on the `.env` file. **\*On production environment, These variables are stored in system environment variables on your server.**

```.env
MAIL_SEND_URL=http://localhost:60000/dummy
MAIL_SEND_KEY=DUMMYAUTHENTICATIONKEYOFMAILAPI
```

- Execute the commands below.

```
npm install
npm run write-env
```

##### Note: `write-env` is a command to create a configration file. `(/src/environments/dynamic.ts) `

**Deployment to a dev server**

```
npm run dev
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
