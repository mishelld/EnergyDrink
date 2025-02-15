import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

const slides = [
    {
        title: "Blueberry",
        image: "/Blueberry.png",
        gif: "/bio.gif",
        backgroundColor: "#7e6ad5ee",
        navColor: "#7e6ad5ee", // Navbar color for this slide
        price: "4.99",  // Added price

    },
    {
        title: "Cherry",
        image: "/cherry.png",
        gif: "/bio.gif",
        backgroundColor: "#ff4c4c",
        navColor: "#ff4c4c", // Navbar color for this slide
        price: "3.49",

    },
    {
        title: "Orange",
        image: "/orange.png",
        gif: "/bio.gif",
        backgroundColor: "#ffb20eee",
        navColor: "#ffb20eee", // Navbar color for this slide
        price: "5.99",

    },
];

function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cart, setCart] = useState([]); // Cart state


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]); // Add item to cart
        console.log("Added to cart:", item);
    };


    return (
        <div>
            <Navbar navColor={slides[currentSlide].navColor} />
            <Hero
                slides={slides}
                currentSlide={currentSlide}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                addToCart={addToCart} // Pass addToCart function

            />
        </div>
    );
}

export default App;