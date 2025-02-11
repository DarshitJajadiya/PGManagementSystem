import React, { useContext, useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import PGContext from '../context/PgContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function PGDetailsPage() {
  const { pgData, fetchPGData } = useContext(PGContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
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

  }, [user, navigate, fetchPGData]);

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
            id={room._id}
            name={room.name} 
            price={room.price} 
            image={room.images} 
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
