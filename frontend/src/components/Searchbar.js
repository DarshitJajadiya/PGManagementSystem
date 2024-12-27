import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); // State to store search results

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('Error fetching search results. Please try again later.');
    }
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
      <div className="search-results">
        {results.length > 0 ? (
          <ul>
            {results.map((pg) => (
              <li key={pg.id}>
                <strong>{pg.name}</strong> - {pg.location} - ₹{pg.price}
              </li>
            ))}
          </ul>
        ) : (
          query && <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
