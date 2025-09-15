# Notes SaaS Application

A multi-tenant SaaS notes application with a React frontend and Node.js/Express backend.

**Live Demo:** [https://frontend-saa-s-notes-application.vercel.app/](https://frontend-saa-s-notes-application.vercel.app/)

## Login with this

- Tenant: Acme
  - Admin: `admin@acme.test` / `password`
  - Member: `user@acme.test` / `password`
- Tenant: Globex
  - Admin: `admin@globex.test` / `password`
  - Member: `user@globex.test` / `password`

## Features

- Multi-tenant architecture (each company/tenant has its own users and notes)
- User authentication (JWT-based)
- Role-based access (ADMIN, MEMBER)
- Free plan: up to 3 notes per tenant
- Pro plan: unlimited notes
- Upgrade flow for tenants
- Responsive UI with React, Tailwind CSS, and Vite

## Project Structure

```
backend/
  controllers/
  middleware/
  models/
  routes/
  .env
  server.js
  seed.js
  package.json
frontend/
  src/
    components/
    context/
    pages/
    App.jsx
    main.jsx
  .env
  index.html
  package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database

### Backend Setup

1. Copy `backend/.env` and update with your MongoDB URI and JWT secret.
2. Install dependencies:

   ```sh
   cd backend
   npm install
   ```

3. (Optional) Seed the database with demo tenants and users:

   ```sh
   node seed.js
   ```

4. Start the backend server:

   ```sh
   node server.js
   ```

### Frontend Setup

1. Copy `frontend/.env` and set `VITE_API_BASE_URL` to your backend URL.
2. Install dependencies:

   ```sh
   cd frontend
   npm install
   ```

3. Start the frontend dev server:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Users

After seeding, you can use:

- Tenant: Acme
  - Admin: `admin@acme.test` / `password`
  - Member: `user@acme.test` / `password`
- Tenant: Globex
  - Admin: `admin@globex.test` / `password`
  - Member: `user@globex.test` / `password`

## Deployment

- Both frontend and backend are ready for deployment on Vercel.
- See `vercel.json` in each folder for configuration.

## License

MIT