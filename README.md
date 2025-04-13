# tbp – toBePlayed

**tbp (toBePlayed)** is an application for managing a "to be read/played" list. The project follows a microservice architecture and uses modern, cloud-native CI/CD practices.

## Project Structure

The overall project is divided into **three separate repositories** to clearly separate application code from infrastructure:

- **tbp-backend:**  
  Contains the backend application (for example, implemented in Spring Boot, .NET, Python, etc.) along with its REST API, unit tests, Dockerfile, and integration setup.

- **tbp-frontend:**  
  Hosts the frontend application (built with Vue.js, React, Angular, or another framework). This repository includes all UI components, tests, and build scripts.

- **tbp-deployment:**  
  Manages all Kubernetes deployment configurations, including YAML manifests, Helm charts, and any deployment scripts. This repository handles infrastructure as code, separate from the application logic.

## Architecture & Approach

### 1. Local Development

- **Focus on Backend & Frontend First:**  
  Start by developing and running your backend and frontend locally in your IDE.
  - The backend exposes REST endpoints for data access and business logic.
  - The frontend communicates with the backend via HTTP API calls.
  
- **Integration Testing:**  
  Test the connection between the two components locally (using tools like Postman or browser-based requests) to ensure proper communication and data exchange.

### 2. CI/CD and Code Quality

- **Using GitHub Actions:**  
  Automated pipelines perform unit tests, linting, and code quality checks (e.g., using SonarCloud) on every commit.
  
- **Branching Strategy:**  
  - Work exclusively in feature branches.  
  - Direct commits to the `main` branch (in the backend, frontend, or deployment repos) are not allowed.
  - Merge Requests (or Pull Requests) are required to integrate new code into the `main` branch, ensuring that reviews and automated tests run beforehand.
  
- **Build & Deployment:**  
  - The pipelines build Docker images that are then pushed to a container registry (such as GitHub Container Registry or Docker Hub).
  - Later, the **tbp-deployment** repository takes over to deploy these images to a Kubernetes cluster (either locally or in a production-like environment).

### 3. Kubernetes Deployment

- **tbp-deployment Repository:**  
  All Kubernetes deployment files reside here:
  - **Deployments:** Define pods for both backend and frontend containers.
  - **Services:** Configure communication between different components within the cluster.
  - **Ingress/ConfigMaps:** Manage external access and environment variables.
  
- **Local Cluster for Development:**  
  For testing, you can use a lightweight local Kubernetes cluster (e.g., k3s, Minikube, Kind) to deploy and validate your application.

## Getting Started

### Prerequisites

- **Docker:** For containerizing the applications.
- **Your Preferred IDE:** To work on local development (for example, VS Code, IntelliJ, etc.).
- **Git:** For repository cloning and version management.
- **Kubernetes Cluster:** Optional for deployment (e.g., local cluster using k3s, Minikube, or Kind).

### Local Development

1. **Backend (tbp-backend):**
   - Clone the repository:
     ```bash
     git clone https://github.com/your-user/tbp-backend.git
     ```
   - Build and run the backend application:
     ```bash
     docker build -t tbp-backend .
     docker run -p 8080:8080 tbp-backend
     ```

2. **Frontend (tbp-frontend):**
   - Clone the repository:
     ```bash
     git clone https://github.com/your-user/tbp-frontend.git
     ```
   - Install dependencies and start the frontend:
     ```bash
     npm install
     npm start
     ```
   - Make sure that the frontend is configured to point to the correct backend URL.

3. **Integration Testing:**
   - Use your browser or tools like Postman to test the communication between the frontend and backend.

### Kubernetes Deployment

1. **tbp-deployment Repository:**
   - Clone the repository:
     ```bash
     git clone https://github.com/your-user/tbp-deployment.git
     ```
   - Configure and update your Kubernetes manifests under the `manifests/` directory (or Helm charts under `helm-charts/`).
   - Deploy the configuration to your local Kubernetes cluster:
     ```bash
     kubectl apply -f manifests/
     ```

2. **Automated Deployments:**
   - As you update your code, CI/CD pipelines (via GitHub Actions) will build the Docker images, push them to your registry, and trigger deployments in your cluster via the **tbp-deployment** repository.

## Future Enhancements

- **Feature Branches & Merge Requests:**  
  Every new feature is developed in its own feature branch and then merged into `main` only after passing all tests and code reviews.
  
- **Extensions:**  
  - Future enhancements may include integrating messaging systems (like RabbitMQ or Kafka).
  - Additional monitoring and logging tools can be incorporated into the deployment process.
  
- **Documentation:**  
  All configurations, environment variables, and deployment steps should be well documented in this repository or linked Wiki pages for ease of maintenance and further enhancements.

## Contact

For any questions or issues, please open an issue in the repository or reach out via your preferred communication channel.

---

*This project repository will be continuously improved. Feedback and suggestions are welcome!*
