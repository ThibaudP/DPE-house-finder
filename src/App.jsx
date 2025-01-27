import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { fetchHouses } from './api/ademe-api';
import Form from './components/Form/Form';
import Results from './components/Results/Results';

function App() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      // Only fetch if form was submitted
      if (searchParams.get('submitted') !== 'true') {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Remove the submitted param from the API call
        const apiParams = new URLSearchParams(searchParams);
        apiParams.delete('submitted');

        const data = await fetchHouses(Object.fromEntries(apiParams.entries()));
        setResults(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]); // Still watch all params to catch submit

  return (
    <div className="container mx-auto">
      <div id="top" className="h-16 shadow-lg flex bg-white rounded-b-lg">
        <h1 className="header-title content-center ml-4 font-semibold text-xl">
          DPE house finder
        </h1>
      </div>
      <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
        DPE house finder vous permet de retrouver l'adresse d'un bien à partir
        des informations de son DPE.
      </div>
      <Form />
      <Results
        searchResults={results?.results}
        totalResults={results?.total}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
