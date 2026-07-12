# 🛒 E-Commerce Store

A modern full-stack E-Commerce web application built using **React.js, Node.js, Express.js, and MongoDB**. The application provides a seamless online shopping experience with secure authentication, product browsing, shopping cart, wishlist, category filtering, and multiple payment options.

---

## 📌 Features

### 👤 User Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 🛍️ Shopping Features
- Browse Products
- Category-wise Filtering
- Add to Cart
- Add to Wishlist
- Remove Items
- View Cart & Wishlist
- Order Summary

### 💳 Payment Module
- Credit/Debit Card
- UPI Payment
- Net Banking
- Cash on Delivery (COD)

### 🎨 User Interface
- Responsive Design
- Modern Product Cards
- Interactive Navigation Bar
- Category Filters
- Clean & User-Friendly Layout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv

---

## 📂 Project Structure

```text
e-commerce_app/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/
│   │   └── ProtectedRoute/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Payment.jsx
│   │   └── Profile.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
