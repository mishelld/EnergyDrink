import React, { useState } from 'react';
import './PurchasePage.css';

function PurchasePage({ cart }) {
    const [selectedOption, setSelectedOption] = useState("takeout");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

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
            <div className="right-side">
                <h1>Receipt</h1>
                <h2>Your Cart</h2>
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="total-container">
                    <div className="total-price">Total: ${totalPrice}</div>
                </div>
                <div className="proceed-btn-container">
                   <button className="proceed-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default PurchasePage;
