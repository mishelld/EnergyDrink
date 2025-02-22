import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './Navbar.css';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Import a user icon from react-icons


function Navbar({ navColor }) {
    const [hoveredLink, setHoveredLink] = useState(null);
    const [navbarColor, setNavbarColor] = useState(navColor);
    const [cartItemCount, setCartItemCount] = useState(3); // Example cart count (this would come from your cart logic)


    const location = useLocation(); // Get the current location (route)

    const handleMouseEnter = (link) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);

    const getLinkStyle = (link) =>
        link === hoveredLink ? { ...styles.link, ...styles.linkHover } : styles.link;

    // Change navbar color based on the current path (location)
    useEffect(() => {
        const path = location.pathname;

        // Logic to change navbar color based on path (you can adjust these colors as needed)
        if (path === '/hero') {
            setNavbarColor(navColor);  // If on /hero, use the passed navColor
        } else if (path === '/purchase') {
            setNavbarColor('#333');  // For the purchase page, change the color
        } else if (path === '/about') {
            setNavbarColor('#3faffa');  // For the about page, change to blue
        } else if (path === '/signin') {
            setNavbarColor('rgb(166, 0, 255)');  // For the sign-in page, use a red-orange color
        } else {
            setNavbarColor('rgb(166, 0, 255)');  // Default color for other pages
        }
    }, [location, navColor]); // Depend on location (route) and navColor to update when necessary

    return (
        <div style={{ ...styles.navbarWrapper, backgroundColor: navbarColor }}>

              <Link
                to="/signin"
                style={styles.signInButton}
                onMouseEnter={() => handleMouseEnter('signin')}
                onMouseLeave={handleMouseLeave}
            >
                <FaUser style={styles.userIcon} />
            </Link>

            <Link
                to="/purchase"
                style={styles.purchaseButton}
                onMouseEnter={() => handleMouseEnter('purchase')}
                onMouseLeave={handleMouseLeave}
            >
                <FaShoppingCart style={styles.cartIcon} /> {/* Changed from userIcon to cartIcon */}
                    {cartItemCount > 0 && (
                        <span style={styles.cartBadge}>{cartItemCount}</span>
                    )}
            </Link>

            <nav className="navbar" style={styles.navbar}>
                <ul style={styles.navLinks}>
                    {['home', 'hero', 'about'].map((item) => (
                        <li key={item}>
                            <Link
                                to={item === 'home' ? '/' : `/${item}`} // ✅ Fix Home path
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
        padding: '20px 0',
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
        top: '50%', // Center vertically
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
        top: '50%', // Center vertically
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
