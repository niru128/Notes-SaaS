# Multi-Tenant SaaS Notes Application

This is a full-stack multi-tenant SaaS notes app built with the MERN stack (MongoDB, Express, React, Node.js) featuring secure role-based access control, subscription plans, and tenant isolation.

---

## Features

- Multi-tenant support with tenant-specific data isolation.
- Role-based access control with Admin and Member roles.
- Subscription enforcement: Free plan (limit 3 notes), Pro plan (unlimited).
- User authentication with JWT tokens.
- Secure password hashing with bcrypt.
- Responsive frontend built with React and Framer Motion animations.
- Backend API built with Express and Mongoose.
- Deployment ready with environment variables for MongoDB Atlas and JWT secret.

---

## Technologies

- Backend: Node.js, Express, MongoDB, Mongoose, bcrypt, JSON Web Tokens
- Frontend: React, Axios, Framer Motion, Tailwind CSS
- Deployment: MongoDB Atlas, Vercel

---


Create a `.env` file in the backend folder with the following keys:

