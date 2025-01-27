import Result from './Result';
import Map from '../Map/Map';

function Results({ searchResults, totalResults, loading, error }) {
  const renderHeader = () => {
    if (loading) return <p className="mb-4">Chargement en cours...</p>;
    if (error) return <p className="text-red-500 mb-4">{error.message}</p>;
    if (totalResults && totalResults > 12) {
      return (
        <p className="text-red-500 mb-4">
          Trop de résultats ({totalResults}). Merci d'affiner votre recherche
        </p>
      );
    }
    return (
      <p className="mb-4">
        {searchResults
          ? `${totalResults} résultat${totalResults > 1 ? 's' : ''} :`
          : 'Aucun résultat'}
      </p>
    );
  };

  return (
    <section
      className="p-4 mt-2 rounded-lg shadow-lg bg-white"
      aria-live="polite"
      aria-busy={loading}
    >
      {renderHeader()}

      {searchResults && searchResults.length > 0 && (
        <>
          <div className="mb-4">
            <Map searchResults={searchResults} />
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            role="list"
            aria-label="Résultats de recherche"
          >
            {searchResults.map((result) => (
              <Result result={result} key={result._id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Results;
