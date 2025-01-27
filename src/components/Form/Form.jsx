function Form({
  handleFormSubmit,
  handleFormChange,
  handleClearForm,
  formData,
}) {
  return (
    <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleFormSubmit}
        aria-label="Formulaire DPE"
      >
        {/* Date du DPE */}
        <label htmlFor="date" className="w-full">
          Date d'établissement du DPE
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          onChange={handleFormChange}
          value={formData.date}
          aria-required="true"
          aria-label="Date d'établissement du DPE"
        />

        {/* Localisation */}
        <label htmlFor="location">Code postal (ou département)</label>
        <input
          type="text"
          id="location"
          name="location"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Code Postal"
          onChange={handleFormChange}
          value={formData.location}
          pattern="^\d{2}$|^\d{5}$"
          title="Entrez un département à 2 chiffres ou un Code Postal à 5 chiffres"
          aria-required="true"
          aria-label="Code postal ou département"
        />

        {/* Consommation primaire par m2 */}
        <label htmlFor="conso">
          Consommation d'énergie primaire (kWh/m2/an)
        </label>
        <input
          type="number"
          id="conso"
          name="conso"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Consommation d'énergie primaire par m2"
          onChange={handleFormChange}
          value={formData.conso}
          min="0"
          step="1"
          aria-required="true"
          aria-label="Consommation d'énergie primaire en kWh/m2/an"
        />

        {/* Etiquette DPE */}
        <label htmlFor="note_dpe">Etiquette DPE</label>
        <input
          type="text"
          id="note_dpe"
          name="note_dpe"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Etiquette DPE"
          onChange={handleFormChange}
          value={formData.note_dpe}
          maxlength="1"
          pattern="[A-G]"
          title="L'étiquette DPE doit être une lettre entre A et G."
          aria-required="true"
          aria-label="Étiquette DPE"
        />

        {/* Etiquette GES */}
        <label htmlFor="note_ges">Etiquette GES: </label>
        <input
          type="text"
          id="note_ges"
          name="note_ges"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Etiquette GES"
          onChange={handleFormChange}
          value={formData.note_ges}
          maxlength="1"
          pattern="[A-G]"
          title="L'étiquette GES doit être une lettre entre A et G."
          aria-required="true"
          aria-label="Étiquette GES"
        />

        {/* Surface */}
        <label htmlFor="surface">Surface habitable</label>
        <input
          type="number"
          id="surface"
          name="surface"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Surface habitable"
          onChange={handleFormChange}
          value={formData.surface}
          min="0"
          step="1"
          aria-required="true"
          aria-label="Surface habitable en mètres carrés"
        />

        {/* Année de construction */}
        <label htmlFor="annee">Année de construction</label>
        <input
          type="number"
          id="annee"
          name="annee"
          className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          placeholder="Année de construction"
          onChange={handleFormChange}
          value={formData.annee}
          min="1600"
          max="2100"
          step="1"
          title="Entrez une année entre 1600 et 2100"
          aria-required="true"
          aria-label="Année de construction du bâtiment"
        />

        {/* Buttons container */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleClearForm}
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
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
