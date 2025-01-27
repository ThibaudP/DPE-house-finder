import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Form({ formData, onFormChange, onFormSubmit, onClearForm }) {
  return (
    <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={onFormSubmit}
        aria-label="Formulaire DPE"
      >
        <label htmlFor="date" className="w-full">
          Date d'établissement du DPE
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          onChange={onFormChange}
          value={formData.date}
          aria-required="true"
          aria-label="Date d'établissement du DPE"
        />

        <label htmlFor="location">Code postal (ou département)</label>
        <input
          type="text"
          id="location"
          name="location"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Code Postal"
          onChange={onFormChange}
          value={formData.location}
          pattern="^\d{2}$|^\d{5}$"
          title="Entrez un département à 2 chiffres ou un Code Postal à 5 chiffres"
          aria-required="true"
        />

        <label htmlFor="conso">Consommation énergétique</label>
        <input
          type="number"
          id="conso"
          name="conso"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="kWh/m²/an"
          onChange={onFormChange}
          value={formData.conso}
          min="0"
          step="1"
          aria-required="true"
        />

        <label htmlFor="note_dpe">Note DPE</label>
        <select
          id="note_dpe"
          name="note_dpe"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          onChange={onFormChange}
          value={formData.note_dpe}
          aria-required="true"
        >
          <option value="">Sélectionnez une note</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>

        <label htmlFor="note_ges">Note GES</label>
        <select
          id="note_ges"
          name="note_ges"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          onChange={onFormChange}
          value={formData.note_ges}
          aria-required="true"
        >
          <option value="">Sélectionnez une note</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>

        <label htmlFor="surface">Surface habitable</label>
        <input
          type="number"
          id="surface"
          name="surface"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Surface habitable"
          onChange={onFormChange}
          value={formData.surface}
          min="0"
          step="1"
          aria-required="true"
        />

        <label htmlFor="annee">Année de construction</label>
        <input
          type="number"
          id="annee"
          name="annee"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Année de construction"
          onChange={onFormChange}
          value={formData.annee}
          min="1600"
          max="2100"
          step="1"
          title="Entrez une année entre 1600 et 2100"
          aria-required="true"
        />

        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClearForm}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Réinitialiser le formulaire"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Soumettre le formulaire"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
