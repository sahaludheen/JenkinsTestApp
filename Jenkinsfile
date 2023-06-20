pipeline {
  agent any
      script{
      //git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp.git'
      // Check if commit was made by script
      def commitMessage = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
      // Get the last commit author
      def commitAuthor = sh(returnStdout: true, script: 'git log -1 --pretty=%an').trim()
          
      // Print the commit author
      echo "Last Commit Author: ${commitAuthor}"
          
      echo "Last Commit Message: ${commitMessage}"
      def isScriptCommit = commitMessage.startsWith('[Jenkins]') // Adjust the criteria as per your commit message

      if (isScriptCommit) {
        echo 'Commit was made by the script, skipping pipeline execution.'
        return // Exit the pipeline early
      }
    }
  stages {
    //stage('Check Commit Message') {
    //  steps {
    //  }
    //}
    stage('Build') {
      steps {
        sh "ls -a"
        sh "docker build -t https-server:${env.BUILD_NUMBER} ."
      }
    }
    stage('Update k8s manifest file') {
      steps {
        //checkout git directory where k8s manifest file is located
        //git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git'
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
        sh 'git commit -m "[Jenkins]Modified YAML file"'
        
        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          sh "git push -u origin main"
        }
        //git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp.git'
      }
    }
    //stage('Deploy') {
    //  steps {
    //    //sh 'kubectl delete -f app.yaml'
    //    sh 'kubectl apply -f app.yaml'
    //  }
    //}
  }
  //post {
  //  always {
  //    // Set environment variable to indicate changes made by the pipeline script
  //   env.CHANGES_MADE_BY_PIPELINE = 'true'
  //  }
  //}
}
