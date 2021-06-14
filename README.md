# Best tournament app

It's the best tournament application for make fun in companies

## Getting started

### Settings

Before running application You need to create setting files.\
Setting files should are located in `web-app` and `server` directory as `.env` files.
A sample file with these settings is named `.env.example` in each directory. You can copy it as a new file named `.env` and update it.

#### Web applications settings (`web-app/.env`):

- server connection:

  - `HOST` - IP address of tournament api server,
  - `PORT` - PORT of tournament api server,
  - `SSL` - PORT of tournament api server,

- default locale:

  - `DEFAULT_LOCALE` - code of default language in application, it can be changed by the user in the application, available languages: `PL`, `EN`,

#### Server settings (`server/.env`):

- server connection:

  - `NODE_ENV` - variable indicating the operating mode, available options: `production` (logging is kept to a minimum) and `development` (more logs in console/endpoint),
  - `PORT` - port on which the server will listen,
  - `FRONTEND_HOST` - host on which frontend app will be setted up,
  - `FRONTEND_PORT` - port on which frontend app will listen,
  - `SSL` - if true server will use https,

- winston - logger

  More deatils in [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file#options) documentation.

  - `LOG_FILE_MAX_SIZE` - maximum size of the file after which it will rotate,
  - `LOG_MAX_FILES_NUMBER` - maximum number of logs to keep,

- database

  There are two types of database connections. First is development(DEV), and second is production(PROD - just replace DEV). The server will automatically select the connection type by looking at the variable `NODE_ENV`.

  - `DB_DEV_USERNAME` - database username,
  - `DB_DEV_PASSWORD` - database password,
  - `DB_DEV_DATABASE` - database name,
  - `DB_DEV_HOST` - database host,
  - `DB_DEV_PORT` - database port,

- JWT cookie

  - `JWT_COOKIE_EXPIRES_IN_HOURS` - hours to expiry of the JTW cookie,

- azure organization

  - `CLIENT_SECRET` - ,
  - `CLIENT_ID` - ,
  - `OBJECT_ID` - ,
  - `TENANT_ID` - ,
  - `AUTHORITY_URL` - ,

- slack

  - `SLACK_APP_TOKEN` - Slack Bot User OAuth Token, more details in [Add Slack's bot](#Add-Slack's-bot) section,
  - `SLACK_NOTIFY_TIME_MINUTES` - minutes of the time at which the slack notification will be sent,
  - `SLACK_NOTIFY_TIME_HOURS` - hour of the time at which the slack notification will be sent,

### Add Slack's bot

First, create and install a slack bot based on prepared manifest file in Your workspace.

1. Visit this page: https://api.slack.com/apps and click "Create New App"
2. Select "From an app manifest" option, then pick your slack's workspace
3. Copy [this manifest](slack-bot-manifest.yaml) file into input, next and create
4. On app page click "Install to Workspace", You need to allow permissions for Your Slack's workspace

Then connect slack's bot with app server.

1. On Slack's bot webpage visit "OAuth & Permissions" tab
2. Copy "Bot User OAuth Token" to server [environment variables](server/.env) as SLACK_APP_TOKEN value
3. After restarting server, every day, members of the matches on that day will be notified in DM

## Development

> **_NOTE:_** it's recommended to use yarn in `./web-app` by quasar and required by CI/CL. In the end `yarn.lock` or `package-lock.json` must by up to date for CI/CL function properly.

1\. In server and web application folders copy `.env.example` to `.env` file and change the settings for yourself:

2\. Install quasar globally:

```bash
$ yarn global add @quasar/cli
# or
$ npm install -g @quasar/cli
```

3\. Install the dependencies in subfolders:

```bash
./server$ yarn
./web-app$ yarn
```

4\. Start the app in development mode (hot-code reloading, error reporting, etc.):

```bash
#server
./server$ yarn dev

# web application
./web-app$ quasar dev
```

## Commands

Lint the files:

```bash
# lint server and web application
$ yarn lintAll

# lint server
./server$ yarn lint

# lint web application
./web-app$ yarn lint
```

Build the app for production:

```bash
#server
./server$ yarn build

# web application
./web-app$ quasar build
```

## Docker

#### Configuration

```bash
# database root user
  username: root
  password: secret
```

> **_NOTE:_** user are specified in `docker-compose.yml`

Start the database (mongodb) via docker. Use `-d` to run in background:

```bash
$ sudo docker-compose up -d
```

Use GUI for quickly inspect database, open in browser [localhost:8081](localhost:8081).

See logs from container(database):

```bash
$ sudo docker logs mongodb
```

Interacting with the MongoDB container:

Note: there You will have access to `mongo` command

```bash
$ sudo docker exec -it mongodb bash
```
