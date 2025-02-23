import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

function UserPage({ handleLogout, userEmail, orders = 0, points = 0, Rewards = 0 }) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        handleLogout(); // Clears user state
        navigate('/signin'); // Redirect to sign-in page
    };

    return (
        <div className="user-page">
            <div className="profile-card">
                <h2>Welcome Back!</h2>
                <p className="profile-info">Email: {userEmail}</p>

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
