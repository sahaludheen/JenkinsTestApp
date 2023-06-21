pipeline {
  agent any
  //environment {
  //  isScriptCommit = false
  //}
  stages {
    stage('Build') {
      steps {
        //SCM Skip Plugin for skipping stage if commit msg mathes reg expression 
        scmSkip(deleteBuild: false, skipPattern:'.*\\[ci skip\\].*')
        
        //docker build image
        sh "docker build -t https-server:${env.BUILD_NUMBER} ."
       }
    }
    stage('Update k8s manifest file') {
      steps {
        //SCM Skip Plugin for skipping stage if commit msg mathes reg expression
        //scmSkip(deleteBuild: false, skipPattern:'.*\\[ci skip\\].*')
       
        git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp.git'
        
        //script to update image tag
        script {
          def yamlFile = './app.yaml'
          def newImageName = "https-server:${env.BUILD_NUMBER}"         
          sh "sed -i 's|image:.*|image: ${newImageName}|' ${yamlFile}"
        }
        
        //push app.yaml to git
        sh 'git add ./app.yaml'
        sh 'git commit -m "[ci skip] Modified YAML file"'
        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          sh "git push -u origin main"
        }
      }
    }
    
  }
    
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
}
