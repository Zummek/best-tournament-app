# Best tournament app

It's the best tournament application for make fun in companies

## Getting started

### Add Slack's bot

First, create and install a slack bot based on prepared manifest file in Your workspace.

1. Visit this page: https://api.slack.com/apps and click "Create New App"
2. Select "From an app manifest" option, then pick your slack's workspace
3. Copy [this manifest](slack-bot-manifest.yaml) file into input, next and create
4. On app page click "Install to Workspace", You need to allow permissions for Your Slack's workspace.

Then connect slack's bot with app server.

1. On Slack's bot webpage visit "OAuth & Permissions" tab
2. Copy "Bot User OAuth Token" to server [environment variables](server/.env) as SLACK_APP_TOKEN value

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
