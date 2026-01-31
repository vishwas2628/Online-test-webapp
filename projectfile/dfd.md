# 9. Data Flow Diagram (DFD)

The Data Flow Diagram (DFD) maps the flow of information for the **Online Test Taking Web Application**. It illustrates how data enters the system from external entities (Teacher, Student), how it is processed, and where it is stored.

## 9.1 Level 0 DFD (Context Diagram)
This diagram provides a high-level overview of the entire system as a single process, interacting with the external entities: Teacher, Student, and Administrator.

```mermaid
graph LR
    T[Teacher] -- 1. Test Data & Schedule --> System((Online Test System))
    S[Student] -- 2. Login Credentials --> System
    System -- 3. Test Interface --> S
    S -- 4. Submit Answers --> System
    System -- 5. Score & Feedback --> S
    System -- 6. Analytics Reports --> T
    System -- 7. Auth Token --> S
    System -- 8. Auth Token --> T
```

## 9.2 Level 1 DFD (System Overview)
This detailed diagram breaks down the main system into its core sub-processes: Authentication, Test Management, and Examination Processing. This matches the flow of operations from test creation to result generation.

```mermaid
graph TD
    %% Entities
    Teacher[Teacher]
    Student[Student]

    %% Processes
    P1(1.0 Authentication)
    P2(2.0 Manage Test)
    P3(3.0 Take Test)
    P4(4.0 Evaluate & Grade)

    %% Data Stores
    D1[(Users DB)]
    D2[(Tests DB)]
    D3[(TestAttempts DB)]

    %% Connections
    Teacher -->|Register/Login| P1
    Student -->|Register/Login| P1
    P1 <-->|Verify Creds| D1
    
    Teacher -->|Create Test Details| P2
    P2 -->|Validate & Save| D2
    
    Student -->|Fetch Available Tests| P3
    D2 -->|Test Questions| P3
    Student -->|Submit Answers| P3
    
    P3 -->|Raw Answers| P4
    D2 -->|Answer Key| P4
    P4 -->|Calculate Score| P4
    P4 -->|Save Result| D3
    
    D3 -->|View Result| Student
    D3 -->|View Class Analytics| Teacher
```

## 9.3 Level 2 DFD (Detailed Grading Process)
This highly detailed diagram expands on **Process 4.0 (Evaluate & Grade)** from Level 1. It visualizes the internal logic of the automated scoring engine.

```mermaid
graph TD
    %% Inputs
    Input1[Student Submission]
    Input2[Test ID]

    %% Sub-Processes
    P4_1(4.1 Fetch Answer Key)
    P4_2(4.2 Compare Answers)
    P4_3(4.3 Calculate Total Score)
    P4_4(4.4 Generate Report)

    %% Data Store
    DB_Tests[(Tests Collection)]
    DB_Results[(TestAttempts Collection)]

    %% Flow
    Input1 --> P4_2
    Input2 --> P4_1
    DB_Tests -->|Return Correct Options| P4_1
    P4_1 -->|Answer Key| P4_2
    
    P4_2 -->|Loop for each Question| P4_2
    P4_2 -->|Matches Found| P4_3
    
    P4_3 -->|Sum Positive Marks| P4_3
    P4_3 -->|Deduct Negative Marks| P4_3
    
    P4_3 -->|Final Score| P4_4
    P4_4 -->|JSON Result Object| DB_Results
```
