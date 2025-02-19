import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Navbar.css';

function Navbar({ navColor }) {
    const [hoveredLink, setHoveredLink] = useState(null);

    const handleMouseEnter = (link) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);

    const getLinkStyle = (link) =>
        link === hoveredLink ? { ...styles.link, ...styles.linkHover } : styles.link;

    return (
        <div style={{ ...styles.navbarWrapper, backgroundColor: navColor }}>
            <nav className="navbar" style={styles.navbar}>
                <ul style={styles.navLinks}>
                    {['home', 'menu', 'purchase', 'about', 'contact', 'signin'].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item}`} // Link to the respective page
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
