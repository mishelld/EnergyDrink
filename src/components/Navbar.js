import React, { useState } from 'react';

function Navbar({ navColor }) {
    const [hoveredLink, setHoveredLink] = useState(null);

    const handleMouseEnter = (link) => {
        setHoveredLink(link);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    const getLinkStyle = (link) => {
        return link === hoveredLink 
            ? { ...styles.link, ...styles.linkHover } 
            : styles.link;
    };

    return (
        <div style={{ ...styles.navbarWrapper, backgroundColor: navColor }}>
            <nav style={styles.navbar}>
                <ul style={styles.navLinks}>
                    <li>
                        <a 
                            href="#home" 
                            style={getLinkStyle('home')}
                            onMouseEnter={() => handleMouseEnter('home')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#menu" 
                            style={getLinkStyle('menu')}
                            onMouseEnter={() => handleMouseEnter('menu')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Menu
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#about" 
                            style={getLinkStyle('about')}
                            onMouseEnter={() => handleMouseEnter('about')}
                            onMouseLeave={handleMouseLeave}
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#contact" 
                            style={getLinkStyle('contact')}
                            onMouseEnter={() => handleMouseEnter('contact')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Contact
                        </a>
                    </li>
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
        color: '#fff',
        borderRadius: '25px',
        width: '40%', // Adjust width as per your design
        margin: 'auto',
    },
    navLinks: { 
        listStyle: 'none', 
        display: 'flex', 
        justifyContent: 'space-evenly', // Evenly space the links
        width: '100%',  // Make the list take full width of the navbar
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