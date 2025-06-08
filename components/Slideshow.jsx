import { useState, useEffect } from "react";
import TextPressure from "./TextPressure";

const handleAnimationComplete = () => {};

const SlideShow = () => {
  const images = [
    "../src/assets/catedralSevilla.jpg",
    "../src/assets/coliseoRomano.jpeg",
    "../src/assets/sagradaFamilia.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const slideShowContainerStyle = {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    margin: 0,
    padding: 0,
  };

  const slideImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  };

  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    fontSize: "2rem",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    zIndex: 10,
  };

  const prevButtonStyle = { ...buttonStyle, left: "10px" };
  const nextButtonStyle = { ...buttonStyle, right: "10px" };

  const titleStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "5rem",
    fontWeight: "bold",
    textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)",
    letterSpacing: "5px",
    zIndex: 5,
    textTransform: "uppercase",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={slideShowContainerStyle}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div style={overlayStyle}></div>

        {/* Texto animado con TextPressure */}
        <div style={titleStyle}>
          <TextPressure
            text="NomadTastes"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
            onAnimationComplete={handleAnimationComplete}
          />
        </div>

        <button style={prevButtonStyle} onClick={goToPreviousSlide}>
          &#10094;
        </button>

        <img
          src={images[currentIndex]}
          alt={`slide ${currentIndex}`}
          style={slideImageStyle}
        />

        <button style={nextButtonStyle} onClick={goToNextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
