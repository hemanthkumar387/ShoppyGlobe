import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import "./Header.css";

function Header() {
  // Retrieving the total quantity of items in the cart from the Redux store
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="header-container">
      {/* Home Link */}
      <Link to="/" className="header-link text-link">
        <FaShoppingBag size={24} /> ShoppyGlobe
      </Link>
      {/* Cart Link */}
      <Link to="/cart" className="header-link text-link">
        <FaShoppingCart size={24} /> Cart
        {/* Display cart item count only if greater than zero */}
        {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
      </Link>
    </nav>
  );
}

export default Header;