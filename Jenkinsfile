pipeline {
  agent any
  stages {
    stage('clean') {
      steps {
        sh "rm -rf ./*"
      }
    }
    stage('Checkout') {
      steps {
        // Checkout source code from Git repository
        git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp-ArgoCD.git'
      }
    }
    stage('build') {
      steps {
        sh "docker build -t https-server:${env.BUILD_NUMBER} ."
      }
    }
    stage('update yaml') {
      steps {        
        script {
          def yamlFile = readFile('./app.yaml')

          // Modify the YAML as needed
          // Example: Update the image tag to the new version
          yamlFile = yamlFile.replaceAll('/image: https-server:.+/', "image: https-server:${env.BUILD_NUMBER}")

          // Write the modified YAML back to the file
          writeFile(file: './app.yaml', text: yamlFile)
        }
        
        sh "pwd"  
        //sh "touch test.yaml"
        sh "cat app.yaml"
        sh "ls -a"

        // Add the modified file to the Git index
        sh 'git add ./app.yaml'
          
        // Commit the changes
        sh 'git commit -m "Modified YAML file"'
        
        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          sh "git push -u origin main"
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
