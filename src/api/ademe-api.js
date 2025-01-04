import { getDateRange } from '../utils/utils';

const linesEndpoint =
  'https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines';

const fetchHouses = async (data) => {
  const { date, conso, location, note_dpe, note_ges, surface, annee } = data;
  // console.log(data);

  // if (!location || !date || !conso) {
  //   throw new Error(
  //     'Erreur: ceci est une v0.1 donc il faut rempli tous les champs :)'
  //   );
  // }

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
    queryParts.push(`Etiquette_GES=${note_ges}`);
  }

  const queryString = encodeURIComponent(queryParts.join(' AND '));

  console.log(queryString);

  const params = `Conso_5_usages_par_m²_é_primaire:${conso} AND Date_réception_DPE:${date} AND Code_postal_\\(BAN\\):${location}`;

  // console.log(params.toString());
  // console.log(params);

  const url = `${linesEndpoint}?qs=${queryString}`;
  const response = await fetch(url);
  const json = await response.json();

  console.log(json);

  return json;
};

export { fetchHouses };
