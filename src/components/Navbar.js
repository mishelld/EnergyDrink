import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa"; // Import a user icon from react-icons

function Navbar({ navColor, cartItemCount }) {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [navbarColor, setNavbarColor] = useState(navColor);
  const [textColor, setTextColor] = useState("");
  const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage

  const location = useLocation(); // Get the current location (route)

  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  const getLinkStyle = (link) => {
    const isUserPage = location.pathname === "/user"; // Check if on User page
    const isPurchasePage = location.pathname === "/purchase"; // Check if on Purchase page
    const isSignInPage = location.pathname === "/signin"; // Check if on Purchase page

    return {
      ...styles.link,
      ...(link === hoveredLink
        ? {
            backgroundColor:
              isUserPage || isPurchasePage || isSignInPage ? "black" : "white", // Black for User, White for others
            color: isUserPage
              ? "white"
              : textColor === "#fff"
              ? "black"
              : "white", // Adjust text color dynamically
          }
        : { color: textColor }), // Default text color per page
    };
  };

  // Change navbar color based on the current path (location)
  useEffect(() => {
    const path = location.pathname;

    if (path === "/Menu") {
      setNavbarColor(navColor);
      setTextColor("#fff"); // White text
    } else if (path === "/purchase") {
      setNavbarColor("rgb(255, 255, 255)"); // White background
      setTextColor("rgb(0, 0, 0)"); // Black text
    } else if (path === "/about") {
      setNavbarColor("#3faffa");
      setTextColor("#fff");
    } else if (path === "/signin") {
      setNavbarColor("rgb(255, 255, 255)"); // White background
      setTextColor("rgb(0, 0, 0)"); // Black text
    } else if (path === "/user") {
      setNavbarColor("rgb(255, 255, 255)"); // White background
      setTextColor("rgb(0, 0, 0)"); // Black text
    } else {
      setNavbarColor("rgb(166, 0, 255)");
      setTextColor("#fff");
    }
  }, [location, navColor]);

  return (
    <div
      className="navbar-wrapper"
      style={{ backgroundColor: navbarColor, color: textColor }}
    >
      <Link
        to="/signin"
        className="Buttons sign-in-button"
        onMouseEnter={() => handleMouseEnter("signin")}
        onMouseLeave={handleMouseLeave}
      >
        <FaUser style={{ ...styles.userIcon, color: textColor }} />
      </Link>

      <Link
        to="/purchase"
        className="Buttons purchase-Button"
        onMouseEnter={() => handleMouseEnter("purchase")}
        onMouseLeave={handleMouseLeave}
      >
        <FaShoppingCart style={{ ...styles.cartIcon, color: textColor }} />
        {cartItemCount > 0 && (
          <span style={styles.cartBadge}>{cartItemCount}</span>
        )}
      </Link>

      <nav className="navbar">
        <ul className="nav-links">
          {["home", "Menu"].map((item) => (
            <li key={item}>
              <Link
                to={item === "home" ? "/" : `/${item}`}
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
  link: {
    textDecoration: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "3px 30px",
    borderRadius: "30px",
    transition: "background-color 0.3s, color 0.3s",
  },
  userIcon: {
    marginRight: "8px", // Space between icon and text
    fontSize: "30px", // Increase icon size
  },
  cartIcon: {
    // Changed from userIcon to cartIcon
    marginRight: "12px",
    fontSize: "30px", // Increase icon size
  },
  cartBadge: {
    backgroundColor: "#ff0000",
    color: "#fff",
    borderRadius: "50%",
    padding: "5px 10px",
    position: "absolute",
    top: "-5px",
    right: "-5px",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Navbar;
