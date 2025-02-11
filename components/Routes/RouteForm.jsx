import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function RouteForm() {
  const { city } = useParams();
  const [route, setRoute] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  useEffect(() => {
    if (!city) return;

    fetch(`http://localhost:8082/api/v1/routes/city/${city}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const routeData = data[0];
          setCheckpoints(routeData.checkpointHasRoute);

          if (routeData.checkpointHasRoute.length > 1) {
            const coordinatesString = routeData.checkpointHasRoute
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
        }
      })
      .catch((error) => console.error("Error fetching route data:", error));
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
                {checkpoint.audioguiaDTO?.url_audioguia.includes(".mp3") ? (
                  <audio controls>
                    <source
                      src={checkpoint.audioguiaDTO.url_audioguia}
                      type="audio/mpeg"
                    />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                ) : (
                  <a
                    href={checkpoint.audioguiaDTO?.url_audioguia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Audioguía
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Mostrar la ruta peatonal */}
        {route.length > 0 && (
          <Polyline
            positions={route.map((coord) => [coord[1], coord[0]])}
            color="red"
          />
        )}
      </MapContainer>
    </div>
  );
}

export default RouteForm;
