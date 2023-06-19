pipeline {
  agent any
  triggers {
    pollSCM('*/1 * * * *') {
      excludedUsers('https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git')
    }
  }
  stages {
    stage('Build') {
      steps {
        sh "docker build -t https-server:${env.BUILD_NUMBER} ."
      }
    }
    stage('Update k8s manifest file') {
      steps {
        //checkout git directory where k8s manifest file is located
        git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git'

        //script to update image tag
        script {
          def yamlFile = './app.yaml'
          def newImageName = "https-server:${env.BUILD_NUMBER}"         
          sh "sed -i 's|image:.*|image: ${newImageName}|' ${yamlFile}"
        }
        
        sh "cat app.yaml"

        // Add the modified file to the Git index
        sh 'git add ./app.yaml'
          
        // Commit the changes
        sh 'git commit -m "Modified YAML file"'
        
        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          //sh "git push -u origin main"
          sh "git push -u origin main"
        }
      }
    }
    //stage('deploy') {
    //  steps {
    //    //sh 'kubectl delete -f app.yaml'
    //    sh 'kubectl apply -f app.yaml'
    //  }
    //}
  }
}
