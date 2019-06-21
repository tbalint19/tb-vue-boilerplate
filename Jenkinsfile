#!usr/bin/env groovy

node('linux') {

  branch = checkout(scm).GIT_BRANCH
  commitHash = checkout(scm).GIT_COMMIT

  try {
      checkEnv()
      checkout()
      installDependencies()
      checkCodeFormat()
      runUnitTests()
      runStoreTests()
      checkCoverage()
      validateTestCases()
      sonar(branch)
      build()
      sendNotifications("SUCCESS")
  } catch (e) {
      echo 'Build failed with error: ' + e.toString()
      sendNotifications("FAILURE")
  } finally {

  }
}

def checkout() {
    stage('Checkout source branch') {
        checkout scm
        notifyBitbucket()
    }
}

def checkEnv() {
  stage('Check build environment') {
    sh 'node -v'
    sh 'npm -v'
  }
}

def installDependencies() {
  stage('Install dependencies') {
    sh 'rm -rf ./node_modules'
    sh 'npm install'
  }
}

def checkCodeFormat() {
  stage('Code format check') {
    sh 'npm run format-check'
  }
}

def runUnitTests() {
  stage('Unit tests (utils)') {
    sh 'npm run unit-tests'
  }
}

def runStoreTests() {
  stage('Integration tests (store modules)') {
    sh 'npm run store-tests'
  }
}

def checkCoverage() {
  stage('Check coverage reports)') {
    sh 'npm run coverage-check'
  }
}

def validateTestCases() {
  stage('Validate test cases (mutation testing)') {
    sh 'rm -rf ./.stryker-tmp'
    sh 'npm run mutate'
    sh 'npm run mutate-kill-rate-check'
  }
}

def sonar(String branch) {
  stage('Static code analysis (sonarqube)') {
    sh 'npm run sonar-check'
  }
}

def build() {
  stage('Build') {
    sh 'npm run build'
  }
}

def sendNotifications(String status) {
    currentBuild.result = status
    notifyBitbucket()
}

def notifyBitbucket(String state) {

    notifyBitbucket commitSha1: $ { commitHash },
            credentialsId: '1af21bbb-b246-42b8-adf0-2c9df8698240',
            disableInprogressNotification: false,
            considerUnstableAsSuccess: true,
            ignoreUnverifiedSSLPeer: true,
            includeBuildNumberInKey: false,
            prependParentProjectKey: false,
            projectKey: '',
            stashServerBaseUrl: 'http://itdevcrepo2:7990'
}
