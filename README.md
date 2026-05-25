# GoDash | Modern Ecommerce with Smart Delivery

GoDash is a modern, full-stack ecommerce platform designed specifically for customers in New South Wales (NSW), Australia. It solves the uncertainty of online delivery by providing precision scheduling, live cost calculation, and real-time order tracking.

## 🚀 Unique Features

- **Smart Delivery Scheduling**: Unlike standard stores, GoDash allows users to choose a specific 3-hour delivery window (e.g., 3 PM - 6 PM) that fits their schedule.
- **Live Delivery Pricing**: Instant calculation between Standard ($5) and Express ($15) delivery services.
- **Order Tracking System**: A live visual stepper and countdown timer that simulates the progress from "Order Received" to "Delivered."
- **Personalized History**: A "Recently Viewed" section on the homepage that persists across sessions using `LocalStorage`.
- **Dynamic Catalog**: Powered by the DummyJSON API, featuring live search, category filtering, and real-time "Best Sellers" and "Trending Deals."

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3**: Responsive design using Flexbox and CSS Grid.
- **Vanilla JavaScript (ES6)**: Modular script architecture with dedicated logic for Auth, Cart, and Tracking.
- **Dark Mode**: Fully integrated theme toggle with persistence.
- **External API**: Integration with [DummyJSON](https://dummyjson.com/) for dynamic product data.

### Backend
- **Node.js & Express**: High-performance RESTful API.
- **MongoDB Atlas**: Cloud-hosted database for user accounts, feedback, and recommendations.
- **Security**: 
  - **Password Hashing**: Secure encryption using `bcryptjs`.
  - **Authentication**: JWT (JSON Web Tokens) for secure user sessions.
  - **CORS**: Cross-Origin Resource Sharing enabled for secure frontend-to-backend communication.

## 📁 Project Structure

```plaintext
godash/               # Frontend Website
├── assets/           # Images, Icons, and Logos
├── css/              # Modular Stylesheets (style, cart, delivery, darkmode, etc.)
├── js/               # Modular Logic (app, api, auth, tracking, etc.)
└── *.html            # Project Pages (Index, Products, Cart, Auth, etc.)

backend/              # API & Database
├── models/           # Mongoose Schemas (User, Feedback, Recommendation)
├── routes/           # Express API Endpoints
├── server.js         # Main Entry Point
└── .env              # Environment Variables (Secrets)
```

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/saadtouqir/godash.git
cd godash
```

### 2. Setup the Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB URI:
   ```plaintext
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5001
   JWT_SECRET=your_random_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Run the Frontend
1. Open the project in VS Code.
2. Use the **Live Server** extension to launch `godash/index.html`.
3. Ensure the URL starts with `http://127.0.0.1:5500` to avoid CORS issues.

## 👥 Contributors

- **GoDash Team** - University Web Technology Assignment

## 📄 License

This project is for educational purposes as part of a Web Technology course.
