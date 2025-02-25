import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PurchasePage from './components/PurchasePage';
import Hero from './components/Hero';
import SignInPage from './components/SignInPage';
import About from './components/About';
import UserPage from './components/UserPage'; // Import UserPage
import Checkout from './components/Checkout';


const slides = [
    { title: "Blueberry", image: "/Blueberry.png", gif: "/sale.gif", backgroundColor: "#7e6ad5ee", navColor: "#7e6ad5ee", price: "4.99" },
    { title: "Cherry", image: "/cherry.png", gif: "/sale.gif", backgroundColor: "#ff4c4c", navColor: "#ff4c4c", price: "3.49" },
    { title: "Orange", image: "/orange.png", gif: "/sale.gif", backgroundColor: "#ffb20eee", navColor: "#ffb20eee", price: "5.99" }
];

function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);


    // Check login state on load
    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        const storedEmail = localStorage.getItem("userEmail");

        if (storedAuth === "true" && storedEmail) {
            setIsAuthenticated(true);
            setUserEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        const fetchInitialCart = async () => {
            if (userEmail) {
                await fetchCart(userEmail, setCartItemCount);
            }
        };

        fetchInitialCart();
    }, [userEmail]);

    // Handle login
    const handleLogin = (email) => {
        setIsAuthenticated(true);
        setUserEmail(email);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
    };

    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
    };
    const fetchCart = async (userEmail, setCartItemCount) => {
        if (!userEmail) return;
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${userEmail}`);
            if (response.ok) {
                const cartData = await response.json();
                const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
                setCartItemCount(totalItems); // Update cart count in Navbar
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

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
                const existingItem = prevCart.find((cartItem) => cartItem.title === item.title);
                if (existingItem) {
                    return prevCart.map((cartItem) =>
                        cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
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
        <Router>
            <Navbar navColor={slides[currentSlide].navColor} isAuthenticated={isAuthenticated} handleLogout={handleLogout} cartItemCount={cartItemCount} />
            <Routes>
                <Route path="/" element={<><Home /> <About /></>} />
                <Route path="/hero" element={<Hero slides={slides} currentSlide={currentSlide} nextSlide={nextSlide} prevSlide={prevSlide} addToCart={addToCart} />} />
                <Route path="/purchase" element={<PurchasePage cart={cart} setCart={setCart} setCartItemCount={setCartItemCount}/>} />
                <Route path="/signin" element={isAuthenticated ? <Navigate to="/user" /> : <SignInPage handleLogin={handleLogin} />} />
                <Route path="/user" element={isAuthenticated ? <UserPage handleLogout={handleLogout} userEmail={userEmail} /> : <Navigate to="/signin" />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
}

export default App;
