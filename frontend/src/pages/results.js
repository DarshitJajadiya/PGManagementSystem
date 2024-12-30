import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RoomCard from '../components/RoomCard' // Import the RoomCard component
import '../HeaderFooter.css';

function ResultsPage() {
  const location = useLocation();
  const query = location.state?.query || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

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

    fetchResults();
  }, [query]);

  return (
    <div className="results-page">
      <h2 className="results-title">Search Results for "{query}"</h2>
      <div className="results-container">
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((pg) => (
              <RoomCard 
                key={pg.id} 
                name={pg.name} 
                price={pg.price} 
                image={pg.images} 
              />
            ))}
          </div>
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
