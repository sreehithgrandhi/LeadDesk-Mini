# 🚀 LeadDesk Mini CRM

A full-stack Lead Management System (Mini CRM) built with **React, Express.js, PostgreSQL, and JWT Authentication**. The application allows potential clients to submit inquiries through a public form while providing administrators with a secure dashboard to manage and track leads.

---

## 🌐 Live Demo

**Frontend:**
https://lead-desk-mini-ecru.vercel.app/

**Backend API:**
https://leaddesk-mini-hb41.onrender.com/

**GitHub Repository:**
https://github.com/sreehithgrandhi/LeadDesk-Mini.git

---

# 📌 Project Overview

LeadDesk Mini CRM is a web application designed to help businesses collect, organize, and manage customer inquiries efficiently.

The application consists of two modules:

### Public Portal

* Visitors can submit inquiries through a lead form.
* Leads are stored securely in the PostgreSQL database.

### Admin Portal

* Secure login using JWT Authentication.
* View all submitted leads.
* Update lead status.
* Delete unwanted or spam leads.

---

# ✨ Features

### Public Features

* Submit a lead
* Input validation
* Responsive interface

### Admin Features

* Secure login
* JWT Authentication
* View all leads
* Update lead status
* Delete leads
* Automatic logout on invalid/expired token

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* CSS
* Tailwind CSS

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT (JSON Web Token)
* bcrypt
* dotenv
* CORS

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: PostgreSQL

---

# 📂 Project Structure

```text
LeadDesk-Mini/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/sreehithgrandhi/LeadDesk-Mini.git
cd LeadDesk-Mini
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=
JWT_SECRET=
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

# 🔐 Authentication

The admin dashboard is protected using JWT Authentication.

Workflow:

1. Admin logs in.
2. Server validates credentials.
3. JWT token is generated.
4. Token is stored on the client.
5. Protected API requests include the token in the Authorization header.

Example:

```http
Authorization: Bearer 
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| POST   | `/api/admin/login` | Admin Login |

---

## Leads

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/api/leads`     | Create Lead        |
| GET    | `/api/leads`     | Get All Leads      |
| PUT    | `/api/leads/:id` | Update Lead Status |
| DELETE | `/api/leads/:id` | Delete Lead        |

---

# 🗄 Database

### Admin

* id
* email
* password (hashed)

### Leads

* id
* name
* email
* budget
* message
* status
* created_at

---

# 🔄 Application Workflow

```text
Visitor
   │
   ▼
Lead Submission Form
   │
   ▼
Express API
   │
   ▼
PostgreSQL Database
   │
   ▼
Admin Dashboard
   │
   ├── View Leads
   ├── Update Status
   └── Delete Lead
```

---

# 🛡 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* Input Validation Middleware
* Environment Variables for Sensitive Data

---

# 🚀 Future Improvements

* Search and filter leads
* Pagination
* Email notifications
* Dashboard analytics
* Export leads to CSV
* Role-based access control
* Password reset functionality

---

# 📷 Screenshots

Add screenshots of:

* Home Page
* Lead Submission Form
* Login Page
* Admin Dashboard
* Leads Table

---

# 💡 Challenges Solved

* Implemented secure JWT authentication.
* Built a complete RESTful API with CRUD operations.
* Connected React frontend with Express backend.
* Integrated PostgreSQL for persistent data storage.
* Managed production environment variables.
* Successfully deployed the backend on Render and the frontend on Vercel.

---

# 🎯 Learning Outcomes

This project strengthened my understanding of:

* Full Stack Web Development
* REST API Design
* React Component Architecture
* Express.js Backend Development
* PostgreSQL Database Integration
* Authentication & Authorization
* CRUD Operations
* Deployment using Render and Vercel
* Environment Variable Management
* Git & GitHub Workflow

---

