pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'docker build -t https-server:new .'
      }
    }
    stage('deploy') {
      steps {
        sh 'kubectl get pods -A'
      }
    }
  }
}
