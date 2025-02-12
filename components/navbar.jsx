import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "white",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      padding: "8px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
      listStyle: "none",
      paddingRight: "60px",
    },
    link: {
      textDecoration: "none",
      color: "#4a4a4a",
      transition: "color 0.3s ease",
      fontWeight: "bold", // Esto hace que el texto sea negrita
    },
    hamburger: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "none",
      paddingRight: "60px",
    },
    icon: {
      width: "24px",
      height: "24px",
      color: "#4a4a4a",
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      right: isMobileMenuOpen ? "0" : "-100%",
      width: "60%",
      height: "100%",
      background: "white",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "right 0.3s ease-in-out",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    closeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      alignSelf: "flex-end",
      margin: "16px",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      listStyle: "none",
      textAlign: "center",
    },
  };

  return (
    <>
      <header style={styles.navbar}>
        <div style={styles.logo}>
          <Link
            to="/"
            style={{
              textDecoration: "none", // Elimina la decoración (subrayado)
              color: "black", // Establece el color del texto a negro
              outline: "none", // Elimina el contorno del enlace al hacer clic
              border: "none", // Elimina cualquier borde que pueda aparecer
              background: "none", // Elimina el fondo del enlace
              fontWeight: "bold", // Hace el texto en negrita
            }}
          >
            SoundWays
          </Link>
        </div>
        {/* Botón de menú hamburguesa en móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ ...styles.hamburger, display: "block" }}
          className="mobile-only"
        >
          <svg
            style={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú de navegación en pantallas grandes */}
        <ul
          style={{ ...styles.navLinks, display: "none" }}
          className="desktop-only"
        >
          <li>
            <Link to="/" style={styles.link}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/cities" style={styles.link}>
              Empezar
            </Link>
          </li>
          <li>
            <Link to="/about" style={styles.link}>
              Acerca
            </Link>
          </li>
          <li>
            <Link to="/contact" style={styles.link}>
              Contacto
            </Link>
          </li>
        </ul>
      </header>

      {/* Menú móvil */}
      <div style={styles.mobileMenu}>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          style={styles.closeBtn}
        >
          <svg
            style={styles.icon}
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
        <ul style={styles.mobileNavLinks}>
          <li>
            <Link to="/" style={styles.link}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/cities" style={styles.link}>
              Empezar
            </Link>
          </li>
          <li>
            <Link to="/about" style={styles.link}>
              Acerca
            </Link>
          </li>
          <li>
            <Link to="/contact" style={styles.link}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      {/* Estilos para mostrar/ocultar según el tamaño de pantalla */}
      <style>
        {`
          @media (min-width: 768px) {
            .mobile-only {
              display: none !important;
            }
            .desktop-only {
              display: flex !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
