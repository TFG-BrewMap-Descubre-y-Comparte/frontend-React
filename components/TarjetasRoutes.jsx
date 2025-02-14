import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TarjetaRoutes = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRutas();
  }, [city]);

  const fetchRutas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8082/api/v1/routes/city/${city}`
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
    console.log("Navegando a /route/", idRoute);
    navigate(`/route/${idRoute}`);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", marginTop: "2cm" }}>
      <h1>Rutas de {city}</h1>

      {loading ? (
        <p>Cargando rutas...</p>
      ) : rutas.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {rutas.map((ruta) => (
            <div
              key={ruta.idRoute}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "100%",
                maxWidth: "300px",
                height: "350px",
                margin: "10px 0",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onClick={() => handleCardClick(ruta.idRoute)}
            >
              <img
                src={
                  ruta.image ||
                  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=200&fit=crop"
                }
                alt={ruta.nameRoute}
                style={{ width: "100%", height: "65%", objectFit: "cover" }}
              />
              <h2 style={{ fontSize: "1.5rem", margin: "10px 0" }}>
                {ruta.nameRoute}
              </h2>
              <p
                style={{
                  padding: "0 10px 10px",
                  fontSize: "1rem",
                  color: "#555",
                }}
              >
                {ruta.description}
              </p>
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
