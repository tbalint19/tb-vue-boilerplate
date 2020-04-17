# VueJS boilerplate app

## Features
- Vuex state management
- Vue router
- Unit tests with jest
- Integration tests (store tests) with jest
- Google OpenID authentication
- Vue18n added
- Mockable content
- Axios http client with mocks for test and dev
- Vuetify added
- Prerender plugin added
- Prettier format
- CI/CD

## Requirements
- node
- npm
- git
- docker

## Setup checklist

1. _Setup app for local npm start_
  - rename app folder
  - install dependencies
  - rename project in package.json (+author, description)
  - create content

  ```bash
  mv tb-vue-boilerplate frontend
  cd frontend
  npm i
  npm run cgen
  npm run serve
  ```

  __-> App is ready to run locally__

2.  _Setup git_
  - Setup an account at [github](https://github.io)
  - (Shell github login is required)
  - remove current .git folder
  - git add, commit, create repo, push...

  __-> code is versioned locally and remote__

3. _Setup dev env - out-of-the-box working_
  - Run code format
  - Run existing unit tests
  - Run existing e2e tests
  - Run demo

  ```bash
  npm run format
  npm run format-check
  npm run test:unit
  npm run test:integration
  npm run demo
  ```

4. _Setup dev env -  sonar config_
  - Setup an account at [sonarcloud](https://sonarcloud.io)
  - Connect to your github account
  - Add your project from github: [+] -> Analyze new project -> Github app configuration -> Sonarcloud [Configure] -> Select repositories -> Save
  - Edit @/CI/sonar/config.json
  - sonar.organization is your username
  - sonar.projectKey is user_github-project-name
  - sonar.login: [Avatar] -> My account -> Security -> Generate
  - gitignore if needed (and use private sonar as well, if sensitive)

  ```bash
  npm sonar-check

  # and all quality checks together
  npm run ci
  ```

5. _Setup githook_
  - create githook for before push - .git/hooks folder
  - delete the file extension for pre-push.sample (".sample")
  - in the pre-push file (only this, delete what is currently there):

  ```bash
  #!/bin/sh
  npm run ci
  ```

  __-> Before all remote save the quality of the code is checked__

6. _Setup docker_
  - Setup an account at [dockerhub](https://hub.docker.com)
  - (Shell docker login is required)
  - Edit @/CD/config.json
  - user is your dockerhub username
  - repo is the name of the project (whatever you choose)
  - tag is latest by default, automated versioning the images is not implemented here

  ```bash
  npm run cd
  ```

  __-> Releases are kept as images on docker hub__

7. _Setup host - sloppy.io_
  - Setup an account at [sloppy.io](https://admin.sloppy.io/)
  - Create a project, name it, name the service, and add to app
  - Then with [Add app], select the image, set url...

  __-> App is on the internet__

8. _Setup openID connect with google_
  - Select project -> [New project](https://console.developers.google.com/)
  - Oauth consent screen -> external
  - Application name, authorized domains (.sloppy.zone)
  - Credentials -[+ Create credentials] (Oauth2) -> Web app, set name & redirect uri (localhost or authorized domain) -> client_ID & client_secret
  - update client_ID, client_secret and redirect_uri (can be anything for now) in google.json
  - Full guide(https://developers.google.com/identity/protocols/OpenIDConnect)

  __-> OpenID works on the frontend
