import React, { useEffect, useState } from "react";
import "./About.css";

export default function About() {
  const [leftInView, setLeftInView] = useState(false);
  const [rightInView, setRightInView] = useState(false);
  const [leftOutView, setLeftOutView] = useState(false);
  const [rightOutView, setRightOutView] = useState(false);
  const [middleInView, setMiddleInView] = useState(false);
  const [middleOutView, setMiddleOutView] = useState(false);



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
      { threshold: 0.000000000001 }
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
      { threshold: 0.00000000001 }
    );

    const middleImageObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setMiddleInView(true);
          setMiddleOutView(false); // Reset "exit" animation when entering
        } else {
          setMiddleInView(false);
          setMiddleOutView(true); // Trigger "exit" animation when leaving
        }
      },
      { threshold: 0.000000000001 }
    );

    const leftImage = document.querySelector(".about-left-image");
    const rightImage = document.querySelector(".about-right-image");
    const middleImage = document.querySelector(".about-middle-image");


    if (leftImage) {
      leftImageObserver.observe(leftImage);
    }
    if (rightImage) {
      rightImageObserver.observe(rightImage);
    }
    if (middleImage) {
      middleImageObserver.observe(middleImage);
    }

    // Cleanup observers on component unmount
    return () => {
      if (leftImage) {
        leftImageObserver.unobserve(leftImage);
      }
      if (rightImage) {
        rightImageObserver.unobserve(rightImage);
      }
      if (middleImage) {
        middleImageObserver.unobserve(middleImage);
      }
    };
  }, []);

  return (
    <div className="about-container">
  <img src="/orangeg.gif" alt="Boosting GIF" className="left-side-gif gif-1" />
  <img src="/berriesg.gif" alt="Focus GIF" className="left-side-gif gif-2" />
  <img src="/cherryg.gif" alt="Focus GIF" className="left-side-gif gif-3" />




 <p className="about-title"> 
   We care<br />
  about your health<br />
  </p>
  <p className="second-line"> 
  we prioritize your health with an energy drink made from all-natural ingredients and real fruits. No artificial supplements or additives—just pure, wholesome energy to fuel your day.

  </p>
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
          src="/Blueberry.png"
          alt="Blueberry"
          className={`about-middle-image 
            ${middleInView ? "animate-up" : ""} 
            ${middleOutView ? "animate-down" : ""}
          `}
        />
        <p className={`about-text-left ${leftInView ? "animate-up" : ""} ${leftOutView ? "animate-down" : ""}`}>
          This is a cherry. It is delicious.
        </p>
        <p className={`about-text-right ${rightInView ? "animate-up" : ""} ${rightOutView ? "animate-down" : ""}`}>
          Rich in Vitamin C
        </p>
        <p className={`about-text-middle ${middleInView ? "animate-up" : ""} ${middleOutView ? "animate-down" : ""}`}>
          Rich in Vitamin C
        </p>
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
