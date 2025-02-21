import React, { useEffect, useState } from "react";
import "./About.css";

export default function About() {
  const [leftInView, setLeftInView] = useState(false);
  const [rightInView, setRightInView] = useState(false);
  const [leftOutView, setLeftOutView] = useState(false);
  const [rightOutView, setRightOutView] = useState(false);

  useEffect(() => {
    const leftImageObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLeftInView(true);
          setLeftOutView(false); // Reset "exit" animation when entering
        } else {
          setLeftInView(false);
          setLeftOutView(true); // Trigger "exit" animation when leaving
        }
      },
      { threshold: 0.5 }
    );

    const rightImageObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setRightInView(true);
          setRightOutView(false); // Reset "exit" animation when entering
        } else {
          setRightInView(false);
          setRightOutView(true); // Trigger "exit" animation when leaving
        }
      },
      { threshold: 0.5 }
    );

    const leftImage = document.querySelector(".about-left-image");
    const rightImage = document.querySelector(".about-right-image");

    if (leftImage) {
      leftImageObserver.observe(leftImage);
    }
    if (rightImage) {
      rightImageObserver.observe(rightImage);
    }

    // Cleanup observers on component unmount
    return () => {
      if (leftImage) {
        leftImageObserver.unobserve(leftImage);
      }
      if (rightImage) {
        rightImageObserver.unobserve(rightImage);
      }
    };
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">About</h1>

      {/* Floating Images */}
      <div className="about-image-container">
        <img
          src="/cherry.png"
          alt="Cherry"
          className={`about-left-image 
            ${leftInView ? "animate-up" : ""} 
            ${leftOutView ? "animate-down" : ""}
          `}
        />
        <img
          src="/orange.png"
          alt="Orange"
          className={`about-right-image 
            ${rightInView ? "animate-up" : ""} 
            ${rightOutView ? "animate-down" : ""}
          `}
        />
      </div>
    </div>
  );
}
