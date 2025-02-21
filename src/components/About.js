import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About</h1>

      {/* Floating Images */}
      <div className="about-image-container">
                <img
                    src="/cherry.png"
                    alt="Cherry"
                    className=" about-left-image"
                />
                <img
                    src="/orange.png"
                    alt="Orange"
                    className=" about-right-image "
                />
    </div>
    </div>
  );
}
