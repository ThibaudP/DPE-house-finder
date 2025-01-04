import { getDateRange } from '../utils/utils';

const linesEndpoint =
  'https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines';

const fetchHouses = async (data) => {
  const { date, conso, location, note_dpe, note_ges, surface, annee } = data;

  if (location && location.length != 2 && location.length != 5) {
    throw new Error(
      'Erreur: Le département doit comporter 2 chiffres ou la commune doit comporter 5 chiffres'
    );
  }

  let dateRange;
  if (date) {
    dateRange = getDateRange(date);
  }

  const queryParts = [];

  if (date) {
    queryParts.push(
      `Date_réception_DPE:[${dateRange.start} TO ${dateRange.end}]`
    );
  }
  if (conso) {
    queryParts.push(`Conso_5_usages_par_m²_é_primaire:${conso}`);
  }
  if (location.length === 2) {
    queryParts.push(`N°_département_\\(BAN\\):${location}`);
  } else if (location.length === 5) {
    queryParts.push(`Code_postal_\\(BAN\\):${location}`);
  }

  if (note_dpe) {
    queryParts.push(`Etiquette_DPE:${note_dpe}`);
  }

  if (note_ges) {
    queryParts.push(`Etiquette_GES:${note_ges}`);
  }

  if (surface) {
    const surfaceRange = {
      start: Math.floor(surface) - 5,
      end: Math.floor(surface) + 5,
    };
    queryParts.push(
      `Surface_habitable_logement:[${surfaceRange.start} TO ${surfaceRange.end}]`
    );
  }

  if (annee) {
    const anneeRange = {
      start: Math.floor(annee) - 5,
      end: Math.floor(annee) + 5,
    };
    queryParts.push(
      `Année_construction:[${anneeRange.start} TO ${anneeRange.end}]`
    );
  }

  const queryString = encodeURIComponent(queryParts.join(' AND '));

  console.log(queryString);

  const url = `${linesEndpoint}?qs=${queryString}`;
  const response = await fetch(url);
  const json = await response.json();

  console.log(json);

  return json;
};

export { fetchHouses };
