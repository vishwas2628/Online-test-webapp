# 6. Hardware Requirements

To ensure the optimal performance, stability, and responsiveness of the **Online Test Taking Web Application**, the following hardware configurations are recommended. These specifications are divided into server-side requirements (for hosting the application and database) and client-side requirements (for end-users accessing the system).

## 6.1 Server-Side Requirements (Hosting Environment)
The server acts as the backbone of the application, handling API requests, database queries, and session management. The following minimum configuration is required to support a moderate load of concurrent users:

*   **Processor (CPU):** Minimum **2 vCPUs** (Virtual CPUs).
    *   *Reasoning:* Node.js is single-threaded but utilizes non-blocking I/O. However, background processes and database operations (MongoDB) benefit significantly from multi-core environments to handle parallel processing efficiently.
*   **Memory (RAM):** Minimum **4 GB RAM**.
    *   *Reasoning:* Sufficient memory is crucial for the in-memory operations of the MongoDB database and to prevent the Node.js process from crashing under load during high-traffic exam windows.
*   **Storage:** Minimum **10 GB SSD** (Solid State Drive).
    *   *Reasoning:* SSDs provide superior read/write speeds compared to traditional HDDs, drastically reducing database query times and file serving latency. 10 GB allows ample space for the OS, application codebase, and growing database logs.

## 6.2 Client-Side Requirements (End-User)
The application is designed to be lightweight, allowing it to run smoothly on a wide range of consumer devices.

*   **Device Type:** Standard Desktop, Laptop, Tablet, or Smartphone.
    *   *Reasoning:* The responsive interface adapts to any screen size, ensuring functionality on both touch and non-touch devices.
*   **Web Browser:** Any modern, standards-compliant browser (Google Chrome v80+, Mozilla Firefox v75+, Microsoft Edge, or Safari).
    *   *Reasoning:* The application utilizes modern JavaScript (ES6+) and CSS features that require updated browser engines for correct rendering.
*   **Internet Connection:** Stable Broadband or 4G/5G connection (Minimum **1 Mbps**).
    *   *Reasoning:* A continuous connection is required to sync timer data, save answers in real-time, and prevent data loss during the examination.
