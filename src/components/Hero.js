import React from 'react';
import './Hero.css';

function Hero({ slides, currentSlide, nextSlide, prevSlide }) {
    return (
        <section
            className="hero"
            style={{ backgroundColor: slides[currentSlide].backgroundColor }}
        >
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

            {/* Buttons Container */}
            <div className="buttons-container">
            <button onClick={prevSlide} className="nav-btn">&lt;</button>  {/* Left Arrow */}
            <button onClick={nextSlide} className="nav-btn">&gt;</button>  {/* Right Arrow */}
            </div>
        </section>
    );
}

export default Hero;