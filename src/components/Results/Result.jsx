import { useEffect, useState } from 'react';
import { lambert93ToWGS84 } from '../../utils/lambertToGPS';

function Result({ result }) {
  const [GPSCoords, setGPSCoords] = useState([]);
  const [coordsLink, setCoordsLink] = useState('');
  const [addressLink, setAddressLink] = useState('');

  useEffect(() => {
    const lambertX = result['Coordonnée_cartographique_X_(BAN)'];
    const lambertY = result['Coordonnée_cartographique_Y_(BAN)'];
    let WGSCoords = lambert93ToWGS84(lambertX, lambertY);
    WGSCoords = WGSCoords.map((coord) => String(coord).slice(0, 9));
    setGPSCoords(WGSCoords);

    const baseGoogleMapsLink =
      'https://www.google.com/maps/search/?api=1&query=';
    setCoordsLink(
      baseGoogleMapsLink + encodeURIComponent(WGSCoords[1] + ',' + WGSCoords[0])
    );
    setAddressLink(
      baseGoogleMapsLink + encodeURIComponent(result['Adresse_(BAN)'])
    );
  }, [result]);

  return (
    <div className="bg-gray-100 rounded-md shadow-lg p-3">
      <p className="font-medium hover:underline">
        <a href={addressLink} target="_blank">
          {result['Adresse_(BAN)'].split(/\s\d{5}\s/)[0]}
        </a>
      </p>
      <p className="font-light text-sm mb-1">
        {result['Code_postal_(BAN)']} {result['Nom__commune_(BAN)']}
      </p>
      <p className="text-xs">
        {result['Surface_habitable_logement']}m² - DPE :{' '}
        {result['Etiquette_DPE']} - GES : {result['Etiquette_GES']}
      </p>
      <p className="text-xs hover:underline">
        <a href={coordsLink} target="_blank">
          GPS : {GPSCoords[1]},{GPSCoords[0]}
        </a>
      </p>
    </div>
  );
}

export default Result;
