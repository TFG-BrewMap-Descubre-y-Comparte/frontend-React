import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Ciudades.css";

const Ciudades = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const navigate = useNavigate();

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
    const cityName = city.name.toLowerCase();
    if (cityName === "sevilla" || cityName === "seville") {
      navigate(`/tarjeta/${cityName}/turistica`);
    } else {
      alert("No hay rutas disponibles en este momento");
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
    </div>
  );
};

export default Ciudades;
