# 🛒 Shopping Cart Application

### This is a simple e-commerce shopping cart application built with React, Redux, and React Router. It allows users to browse products, add them to the cart, and proceed to checkout.

## 🚀 Features
✅ Browse products
✅ Add products to cart
✅ Remove products from cart
✅ Update product quantity
✅ Checkout functionality

## 🛠️ Tech Stack
- React.js (Frontend)
- vite (Bundler)
- Redux Toolkit (State Management)
- React Router (Routing)
- React Toastify (Notifications)
- CSS (Styling)

## 📂 Project Structure
```
📦 shopping-cart-app
├── 📂 src
│   ├── 📂 components
│   │   ├── 📂 Cart
│   │   │   ├── Cart.jsx
│   │   │   ├── Cart.css
│   │   ├── 📂 CartItem
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartItem.css
│   │   ├── 📂 Checkout
│   │   │   ├── Checkout.jsx
│   │   │   ├── Checkout.css
│   │   ├── 📂 Header
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   ├── 📂 Home
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   ├── 📂 NotFound
│   │   │   ├── NotFound.jsx
│   │   │   ├── NotFound.css
│   │   ├── 📂 ProductDetails
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ProductDetails.css
│   │   ├── 📂 ProductItem
│   │   │   ├── ProductItem.jsx
│   │   │   ├── ProductItem.css
│   │   ├── 📂 ProductList
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductList.css
│   ├── 📂 utils
│   │   ├── cartSlice.js
│   │   ├── appStore.js
│   │   ├── useFetchProducts.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── 📜 package.json
├── 📜 README.md
```

## 🚀 How to Run the Application

1️⃣ **Clone the repository:**
```bash
git clone https://github.com/hemanthkumar387/ShoppyGlobe.git
cd shoppyglobe
```

2️⃣ **Install dependencies:**
```bash
npm install
```

3️⃣ **Start the development server:**
```bash
npm run dev
```

4️⃣ **Open in Browser:**
The app will be available at: [http://localhost:5173](http://localhost:5173)

## 📜 Usage Instructions
- **Add a Product** – Click "Add to Cart" to add a product.
- **Update Quantity** – Increase or decrease the quantity of a product.
- **Remove Product** – Click "Remove" to delete a product from the cart.
- **Proceed to Checkout** – Click "Checkout" to finalize the order.
