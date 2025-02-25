import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './Navbar.css';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Import a user icon from react-icons


function Navbar({ navColor, cartItemCount }) {
    const [hoveredLink, setHoveredLink] = useState(null);
    const [navbarColor, setNavbarColor] = useState(navColor);
    const [textColor, setTextColor] = useState('');
    const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage




    const location = useLocation(); // Get the current location (route)

    const handleMouseEnter = (link) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);

    const getLinkStyle = (link) => {
        const isUserPage = location.pathname === '/user'; // Check if on User page
        const isPurchasePage = location.pathname === '/purchase'; // Check if on Purchase page
        const isSignInPage = location.pathname === '/signin'; // Check if on Purchase page


    
        return {
            ...styles.link,
            ...(link === hoveredLink
                ? {
                    backgroundColor: isUserPage || isPurchasePage || isSignInPage  ? 'black' : 'white', // Black for User, White for others
                    color: isUserPage ? 'white' : (textColor === '#fff' ? 'black' : 'white'), // Adjust text color dynamically
                }
                : { color: textColor } // Default text color per page
            ),
        };
    };

    // Change navbar color based on the current path (location)
    useEffect(() => {
        const path = location.pathname;
    
        if (path === '/hero') {
            setNavbarColor(navColor);
            setTextColor('#fff');  // White text
        } else if (path === '/purchase') {
            setNavbarColor('rgb(255, 255, 255)'); // White background
            setTextColor('rgb(0, 0, 0)'); // Black text
        } else if (path === '/about') {
            setNavbarColor('#3faffa');
            setTextColor('#fff');
        } else if (path === '/signin') {
            setNavbarColor('rgb(255, 255, 255)'); // White background
            setTextColor('rgb(0, 0, 0)'); // Black text
        } else if (path === '/user') {
            setNavbarColor('rgb(255, 255, 255)'); // White background
            setTextColor('rgb(0, 0, 0)'); // Black text
        } else {
            setNavbarColor('rgb(166, 0, 255)');
            setTextColor('#fff');
        }
    }, [location, navColor]);
    

    return (
        <div style={{ ...styles.navbarWrapper, backgroundColor: navbarColor, color: textColor }}>

              <Link
                to="/signin"
                className="sign-in-button"
                style={styles.signInButton}
                onMouseEnter={() => handleMouseEnter('signin')}
                onMouseLeave={handleMouseLeave}
            >
           <FaUser style={{ ...styles.userIcon, color: textColor }} />
</Link>

            <Link
                to="/purchase"
                className="purchase-Button"
                style={styles.purchaseButton}
                onMouseEnter={() => handleMouseEnter('purchase')}
                onMouseLeave={handleMouseLeave}
            >
<FaShoppingCart style={{ ...styles.cartIcon, color: textColor }} />
                    {cartItemCount > 0 && (
                        <span style={styles.cartBadge}>{cartItemCount}</span>
                    )}
            </Link>

            <nav className="navbar" style={styles.navbar}>
                <ul style={styles.navLinks}>
                    {['home', 'hero'].map((item) => (
                        <li key={item}>
                            <Link
    to={item === 'home' ? '/' : `/${item}`}
    style={getLinkStyle(item)}
    onMouseEnter={() => handleMouseEnter(item)}
    onMouseLeave={handleMouseLeave}
>
    {item.charAt(0).toUpperCase() + item.slice(1)}
</Link>

                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

const styles = {
    navbarWrapper: {
        position: 'relative', // Ensure the wrapper is positioned relatively
        padding: '5px 0',
    },
    navbar: {
        position: 'relative',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        color: '#fff',
        borderRadius: '25px',
        width: '40%',
        margin: 'auto',
        fontSize: '20px', // Increase icon size
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        margin: 0,
        padding: 0
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        cursor: 'pointer',
        padding: '3px 30px',
        borderRadius: '30px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    linkHover: {
        backgroundColor: 'white',
        color: 'black',
    },
    signInButton: {
        position: 'absolute', // Position the button absolutely
        left: '200px', // Adjust the left position as needed
        top: '30%', // Center vertically
        transform: 'translateY(-50%)', // Center vertically
        textDecoration: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '3px 20px',
        borderRadius: '30px',
        transition: 'background-color 0.3s, color 0.3s',
        zIndex: 1001, // Ensure the button is above the navbar
    },
    userIcon: {
        marginRight: '8px',  // Space between icon and text
        fontSize: '30px', // Increase icon size

    },
    purchaseButton: {
        position: 'absolute', // Position the button absolutely
        right: '200px', // Adjust the left position as needed
        top: '30%', // Center vertically
        transform: 'translateY(-50%)', // Center vertically
        textDecoration: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '3px 20px',
        borderRadius: '30px',
        transition: 'background-color 0.3s, color 0.3s',
        zIndex: 1001, // Ensure the button is above the navbar
    },
    cartIcon: {  // Changed from userIcon to cartIcon
        marginRight: '12px',
        fontSize: '30px', // Increase icon size
    },
    cartBadge: {
        backgroundColor: '#ff0000',
        color: '#fff',
        borderRadius: '50%',
        padding: '5px 10px',
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        fontSize: '14px',
        fontWeight: 'bold',
    },
};

export default Navbar;
