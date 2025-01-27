/**
 * Calculates a date range centered around a given date
 * @param {string|Date} date - The center date
 * @param {Object} options - Configuration options
 * @param {number} [options.daysBeforeAfter=5] - Number of days before and after the center date
 * @returns {Object} Object containing start and end dates in YYYY-MM-DD format
 * @throws {Error} If the date is invalid
 */
const getDateRange = (date, options = {}) => {
  const { daysBeforeAfter = 5 } = options;

  // Handle both Date objects and date strings
  const parsedDate = date instanceof Date ? date : new Date(date);

  // Validate date
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Erreur: Date invalide');
  }

  // Set time to midnight UTC to avoid timezone issues
  parsedDate.setUTCHours(0, 0, 0, 0);

  const startDate = new Date(parsedDate);
  startDate.setDate(parsedDate.getDate() - daysBeforeAfter);

  const endDate = new Date(parsedDate);
  endDate.setDate(parsedDate.getDate() + daysBeforeAfter);

  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  };
};

export { getDateRange };
