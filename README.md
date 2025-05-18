# 🛒 Ecomify

**Ecomify** is a full-featured, scalable e-commerce RESTful API built with **Node.js**, **Express.js**, and **MongoDB**. It supports secure authentication, advanced role-based authorization, product management, payment processing, and much more – making it a solid backend foundation for any e-commerce application.

---

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based user login/signup.
  - Role-based access control (Admin, Manager, User).
  - Password reset and email confirmation flow.

- **Product & Category Management**
  - CRUD operations for products, categories, subcategories, brands.
  - Advanced filtering, pagination, and sorting.
  - Image upload and processing using Multer.

- **Shopping Cart & Orders**
  - Add/update/remove products in cart.
  - Create orders with support for Stripe payments and Cash-on-Delivery.
  - Apply coupon codes for discounts.

- **User Features**
  - Wishlist management.
  - Product reviews and ratings.
  - Address book management.

- **Admin Panel Features**
  - Dashboard-ready endpoints for order analytics and user management.

- **Security Enhancements**
  - Rate limiting to prevent brute-force attacks.
  - Data sanitization (NoSQL injection & XSS protection).
  - Robust error-handling middleware.
  - Input validation using express-validator.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JWT
- **Payments**: Stripe API
- **File Uploads**: Multer
- **Validation & Security**: express-validator, helmet, rate-limit, mongo-sanitize, xss-clean

---
