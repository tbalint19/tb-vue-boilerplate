#!usr/bin/env groovy

node('linux') {

  branch = checkout(scm).GIT_BRANCH
  commitHash = checkout(scm).GIT_COMMIT

  try {
      checkEnv()
      installDependencies()
      checkCodeFormat()
      runUnitTests()
      runStoreTests()
      validateTestCases()
      sonar()
      build()
      sendNotifications("SUCCESS")
  } catch (e) {
      echo 'Build failed with error: ' + e.toString()
      sendNotifications("FAILURE")
  } finally {

  }
}

def checkout() {
    stage('Checkout') {
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

def validateTestCases() {
  stage('Validate test cases (mutation testing)') {
    sh 'npm run mutate'
  }
}

def sonar() {
  stage('Static code analysis (sonarqube)') {

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



// import org.jenkinsci.plugins.pipeline.modeldefinition.Utils
//
// node {
//     jdk = tool name: 'jdk-11.0.2'
//     env.JAVA_HOME = "${jdk}"
//
//     branch = checkout(scm).GIT_BRANCH
//     commitHash = checkout(scm).GIT_COMMIT
//     properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '11'))])
//     try {
//         checkout()
//         build()
//         formatCheck()
//         unitTest()
//         integrationTest()
//         sonar(branch)
// 		    dockerPush(branch)
//         gitTag(branch)
//         sendNotifications("SUCCESS")
//     } catch (e) {
//         echo 'Build failed with error: ' + e.toString()
//         sendNotifications("FAILURE")
//     } finally {
//         junit testResults: 'build/test-results/**/*.xml', keepLongStdio: true
//     }
// }
//
// def checkout() {
//     stage('Checkout') {
//         checkout scm
//         notifyBitbucket()
//     }
// }
//
// def build() {
//     stage('Build') {
//         gradlew('clean')
//         gradlew('bootJar')
//     }
// }
//
// def unitTest() {
//     stage('Unit test') {
//         gradlew('test')
//     }
// }
//
// def formatCheck() {
//     stage('Code format check') {
//         gradlew("spotlessCheck")
//     }
// }
//
// def integrationTest() {
//     stage('Integration test') {
//         gradlew('integrationTest')
//     }
// }
//
// def sonar(String branch) {
//     stage('Sonar') {
//         def jobName = "${env.JOB_NAME}"
//         def localBranch = branch.replaceFirst("origin/", "")
//         def sonarBranchKey = localBranch
//         def project = sonarBranchKey == "master" ? jobName : "${jobName}:${sonarBranchKey}"
//         def sanitizedSonarProjectName = project.replaceAll("/", "-")
//         gradlew "sonarqube -Dsonar.projectName=${sanitizedSonarProjectName} -Dsonar.projectKey=${sanitizedSonarProjectName}"
//     }
// }
//
// def dockerPush(String branch) {
//     stage('Docker push') {
//         if (isMaster(branch)) {
//             gradlew('dockerPushRegistry')
//         } else {
//             Utils.markStageSkippedForConditional(STAGE_NAME)
//         }
//     }
// }
//
// def gitTag(String branch) {
//     stage('Git tag') {
//         if (isMaster(branch)) {
//             gradlew('tagRelease')
//             gradlew('pushToOrigin')
//         } else {
//             Utils.markStageSkippedForConditional(STAGE_NAME)
//         }
//     }
// }
//
// def gradlew(String param) {
//     if (isUnix()) {
//         sh "./gradlew $param"
//     } else {
//         bat "gradlew.bat $param"
//     }
// }
//
// def isMaster(String branch) {
//     def localBranch = branch.replaceFirst("origin/", "")
//     localBranch == "master"
// }
//
// def sendNotifications(String status) {
//     currentBuild.result = status
//     notifyBitbucket()
// }
//
// def notifyBitbucket(String state) {
//
//     notifyBitbucket commitSha1: $ { commitHash },
//             credentialsId: '1af21bbb-b246-42b8-adf0-2c9df8698240',
//             disableInprogressNotification: false,
//             considerUnstableAsSuccess: true,
//             ignoreUnverifiedSSLPeer: true,
//             includeBuildNumberInKey: false,
//             prependParentProjectKey: false,
//             projectKey: '',
//             stashServerBaseUrl: 'http://itdevcrepo2:7990'
// }
