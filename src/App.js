import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

const slides = [
    {
        title: "Blueberry",
        image: "/Blueberry.png",
        backgroundColor: "#7e6ad5ee",
        navColor: "#7e6ad5ee", // Navbar color for this slide
    },
    {
        title: "Cherry",
        image: "/cherry.png",
        backgroundColor: "#ff4c4c",
        navColor: "#ff4c4c", // Navbar color for this slide
    },
    {
        title: "Orange",
        image: "/orange.png",
        backgroundColor: "#f5deb3",
        navColor: "#f5deb3", // Navbar color for this slide
    },
];

function App() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div>
            <Navbar navColor={slides[currentSlide].navColor} />
            <Hero
                slides={slides}
                currentSlide={currentSlide}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
            />
        </div>
    );
}

export default App;