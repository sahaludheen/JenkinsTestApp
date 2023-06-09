pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'docker build -t https-server:new .'
      }
    }

  }
}