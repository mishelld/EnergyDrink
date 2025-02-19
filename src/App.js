import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from './components/Navbar';
import Home from './components/Home';
import PurchasePage from './components/PurchasePage'; // Import PurchasePage
import Hero from './components/Hero';  // Move Hero here to show only on Home
import SignInPage from './components/SignInPage'; // Import SignInPage
import HeroPage from './components/HeroPage'; // Import the new HeroPage


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
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.title === item.title);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }]; // ✅ Adds quantity = 1
            }
        });
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
                <Route path="/hero" element={<HeroPage />} />

                {/* Purchase route where only PurchasePage is displayed */}
                <Route path="/purchase" element={<PurchasePage cart={cart} setCart={setCart} />} />
                {/* Sign-in route */}
                <Route path="/signin" element={<SignInPage />} />
            </Routes>
        </Router>
    );
}

export default App;
