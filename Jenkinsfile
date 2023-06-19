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
        // Read the YAML file
        def yamlFile = readFile './app.yaml'
                    
        // Parse the YAML content
        def yamlContent = readYaml text: yamlFile
                    
        // Update the image name
        yamlContent.spec.template.spec.containers[0].image = 'your-new-image-name:tag'
                    
        // Convert the YAML content back to a string
        def updatedYaml = writeYaml text: yamlContent
                    
        // Write the updated YAML file
        writeFile file: './app.yaml', text: updatedYaml
        
        sh "pwd"  
        sh "touch test.yaml"
        sh "ls -a"

        // Add the modified file to the Git index
        sh 'git add ./test.yaml'
          
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
