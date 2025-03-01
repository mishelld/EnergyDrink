import React, { useEffect, useRef } from "react";
import ProgressBarContainer from "./ProgressBar"; // Import the ProgressBarContainer
import "./Home.css"; // Import the CSS file

function Home() {
  const imageRefs = useRef([]); // Ref to track all images
  // Example values for caffeine, vitamins, and sugar

  useEffect(() => {
    const handleScroll = () => {
      const homeContainer = document.querySelector(".home-container");
      const homeBottom = homeContainer.getBoundingClientRect().bottom;
      const homeTop = homeContainer.getBoundingClientRect().top;

      // Trigger the "jump down" animation when `Home` scrolls out of view (downwards)
      if (homeBottom < window.innerHeight) {
        imageRefs.current.forEach((img) => {
          if (img) {
            img.classList.remove("jump-in", "floatUpDown"); // Remove both jump-in and floating
            img.classList.add("jump-down"); // Add "jump-down" animation
          }
        });
      }

      // Trigger the "jump in" animation when `Home` scrolls back into view (upwards)
      if (homeTop > 0 && homeBottom > window.innerHeight) {
        imageRefs.current.forEach((img) => {
          if (img) {
            img.classList.remove("jump-down"); // Remove "jump-down" class if present
            img.classList.add("jump-in", "floatUpDown"); // Add "jump-in" and floating animation
          }
        });
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="home-title">Boost </div>
      <div className="home-subtitle">Up! </div>

      <div className="home-gif-container">
        <img src="/Nosugar.gif" alt="Animated GIF" className="home-gif" />
        <img src="/electricity.gif" alt="Animated GIF 2" className="home-gif" />
        <img src="/organic.gif" alt="Animated GIF 3" className="home-gif" />
      </div>

      <div className="home-image-container">
        <img
          ref={(el) => (imageRefs.current[0] = el)}
          src="/cherry.png"
          alt="Cherry"
          className="side-image left-image floatUpDown"
        />
        <img
          ref={(el) => (imageRefs.current[1] = el)}
          src="/Blueberry.png"
          alt="Blueberry"
          className="home-image floatUpDown"
        />
        <img
          ref={(el) => (imageRefs.current[2] = el)}
          src="/orange.png"
          alt="Orange"
          className="side-image right-image floatUpDown"
        />
      </div>
      <ProgressBarContainer />
    </div>
  );
}

export default Home;
