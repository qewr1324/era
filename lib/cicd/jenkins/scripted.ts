export function generate(params: any): string {
	return `node {
    def app
    
    stage('Checkout') {
        checkout scm
    }
    
    stage('Install Dependencies') {
        sh 'npm ci'
    }
    
    stage('Test') {
        try {
            sh 'npm test'
        } finally {
            junit 'test-results.xml'
        }
    }
    
    stage('Build') {
        sh 'npm run build'
        app = docker.build('my-app:\${BUILD_NUMBER}')
    }
    
    stage('Push Image') {
        docker.withRegistry('https://registry.example.com', 'docker-credentials') {
            app.push('\${BUILD_NUMBER}')
            app.push('latest')
        }
    }
    
    stage('Deploy') {
        if (env.BRANCH_NAME == 'main') {
            sh """
                docker pull my-app:\${BUILD_NUMBER}
                docker stop my-app || true
                docker rm my-app || true
                docker run -d --name my-app -p 80:3000 my-app:\${BUILD_NUMBER}
            """
        }
    }
    
    stage('Cleanup') {
        cleanWs()
    }
}`;
}
