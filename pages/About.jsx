import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="about-container">
      {/* Menu móvil */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="close-button"
            >
              <svg
                className="close-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="mobile-menu-list">
              <li>
                <Link to="/" className="mobile-menu-item">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="mobile-menu-item">
                  Start
                </Link>
              </li>
              <li>
                <Link to="/about" className="mobile-menu-item">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="mobile-menu-item">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Sección de contenido */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="content-title">About us</h2>

          {/* Tarjetas */}
          <div className="cards-container">
            <div className="card">
              <div className="card-image">
                <img
                  src="../src/assets/panoramicaSevilla.jpeg"
                  alt="Equipo de trabajo"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">Who we are</h3>
                <p className="card-text">
                  We are a passionate team committed to delivering innovative
                  solutions.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src="../src/assets/movilGPS.jpeg" alt="Misión" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Our Mission Statement</h3>
                <p className="card-text">
                  Transforming ideas into reality through high quality services.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src="../src/assets/imagenTuristas.jpeg" alt="Valores" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Our Values</h3>
                <p className="card-text">
                  We are guided by integrity, respect and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style>{`
        .about-container {
          font-family: sans-serif;
          background-color: #f7fafc;
          width: 100vw;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .content-section {
          background-color: #f7fafc;
          padding: 3rem 1rem;
          width: 100vw;
          flex: 1;
        }

        .content-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .content-title {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .cards-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          width: 100%;
        }

        .card {
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          width: 100%;
          max-width: 500px;
        }

        .card-image {
          width: 100%;
          height: 250px;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default About;
