# Best tournament app

It's the best tournament application for make fun in companies

## Getting started

> **_NOTE:_** it's recommended to use yarn in `./web-app` by quasar and required by CI/CL. In the end `yarn.lock` or `package-lock.json` must by up to date for CI/CL function properly.

1\. In server folder copy `.env.example` to `.env` file and change the settings for yourself:

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
