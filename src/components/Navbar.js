import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './Navbar.css';

function Navbar({ navColor }) {
    const [hoveredLink, setHoveredLink] = useState(null);
    const [navbarColor, setNavbarColor] = useState(navColor);

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
            <nav className="navbar" style={styles.navbar}>
                <ul style={styles.navLinks}>
                    {['home', 'hero', 'purchase', 'about', 'signin'].map((item) => (
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
        padding: '20px 0',
    },
    navbar: {
        position: 'relative',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: "rgb(0, 0, 0)",
        color: '#fff',
        borderRadius: '25px',
        width: '40%',
        margin: 'auto',
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
    }
};

export default Navbar;
