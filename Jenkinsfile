pipeline {
  agent any
  //environment {
  //  isScriptCommit = false
  //}
  stages {
    stage('Build') {
      steps {
        scmSkip(deleteBuild: true, skipPattern:'.*\\[ci skip\\].*')
        sh "docker build -t https-server:${env.BUILD_NUMBER} ."
       }
    }
    stage('Update k8s manifest file') {
      steps {
        scmSkip(deleteBuild: true, skipPattern:'.*\\[ci skip\\].*')
        //checkout git directory where k8s manifest file is located
        git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp.git'

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
        sh 'git commit -m "[Jenkins]Modified YAML file [ci skip]"'

        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          sh "git push -u origin main"
        }
      }// steps
    }// stage('Update k8s manifest file')
    
  }// stages
    
    //stage('Check Commit Message') {
    //  steps {
    //    script{
    //      // Get the last commit author
    //      def commitAuthor = sh(returnStdout: true, script: 'git log -1 --pretty=%an').trim()
    //      echo "Last Commit Author: ${commitAuthor}"

          // Check if commit was made by script
    //      def commitMessage = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
    //      echo "Last Commit Message: ${commitMessage}"

    //      isScriptCommit = commitMessage.startsWith('[Jenkins]') // Adjust the criteria as per your commit message
    //      echo "is script commit: ${env.isScriptCommit}"

    //      if (isScriptCommit) {
    //        echo 'Commit was made by the script, skipping pipeline execution.'
    //        error("script commit")
    //      }
    //    }
    //  }
    //}

    //stage('Deploy') {
    //  steps {
    //    //sh 'kubectl delete -f app.yaml'
    //    sh 'kubectl apply -f app.yaml'
    //  }
    //}
}
