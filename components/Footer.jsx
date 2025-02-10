const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.sectionsWrapper}>
        <div style={styles.section}>
          <h3 style={styles.title}>Contáctanos</h3>
          <p style={styles.text}>Email: contacto@rutasapp.com</p>
          <p style={styles.text}>Teléfono: +34 123 456 789</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.title}>Síguenos</h3>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.link}>Facebook</a>
            <a href="#" style={styles.link}>Twitter</a>
            <a href="#" style={styles.link}>Instagram</a>
          </div>
        </div>
        <div style={styles.section}>
          <p style={styles.text}>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
          <nav style={styles.nav}>
            <a href="/index.html" style={styles.link}>Inicio</a>
            <a href="/about.html" style={styles.link}>Acerca de</a>
            <a href="/contact.html" style={styles.link}>Contacto</a>
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
  },
};

export default Footer;
