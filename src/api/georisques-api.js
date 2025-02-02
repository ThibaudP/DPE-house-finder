import { rateLimiter } from "../utils/rateLimit";

const ENDPOINTS = {
  RISKS:
    'https://georisques.gouv.fr/api/v1/resultats_rapport_risque',
};

const CONSTANTS = {
  DEFAULT_LIMIT: 100,
};

const fetchRisks = async (address) => {
  try {
    // Check rate limit before making request
    await rateLimiter.tryRequest();

    const url = `${ENDPOINTS.RISKS}?adresse=${address}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('Trop de requêtes')) {
      throw error; // Re-throw rate limit errors
    }
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};

export { fetchRisks };
