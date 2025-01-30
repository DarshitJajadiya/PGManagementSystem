import React, { useContext, useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import PGContext from '../context/PgContext';


function PGDetailsPage() {
  const { pgData, fetchPGData } = useContext(PGContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//useeffect run only once
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPGData();
        setLoading(false);
      } catch (err) {
        setError('Failed to load PG data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  return (
    <div className="pg-details-page">
      <h1>All PGs</h1>
      {loading ? (
        <p>Loading PGs...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : pgData && pgData.length > 0 ? (
        <div className="pg-list">
          {pgData.map((room, index) => (
            <RoomCard 
            key={index} 
            name={room.name} 
            price={room.price} 
            image={room.images[0]} 
            location={room.location}
            />
          ))}
        </div>
      ) : (
        <p>No PGs available at the moment.</p>
      )}
    </div>
  );
}

export default PGDetailsPage;
