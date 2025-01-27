import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
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

        if (data.total === 0) {
          toast.error('Aucun résultat trouvé');
        } else if (data.total > 12) {
          toast.error(`Trop de résultats (${data.total})`);
        } else {
          toast.success(
            `${data.total} résultat${data.total > 1 ? 's' : ''} trouvé${
              data.total > 1 ? 's' : ''
            }`
          );
        }
      } catch (err) {
        setError(err);
        // Check if it's a rate limit error
        if (err.message.includes('Trop de requêtes')) {
          toast.error(err.message, {
            duration: 4000,
            icon: '⏳',
          });
        } else {
          toast.error('Erreur lors de la recherche', {
            duration: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]); // Still watch all params to catch submit

  return (
    <div className="container mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#059669',
              color: 'white',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#DC2626',
              color: 'white',
            },
          },
          style: {
            borderRadius: '8px',
            padding: '16px',
          },
        }}
      />
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
