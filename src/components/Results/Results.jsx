import Result from './Result';

function Results({ searchResults, totalResults, loading, error }) {
  if (totalResults && totalResults > 12) {
    return (
      <div className="p-4 mt-2 rounded-lg shadow-lg bg-white text-red-500">
        Trop de résultats ({totalResults}). Merci d'affiner votre recherche
      </div>
    );
  }

  return (
    <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
      {loading && <p>Chargement en cours...</p>}
      {searchResults
        ? totalResults + ' résultat' + (totalResults > 1 ? 's' : '') + ':'
        : 'Aucun résultat'}
      {error && <p className="text-red-500">{error.message}</p>}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        name="cards-container"
      >
        {searchResults &&
          searchResults.map((result) => {
            return <Result result={result} key={result._id} />;
          })}
      </div>
    </div>
  );
}

export default Results;
