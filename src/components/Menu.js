import React, { useState } from "react";
import "./Menu.css"; // Import the CSS file

// Coffee Menu Data
const coffeeItems = [
  { id: 1, name: "strawberry", price: "$3.50", image: "/strawberry.png" },
  { id: 2, name: "blueberry", price: "$4.00", image: "/blueberry.png" },
  { id: 3, name: "orange", price: "$4.50", image: "/orange.png" },
  { id: 4, name: "pineapple", price: "$3.00", image: "/pineapple.png" },
];

function Menu() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const nextItems = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerPage < coffeeItems.length ? prevIndex + 1 : prevIndex
    );
  };

  const prevItems = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <section id="menu" className="menu">
      <h2 className="menu-title">Our Menu</h2>
      <div className="menu-container">
      <button className="menu-button left" onClick={prevItems}>&lt;</button>
        <div className="menu-grid">
          {coffeeItems.slice(startIndex, startIndex + itemsPerPage).map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-image" />
              <h3 className="menu-name">{item.name}</h3>
              <p className="menu-price">{item.price}</p>
            </div>
          ))}
        </div>
        <button className="menu-button right" onClick={nextItems}>&gt;</button>
        </div>
    </section>
  );
}

export default Menu;
