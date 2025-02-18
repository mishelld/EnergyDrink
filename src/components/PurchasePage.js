import React, { useState } from 'react';
import './PurchasePage.css';
import 'font-awesome/css/font-awesome.min.css';

function PurchasePage({ cart, setCart }) {
    const [selectedOption, setSelectedOption] = useState("takeout");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Function to increase item quantity
    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
    };

    // Function to decrease item quantity or remove item
    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1); // Remove item if quantity is 1
        }
        setCart(updatedCart);
    };

    // Function to completely delete an item
    const deleteItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1), 0).toFixed(2);

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
                                        <button onClick={() => decreaseQuantity(index)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(index)}>+</button>
                                    </div>
                                </div>
                                {/* Trash can button */}
                                <button className="delete-btn" onClick={() => deleteItem(index)}>
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
                    <button className="proceed-btn">Proceed to Checkout</button>
                </div>
            </div>
            </div>

        </div>
    );
}

export default PurchasePage;
