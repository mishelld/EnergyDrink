import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from './components/Navbar';
import Home from './components/Home';
import PurchasePage from './components/PurchasePage'; // Import PurchasePage
import Hero from './components/Hero';  // Move Hero here to show only on Home

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
        setCart((prevCart) => [...prevCart, item]); // Add the selected item to cart
        console.log("Added to cart:", item);
    };

    return (
        <Router>
            <Navbar navColor={slides[currentSlide].navColor} />
            <Routes>
                {/* Home route where the Hero section is displayed */}
                <Route
                    path="/"
                    element={
                        <>
                            <Home />
                            <Hero
                                slides={slides}
                                currentSlide={currentSlide}
                                nextSlide={nextSlide}
                                prevSlide={prevSlide}
                                addToCart={addToCart} // Pass addToCart function here
                            />
                        </>
                    }
                />
                {/* Purchase route where only PurchasePage is displayed */}
                <Route
                    path="/purchase"
                    element={<PurchasePage cart={cart} />} // Pass cart state here
                />
            </Routes>
        </Router>
    );
}

export default App;
