
const Tira = () => {
  return (
    <section style={styles.tiraSection}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.container}>
        <h2 style={styles.title}>Más de 30 Rutas Disponibles</h2>
        <p style={styles.subtitle}>
          Explora ahora las rutas más importantes de Sevilla, Madrid, Barcelona y Valencia
        </p>
        <div style={styles.buttonContainer}>
          <a href="#" style={styles.primaryButton}>
            VER RUTAS
          </a>
          <a href="#" style={styles.secondaryButton}>
            QUIÉNES SOMOS
          </a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  tiraSection: {
    position: "relative",
    padding: "80px 0",
    background: "linear-gradient(to right, #3b82f6, #1f2937)", // De azul a negro
    textAlign: "center",
    color: "white",
    overflow: "hidden",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('../src/assets/panoramicaSevilla.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.3,
  },
  container: {
    position: "relative",
    zIndex: 10,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "40px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  primaryButton: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "white",
    color: "#1d4ed8",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  secondaryButton: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
};

export default Tira;
