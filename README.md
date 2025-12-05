# 🎉 SyncSpace -- Full-Stack Events & Activities Management Platform

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.x-brightgreen?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-payments-blue?style=for-the-badge&logo=stripe)
![Vercel](https://img.shields.io/badge/Frontend-Deployed_on_Vercel-black?style=for-the-badge&logo=vercel)
![Railway](https://img.shields.io/badge/Backend-Deployed_on_Railway-purple?style=for-the-badge&logo=railway)

A modern, fully scalable full-stack event management system with
real-time booking, secure payments, hosting tools, analytics, and an
elegant UI.

[Live
Client](https://b5a8-client-fkqhpd2e4-jubayer-alams-projects.vercel.app)
\
[Backend
Repo](https://github.com/jubayer98/events-and-activities-client-server-system/tree/main/b5a8-server)
\
[Frontend
Repo](https://github.com/jubayer98/events-and-activities-client-server-system/tree/main/b5a8-client)

------------------------------------------------------------------------

# 🧭 Overview Diagram

``` mermaid
flowchart LR
    A[Frontend - Next.js 16] -->|REST API| B(Backend - Express + TS)
    B --> C[(MongoDB Database)]
    B --> D[[Stripe Payments]]
    A --> E[[Cloudinary Uploads]]
```

------------------------------------------------------------------------

# ✨ Key Features (Enhanced)

## 🖥️ Frontend (Next.js)

-   Modern landing page with animated sections
-   Dashboard system for Users, Hosts & Admin
-   Cloudinary upload widget with previews
-   Payment flow powered by Stripe Elements
-   Loading skeletons, transitions & accessibility support
-   Powerful event filtering (search, category, fee, status)

------------------------------------------------------------------------

## 🔐 Backend (Node + Express + TS)

-   Strict TypeScript typing across entire API
-   Modular MVC architecture
-   Secure auth system (JWT, refresh tokens, cookies)
-   Centralized error handling & logging
-   Auto-expiring bookings scheduler
-   Stripe webhook event processing
-   Admin and Host analytics engines
-   Database indexing for optimized queries

------------------------------------------------------------------------

# 🛠️ Tech Stack

## Frontend

-   Next.js 16 (App Router)
-   React 19
-   Tailwind CSS 4 + shadcn/ui
-   Cloudinary Upload API
-   Stripe JS

## Backend

-   Node.js 18+
-   Express 5
-   MongoDB + Mongoose 9
-   Stripe SDK 20
-   JWT + bcryptjs

------------------------------------------------------------------------

# 🏗️ Architecture

    📦 Full-Stack System  
     ├── Frontend (Next.js)  
     │     ├── UI Rendering  
     │     ├── Client API Wrapper  
     │     ├── Cloudinary Direct Uploads  
     │     └── Stripe Checkout  
     │
     ├── Backend (Express + TS)  
     │     ├── Auth System  
     │     ├── Booking Engine  
     │     ├── Event Management  
     │     ├── Payment Webhooks  
     │     └── Admin & Host Analytics  
     │
     └── MongoDB (Data Storage)

------------------------------------------------------------------------

# 📁 Project Structure (Enhanced)

## Frontend Structure

    src/
    ├── app/               # Next.js routes
    ├── components/        # Reusable UI
    ├── contexts/          # Global state
    ├── hooks/             # Custom hooks
    ├── lib/               # Utils & API wrappers
    ├── types/             # TypeScript types
    └── constants/

## Backend Structure

    src/
    ├── config/            # DB & Stripe config
    ├── models/            # Mongoose schemas
    ├── modules/
    │   ├── auth/
    │   ├── booking/
    │   ├── event/
    │   ├── review/
    │   ├── payment/
    │   ├── user/
    │   └── admin/
    ├── utils/
    └── index.ts

------------------------------------------------------------------------

# 🚀 Getting Started

## Backend Setup

``` bash
git clone https://github.com/jubayer98/events-and-activities-client-server-system.git
cd events-and-activities-client-server-system/b5a8-server
npm install
cp .env.example .env
npm run dev
```

## Frontend Setup

``` bash
cd ../b5a8-client
npm install
cp .env.local.example .env.local
npm run dev
```

------------------------------------------------------------------------

# 🔐 Environment Variables

## Backend `.env`

    PORT=4000
    NODE_ENV=development
    CLIENT_URL=http://localhost:3000

    DATABASE_URL=mongodb://localhost:27017/syncspace

    JWT_ACCESS_SECRET=your_access_key
    JWT_REFRESH_SECRET=your_refresh_key

    STRIPE_SECRET_KEY=sk_test_xxx
    STRIPE_WEBHOOK_SECRET=whsec_xxx

## Frontend `.env.local`

    NEXT_PUBLIC_API_URL=http://localhost:4000/api
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset

------------------------------------------------------------------------

# 🌐 API Overview

  Module     Path
  ---------- ---------------
  Auth       `/auth/*`
  Events     `/events/*`
  Bookings   `/bookings/*`
  Payments   `/payments/*`
  Admin      `/admin/*`
  Reviews    `/reviews/*`

------------------------------------------------------------------------

# 🚢 Deployment Guide

## Deploy Frontend to Vercel

``` bash
vercel --prod
```

## Deploy Backend to Railway

-   Set root directory: **b5a8-server**
-   Add all environment variables
-   Deploy automatically from GitHub

------------------------------------------------------------------------

# 🔧 Scripts

## Frontend

    npm run dev
    npm run build
    npm start
    npm run lint

## Backend

    npm run dev
    npm run build
    npm start
    npm run start:prod

------------------------------------------------------------------------

# 🤝 Contributing

1.  Fork repository
2.  Create a feature branch
3.  Commit changes
4.  Push branch
5.  Submit PR

Follows TypeScript, ESLint & best practices.

------------------------------------------------------------------------

# 📝 License

-   **Frontend:** MIT
-   **Backend:** ISC

------------------------------------------------------------------------

# 👨‍💻 Author

**Jubayer Alam**
GitHub: https://github.com/jubayer98

⭐ *Star this repository if you love the project!*
Made with ❤️ by **Jubayer Alam**
