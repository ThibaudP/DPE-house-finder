import { getDateRange } from '../utils/utils';
import { rateLimiter } from '../utils/rateLimit';

const ENDPOINTS = {
  LINES:
    'https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines',
};

const CONSTANTS = {
  RANGE_TOLERANCE: {
    SURFACE: 5,
    YEAR: 5,
  },
  DEFAULT_LIMIT: 100,
};

/**
 * Builds the query string for the DPE API
 * @param {Object} filters - The filter parameters
 * @returns {string} The encoded query string
 */
const buildQueryString = (filters) => {
  const { date, conso, location, note_dpe, note_ges, surface, annee } = filters;

  const queryParts = [];

  if (date) {
    const dateRange = getDateRange(date);
    queryParts.push(
      `Date_réception_DPE:[${dateRange.start} TO ${dateRange.end}]`
    );
  }

  if (conso) {
    queryParts.push(`Conso_5_usages_par_m²_é_primaire:${conso}`);
  }

  if (location) {
    if (location.length === 2) {
      queryParts.push(`N°_département_\\(BAN\\):${location}`);
    } else if (location.length === 5) {
      queryParts.push(`Code_postal_\\(BAN\\):${location}`);
    }
  }

  if (note_dpe) {
    queryParts.push(`Etiquette_DPE:${note_dpe}`);
  }

  if (note_ges) {
    queryParts.push(`Etiquette_GES:${note_ges}`);
  }

  if (surface) {
    const surfaceRange = {
      start: Math.floor(surface) - CONSTANTS.RANGE_TOLERANCE.SURFACE,
      end: Math.floor(surface) + CONSTANTS.RANGE_TOLERANCE.SURFACE,
    };
    queryParts.push(
      `Surface_habitable_logement:[${surfaceRange.start} TO ${surfaceRange.end}]`
    );
  }

  if (annee) {
    const anneeRange = {
      start: Math.floor(annee) - CONSTANTS.RANGE_TOLERANCE.YEAR,
      end: Math.floor(annee) + CONSTANTS.RANGE_TOLERANCE.YEAR,
    };
    queryParts.push(
      `Année_construction:[${anneeRange.start} TO ${anneeRange.end}]`
    );
  }

  return encodeURIComponent(queryParts.join(' AND '));
};

/**
 * Validates the input parameters
 * @param {Object} data - The input parameters
 * @throws {Error} If validation fails
 */
const validateInput = (data) => {
  const { location, limit, page } = data;

  if (location && location.length !== 2 && location.length !== 5) {
    throw new Error(
      'Le département doit comporter 2 chiffres ou la commune doit comporter 5 chiffres'
    );
  }

  if (limit && (typeof limit !== 'number' || limit <= 0)) {
    throw new Error('La limite doit être un nombre positif');
  }

  if (page && (typeof page !== 'number' || page <= 0)) {
    throw new Error('Le numéro de page doit être un nombre positif');
  }
};

/**
 * Fetches houses from the DPE API
 * @param {Object} data - The search parameters
 * @param {string} [data.date] - Date filter
 * @param {number} [data.conso] - Energy consumption filter
 * @param {string} [data.location] - Location code (2 digits for department, 5 for city)
 * @param {string} [data.note_dpe] - DPE rating filter
 * @param {string} [data.note_ges] - GES rating filter
 * @param {number} [data.surface] - Surface area filter
 * @param {number} [data.annee] - Construction year filter
 * @param {number} [data.limit=100] - Number of results per page
 * @param {number} [data.page=1] - Page number
 * @returns {Promise<Object>} The API response
 */
const fetchHouses = async (data) => {
  try {
    // Check rate limit before making request
    await rateLimiter.tryRequest();

    validateInput(data);
    const queryString = buildQueryString(data);
    const limit = data.limit || CONSTANTS.DEFAULT_LIMIT;
    const page = data.page || 1;
    const skip = (page - 1) * limit;

    const url = `${ENDPOINTS.LINES}?qs=${queryString}&size=${limit}&skip=${skip}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    if (error.message.includes('Trop de requêtes')) {
      throw error; // Re-throw rate limit errors
    }
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};

export { fetchHouses };
