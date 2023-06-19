pipeline {
  agent any
  stages {
      stage('Checkout') {
      steps {
        // Checkout source code from Git repository
        git branch: 'main', url: 'https://github.com/sahaludheen/JenkinsTestApp.git'
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
          yamlFile = yamlFile.replace('image: https-server:new', "image: https-server:${env.BUILD_NUMBER}")

          // Write the modified YAML back to the file
          writeFile(file: './app1.yaml', text: yamlFile)
        }
        
        sh "pwd"  
        sh "touch test.yaml"
        sh "cat app1.yaml"
        sh "ls -a"

        // Add the modified file to the Git index
        sh 'git add ./app1.yaml'
          
        // Commit the changes
        sh 'git commit -m "Modified YAML file"'
        
        withCredentials([gitUsernamePassword(credentialsId: 'sahaludheen-github-token', gitToolName: 'Default')]) {
          //sh "git push -u origin main"
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
