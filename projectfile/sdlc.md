# 4. Software Development Life Cycle (SDLC)

## 4.1 Overview of Adopted Methodology: The Waterfall Model

For the development of the **Online Test Taking Web Application**, we adopted the **Waterfall Model**, a classic, linear software development life cycle methodology. This structured approach was chosen due to the clearly defined requirements and the critical need for a stable, high-quality final product. Unlike iterative models, the Waterfall model emphasizes a sequential progression where each phase must be completely finished and approved before the next begins.

This methodology provided a disciplined framework for the project, ensuring that all functional and non-functional requirements were meticulously documented and understood before a single line of code was written. This "measure twice, cut once" philosophy minimized architectural risks and ensured that the final system perfectly aligned with the initial vision of a secure, scalable examination platform.

The development process was divided into six distinct, consecutive phases:
1.  Requirement Analysis & Feasibility Study
2.  System Design
3.  Implementation (Coding)
4.  Testing & Validation
5.  Deployment
6.  Maintenance

---

## 4.2 Phase 1: Requirement Analysis & Feasibility Study

The first and arguably most critical phase involved a deep-dive analysis into the problem domain to establish exactly what the system needed to achieve.

**Activities Performed:**
*   **Stakeholder Interviews:** We conducted detailed discussions with potential users (students) and administrators (teachers) to gather their expectations. Teachers emphasized the need for "cheating prevention" and "automated grading," while students focused on "interface responsiveness" and "fairness."
*   **Gap Analysis:** We analyzed existing manual examination processes to identify bottlenecks—specifically, the logistical nightmare of distributing papers and the delay in declaring results.
*   **Feasibility Study:**
    *   *Technical Feasibility:* Confirmed that the MERN stack (MongoDB, Express, React, Node) was capable of handling the expected concurrency.
    *   *Operational Feasibility:* Verified that the proposed web-based solution would be accessible to the target audience via standard browsers.
*   **Documentation:** The outcome was a comprehensive **Software Requirement Specification (SRS)** document. This document served as the "bible" for the project, freezing the requirements to prevent scope creep. It detailed specific inputs (test data), outputs (scorecards), and constraints (timer logic).

---

## 4.3 Phase 2: System Design

With the requirements frozen, we moved to the design phase. Here, the focus shifted from "what to build" to "how to build it." This phase was dedicated to creating the blueprint of the entire system.

**Key Design Components:**
*   **Architectural Design:** We opted for a **Client-Server Architecture**. The separation of concerns was defined clearly: the Client (React) handles presentation, while the Server (Express/Node) handles logic and database operations.
*   **Database Design:** A rigorous data modeling exercise was conducted. We designed the **ER Diagrams** to visualize relationships. We chose a tailored NoSQL schema in MongoDB to store complex, nested data like 'Test Objects' containing arrays of 'Questions' with varying types. The schema constraints were defined here to ensure data integrity.
*   **Interface Design:** Wireframes and high-fidelity mockups were created for every screen—Login, Dashboard, Test Taking Interface, and Result View. The UI/UX was designed to be distraction-free.
*   **Component Specification:** We defined the modular structure of the code, identifying key React components (e.g., `<Timer />`, `<QuestionCard />`) and backend Controllers (e.g., `authController`, `examController`) beforehand.

**Outcome:** A complete **System Design Document (SDD)** containing Data Flow Diagrams, Entity-Relationship Models, and UI prototypes.

---

## 4.4 Phase 3: Implementation (Coding)

This phase marked the actual construction of the system. Following the rigorous design phase, the coding process was smooth and systematic, as the logic was already pre-defined.

**Implementation Strategy:**
*   **Backend Development (The Foundation):** We started by setting up the Node.js server and connecting it to the MongoDB database. We strictly followed the API specifications from the Design phase to build RESTful endpoints. Security middleware (JWT verification) was coded first to ensure every subsequent route was secure by default.
*   **Frontend Development (The Interface):** Once the backend was stable, the frontend development began. We translated the wireframes into pixel-perfect React components. State management logic was implemented to handle complex user flows, such as navigating between questions and preserving test state.
*   **Integration:** The frontend and backend were connected using **Axios**. We rigorously adhered to the contract defined in the initial phases, ensuring that data formats (JSON) matched perfectly between client and server.
*   **Containerization Config:** Dockerfiles were written for each service during this phase to ensure that the development environment mirrored the intended production environment.

---

## 4.5 Phase 4: Testing & Validation

In the Waterfall model, testing is a distinct phase that occurs *after* implementation is complete. This allowed for a holistic evaluation of the entire system rather than piecemeal testing.

**Testing Levels:**
*   **Unit Testing:** Individual modules (like the grading algorithm or the password hashing function) were tested in isolation to ensure they performed their specific logic correctly.
*   **Integration Testing:** We tested the interaction between modules—specifically, ensuring that the 'Submit Test' button on the frontend correctly triggered the 'Calculate Score' function on the backend and successfully updated the 'Database'.
*   **System Testing:** The complete software was tested as a whole against the requirements defined in Phase 1. We simulated full exam cycles: a teacher creating an exam, a student taking it, and the result being generated.
*   **User Acceptance Testing (UAT):** A select group of users tested the system to confirm it met their real-world needs. Feedback was gathered on the "timer alignment" and "mobile responsiveness."

**Outcome:** A robust, bug-free application. Any defects found were logged, fixed, and re-tested before moving to deployment.

---

## 4.6 Phase 5: Deployment

Once the system was certified as "Production Ready," we moved to the deployment phase.

**Deployment Steps:**
*   **Environment Setup:** The production environment was prepared using **Docker Compose** to orchestrate the containers (Client, Server, Database) on a unified network.
*   **Data Migration:** Initial seed data (admin accounts, sample tests) was loaded into the database.
*   **Launch:** The application was exposed via a web server, making it accessible to end-users via their browsers.

---

## 4.7 Phase 6: Maintenance

The final phase of the lifecycle involves the ongoing support of the system after it has been released.
*   **Corrective Maintenance:** Addressing any unforeseen bugs that users might encounter in the live environment.
*   **Adaptive Maintenance:** updating the system to compatible with newer browser versions or updated dependencies (e.g., React or Node.js updates).
*   **Perfective Maintenance:** Although the scope was fixed, this phase allows for optimizing performance, such as improving the load time of the analytics dashboard based on real-world usage data.

By strictly adhering to the **Waterfall Model**, we ensured that the **Online Test Taking Web Application** is a high-quality, verified, and reliable product that stands on a firm foundation of careful planning and design.
