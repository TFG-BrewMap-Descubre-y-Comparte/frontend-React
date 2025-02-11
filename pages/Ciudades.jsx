import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

import "./Ciudades.css";

const Ciudades = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [modal, setModal] = useState({ visible: false, city: null });
  const [message, setMessage] = useState(""); // Estado para mostrar el mensaje

  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterCities();
  }, [cities, searchQuery]);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("../data/country.json");
      const data = await response.json();
      setCities(data.flatMap((item) => item.cities));
    } catch (error) {
      console.error("Error al cargar los destinos:", error);
    }
  };

  const filterCities = () => {
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCityClick = (city) => {
    setModal({ visible: true, city });
    setMessage(""); // Limpiar el mensaje al abrir el modal
  };

  const handleCloseModal = () => {
    setModal({ visible: false, city: null });
  };

  const handleGoToRoute = () => {
    const cityName = modal.city.name.toLowerCase();

    // Redirigir si la ciudad seleccionada es Sevilla o Seville
    if (cityName === "sevilla" || cityName === "seville") {
      navigate(`/route/${cityName}`);
    } else {
      setMessage("No hay rutas disponibles en este momento"); // Mostrar el mensaje
    }
  };

  return (
    <div className="container">
      <section className="search-filter">
        <input
          type="text"
          placeholder="Buscar un destino..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="portfolio">
        <div className="grid">
          {filteredCities.map((city) => (
            <div
              key={city.name}
              className="city-card"
              onClick={() => handleCityClick(city)}
            >
              <img src={city.image} alt={city.name} />
              <h3>{city.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {modal.visible && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modal.city.name}</h3>
            <p>{modal.city.description}</p>
            {message && <p className="message">{message}</p>}{" "}
            {/* Mostrar el mensaje */}
            <div className="modal-buttons">
              <button className="go-to-route" onClick={handleGoToRoute}>
                Ir a la ruta
              </button>
              <button className="close-modal" onClick={handleCloseModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ciudades;
