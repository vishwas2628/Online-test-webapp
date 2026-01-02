# Online Test Taking Web Application

This project is a full-stack web application for creating and taking online tests.

## Deployment

This application is containerized using Docker and orchestrated with Docker Compose.

### Prerequisites

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Production Deployment

To deploy the application in a production environment, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd online-test-tackingwebApplication
    ```

2.  **Environment Variables:**

    Before building the containers, you need to configure the environment variables. The `docker-compose.yml` file has some default values, but you should update them for a production environment, especially the `JWT_SECRET`.

3.  **Build and run the application:**

    ```bash
    docker-compose -f docker-compose.yml build
    docker-compose -f docker-compose.yml up -d
    ```

    This will build the Docker images for the frontend and backend services and run them in detached mode.

4.  **Access the application:**

    Once the containers are up and running, you can access the application by navigating to `http://localhost` in your web browser.

    The backend API will be accessible at `http://localhost/api`.

### Development Environment

If you want to run the application in a development environment with hot-reloading, you can use the original `docker-compose.yml` file. You will need to revert the changes made to the `docker-compose.yml`, `backend/Dockerfile`, and you will need to create a `client/Dockerfile` for development.

To run in development mode:

1.  Make sure you have the development Dockerfiles and `docker-compose.yml`.
2.  Run the following command:

    ```bash
    docker-compose up --build
    ```

This will start the application in development mode with the following ports:

*   **Frontend:** `http://localhost:5173`
*   **Backend:** `http://localhost:5000`
*   **MongoDB:** `mongodb://localhost:27017`