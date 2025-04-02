import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../utils/cartSlice";
import "./CartItem.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartItem({ item }) {
  const dispatch = useDispatch();

  // Handle quantity change of the item in the cart
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);

    // Prevent increasing quantity beyond available stock
    if (newQuantity <= item.stock) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    } else {
      // Show a warning toast if the quantity exceeds available stock
      toast.warn(`Only ${item.stock} items available in stock!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Handle item removal from the cart
  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));

    // Show Toast Notification when item is removed
    toast.error(`${item.title} removed from cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="cart-item">
      {/* Display product image */}
      <img className="cart-item-image" src={item.thumbnail} alt={item.title} />
      {/* Display product title and price */}
      <p className="cart-item-title">
        {item.title} - <span className="cart-item-price">${item.price.toFixed(2)}</span>
      </p>
      {/* Quantity input field to modify product quantity */}
      <input
        className="cart-item-quantity"
        type="number"
        value={item.quantity}
        min="1"
        onChange={handleQuantityChange}
      />
      {/* Button to remove the item from the cart */}
      <button className="cart-item-remove" onClick={handleRemoveItem}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
