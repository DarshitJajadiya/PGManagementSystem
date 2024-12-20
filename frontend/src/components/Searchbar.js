import React, { useState } from 'react';
import './HeaderFooter.css';    
function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for PG..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
