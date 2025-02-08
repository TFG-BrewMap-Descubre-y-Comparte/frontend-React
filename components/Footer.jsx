
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.section}>
        <h3 style={styles.title}>Contáctanos</h3>
        <p>Email: contacto@rutasapp.com</p>
        <p>Teléfono: +34 123 456 789</p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.title}>Síguenos</h3>
        <a href="#" style={styles.link}>Facebook</a>
        <a href="#" style={styles.link}>Twitter</a>
        <a href="#" style={styles.link}>Instagram</a>
      </div>
      <div>
        <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
        <nav style={styles.nav}>
          <a href="/index.html" style={styles.link}>Inicio</a>
          <a href="/about.html" style={styles.link}>Acerca de</a>
          <a href="/contact.html" style={styles.link}>Contacto</a>
        </nav>
      </div>
    </footer>
  );
};

// Estilos en JavaScript
const styles = {
  footer: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "2.5rem",
    textAlign: "center",
  },
  section: {
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  link: {
    color: "white",
    margin: "0 0.5rem",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  nav: {
    marginTop: "0.5rem",
  },
};

// Exportar componente
export default Footer;
