import { useEffect } from 'react';
import { lambert93ToWGS84 } from '../../utils/lambertToGPS';
import Result from './Result';

function Results({ searchResults, error }) {
  return (
    <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
      {searchResults
        ? searchResults.length +
          ' résultat' +
          (searchResults.length > 1 ? 's' : '') +
          ':'
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
