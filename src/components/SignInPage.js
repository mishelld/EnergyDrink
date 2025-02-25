import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

function SignInPage({ handleLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState(''); // New state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (isSignUp && !name) {
            setErrorMessage('Please enter your name');
            return;
        }

        if (!email || !password) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        if (isSignUp && password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const endpoint = isSignUp ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';
            const requestBody = isSignUp ? { name, email, password } : { email, password };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {
                if (isSignUp) {
                    navigate('/signin'); // Redirect to Sign In after registration
                } else {
                    handleLogin(email);
                    navigate('/');
                }
            } else {
                setErrorMessage(data?.message || 'An error occurred');
            }
        } catch (error) {
            setErrorMessage('Server error. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {isSignUp && (
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                )}

                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {isSignUp && (
                    <div className="input-container">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                )}

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit" className="auth-btn">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </form>

            <div className="toggle-container">
                <p>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
                <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
            </div>
        </div>
    );
}

export default SignInPage;
