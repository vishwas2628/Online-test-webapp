# Online Test Taking Web Application

This project is a full-stack web application for creating and taking online tests.

## Development Setup (Manual)

To run the application locally for development, you will run the frontend and backend manually in separate terminals.

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB (or use the Atlas connection string in `.env`)

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure your `.env` file is configured (PORT, MONGO_URI, JWT_SECRET).
4.  Start the server:
    ```bash
    npm run dev
    ```
    The backend will run on `http://localhost:5000`.

### 2. Frontend Setup
1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure your `client/.env` has the correct API URL:
    ```properties
    VITE_API_URL=http://localhost:5000/api
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:5173`.

---

## Production Deployment (Docker)

The project includes a `docker-compose.yml` configured strictly for production. It uses Nginx for the frontend and connects to MongoDB Atlas.

### Run with Docker
1.  Build and start the containers:
    ```bash
    docker-compose up --build -d
    ```
2.  Access the application:
    *   **Frontend:** `http://localhost` (Port 80)
    *   **Backend:** `http://localhost:8080`

### Stop the Application
```bash
docker-compose down
```