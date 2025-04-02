import { Link } from "react-router-dom";
import "./ProductItem.css";

// ProductItem Component - Displays individual product details
function ProductItem({ product }) {
  return (
    <div className="product-item"> {/* Container for the product */}
      <img className="product-img" src={product.thumbnail} alt={product.title} /> {/* Product image */}
      <h3 className="product-title">{product.title}</h3> {/* Product title */}
      <p className="product-price">₹{product.price}</p> {/* Product price */}
      <Link className="product-link" to={`/product/${product.id}`}> {/* Link to the product details page */}
        View Details
      </Link>
    </div>
  );
}

export default ProductItem;
