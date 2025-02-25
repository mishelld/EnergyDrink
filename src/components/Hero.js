import React, { useState } from "react";
import "./Hero.css";
import { CheckCircle } from "lucide-react"; // Using Lucide for the checkmark icon

function Hero({ slides, currentSlide, nextSlide, prevSlide, addToCart }) {
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        setAddedToCart(true);
        addToCart(slides[currentSlide]);

        // Reset after 1.5 seconds
        setTimeout(() => setAddedToCart(false), 1500);
    };

    return (
        <section
            className="hero"
            style={{ backgroundColor: slides[currentSlide].backgroundColor }}
        >
            <div className="gif-container">
                <img
                    src={slides[currentSlide].gif}
                    alt="Dessert Animation"
                    className="coffee-gif"
                />
            </div>
            <div className="text-container">
                <h1 className="title">{slides[currentSlide].title}</h1>
            </div>

            <div className="image-container">
                <img
                    src={slides[currentSlide].image}
                    alt="Dessert"
                    className="coffee-image"
                />
            </div>

            <div className="price-tag">${slides[currentSlide].price}</div>

            {/* Cart Button with animation */}
            <button className={`cart-btn ${addedToCart ? "added" : "pulsing"}`} onClick={handleAddToCart}>
                {addedToCart ? <CheckCircle size={24} color="white" /> : "Add to Cart"}
            </button>

            {/* Buttons Container */}
            <div className="buttons-container">
                <button onClick={prevSlide} className="nav-btn">&lt;</button>  
                <button onClick={nextSlide} className="nav-btn">&gt;</button>  
            </div>
        </section>
    );
}

export default Hero;
