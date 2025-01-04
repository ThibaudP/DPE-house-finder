import proj4 from 'proj4';

const lambert93ToWGS84 = (lambert_x, lambert_y) => {
  // Define Lambert 93 (EPSG:2154) and WGS84 (EPSG:4326)
  const lambert93 =
    '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0 +units=m +no_defs';
  const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';

  // Example Lambert 93 coordinates (X, Y in meters)
  const lambert93Coords = [lambert_x, lambert_y];

  // Convert Lambert 93 to WGS84
  const wgs84Coords = proj4(lambert93, wgs84, lambert93Coords);

  return wgs84Coords;
};

export { lambert93ToWGS84 };
