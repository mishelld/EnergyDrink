import React, { useState, useEffect } from "react";
import "./Menu.css";
import { CheckCircle } from "lucide-react"; // Using Lucide for the checkmark icon

function Menu({
  slides,
  currentSlide,
  nextSlide,
  prevSlide,
  fetchCart,
  setCartItemCount,
}) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [startAnimation, setStartAnimation] = useState(true);
  const [cart, setCart] = useState([]);
  const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage

  useEffect(() => {
    // Remove start animation after 1.5 seconds
    const timer = setTimeout(() => setStartAnimation(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    setAddedToCart(true);
    addToCart(slides[currentSlide]);

    // Reset after 1.5 seconds
    setTimeout(() => setAddedToCart(false), 1500);
  };
  const addToCart = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, item }), // Assuming user is logged in
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      await fetchCart(userEmail, setCartItemCount);

      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.title === item.title
        );
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.title === item.title
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevCart, { ...item, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <section
      className="Menu"
      style={{ backgroundColor: slides[currentSlide].backgroundColor }}
    >
      <div className="gif-container">
        <img
          src={slides[currentSlide].gif}
          alt="Dessert Animation"
          className="drink-gif"
        />
      </div>
      <div className="text-container">
        <h1 className="title">{slides[currentSlide].title}</h1>
      </div>

      <div className="image-container">
        <img
          src={slides[currentSlide].image}
          alt="Dessert"
          className="drink-image"
        />
      </div>

      <div className="price-tag">${slides[currentSlide].price}</div>

      {/* Cart Button with animation */}
      <button
        className={`cart-btn ${
          startAnimation ? "start-anim" : addedToCart ? "added" : "pulsing"
        }`}
        onClick={handleAddToCart}
      >
        {addedToCart ? <CheckCircle size={24} color="white" /> : "Add to Cart"}
      </button>

      {/* Buttons Container */}
      <div className="buttons-container">
        <button onClick={prevSlide} className="nav-btn">
          &lt;
        </button>
        <button onClick={nextSlide} className="nav-btn">
          &gt;
        </button>
      </div>
    </section>
  );
}

export default Menu;
