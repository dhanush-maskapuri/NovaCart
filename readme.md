# 🛍️ NovaCart – India's Smartest Marketplace & AI E-Commerce Platform

> NovaCart is a production-grade, enterprise MERN Stack e-commerce platform combining general retail with 10-minute hyperlocal grocery delivery (NovaMart), AI-powered shopping assistance, product comparison matrices, gift finder wizards, sustainability eco-scores, live order tracking timelines, 18% GST tax invoice generation, and a real-time Merchant Admin Portal.

---

## 📜 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
  - [Customer Marketplace](#customer-marketplace)
  - [AI & Smart Shopping Tools](#ai--smart-shopping-tools)
  - [Merchant Admin Portal](#merchant-admin-portal)
- [Technology Stack](#-technology-stack)
- [Installation & Quick Start](#-installation--quick-start)
- [Environment Variables Setup](#-environment-variables-setup)
- [REST API Reference Table](#-rest-api-reference-table)
- [Project Directory Structure](#-project-directory-structure)
- [Production Build & Deployment](#-production-build--deployment)
- [Production Readiness Checklist](#-production-readiness-checklist)
- [Author & License](#-author--license)

---

## 🏗 Overview & Architecture

NovaCart is engineered using modular, decoupled MERN architecture:

```text
               +-----------------------------------+
               |     React 18 + Vite Frontend      |
               | (Tailwind CSS, Framer Motion, Context)|
               +-----------------+-----------------+
                                 | REST API / JSON + Bearer JWT
                                 v
               +-----------------+-----------------+
               |      Node.js + Express Server     |
               | (CORS, Helmet, Rate Limiter, V1 Router)|
               +-----------------+-----------------+
                                 | Mongoose ODM
                                 v
               +-----------------+-----------------+
               |       MongoDB Document Store      |
               | (Users, Products, Orders, Cart...) |
               +-----------------------------------+
```

---

## ✨ Key Features

### Customer Marketplace
- **JWT Authentication**: User registration, login, session persistence, role-based protection, and security headers.
- **Product Catalog & Filters**: Search, category taxonomy filtering, price sorting, and stock status badges.
- **Persistent Cart & Wishlist**: MongoDB backed persistent cart and wishlist with guest fallback.
- **Address Book Management**: Complete Address CRUD with strict 10-digit Indian Mobile and 6-digit PIN Code validation.
- **Coupon Engine**: Promo code validation (`WELCOME10`, `FESTIVE20`, `NOVACART100`) with error alerts and 1-click remove action.
- **18% GST Calculation & Tax Invoice**: Inclusive 18% GST tax calculation with printable/PDF Tax Invoice (`INV-2026-XXXXX`).
- **Orders & Live Tracking Timeline**: Order history, live logistics timeline (`Placed` -> `Confirmed` -> `Shipped` -> `Out for Delivery` -> `Delivered`), order cancellation with stock restoration, and return requests.
- **User Notification Center**: Live bell dropdown menu with unread badges and order status notifications.
- **Recently Viewed & Continue Shopping**: Automatic 10-item view history tracking.

### AI & Smart Shopping Tools
- **AI Floating Shopping Assistant**: Conversational assistant processing natural queries ("phone under ₹25,000", "gaming laptop", "gift for mother") with 1-click Add to Cart.
- **Product Comparison Matrix**: Side-by-side spec comparison table (up to 4 products) comparing Price, Rating, Warranty, Stock, and Eco-Score.
- **Gift Finder Wizard**: Interactive 5-step questionnaire curating gift recommendations by Recipient, Occasion, Budget, and Category.
- **30-Day Price History Trends**: Interactive SVG price graph, 30-day lowest/highest prices, and "Best Time to Buy" badge.
- **Sustainability Eco-Score**: Eco Score (0–100), recyclable packaging badge, and carbon footprint estimate.

### Merchant Admin Portal
- **Real-Time Analytics Dashboard**: Total revenue in ₹, total orders, low stock alerts, pending orders, and category sales charts.
- **Product Management**: Full catalog CRUD with image URL support, category assignment, and stock level configuration.
- **Category Taxonomy Control**: Category CRUD with safety check preventing deletion of categories containing active products.
- **Warehouse Inventory Control**: SKU stock tracking and automatic status badge computation (`IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK`).
- **Order Fulfillment & Status Dispatch**: Update order status with auto-notifications sent to customers.
- **User Directory & Moderation**: User role promotion (`user`/`admin`) and block/unblock toggle.
- **Review Moderation**: Approve or remove inappropriate product reviews.

---

## 🛠 Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Tailwind CSS, Framer Motion, Axios, React Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT (JsonWebToken), BcryptJS, Helmet, CORS, Compression.

---

## 🚀 Installation & Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Running locally on `mongodb://127.0.0.1:27017/novacart` or MongoDB Atlas)

### 1. Clone & Setup Backend
```bash
cd backend
npm install
npm run seed  # Seed initial catalog products & categories
npm run dev   # Starts backend on http://localhost:5000
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev   # Starts frontend server on http://localhost:5173
```

---

## 🔑 Environment Variables Setup

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/novacart
JWT_SECRET=novacart_jwt_production_super_secret_key_2026
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 📋 REST API Reference Table

| Module | Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/register` | Register new user | Public |
| **Auth** | `POST` | `/api/v1/auth/login` | User login & return JWT | Public |
| **Auth** | `GET` | `/api/v1/auth/me` | Fetch active profile | Bearer JWT |
| **Products**| `GET` | `/api/v1/products` | Search & filter products | Public |
| **Products**| `GET` | `/api/v1/products/:id` | Fetch product by ID | Public |
| **Cart** | `GET` | `/api/v1/cart` | Get user cart | Bearer JWT |
| **Cart** | `POST` | `/api/v1/cart` | Add item to cart | Bearer JWT |
| **Address** | `GET` | `/api/v1/addresses` | Fetch saved addresses | Bearer JWT |
| **Address** | `POST` | `/api/v1/addresses` | Add new address | Bearer JWT |
| **Coupons** | `POST` | `/api/v1/coupons/apply` | Validate promo code | Bearer JWT |
| **Orders** | `POST` | `/api/v1/orders` | Checkout & place order | Bearer JWT |
| **Orders** | `GET` | `/api/v1/orders/myorders` | User order history | Bearer JWT |
| **Orders** | `PUT` | `/api/v1/orders/:id/cancel` | Cancel order (restores stock)| Bearer JWT |
| **Admin** | `GET` | `/api/v1/admin/dashboard` | Merchant analytics stats | Admin JWT |
| **Admin** | `GET/POST`| `/api/v1/admin/products` | Product management CRUD | Admin JWT |
| **Admin** | `GET/PUT` | `/api/v1/admin/orders` | Order status fulfillment | Admin JWT |
| **Admin** | `GET/PUT` | `/api/v1/admin/users` | User roles & block toggle | Admin JWT |

---

## 📂 Project Directory Structure

```text
e-commerce/
├── backend/
│   ├── config/          # DB & env configuration
│   ├── controllers/     # API route handlers
│   ├── middlewares/     # Auth, Admin, CORS, Error handlers
│   ├── models/          # Mongoose Schemas (User, Product, Order...)
│   ├── routes/          # Express route definitions
│   ├── services/        # Order & notification logic
│   └── app.js           # Express app setup
├── frontend/
│   ├── src/
│   │   ├── components/  # Cart, Compare, Product, Admin, Navbar UI
│   │   ├── context/     # Auth, Cart, Wishlist, Compare Contexts
│   │   ├── pages/       # Home, Shop, ProductDetails, Checkout, Admin pages
│   │   ├── routes/      # AppRoutes & AdminRoute guards
│   │   └── services/    # Axios API wrappers
│   └── vite.config.js   # Vite configuration
└── README.md
```

---

## 📦 Production Build & Deployment

To compile the frontend for production deployment:
```bash
cd frontend
npm run build
```
Output files will be generated in `frontend/dist/`.

---

## ✅ Production Readiness Checklist

- [x] All 38 modules across Prompts 1–7 fully implemented.
- [x] JWT Authentication & role-based access control (Admin/User).
- [x] Dynamic localhost CORS matching for all Vite ports.
- [x] Inclusive 18% GST calculation and PDF/Print Invoice creation.
- [x] Stock inventory auto-restoration upon order cancellation.
- [x] Real-time Merchant Admin Portal with live analytics.
- [x] AI Assistant, Product Comparison, Gift Finder, Price History, and Eco-Score tools.
- [x] Production build (`npm run build`) compiles cleanly in under 4 seconds with 0 errors.

---

## 👨‍💻 Author & License

**Dhanush Maskapuri**  
GitHub: [https://github.com/dhanush-maskapuri](https://github.com/dhanush-maskapuri)

Licensed under the MIT License.