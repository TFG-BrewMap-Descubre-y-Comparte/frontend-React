import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TarjetaRoutes = () => {
  const navigate = useNavigate();
  const { city, category } = useParams();
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRutas();
  }, [city]);

  const fetchRutas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8082/api/v1/routes/city/${city}/category/${category}`
      );
      if (!response.ok) throw new Error("Error en la API");
      const data = await response.json();
      setRutas(data);
    } catch (error) {
      console.error("Error al obtener rutas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (idRoute) => {
    navigate(`/route/${idRoute}`);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", marginTop: "2cm" }}>
      <h1 style={{ marginBottom: "30px" }}>Rutas de {city}</h1>

      {loading ? (
        <p>Cargando rutas...</p>
      ) : rutas.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {rutas.map((ruta) => (
            <div
              key={ruta.idRoute}
              onClick={() => handleCardClick(ruta.idRoute)}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "300px",
                height: "420px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={
                  ruta.image ||
                  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=200&fit=crop"
                }
                alt={ruta.nameRoute}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "15px", flex: "1", overflow: "hidden" }}>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  {ruta.nameRoute}
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#555",
                    lineHeight: "1.4",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {ruta.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay rutas disponibles</p>
      )}
    </div>
  );
};

export default TarjetaRoutes;
