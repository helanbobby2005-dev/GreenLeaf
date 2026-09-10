# 🌱 GreenLeaf - Plant E-Commerce Store with Flora AI Assistant & Admin Portal

A full-stack, responsive plant shopping platform featuring **Flora AI Customer Support & Plant Agent**, comprehensive **Executive Admin Management Center**, shopping cart, wishlist, and REST backend API.

---

## 🌟 Key Features

### 1. 🤖 Flora AI Customer Support & Plant Agent
- **Plant & Price Search**: Search live plant inventory and retrieve real-time discounted prices, ratings, and botanical details.
- **Budget Recommendations**: One-click queries for *"Plants under ₹500"*, *"Best Indoor Plants"*, etc.
- **Order Tracking**: Enter your Order ID (`GL-XXXXXX`) or ask *"Track my order"* to fetch live order status.
- **Interactive Chat Cards**: Direct **Add to Cart** and **View Details** buttons inside the AI chat interface.
- **Plant Care Insights**: Instant advice on watering, lighting, and placement.

### 2. 🛡️ Executive Admin Management Center
- **Security Portal**: Secure login credentials (`admin` / `admin123`).
- **Inventory CRUD**: Add new plants, update pricing/discounts, edit specifications, or remove items with confirmation modals.
- **Order Tracking & Fulfillment**: Manage orders, inspect customer shipping details, and update dispatch status (`Processing` ➔ `Shipped` ➔ `Delivered` ➔ `Cancelled`).
- **Inquiry Desk**: Review and manage messages submitted via the Contact form.
- **Live Analytics**: Real-time revenue counter, order count, active inventory, and inquiry tracking.

### 3. 🌿 Customer E-Commerce Storefront
- Dynamic catalogue with category tabs (*Indoor, Outdoor, Flowering, Succulents*).
- Price filters (*Under ₹500, ₹500-₹1000, Above ₹1000*).
- Live search bar with instant autocomplete.
- Product details modal with care specs (*Light, Water, Type, Suitable For*).
- Wishlist and interactive Shopping Cart with quantity controls.
- Complete checkout form with UPI, Card, and Cash on Delivery payment options.

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/helanbobby2005-dev/greenleaf-plant-store.git
   cd greenleaf-plant-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open in your browser:
   - **Storefront & Flora AI**: [http://localhost:5000](http://localhost:5000)
   - **Admin Login**: Click "Admin" on the top right or go to [http://localhost:5000](http://localhost:5000)
   - **Default Credentials**: Username: `admin` | Password: `admin123`

---

## ☁️ Deployment Options

### Option A: Free 1-Click Hosting on Render.com (Recommended for Full-Stack)
1. Push this repository to your GitHub account.
2. Go to [Render.com](https://render.com) and create a **New Web Service**.
3. Connect your GitHub repository.
4. Set:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Deploy Web Service**. Render gives you a live HTTPS URL!

### Option B: GitHub Pages (Frontend with AI Assistant)
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.
   *(Note: On GitHub Pages, data and Flora AI run client-side with localStorage persistence).*

---

## 📄 License
MIT License © 2026 GreenLeaf. Grow naturally.
