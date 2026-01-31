# 12. Testing Strategy and Quality Assurance

## 12.1 Overview
Testing is the cornerstone of robust software development. For the **Online Test Taking Web Application**, we adopted a comprehensive **Quality Assurance (QA)** strategy to ensure that the final deliverable is not only functional but also secure, efficient, and user-friendly.

Our testing approach was rigorous and multi-layered, designed to catch defects early in the lifecycle. We moved beyond simple "happy path" testing to include edge cases, security vulnerabilities, and stress testing. The primary objective was to validate that the application meets the functional requirements defined in the SRS while strictly adhering to the performance benchmarks necessary for a real-time examination platform.

By simulating real-world scenarios—such as network interruptions or invalid user inputs—we ensured that the system remains stable under pressure. This chapter details the specific methodologies employed, the test cases executed, and the remedial actions taken to resolve identified issues.

## 12.2 Types of Testing Performed

To achieve meaningful coverage, we categorized our testing into five distinct levels:

1.  **Unit Testing:**
    *   *Scope:* The smallest testable parts of the application (e.g., the function that calculates the total percentage or the React component for a single question).
    *   *Goal:* To verify that each unit performs as designed in isolation.

2.  **API Testing:**
    *   *Scope:* All backend REST endpoints (GET, POST, PUT, DELETE).
    *   *Tool:* **Postman** was used to send various payloads to the server.
    *   *Goal:* To ensure the server correctly handles requests, enforces validation rules, and returns the appropriate HTTP status codes (200, 400, 401, 500).

3.  **Integration Testing:**
    *   *Scope:* The interaction between different modules (e.g., Frontend React App talking to Backend Node API).
    *   *Goal:* To validate end-to-end workflows, such as a user logging in, creating a test, and another user taking that test.

4.  **UI/UX Testing:**
    *   *Scope:* The visual interface and user experience.
    *   *Goal:* Verified responsiveness across devices (Mobile vs. Desktop) and browser compatibility. Checked for intuitive navigation and clear feedback messages.

5.  **Security Testing:**
    *   *Scope:* Authentication and Route Protection.
    *   *Goal:* Confirmed that students cannot access Teacher routes, passwords are not exposed in API responses, and SQL/NoSQL injection attempts are blocked.

---

## 12.3 Test Cases and Execution Results

We defined specific test cases for both the backend (API layer) and frontend (User Interface).

### 12.3.1 Backend Testing – Test Cases

| Test Case ID | Module | Test Description | Input | Expected Output | Actual Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BE-TC-01** | Authentication | Login with valid credentials | Correct email & password | JWT token generated | JWT token generated | **Pass** |
| **BE-TC-02** | Authentication | Login with invalid password | Wrong password | Login rejected | Error returned | **Pass** |
| **BE-TC-03** | Authorization | Access protected API without token | No JWT Header | 401 Unauthorized | 401 returned | **Pass** |
| **BE-TC-04** | Test Creation | Create test without title | Empty title field | Validation error | Test created (Error) | **Fail** |
| **BE-TC-05** | Evaluation | Submit test with unanswered questions | Partial answers | Correct score calculated | Incorrect score | **Fail** |
| **BE-TC-06** | Authorization | Student accessing teacher API | Student token | Access denied | Access denied | **Pass** |

**Backend Failure Analysis:**
*   **BE-TC-04:** The backend model schema lacked the `required: true` validator for the title field.
*   **BE-TC-05:** The scoring algorithm crashed or returned `NaN` when it encountered a `null` answer in the submission array.

### 12.3.2 Frontend Testing – Test Cases

| Test Case ID | Module | Test Description | User Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FE-TC-01** | Login | Valid login | Enter correct credentials | Redirect to dashboard | Redirected | **Pass** |
| **FE-TC-02** | Login | Empty login fields | Click login button | Validation message | Message shown | **Pass** |
| **FE-TC-03** | Test Page | Auto-submit on timeout | Wait for timer end | Test submitted automatically | Submitted | **Pass** |
| **FE-TC-04** | Test Page | Refresh during test | Browser refresh (F5) | Test state retained | Test restarted/lost | **Fail** |
| **FE-TC-05** | Analytics | View analytics with no data | Open analytics page | Empty state message | Page crash | **Fail** |
| **FE-TC-06** | Authorization | Student accessing teacher UI | Click teacher menu link | Access blocked | Blocked/Hidden | **Pass** |

**Frontend Failure Analysis:**
*   **FE-TC-04:** The application state was stored only in React State (RAM), which clears on refresh.
*   **FE-TC-05:** The chart component tried to render `undefined` data properties without a check.

---

## 12.4 Optimization and Bug Fixing

Based on the failures identified above, a rigorous **Bug Fixing Phase** was executed:

1.  **Input Validation (Fixing BE-TC-04):** We implemented stricter Mongoose schema validation and added a middleware layer to check for empty payload bodies before processing.
2.  **Logic Correction (Fixing BE-TC-05):** The grading loop was updated to treat `undefined` or `null` answers as "Skipped" (0 marks) rather than throwing an error.
3.  **State Persistence (Fixing FE-TC-04):** We implemented `localStorage` synchronization. Now, if a student refreshes the browser, the current question index and timer value are recovered from local storage.
4.  **Conditional Rendering (Fixing FE-TC-05):** Added "No Data Available" placeholder components to display when the analytics arrays are empty.

## 12.5 Test Summary Report

After applying the fixes, a regression test was performed.

| Testing Type | Total Cases | Passed (Initial) | Failed (Initial) | Passed (Final) |
| :--- | :--- | :--- | :--- | :--- |
| **Backend Testing** | 6 | 4 | 2 | **6** |
| **Frontend Testing** | 6 | 4 | 2 | **6** |
| **Overall** | **12** | **8** | **4** | **12** |

**Conclusion:** The application has successfully passed all critical test cases. The system is stable, secure, and ready for deployment.
