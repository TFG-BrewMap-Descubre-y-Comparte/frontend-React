import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa"; // Importar los iconos

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.sectionsWrapper}>
        <div style={styles.section}>
          <h3 style={styles.title}>Contact us at</h3>
          <p style={styles.text}>
            <FaEnvelope style={styles.icon} /> Email: contacto@rutasapp.com
          </p>
          <p style={styles.text}>
            <FaPhone style={styles.icon} /> Telephone: +34 123 456 789
          </p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.title}>Follow us at</h3>
          <div style={styles.socialLinks}>
            <a
              href="https://www.facebook.com/"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} /> {/* Icono de Facebook */}
            </a>
            <a
              href="https://github.com/Tourist-Routes-Project"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} /> {/* Icono de GitHub */}
            </a>
            <a
              href="https://x.com/?lang=es"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} /> {/* Icono de Twitter */}
            </a>
            <a
              href="https://www.instagram.com/"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} /> {/* Icono de Instagram */}
            </a>
          </div>
        </div>
        <div style={styles.section}>
          <p style={styles.text}>
            &copy; 2025 Your Company. All rights reserved.
          </p>
          <nav style={styles.nav}>
            {/* Aquí puedes agregar enlaces de navegación si lo deseas */}
          </nav>
        </div>
      </div>
    </footer>
  );
};

// Estilos mejorados
const styles = {
  footer: {
    backgroundColor: "#2d3748",
    color: "white",
    padding: "3rem 2rem",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  sectionsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    flex: "1 1 30%",
    marginBottom: "1.5rem",
    padding: "0 1rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.75rem",
    color: "#f7fafc",
  },
  text: {
    fontSize: "1rem",
    color: "#e2e8f0",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.5rem", // Espacio entre el icono y el texto
  },
  link: {
    color: "#63b3ed",
    margin: "0 0.5rem",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "#3182ce",
  },
  nav: {
    marginTop: "1rem",
    textAlign: "center",
  },
  socialLinks: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },
};

export default Footer;
