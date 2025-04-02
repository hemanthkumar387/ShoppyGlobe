import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

function Cart() {
  // Extracting cart items, total quantity, and total price from Redux store
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to Checkout page
  const handleCheckout = () => {
    navigate("/checkout"); // Redirect to Checkout page
  };

  return (
    <div className="cart-container">
      {/* Page Title */}
      <h1 className="cart-title">Shopping Cart</h1>
      {/* Display message if cart is empty */}
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div className="cart-content">
          {/* List of Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          {/* Order Summary Section */}
          <div className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>
            <p className="cart-total-items">Total Items: <strong>{totalQuantity}</strong></p>
            <p className="cart-total-price">Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
            
            {/* Checkout Button */}
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      
      {/* Back to Shopping Button */}
      <Link to="/">
        <button className="back-to-shopping-btn">Back to Shopping</button>
      </Link>
    </div>
  );
}

export default Cart;
