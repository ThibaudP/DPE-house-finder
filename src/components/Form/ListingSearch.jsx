function ListingSearch({ listingUrl, onSubmit, onChange }) {
  return (
    import.meta.env.VITE_SCRAPING_ENABLED === 'true' && (
      <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={onSubmit}
        >
          <label htmlFor="url" className="w-full">
            Annonce LBC
          </label>
          <input
            type="text"
            id="url"
            name="url"
            className="border invalid:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
            onChange={onChange}
            value={listingUrl}
          />
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Soumettre le formulaire"
            >
              Remplir les champs
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default ListingSearch;
