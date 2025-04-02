import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../utils/cartSlice";
import "./CheckOut.css";

function Checkout() {
    const dispatch = useDispatch(); // Hook to dispatch actions in Redux
    const { totalPrice } = useSelector((state) => state.cart); // Fetching total price from Redux store

    // State to manage form data for checkout
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    // State to check if the order has been placed
    const [orderPlaced, setOrderPlaced] = useState(false);
    // State to store validation errors
    const [errors, setErrors] = useState({});

    // Function to handle input changes and update form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to validate form inputs
    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit phone number";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit pincode";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors exist
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        if (validateForm()) {
            setOrderPlaced(true); // Marks the order as placed
            dispatch(clearCart()); // Clears the cart after order placement
        }
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>

            {/* Display success message if order is placed */}
            {orderPlaced ? (
                <div className="order-success">
                    <h2>🎉 Order Placed Successfully!</h2>
                    <p>Your order has been placed. Thank you for shopping with us!</p>
                    <Link to="/">
                        <button className="back-to-shopping-btn">Back to Shopping</button>
                    </Link>
                </div>
            ) : (
                <div className="checkout-form">
                    <h2>Delivery Address</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Full Name Input */}
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                            {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                        </div>
                        {/* Phone Number Input */}
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                            {errors.phone && <p className="form-error">{errors.phone}</p>}
                        </div>
                        {/* Address Input */}
                        <div className="form-group">
                            <label>Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} required />
                            {errors.address && <p className="form-error">{errors.address}</p>}
                        </div>
                        {/* City and State Input Fields */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                                {errors.city && <p className="form-error">{errors.city}</p>}
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                                {errors.state && <p className="form-error">{errors.state}</p>}
                            </div>
                        </div>
                        {/* Pincode Input */}
                        <div className="form-group">
                            <label>Pincode</label>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                            {errors.pincode && <p className="form-error">{errors.pincode}</p>}
                        </div>
                        {/* Order Summary Section */}
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <p>Total Amount: <strong>${totalPrice.toFixed(2)}</strong></p>
                        </div>
                        {/* Submit Button */}
                        <button type="submit" className="place-order-btn">Place Order</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Checkout;
