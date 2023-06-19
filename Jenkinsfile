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
        // Read the YAML file into a variable
        def yaml = readFile('./app.yaml')

        // Modify the YAML as needed
        // Example: Update the image tag to the new version
        yaml = yaml.replace('image: https-server:new', "image: https-server:${env.BUILD_NUMBER}")

        // Write the modified YAML back to the file
        writeFile(file: './app.yaml', text: yaml)

        // Commit and push the modified YAML file back to the Git repository
        // Example: git add path/to/your/yaml/file.yaml && git commit -m "Update image version" && git push
        //git add ./app.yaml && git commit -m "Update image version" && git push

        // Make sure you have the necessary Git credentials configured for the repository
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
