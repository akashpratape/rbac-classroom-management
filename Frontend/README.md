# Role-Based Access Control (RBAC) System for Classroom Management

# IMPORTANT POINT TO REMEMBER FOR LOGGING IN:
## To signin as principal (master)
email - principal@example.com
password - principal

## To signin as teacher (admin)
email - teacher1@example.com
password - teacher1
OR
email - teacher2@example.com
password - teacher2

### To signin as student (user)
email - student1@example.com
password - student1
OR
email - student2@example.com
password - student2


## Project Description

This is a Role-Based Access Control (RBAC) system designed for managing classroom data. The application has three user roles: **Principal**, **Teacher**, and **Student**, with different levels of access and functionality based on the role. The system is implemented with the following technologies:

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Data**: Static JSON file for storing users and related data (Here i didn't use any Database since it would've been difficult to run Hence i used static JSON)

### Key Features:
1. **Login Page**: Users can log in with their email and password.
2. **Role-based Dashboards**:
   - **Principal Dashboard**: View and edit teachers' and students' information.
   - **Teacher Dashboard**: View and edit students' information.
   - **Student Dashboard**: View a list of students (read-only).

---

## How it Works

### Workflow:
1. **Login**: The user provides their credentials (email and password) on the login page.
   - If the credentials match an entry in the `users.json` file, a **JWT Token** is generated and stored in the browser's local storage.
   - Depending on the role (Principal, Teacher, Student), the user is redirected to the corresponding dashboard.
   
2. **Dashboards**:
   - **Principal**: Can view and edit both teacher and student information.
   - **Teacher**: Can view and edit student information.
   - **Student**: Can only view the list of students (no editing).

3. **CRUD Operations**:
   - Teachers and Principals can edit data in the dashboards, and changes are reflected immediately.
   - The data is stored in a static JSON file in the backend for simplicity. Changes are simulated without a database.

### Frontend (React):
- The frontend is a single-page application (SPA) built using **React.js**.
- The user interface has three dashboards for **Principal**, **Teacher**, and **Student**, each with different levels of access.
- It uses **React Router** to navigate between the login page and dashboards.
- The frontend interacts with the backend via **Axios** to fetch and update data.

### Backend (Node.js with Express):
- The backend is built using **Express**.
- **JWT-based Authentication**: The backend verifies the token in each request to ensure that the user is authenticated.
- **Role-Based Authorization**: The backend checks the user's role to ensure they have permission to access specific resources (e.g., a principal can access teacher/student data).
- The backend serves data through RESTful endpoints using JSON data stored in a static file (no database).

---

## Roles & Permissions

- **Principal**:
  - **Permissions**:
    - View and edit both teacher and student information.
  - **Dashboard Features**:
    - Editable tables for teacher and student data.
    - Ability to update teacher and student details.
  
- **Teacher**:
  - **Permissions**:
    - View and edit student information.
  - **Dashboard Features**:
    - Editable tables for students’ names, emails, and classrooms.
    - Ability to update student details.
  
- **Student**:
  - **Permissions**:
    - View a list of students but cannot edit any information.
  - **Dashboard Features**:
    - Read-only table for viewing other students' data (name, email, classroom).

---

## Installation

### Backend Setup (Node.js)

1. **Clone the repository**:
    ```bash
    git clone https://github.com/akashpratape/rbac-classroom-management.git
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the backend server**:
    ```bash
    npm start
    ```
   The backend server will start on `http://localhost:8080`.

---

### Frontend Setup (React)

1. **Navigate to the frontend folder**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend application**:
    ```bash
    npm start
    ```
   The React app will start on `http://localhost:3000`.

---

## Backend API Endpoints

- **POST /auth/login**: User login endpoint. Accepts `email` and `password` and returns a JWT token and user role.
  
- **GET /principal/dashboard**: Fetch principal's dashboard data (teachers and students).
  
- **GET /teacher/dashboard**: Fetch teacher's dashboard data (students).
  
- **GET /student/dashboard**: Fetch student’s dashboard data (other students).
  
- **PUT /principal/edit-teacher**: Edit teacher data (only accessible to the Principal).
  
- **PUT /principal/edit-student**: Edit student data (only accessible to the Principal).

- **PUT /teacher/edit-student**: Edit student data (only accessible to the Teacher).

---

## Security & Authentication

- **JWT Token**: 
  - After login, a JWT token is generated and stored in `localStorage`. 
  - The token is sent with every request to ensure the user is authenticated.
  
- **Role-based Authorization**:
  - The `checkRole` middleware verifies if the user has the appropriate role to access specific routes.

---

## How to Use

1. **Login**:
   - Go to the login page and enter the credentials for either **Principal**, **Teacher**, or **Student**.
   - Correct credentials will redirect the user to the appropriate dashboard.

2. **Dashboard**:
   - Each dashboard is customized based on the role of the logged-in user.
   - **Principal** can view and edit both teacher and student information.
   - **Teacher** can view and edit only student information.
   - **Student** can view a list of students, but cannot edit anything.

---

## Notes for Evaluators

- **Frontend**:
  - The React app is designed to dynamically update the dashboard based on the user role.
  - The app uses React Router for seamless navigation.
  - Forms and data are updated using local state, and Axios handles HTTP requests to the backend.

- **Backend**:
  - The backend serves as an API to handle authentication and data fetching.
  - Data is currently stored in a static `users.json` file for simplicity, but can be extended to use a real database.
  - The JWT authentication mechanism and role-based access control ensure that users only see what they are allowed to see and edit.

- **Testing**:
  - You can use the provided credentials in the `users.json` file to test the different user roles:
    - Principal: `principal@example.com / principal`
    - Teacher1: `teacher1@example.com / teacher`
    - Teacher2: `teacher2@example.com / teacher`
    - Student1: `student1@example.com / student1`
    - Student2: `student2@example.com / student2`

---

## Conclusion

This project demonstrates an RBAC system with specific functionality for each role. It is a useful system for classroom management where different users can interact with the system based on their permissions.

---

Let me know if you'd like to make any changes to the README!