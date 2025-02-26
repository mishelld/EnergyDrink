import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowThankYou(true); // Show the thank-you screen

        const timer = setTimeout(() => {
            navigate('/'); // Redirect to home after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background:'linear-gradient(to left, rgb(180, 255, 145),rgb(255, 235, 145), rgb(255, 182, 193))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '40px',
            fontWeight: 'bold'
        }}>
We received your order. Thank you for your purchase!        </div>
    );
};

export default Checkout;
