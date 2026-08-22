pipeline {
    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Applications') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        bat 'docker compose build frontend'
                    }
                }
                stage('Build Backend') {
                    steps {
                        bat 'docker compose build backend'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                bat 'docker compose run --rm backend python -m unittest discover -s . -p "test_*.py"'
            }
        }

        stage('Docker Build') {
            parallel {
                stage('Frontend Image') {
                    steps {
                        bat 'docker image inspect smart-building-platform-frontend'
                    }
                }
                stage('Backend Image') {
                    steps {
                        bat 'docker image inspect smart-building-platform-backend'
                    }
                }
            }
        }

        stage('Docker Compose') {
            steps {
                bat 'docker compose up -d'
                bat 'docker compose ps'
            }
        }

        stage('Live Application Smoke Test') {
            steps {
                bat 'powershell -NoProfile -Command "$api = Invoke-RestMethod http://localhost:8000/health; if (-not $api.status) { exit 1 }; $page = Invoke-WebRequest http://localhost:8080 -UseBasicParsing; if ($page.StatusCode -ne 200) { exit 1 }"'
            }
        }
    }

    post {
        always {
            bat 'docker compose down --remove-orphans'
        }
    }
}
