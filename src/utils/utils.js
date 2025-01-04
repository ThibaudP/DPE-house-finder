const getDateRange = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    throw new Error('Erreur: Date invalide');
  }

  const startDate = new Date(parsedDate);
  startDate.setDate(parsedDate.getDate() - 5);

  const endDate = new Date(parsedDate);
  endDate.setDate(parsedDate.getDate() + 5);

  return {
    start: startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
    end: endDate.toISOString().split('T')[0],
  };
};

export { getDateRange };
