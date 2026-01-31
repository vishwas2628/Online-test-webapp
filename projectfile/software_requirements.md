# 5. Software Requirements

The development of the **Online Test Taking Web Application** relies on a modern, robust, and scalable technology stack. Each software component has been carefully selected to ensure high performance, security, and maintainability.

## 5.1 Frontend Technologies

### **React.js (Library)**
*   **Role:** The core library for building the user interface.
*   **Justification:** React's component-based architecture allows for the creation of reusable UI elements (like question cards and timers), significantly traversing development time. Its Virtual DOM functionality ensures that the test interface remains responsive and lag-free, even when updating complex timers or rendering multiple questions dynamically.

### **Vite (Build Tool)**
*   **Role:** Next-generation frontend tooling and bundler.
*   **Justification:** Vite provides prolonged development experience with Instant Server Start and Lightning Fast HMR (Hot Module Replacement). It bundles the application for production much faster than traditional tools like Webpack, ensuring highly optimized assets for faster page loads.

### **Tailwind CSS (Styling)**
*   **Role:** Utility-first CSS framework.
*   **Justification:** Tailwind enables rapid UI development by allowing developers to style components directly within the markup. It ensures the application is fully responsive and mobile-friendly by default, providing a modern, consistent aesthetic without the overhead of writing custom CSS files.

## 5.2 Backend Technologies

### **Node.js (Runtime Environment)**
*   **Role:** Server-side JavaScript runtime.
*   **Justification:** Node.js creates a unified development language (JavaScript) for both client and server. Its non-blocking, event-driven architecture is ideal for handling concurrent connections—crucial for an exam platform where multiple students submit answers simultaneously.

### **Express.js (Web Framework)**
*   **Role:** Web application framework for Node.js.
*   **Justification:** Express simplifies the creation of robust RESTful APIs. It manages routing, middleware (for authentication and logging), and HTTP requests/responses efficiently, acting as the backbone of our server logic.

## 5.3 Database & Data Management

### **MongoDB (Database)**
*   **Role:** NoSQL Database.
*   **Justification:** Unlike rigid SQL databases, MongoDB's document-oriented structure is perfect for storing varying test formats. An exam document can easily nest arrays of questions, options, and metadata, allowing for a flexible schema that can evolve as the application grows.

### **Mongoose (ODM)**
*   **Role:** Object Data Modeling library for MongoDB.
*   **Justification:** Mongoose provides a schema-based solution to model application data. It handles relationships between users, tests, and results, and includes built-in validation to ensure that no incomplete or malformed data enters the system.

## 5.4 Security & Authentication

### **JSON Web Tokens (JWT)**
*   **Role:** Stateless Authentication.
*   **Justification:** JWTs are used to securely transmit information between parties. In our app, they function as digital keys that allow users to remain logged in safely without storing session data on the server, enhancing scalability.

### **BCrypt**
*   **Role:** Password Hashing.
*   **Justification:** Critical for security, BCrypt creates a cryptographic hash of user passwords. Even if the database is compromised, the actual passwords remain unreadable.

## 5.5 Development & Deployment Tools

### **Postman**
*   **Role:** API Testing Platform.
*   **Justification:** Used extensively to test backend endpoints before frontend integration. It allows us to simulate requests (GET, POST, PUT) and verify that the server processes data and handles errors correctly.

### **Docker & Docker Compose**
*   **Role:** Containerization.
*   **Justification:** Docker packages the application with all its dependencies into a container. This guarantees that the software runs exactly the same way on a developer's laptop as it does on the production server, eliminating "it works on my machine" issues.
