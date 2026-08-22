# Smart Building Platform

A small full-stack building operations dashboard.

## Run with Docker

```bash
docker compose up --build
```

Open the dashboard at http://localhost:8080 and the API docs at http://localhost:8000/docs.

## Jenkins

Create a Pipeline job connected to this GitHub repository and configure it to use the root `Jenkinsfile`. The Jenkins agent must provide Node.js, Python, Docker Engine, Docker Compose, and PowerShell. The pipeline checks out the code, builds the frontend and backend in parallel, runs backend tests, builds both images, starts Compose, and smoke-tests the live services.

## Jenkins pipeline

Create a Jenkins Pipeline job connected to this GitHub repository and set the script path to `Jenkinsfile`. The Jenkins agent only needs Docker Engine, Docker Compose, Git, and PowerShell. The pipeline builds both images in parallel, runs tests inside the backend container, starts Compose, checks the live frontend and API, and cleans up the containers afterward.
