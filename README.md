# VueJS boilerplate app

## Features
- Vuex state management
- Vue router
- Unit tests (store tests) with jest
- E2E testing with nightwatch
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

  ```bash
  mv tb-vue-boilerplate frontend
  cd frontend
  npm i
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
  npm run test:e2e
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
