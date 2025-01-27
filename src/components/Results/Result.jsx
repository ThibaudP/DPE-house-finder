import { useEffect, useState } from 'react';
import { lambert93ToWGS84 } from '../../utils/lambertToGPS';

function Result({ result }) {
  const [GPSCoords, setGPSCoords] = useState([]);
  const [coordsLink, setCoordsLink] = useState('');
  const [addressLink, setAddressLink] = useState('');

  useEffect(() => {
    // Move coordinate calculation to a separate function for clarity
    const calculateCoordinates = () => {
      const lambertX = result['Coordonnée_cartographique_X_(BAN)'];
      const lambertY = result['Coordonnée_cartographique_Y_(BAN)'];
      const WGSCoords = lambert93ToWGS84(lambertX, lambertY).map((coord) =>
        String(coord).slice(0, 9)
      );
      return WGSCoords;
    };

    const WGSCoords = calculateCoordinates();
    setGPSCoords(WGSCoords);

    const baseGoogleMapsLink =
      'https://www.google.com/maps/search/?api=1&query=';
    setCoordsLink(
      `${baseGoogleMapsLink}${encodeURIComponent(
        `${WGSCoords[1]},${WGSCoords[0]}`
      )}`
    );
    setAddressLink(
      `${baseGoogleMapsLink}${encodeURIComponent(result['Adresse_(BAN)'])}`
    );
  }, [result]);

  return (
    <article className="bg-gray-100 rounded-md shadow-lg p-4 hover:shadow-xl transition-shadow">
      <h2 className="font-medium hover:underline">
        <a
          href={addressLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir l'adresse sur Google Maps: ${result['Adresse_(BAN)']}`}
        >
          {result['Adresse_(BAN)'].split(/\s\d{5}\s/)[0]}
        </a>
      </h2>
      <p className="font-light text-sm mb-2">
        <span className="font-medium">{result['Code_postal_(BAN)']}</span>{' '}
        {result['Nom__commune_(BAN)']}
      </p>
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">
            {result['Surface_habitable_logement']}m²
          </span>{' '}
          -{' '}
          <span
            className={`font-medium ${getDPEColor(result['Etiquette_DPE'])}`}
          >
            DPE : {result['Etiquette_DPE']}
          </span>{' '}
          -{' '}
          <span
            className={`font-medium ${getGESColor(result['Etiquette_GES'])}`}
          >
            GES : {result['Etiquette_GES']}
          </span>{' '}
          - <span>{result['Année_construction']}</span>
        </p>
        <p className="text-sm">
          Date d'établissement du DPE:{' '}
          {formatDate(result['Date_établissement_DPE'])}
        </p>
        <p className="text-sm hover:underline">
          <a
            href={coordsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir les coordonnées GPS sur Google Maps: ${GPSCoords[1]},${GPSCoords[0]}`}
          >
            GPS : {GPSCoords[1]},{GPSCoords[0]}
          </a>
        </p>
      </div>
    </article>
  );
}

// Helper functions (to be added)
const getDPEColor = (etiquette) => {
  const colors = {
    A: 'text-green-600',
    B: 'text-green-500',
    C: 'text-yellow-500',
    D: 'text-orange-400',
    E: 'text-orange-500',
    F: 'text-red-500',
    G: 'text-red-600',
  };
  return colors[etiquette] || '';
};

const getGESColor = (etiquette) => {
  // Similar to getDPEColor
  return getDPEColor(etiquette); // For simplicity, using same colors
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default Result;
