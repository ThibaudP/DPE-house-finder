function Form({ handleFormSubmit, handleFormChange, formData }) {
  return (
    <div className="p-4 mt-2 rounded-lg shadow-lg bg-white ">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="date" className="w-full">
          Date d'établissement du DPE :{' '}
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border"
          onChange={handleFormChange}
          value={formData.date}
        />
        <label htmlFor="conso">
          Consommation d'énergie primaire (kWh/m2/an):{' '}
        </label>
        <input
          type="text"
          id="conso"
          name="conso"
          className="border"
          placeholder="Consommation d'énergie primaire par m2"
          onChange={handleFormChange}
          value={formData.conso}
        />
        <label htmlFor="note_dpe">Etiquette DPE: </label>
        <input
          type="text"
          id="note_dpe"
          name="note_dpe"
          className="border"
          placeholder="Etiquette DPE"
          onChange={handleFormChange}
          value={formData.note_dpe}
        />
        <label htmlFor="note_ges">Etiquette GES: </label>
        <input
          type="text"
          id="note_ges"
          name="note_ges"
          className="border"
          placeholder="Etiquette GES"
          onChange={handleFormChange}
          value={formData.note_ges}
        />

        <label htmlFor="location">Code postal (ou département)</label>
        <input
          type="text"
          id="location"
          name="location"
          className="border"
          placeholder="44230"
          onChange={handleFormChange}
          value={formData.location}
        />
        <input type="submit" value="Envoyer" className="border md:col-span-2" />
      </form>
    </div>
  );
}

export default Form;
