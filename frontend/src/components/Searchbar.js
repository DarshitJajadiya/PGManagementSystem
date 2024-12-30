import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBarPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }

    navigate('/results', { state: { query } });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for PG..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBarPage;
