import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';
import { fetchHouses } from './api/ademe-api';
import Form from './components/Form/Form';
import ListingSearch from './components/Form/ListingSearch';
import Results from './components/Results/Results';

const INITIAL_FORM_STATE = {
  date: '',
  location: '',
  conso: '',
  note_dpe: '',
  note_ges: '',
  surface: '',
  annee: '',
};

const SCRAPER_ENDPOINT = 'http://localhost:3000/scrape';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_STATE,
    date: searchParams.get('date') || '',
    location: searchParams.get('location') || '',
    conso: searchParams.get('conso') || '',
    note_dpe: searchParams.get('note_dpe') || '',
    note_ges: searchParams.get('note_ges') || '',
    surface: searchParams.get('surface') || '',
    annee: searchParams.get('annee') || '',
  });
  const [listingUrl, setListingUrl] = useState('');
  const [loadingListingData, setLoadingListingData] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );

    setSearchParams({
      ...params,
      submitted: 'true',
    });
  };

  const handleClearForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setSearchParams({});
    setResults(null);
    setError(null);
  };

  const handleListingChange = (e) => {
    const newUrl = e.target.value;
    setListingUrl(newUrl);
  };

  const handleListingSubmit = async (e) => {
    e.preventDefault();

    if (listingUrl) {
      try {
        const response = await fetch(SCRAPER_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: listingUrl }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        setFormData((prev) => ({
          ...prev,
          date: data.date,
          location: data.location,
          conso: data.conso,
          note_dpe: data.note_dpe,
          note_ges: data.note_ges,
          surface: data.surface,
          annee: data.annee,
        }));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

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
    <div className="container mx-auto mb-8">
      <Toaster
        position="top-right"
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
        <h1
          onClick={handleClearForm}
          className="header-title content-center ml-4 font-semibold text-xl cursor-pointer hover:text-blue-600 transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClearForm()}
          aria-label="Réinitialiser la recherche"
        >
          DPE house finder
        </h1>
      </div>
      <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
        DPE house finder vous permet de retrouver l'adresse d'un bien à partir
        des informations de son DPE.
        <br />
        <br />
      </div>
      <ListingSearch
        listingUrl={listingUrl}
        onSubmit={handleListingSubmit}
        onChange={handleListingChange}
      />
      <Form
        formData={formData}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
        onClearForm={handleClearForm}
      />
      <Results
        searchResults={results?.results}
        totalResults={results?.total}
        loading={loading}
        error={error}
      />
      <div className="fixed bottom-0 left-0 bg-white mt-2 z-[800] border border-gray-200 w-full text-right ">
        <p className="text-xs">
          Scraping : {import.meta.env.VITE_SCRAPING_ENABLED}
        </p>
      </div>
    </div>
  );
}

export default App;
