import React, { useState } from 'react';
import Hero from './Hero';  // Import the existing Hero component

// ✅ Define slides here
const slides = [
    {
        title: "Blueberry",
        image: "/Blueberry.png",
        gif: "/bio.gif",
        backgroundColor: "#7e6ad5ee",
        navColor: "#7e6ad5ee",
        price: "4.99",
    },
    {
        title: "Cherry",
        image: "/cherry.png",
        gif: "/bio.gif",
        backgroundColor: "#ff4c4c",
        navColor: "#ff4c4c",
        price: "3.49",
    },
    {
        title: "Orange",
        image: "/orange.png",
        gif: "/bio.gif",
        backgroundColor: "#ffb20eee",
        navColor: "#ffb20eee",
        price: "5.99",
    },
];

function HeroPage({ addToCart }) {  // ✅ Accept addToCart as a prop
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <Hero
            slides={slides}
            currentSlide={currentSlide}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            addToCart={addToCart}  // ✅ Pass down addToCart
        />
    );
}


export default HeroPage;
