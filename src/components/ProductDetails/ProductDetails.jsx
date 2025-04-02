import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css';
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { id } = useParams(); // params for id
  const dispatch = useDispatch(); // dispatch to add item to cart
  const [product, setProduct] = useState(null); // product state with initial value as null
  const [loading, setLoading] = useState(true); // Loading state till the data is loaded
  const [error, setError] = useState(null); // Error state for error handling
  const [mainImage, setMainImage] = useState(""); // image changing state on clicking the image
  const [buttonText, setButtonText] = useState("Add to Cart"); // Button text state for add to cart button
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // disable and enable button state 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`); // Fetch with id from params
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
        setMainImage(data.thumbnail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // handiling Add to cart event 
  const handleAddToCart = () => {
    if (product.stock === 0 || isButtonDisabled) return;

    dispatch(addToCart(product));
    // Pop up using tostify after successfully adding the item
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setButtonText("Added ✅"); // Chnage button text
    setIsButtonDisabled(true); // Disable button

    setTimeout(() => {
      setButtonText("Add to Cart"); // Change button text after 2 seconds
      setIsButtonDisabled(false); // Enable button for 2 seconds
    }, 2000);
  };

  // Star Rating based on the number out of 5
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStar);

    return (
      // Stars displaying based on rating
      <div className="star-rating">
        {"★".repeat(fullStars)}
        {halfStar ? "✩" : ""}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  if (loading) return <h2 className="product-detail-loading">Loading...</h2>; // Loading
  if (error) return <h2 className="product-detail-error">Error: {error}</h2>; // Error

  return (
    // Image section
    <div className="product-detail">
      <div className="product-image-container">
        <img
          src={mainImage}
          alt={product.title}
          className="product-detail-thumbnail"
        />
        <div className="product-gallery">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} ${index + 1}`}
              onClick={() => setMainImage(image)}
              className={mainImage === image ? "active" : ""}
            />
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>
        {/* Rating */}
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.rating} / 5)</span>
        </div>
        {/* Price */}
        <p className="product-detail-price">${product.price}</p>
        {/* Instock or not */}
        <p className="product-stock">
          {product.stock > 0 ? `${product.stock} items in stock` : "Out of Stock"}
        </p>
        {/* Categoty */}
        <p className="product-category">Category: {product.category}</p>

        {/* Additional Specifications */}
        <div className="product-specifications">
          <h3 className="specifications-title">Specifications:</h3>
          <ul className="specifications-list">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Weight:</strong> {product.weight}g</li>
            <li><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</li>
            <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
            <li><strong>Shipping Info:</strong> {product.shippingInformation}</li>
            <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
            <li><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</li>
          </ul>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${buttonText === "Added ✅" ? "added" : ""}`}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : buttonText}
        </button>

        {/* Reviews Section */}
        <div className="product-reviews">
          <h3 className="reviews-title">Reviews:</h3>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.date} className="review">
                <p className="reviewer-name">
                  {review.reviewerName} ({review.rating} stars)
                </p>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            // If no reviews present
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
