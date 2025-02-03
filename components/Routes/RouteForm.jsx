import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function RouteForm() {
  const [route, setRoute] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  useEffect(() => {
    const jsonData = {
        nameRoute: "Sevilla Walking Tour 4",
        descriptionRoute: "A walking route through the landmarks of Sevilla.",
        cityName: "Seville",
        checkpoints: [
              {
                  nameCheckpoint: "Iglesia de la Basílica de la Macarena",
                  coordinates: {
                    startLatitude: 37.4025,
                    startLongitude: -5.9894,
                    endLatitude: 37.403,
                    endLongitude: -5.9889
                  }
              },
              {
                nameCheckpoint: "Iglesia de San Juan de la Palma",
                coordinates: {
                  startLatitude: 37.3953,
                  startLongitude: -5.9911,
                  endLatitude: 37.3958,
                  endLongitude: -5.9906
                }
              },
              {
                nameCheckpoint: "Catedral de Sevilla",
                coordinates: {
                  startLatitude: 37.3861,
                  startLongitude: -5.9922,
                  endLatitude: 37.3861,
                  endLongitude: -5.9922
                }
              },
              {
                nameCheckpoint: "Maestranza",
                coordinates: {
                  startLatitude: 37.3843,
                  startLongitude: -5.9968,
                  endLatitude: 37.3843,
                  endLongitude: -5.9968
                }
              }
              
        ]
      }

    setCheckpoints(jsonData.checkpoints);

    if (jsonData.checkpoints.length > 1) {
      // Generar la cadena con todas las coordenadas de los checkpoints
      const coordinatesString = jsonData.checkpoints
        .map(
          (checkpoint) =>
            `${checkpoint.coordinates.startLatitude},${checkpoint.coordinates.startLongitude}`
        )
        .join("&point=");

      // Llamar a la API de GraphHopper con todos los puntos intermedios
      fetch(
        `https://graphhopper.com/api/1/route?point=${coordinatesString}&vehicle=foot&key=96f10560-3598-4227-87b7-c77363eb79c3&points_encoded=false&instructions=true`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.paths && data.paths[0]) {
            console.log("Ruta completa recibida:", data.paths[0]);  // Mostrar el objeto completo de la ruta
            setRoute(data.paths[0].points.coordinates); // Ajusta esto según la respuesta
          }
        })
        .catch((error) => console.error("Error fetching route:", error));
    }
  }, []);

  return (
    <div>
      <h1>Mapa con Ruta Peatonal</h1>
      <MapContainer
        center={[37.3886, -5.9823]}
        zoom={14}
        className="map"
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcas de los checkpoints */}
        {checkpoints.map((checkpoint, index) => (
          <Marker
            key={index}
            position={[
              checkpoint.coordinates.startLatitude,
              checkpoint.coordinates.startLongitude,
            ]}
          >
            <Popup>{checkpoint.nameCheckpoint}</Popup>
          </Marker>
        ))}

        {/* Mostrar la ruta peatonal */}
        {route.length > 0 && (
          <Polyline positions={route.map((coord) => [coord[1], coord[0]])} color="red" />
        )}
      </MapContainer>
    </div>
  );
}

export default RouteForm;
