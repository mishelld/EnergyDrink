import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

function UserPage({ handleLogout, userEmail, Rewards = 0 }) {
    const navigate = useNavigate();
    const [name, setName] = useState(''); // State to store user's name
    const [orders, setOrders] = useState(0); // State to store order count
    const [points, setPoints] = useState(0); // State for points

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userEmail) return;

            try {
                const response = await fetch(`http://localhost:5000/api/user/${userEmail}`);
                const data = await response.json();
                if (response.ok) {
                    setName(data.name); // Store the user's name
                    setOrders(data.orderCount); // Update the state with fetched order count
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userEmail]); // Runs when userEmail changes

    // Update points whenever orders change
    useEffect(() => {
        setPoints(orders * 10);
    }, [orders]);

    const handleLogOut = () => {
        handleLogout(); // Clears user state
        navigate('/signin'); // Redirect to sign-in page
    };

    return (
        <div className="user-page">
            <div className="profile-card">
                <h2>Welcome Back, {name || 'User'}!</h2> {/* Display user's name */}
                
                {/* User Stats Section */}
                <div className="user-stats">
                    <div className="stat orders">
                        <div className="stat-value">{orders}</div>
                        <div className="stat-label">Orders</div>
                    </div>
                    <div className="stat points">
                        <div className="stat-value">{points}</div>
                        <div className="stat-label">Points</div>
                    </div>
                    <div className="stat Rewards">
                        <div className="stat-value">{Rewards}</div>
                        <div className="stat-label">Rewards</div>
                    </div>
                </div>

                <button onClick={handleLogOut} className="logout-btn">Log Out</button>
            </div>
        </div>
    );
}

export default UserPage;
