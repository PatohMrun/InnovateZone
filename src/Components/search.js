import React, { useState } from 'react';

function Search({blogTitless:searchOptions, onSearch}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showList, setShowList] = useState(false); // State to control list visibility
  
  // Array of search options
//   const searchOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grapes', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tomato', 'Ugli fruit', 'Vanilla', 'Watermelon'];

  // Event handler for input change
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
    // Filter search options based on input
    const filtered = searchOptions?.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
    
  };

  // Event handler for input focus
  const handleInputFocus = () => {
    setShowList(true);
  };

  // Event handler for input blur
  const handleInputBlur = () => {
    setShowList(false);
  };

    // Function to handle item selection
    const handleItemSelection = (item) => {
        setSearchTerm(item);
        setShowList(false);
        onSearch(item);
      };


    // Function to highlight the search term
    const highlightMatch = (option, searchTerm) => {
        if (!searchTerm) return option;
        const index = option.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (index === -1) return option;
        const beforeMatch = option.substring(0, index);
        const match = option.substring(index, index + searchTerm.length);
        const afterMatch = option.substring(index + searchTerm.length);
        return (
          <span>
            {beforeMatch}
            <strong style={{ backgroundColor: 'yellow' }}>{match}</strong>
            {afterMatch}
          </span>
        );
      };
    
  return (
    <form className="max-w-md mx-auto shadow-md" style={{ backgroundColor: "#CCE1FA",  marginTop:"-20px", padding:0}}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search keywords..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          required
        />
        {showList && (
        <div className="absolute mt-1 w-full max-h-72 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="divide-y divide-gray-200">
              {filteredResults.length === 0 && searchTerm !=='' ? (
                <li className="px-4 py-2">No match</li>
              ) : searchTerm===''? (
                searchOptions.map((option, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => handleItemSelection(option)}>
                    {option}
                  </li>
                ))
            ) : (
                filteredResults.map((option, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => handleItemSelection(option)}>
                    {highlightMatch(option, searchTerm)}
                  </li>
                ))
              )}
            </ul>
        </div>
      )}
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-[#207DE7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
