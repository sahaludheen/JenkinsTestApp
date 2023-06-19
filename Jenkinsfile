pipeline {
  agent any
  stages {
    //stage('Checkout') {
    //  steps {
    //    // Checkout source code from Git repository
    //    sh 'mkdir -p dest'
    //    sh 'cd dest'
    //    git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git'
    //    sh 'pwd'
    //    sh 'ls -a'
    //  }
    //}
    stage('build') {
      steps {
        sh "docker build -t https-server:${env.BUILD_NUMBER} ."
      }
    }
    stage('update yaml') {
      steps {
        git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git'
        script {
          def yamlFile = readFile('./app.yaml')

          // Modify the YAML as needed
          // Example: Update the image tag to the new version
          //yamlFile = yamlFile.replace('image: https-server:.+', "image: https-server:${env.BUILD_NUMBER}")
          yamlFile = yamlFile.replaceAll(/(image: https-server:).+$/, "image: https-server:${env.BUILD_NUMBER}")

          // Write the modified YAML back to the file
          writeFile(file: './app.yaml', text: yamlFile)
        }
        
        sh "pwd"  
        sh "cat app.yaml"
        sh "ls -a"

        // Add the modified file to the Git index
        sh 'git add ./app.yaml'
          
        // Commit the changes
        sh 'git commit -m "Modified YAML file"'
        
        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          //sh "git push -u origin main"
          sh "git push -u https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git main"
        }
      }
    }
    stage('deploy') {
      steps {
        //sh 'kubectl delete -f app.yaml'
        sh 'kubectl apply -f app.yaml'
      }
    }
  }
}
