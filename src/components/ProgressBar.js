import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; // Import the CSS file for styling

const ProgressBar = ({ label, value, color, className }) => {
    const [progress, setProgress] = useState(0); // Initial progress is 0

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < value) {
                    return prevProgress + 1; // Increase the progress by 1 until it reaches the target value
                } else {
                    clearInterval(interval); // Stop the interval once the target value is reached
                    return value;
                }
            });
        }, 10); // Adjust the interval speed (10ms) for a smoother animation

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [value]); // Re-run effect if `value` changes

    return (
        <div className={`progress-bar-container ${className}`}>
            <span className={`progress-label ${className}`}>{label}</span>
            <div className={`progress-bar ${className}`}>
                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`, // Fill the progress bar according to the current progress
                        backgroundColor: color,
                    }}
                ></div>
            </div>
        </div>
    );
};



const ProgressBarContainer = () => {
    const caffeineProgress = 30;
    const vitaminsProgress = 80;
    const sugarProgress = 40;

    return (
        <div className="progress-bar-parent">
            <ProgressBar 
                label="Caffeine"
                value={caffeineProgress}
                color="rgb(73, 222, 255)"
                className="caffeine"  // Apply caffeine class for specific border color and text color
            />
            <ProgressBar 
                label="Vitamins"
                value={vitaminsProgress}
                color="#33ff00"
                className="vitamins"  // Apply vitamins class for specific border color and text color
            />
            <ProgressBar 
                label="Sugar"
                value={sugarProgress}
                color="rgb(255, 0, 68)"
                className="sugar"  // Apply sugar class for specific border color and text color
            />
        </div>
    );
};

export default ProgressBarContainer;
