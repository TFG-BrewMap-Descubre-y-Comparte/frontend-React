import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';  // Importar Font Awesome

const Ventajas = () => {
  // Estado para manejar el tamaño de la ventana
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  // Hook para detectar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768); // Detecta si es pantalla mediana o mayor
    };

    handleResize(); // Llamar al inicio para establecer el estado
    window.addEventListener("resize", handleResize); // Escuchar el cambio de tamaño de la ventana

    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el listener al desmontar
    };
  }, []);

  const ventajas = [
    {
      icon: "fas fa-user",
      title: "Fácil de Usar",
      description:
        "Diseñada con una interfaz sencilla y amigable, nuestra aplicación te permite disfrutar de tus viajes sin complicaciones, facilitando la navegación y mejorando tu experiencia en cada aventura.",
    },
    {
      icon: "fas fa-headset",
      title: "Soporte 24h",
      description:
        "Contamos con un servicio de atención al cliente 24h en el que solucionaremos todos los problemas.",
      link: "/contact",
      linkText: "Ver Más",
    },
    {
      icon: "fas fa-map-marked-alt",
      title: "Navegación Inteligente",
      description:
        "Obtén indicaciones de ruta optimizadas, con actualizaciones en tiempo real sobre tráfico, clima y otros factores relevantes.",
    },
    {
      icon: "fas fa-volume-up",
      title: "Audioguías",
      description: "Ofrecemos audioguías para tener una mejor experiencia en tu viaje.",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Ventajas</h2>
        <div style={styles.grid}>
          {/* Columna de la izquierda con la imagen (visible solo en pantallas medianas y grandes) */}
          <div style={isMediumScreen ? styles.imageColumnVisible : styles.imageColumnHidden}>
            <img 
              src="../src/assets/imagenMapaVertical.avif" 
              alt="Tablet Image" 
              style={styles.image} 
            />
          </div>
          
          {/* Columna de la derecha con las tarjetas de ventajas */}
          <div style={styles.cardContainer}>
            {ventajas.map((ventaja, index) => (
              <div key={index} style={styles.card}>
                <i className={ventaja.icon} style={styles.icon}></i>
                <h4 style={styles.cardTitle}>{ventaja.title}</h4>
                <p style={styles.text}>{ventaja.description}</p>
                {ventaja.link && (
                  <a href={ventaja.link} style={styles.button}>
                    {ventaja.linkText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Estilos en JavaScript
const styles = {
  section: {
    padding: "4rem 0",
    backgroundColor: "#fff",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Esto es para pantallas pequeñas y medianas
    gap: "2rem",
    justifyContent: "center",
    alignItems: "center",
  },
  imageColumnVisible: {
    display: "flex", // Visible en pantallas medianas y grandes
    justifyContent: "center",
    textAlign: "center",
  },
  imageColumnHidden: {
    display: "none", // Oculta en pantallas pequeñas
  },
  image: {
    width: "75%",
    marginLeft: "-180px", // Desplazar la imagen 151px (aproximadamente 4 cm)
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    transition: "transform 0.3s",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Establece dos columnas fijas
    gap: "2rem",
    justifyContent: "center",
  },
  card: {
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  text: {
    color: "#4A5568",
  },
  icon: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
    display: "inline-block",
    backgroundColor: "#333",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background 0.3s",
  },
};

export default Ventajas;
