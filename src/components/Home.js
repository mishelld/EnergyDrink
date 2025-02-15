import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate(); // React Router hook for navigation

    return (
        <div>
            <h1>Welcome to Our Store</h1>
            <button onClick={() => navigate('/menu')}>Go to Menu</button> {/* Navigate to Hero */}
        </div>
    );
}

export default Home;
