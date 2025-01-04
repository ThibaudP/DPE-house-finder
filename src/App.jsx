import { useState } from 'react';
import './App.css';
import { fetchHouses } from './api/ademe-api';
import Form from './components/Form/Form';
import Results from './components/Results/Results';

function App() {
  const [formData, setFormData] = useState({
    date: '2024-09-02',
    conso: '57',
    location: '44360',
    note_dpe: '',
    note_ges: '',
    surface: '',
    annee: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    setLoading(true);
    setSearchResults(false);
    console.log(formData);
    try {
      const results = await fetchHouses(formData);
      setSearchResults(results.results);
    } catch (e) {
      setError(e);
      console.log(e);
    }

    setLoading(false);
  };
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
      <Form
        handleFormSubmit={handleFormSubmit}
        handleFormChange={handleFormChange}
        formData={formData}
      />
      {loading && <p>Loading...</p>}
      <Results searchResults={searchResults} error={error} />
    </div>
  );
}

export default App;
