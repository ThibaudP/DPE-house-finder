import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { lambert93ToWGS84 } from '../../utils/lambertToGPS';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Fix for default marker icon
const ICON = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function Map({ searchResults }) {
  // Calculate center point from all results
  const center =
    searchResults.length > 0
      ? searchResults
          .reduce(
            (acc, result) => {
              const coords = lambert93ToWGS84(
                result['Coordonnée_cartographique_X_(BAN)'],
                result['Coordonnée_cartographique_Y_(BAN)']
              );
              return [acc[0] + coords[1], acc[1] + coords[0]];
            },
            [0, 0]
          )
          .map((coord) => coord / searchResults.length)
      : [46.227638, 2.213749]; // France center

  return (
    <MapContainer
      center={center}
      zoom={searchResults.length > 0 ? 12 : 5}
      className="h-[400px] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {searchResults.map((result) => {
        const coords = lambert93ToWGS84(
          result['Coordonnée_cartographique_X_(BAN)'],
          result['Coordonnée_cartographique_Y_(BAN)']
        );
        return (
          <Marker
            key={result._id}
            position={[coords[1], coords[0]]}
            icon={ICON}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-medium">{result['Adresse_(BAN)']}</p>
                <p>
                  DPE: {result['Etiquette_DPE']} - GES:{' '}
                  {result['Etiquette_GES']}
                </p>
                <p>{result['Surface_habitable_logement']}m²</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
