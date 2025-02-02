import { useEffect, useState } from 'react';
import { lambert93ToWGS84 } from '../../utils/lambertToGPS';
import { fetchRisks } from '../../api/georisques-api';

function Result({ result }) {
  const [GPSCoords, setGPSCoords] = useState([]);
  const [coordsLink, setCoordsLink] = useState('');
  const [addressLink, setAddressLink] = useState('');
  const [risks, setRisks] = useState({});

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

    // Fetch risks for the current result
    fetchRisks(result['Adresse_(BAN)'])
      .then((risks) => {
        setRisks(risks);
        console.log(risks);
      })
      .catch((error) => {
        console.error('Error fetching risks:', error);
      });
  }, [result]);

  return (
    <div className="bg-gray-100 rounded-md shadow-lg p-4 hover:shadow-xl transition-shadow">
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
        <p className="text-sm font-bold">
          Rapport Georisques :
        </p>
        <ul className='text-sm'>
          {risks?.risquesNaturels &&
            Object.entries(risks?.risquesNaturels).map(([key, value]) => (
              <li key={key}>{value.libelle === 'Vent violant' ? 'Vent violent' : value.libelle} : {value.present ? <span className='text-red-500'>Présent</span> : <span className='text-green-500'>Absent</span>}</li>
            ))}
        </ul>
        <ul className='text-sm'>
          {risks?.risquesTechnologiques &&
            Object.entries(risks?.risquesTechnologiques).map(([key, value]) => (
              <li key={key}>{value.libelle} : {value.present ? <span className='text-red-500'>Présent</span> : <span className='text-green-500'>Absent</span>}</li>
            ))}
        </ul>
      </div>
    </div>
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
  return getDPEColor(etiquette);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default Result;
