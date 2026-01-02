# Online Test Tracking Web Application

Based on the project verification document (dempo).

## specific Stack
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB (Local instance required)

## Setup & Run

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:5000.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:5173.

## Features
- Teacher: Create tests, View results.
- Student: Take tests (timed), View own results.
- Authentication: Register/Login with Role selection.
