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
            endLongitude: -5.9889,
            url: "https://es.wikipedia.org/wiki/Bas%C3%ADlica_de_la_Macarena",
          },
        },
        {
          nameCheckpoint: "Iglesia de San Juan de la Palma",
          coordinates: {
            startLatitude: 37.3953,
            startLongitude: -5.9911,
            endLatitude: 37.3958,
            endLongitude: -5.9906,
            url: "https://es.wikipedia.org/wiki/Iglesia_de_San_Juan_de_la_Palma",
          },
        },
        {
          nameCheckpoint: "Catedral de Sevilla",
          coordinates: {
            startLatitude: 37.3861,
            startLongitude: -5.9922,
            endLatitude: 37.3861,
            endLongitude: -5.9922,
            url: "https://res.cloudinary.com/dp7cqbl3w/video/upload/v1736615309/catedral_nyqvv3.mp3",
          },
        },
        {
          nameCheckpoint: "Maestranza",
          coordinates: {
            startLatitude: 37.3843,
            startLongitude: -5.9968,
            endLatitude: 37.3843,
            endLongitude: -5.9968,
            url: "https://es.wikipedia.org/wiki/Plaza_de_toros_de_la_Maestranza",
          },
        },
      ],
    };

    setCheckpoints(jsonData.checkpoints);

    if (jsonData.checkpoints.length > 1) {
      const coordinatesString = jsonData.checkpoints
        .map(
          (checkpoint) =>
            `${checkpoint.coordinates.startLatitude},${checkpoint.coordinates.startLongitude}`
        )
        .join("&point=");

      fetch(
        `https://graphhopper.com/api/1/route?point=${coordinatesString}&vehicle=foot&key=96f10560-3598-4227-87b7-c77363eb79c3&points_encoded=false&instructions=true`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.paths && data.paths[0]) {
            console.log("Ruta completa recibida:", data.paths[0]);
            setRoute(data.paths[0].points.coordinates);
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
            <Popup>
              <div>
                <strong>{checkpoint.nameCheckpoint}</strong>
                <br />
                {checkpoint.coordinates.url.includes(".mp3") ? (
                  <audio controls>
                    <source src={checkpoint.coordinates.url} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                ) : (
                  <a href={checkpoint.coordinates.url} target="_blank" rel="noopener noreferrer">
                    Audioguía
                  </a>
                )}
              </div>
            </Popup>
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