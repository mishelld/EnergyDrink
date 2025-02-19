import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PurchasePage.css';
import 'font-awesome/css/font-awesome.min.css';

function PurchasePage({ setCart }) {
    const [cart, setCartState] = useState([]); // Local state for cart
    const [selectedOption, setSelectedOption] = useState("takeout");
    const navigate = useNavigate();  // Initialize navigate function
    const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage

    useEffect(() => {
        // Fetch cart details when component mounts
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/cart/${userEmail}`);
                if (response.ok) {
                    const cartData = await response.json();
                    setCartState(cartData); // Set the cart data into state
                    setCart(cartData); // Optionally update the parent component's cart
                } else {
                    console.error('Failed to fetch cart');
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        if (userEmail) {
            fetchCart(); // Only fetch if the user is logged in
        }
    }, [userEmail, setCart]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCartState(updatedCart);
        setCart(updatedCart);  // Update the parent cart as well
    };

    const decreaseQuantity = async (index, itemId) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            // Quantity is 0, so we need to delete it from the server
            try {
                const response = await fetch(`http://localhost:5000/api/cart/${userEmail}/item/${itemId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete item from cart');
                }
    
                // Remove the item from the local cart after successful deletion from the server
                updatedCart.splice(index, 1);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    
        // Update the local state after handling the quantity or deletion
        setCartState(updatedCart);
        setCart(updatedCart);  // Update the parent cart as well
    };
    
    

    const deleteItem = async (index, itemId) => {
        try {
            // Call the DELETE API to remove the item from the cart on the server
            const response = await fetch(`http://localhost:5000/api/cart/${userEmail}/item/${itemId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete item from cart');
            }
    
            // Update the local state after successful deletion
            const updatedCart = cart.filter((_, i) => i !== index);
            setCartState(updatedCart);
            setCart(updatedCart);  // Update the parent cart as well
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    

    const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1), 0).toFixed(2);

    const handleProceedToCheckout = () => {
        navigate('/signin'); // Redirect to the sign-in page
    };

    return (
        <div className="purchase-page">
            {/* Left Side: Takeout or Here picker */}
            <div className="left-side">
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="takeout">Takeout</option>
                    <option value="here">Here</option>
                </select>
            </div>

            {/* Right Side: Items container */}
            <div className="right-side-wrapper">
                <div className="right-side">
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <div>
                            {cart.map((item, index) => (
                                <div key={index} className="item-container">
                                    <img src={item.image} alt={item.title} />
                                    <div className="item-details">
                                        <div className="item-name">{item.title}</div>
                                        <div className="item-price">${item.price}</div>
                                        <div className="quantity-controls">
                                            <button onClick={() => decreaseQuantity(index, item._id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(index)}>+</button>
                                        </div>
                                    </div>
                                    {/* Trash can button */}
                                    <button className="delete-btn" onClick={() => deleteItem(index, item._id)}>
                                        <i className="fa fa-trash"></i> {/* Font Awesome trash icon */}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Total Section */}
                    <div className="total-container">
                        <div className="total-price">Total: ${totalPrice}</div>
                    </div>

                    {/* Proceed Button */}
                    <div className="proceed-btn-container">
                        <button className="proceed-btn" onClick={handleProceedToCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchasePage;
