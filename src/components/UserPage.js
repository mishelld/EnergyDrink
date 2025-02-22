import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage({ handleLogout, userEmail }) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        // Call the logout handler passed from parent component (clear user state, etc.)
        handleLogout();
        // Redirect user to the sign-in page
        navigate('/signin');
    };

    return (
        <div className="user-page">
            <h2>Welcome to Your Profile</h2>
            <div className="profile-info">
                <p>Email: {userEmail}</p>
            </div>
            <button onClick={handleLogOut} className="logout-btn">Log Out</button>
        </div>
    );
}

export default UserPage;
