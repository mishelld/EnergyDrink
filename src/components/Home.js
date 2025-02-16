import React from 'react';
import './Home.css'; // Import the CSS file

function Home() {
    return (
        <div className="home-container">
            <div className="home-image-container">
                <img 
                    src="/cherry.png"  // Left image
                    alt="Cherry"
                    className="side-image left-image"
                />
                <img 
                    src="/Blueberry.png"  // Main image
                    alt="Blueberry"
                    className="home-image"
                />
                <img 
                    src="/orange.png"  // Right image
                    alt="Orange"
                    className="side-image right-image"
                />
            </div>            
        </div>
    );
}

export default Home;
