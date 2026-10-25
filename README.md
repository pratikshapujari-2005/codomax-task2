# 🚀 Velox Publishing Platform

A full-stack modern publishing and blog platform built with **Node.js**, **Express.js**, and an interactive **Tailwind CSS** frontend. This project was developed as part of **Module 02 (Backend Development)** to demonstrate server setup, REST API design, user authentication, and frontend-backend integration[cite: 1, 4].

---

## 🛠️ Key Objectives & Features (Module 02)

1. **Backend Server Setup**: Powered by Node.js and Express.js[cite: 1, 4].
2. **REST APIs**: Built and tested backend endpoints for data persistence[cite: 1, 4].
3. **Core Functionalities**:
   - **User Registration**: Secure account creation with persistent storage[cite: 1].
   - **User Login**: Session/credential validation[cite: 1].
   - **Create & Publish Blogs**: Dynamic article publishing with tags and author attribution[cite: 1].
4. **Frontend Integration**: Fully responsive UI built with Tailwind CSS communicating with backend REST endpoints[cite: 1].

---

## 📁 Project Structure

```text
velox-blog/
├── data/
│   ├── users.json          # Persistent JSON storage for user accounts
│   └── blogs.json          # Persistent JSON storage for published articles
├── public/
│   └── index.html          # Frontend UI & client-side JavaScript
├── node_modules/           # Backend dependencies
├── package.json            # Project configuration and scripts
└── server.js               # Express REST API server
