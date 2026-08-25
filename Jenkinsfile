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
                        sh 'docker compose build frontend'
                    }
                }
                stage('Build Backend') {
                    steps {
                        sh 'docker compose build backend'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker compose run --rm backend python -m unittest discover -s . -p "test_*.py"'
            }
        }

        stage('Docker Build') {
            parallel {
                stage('Frontend Image') {
                    steps {
                        sh 'docker image inspect smart-building-platform-frontend'
                    }
                }
                stage('Backend Image') {
                    steps {
                        sh 'docker image inspect smart-building-platform-backend'
                    }
                }
            }
        }

        stage('Docker Compose') {
            steps {
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }

        stage('Live Application Smoke Test') {
            steps {
                sh '''
                    set -e
                    python3 - <<'PY'
import json
import urllib.request

with urllib.request.urlopen('http://localhost:8000/health', timeout=20) as response:
    payload = json.load(response)
    if not payload.get('status'):
        raise SystemExit(1)

with urllib.request.urlopen('http://localhost:8080', timeout=20) as response:
    if response.status != 200:
        raise SystemExit(1)
PY
                '''
            }
        }
    }

    post {
        always {
            sh 'docker compose down --remove-orphans'
        }
    }
}
