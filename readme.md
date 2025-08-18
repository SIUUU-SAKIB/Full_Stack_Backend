# 📦 Parcel Delivery API

A **RESTful API** for managing users, authentication, and parcel delivery operations.
Built with **Node.js, Express, MongoDB**.

---

## 🚀 Base URL

```
https://full-stack-backend-8.onrender.com/
```

---

## 📑 Features

* 👤 **User Management**

  * Register users (`sender`, `receiver`, `public`)
  * Admin & Super Admin roles
  * User verification by admin/super\_admin
  * Update & delete accounts
* 🔑 **Authentication**

  * User login/logout
  * Reset password
  * JWT-based authentication
* 📦 **Parcel Management**

  * Create, update, track, and cancel parcels
  * Admin approval workflow
  * Delivery status updates

---

## 📌 API Endpoints

### 👤 User Module

| Method   | Endpoint                         | Description         | Access              |
| -------- | -------------------------------- | ------------------- | ------------------- |
| `POST`   | `/user/create-user`              | Register a new user | Public              |
| `POST`   | `/user/create-admin`             | Create an admin     | Super Admin         |
| `GET`    | `/user/all-users`                | Get all users       | Admin / Super Admin |
| `GET`    | `/user/get-user`                 | Get user by ID      | Admin / Super Admin |
| `PATCH`  | `/user/verify-user/:id`          | Verify a user       | Admin / Super Admin |
| `DELETE` | `/user/delete-user/:id`          | Delete own account  | User                |
| `DELETE` | `/user/delete-by-admin/:id`      | Delete any user     | Admin / Super Admin |
| `PATCH`  | `/user/update-user/:id`          | Update own account  | User                |
| `PATCH`  | `/user/update-user-by-admin/:id` | Update any account  | Admin / Super Admin |

---

### 🔑 Authentication Module

| Method  | Endpoint               | Description                 | Access |
| ------- | ---------------------- | --------------------------- | ------ |
| `POST`  | `/auth/login`          | Login with email & password | Public |
| `PATCH` | `/auth/reset-password` | Reset password              | User   |
| `POST`  | `/auth/log-out`        | Logout                      | User   |

---

### 📦 Parcel Module

| Method   | Endpoint                    | Description                     | Access              |
| -------- | --------------------------- | ------------------------------- | ------------------- |
| `POST`   | `/parcel/create-parcel`     | Create a new parcel             | Verified User       |
| `GET`    | `/parcel/all-parcel`        | View all parcels                | Admin / Super Admin |
| `PATCH`  | `/parcel/parcel-status/:id` | Approve / update parcel         | Admin / Super Admin |
| `DELETE` | `/parcel/delete/:id`        | Delete parcel                   | Admin / Super Admin |
| `POST`   | `/parcel/current-status`    | Track parcel by tracking number | Sender / Receiver   |
| `PATCH`  | `/parcel/cancel-parcel`     | Cancel parcel (if pending)      | Sender / Receiver   |

---

## 🛡️ Authorization

* Uses **JWT Tokens**.
* Must include in request header:

```
Authorization: Bearer <access_token>
```

---

## 📝 Example Request

**Create User**

```http
POST /user/create-user
Content-Type: application/json

{
  "name": "Aminul Islam",
  "email": "aminul234@gmail.com",
  "password": "Sakib1234**",
  "role": "sender"
}
```

**Create Parcel**

```http
POST /parcel/create-parcel
Authorization: Bearer <token>
Content-Type: application/json

{
  "sender": {
    "name": "Joshua Weismann",
    "phone": "+8801755555555",
    "email": "eve@example.com",
    "address": "Khulna, Bangladesh"
  },
  "receiver": {
    "name": "Frank Wilson",
    "phone": "+8801766666666",
    "email": "frank@example.com",
    "address": "Barishal, Bangladesh"
  },
  "contentDescription": "Smartphone",
  "weight": "1",
  "fragile": true
}
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT, bcrypt
* **Deployment:** Render

---

## 👨‍💻 Author

Developed by **Sakib Islam** ✨
