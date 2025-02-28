import React, { useState, useEffect } from "react";
import "./Menu.css";
import { CheckCircle } from "lucide-react"; // Using Lucide for the checkmark icon

function Menu({ slides, currentSlide, nextSlide, prevSlide, addToCart }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [startAnimation, setStartAnimation] = useState(true);

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
