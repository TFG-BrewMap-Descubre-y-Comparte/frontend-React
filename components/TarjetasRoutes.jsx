import { useNavigate } from "react-router-dom";

const TarjetaRoutes = () => {
  const navigate = useNavigate();

  const estilos = {
    tarjetaRoutes: {
      padding: "20px",
      textAlign: "center",
      marginTop: "2cm",
    },
    tarjetasContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    tarjeta: {
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "3000px",
      height: "350px",
      margin: "10px 0",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      cursor: "pointer", // Indicar que la tarjeta es clickeable
      transition: "transform 0.2s",
    },
    tarjetaHover: {
      transform: "scale(1.05)", // Efecto al pasar el mouse
    },
    tarjetaImagen: {
      width: "100%",
      height: "65%",
      objectFit: "cover",
    },
    tarjetaNombre: {
      fontSize: "1.5rem",
      margin: "10px 0",
    },
    tarjetaDescripcion: {
      padding: "0 10px 10px",
      fontSize: "1rem",
      color: "#555",
    },
  };

  const rutas = [
    {
      nombre: "Catedral de Sevilla",
      descripcion: "Una impresionante catedral gótica y el lugar de descanso de Cristóbal Colón.",
      imagen: "https://www.lacatedraldesevilla.org/img/catedral-sevilla-1.jpg",
    },
    {
      nombre: "Real Alcázar de Sevilla",
      descripcion: "Un palacio real famoso por su arquitectura mudéjar.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQo04G0C6HS4Onxgg2nDCppTf6AOqz-6rQA&s",
    },
    {
      nombre: "Plaza de España",
      descripcion: "Una hermosa plaza construida para la Exposición Iberoamericana de 1929.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Plaza_de_Espa%C3%B1a_%28Sevilla%29_-_01.jpg/640px-Plaza_de_Espa%C3%B1a_%28Sevilla%29_-_01.jpg",
    },
  ];

  const handleCardClick = (rutaNombre) => {
    const cityName = rutaNombre.toLowerCase().replace(/\s+/g, "-"); // Formato de URL amigable
    navigate(`/route/${cityName}`);
  };

  return (
    <div style={estilos.tarjetaRoutes}>
      <h1>Rutas de Tarjeta</h1>
      <div style={estilos.tarjetasContainer}>
        {rutas.map((ruta, index) => (
          <div
            key={index}
            style={estilos.tarjeta}
            onClick={() => handleCardClick(ruta.nombre)}
          >
            <img src={ruta.imagen} alt={ruta.nombre} style={estilos.tarjetaImagen} />
            <h2 style={estilos.tarjetaNombre}>{ruta.nombre}</h2>
            <p style={estilos.tarjetaDescripcion}>{ruta.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarjetaRoutes;
