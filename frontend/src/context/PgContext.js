import { createContext, useState } from 'react';

const PGContext = createContext();

export const PGProvider = ({ children }) => {
  const [pgData, setPGData] = useState([]); // PG listings
  const [filters, setFilters] = useState({ location: '', priceRange: [0, 1000] }); // Filters

  const fetchPGData = async () => {
    const res = await fetch('http://localhost:5000/api/pg');
    const data = await res.json();
    setPGData(data);
  };

  return (
    <PGContext.Provider value={{ pgData, filters, setFilters, fetchPGData }}>
      {children}
    </PGContext.Provider>
  );
};

export default PGContext;
