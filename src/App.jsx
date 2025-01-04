import { useState } from 'react';
import './App.css';
import { fetchHouses } from './api/ademe-api';
import Form from './components/Form/Form';
import Results from './components/Results/Results';

function App() {
  const [formData, setFormData] = useState({
    date: '',
    conso: '',
    location: '',
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
      setSearchResults(results);
    } catch (e) {
      setError(e);
      console.log(e);
    }

    setLoading(false);
  };

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormData({
      date: '',
      conso: '',
      location: '',
      note_dpe: '',
      note_ges: '',
      surface: '',
      annee: '',
    });
    setSearchResults(false);
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
        handleClearForm={handleClearForm}
        formData={formData}
      />
      <Results
        searchResults={searchResults.results}
        totalResults={searchResults.total}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default App;
