import React, { useContext, useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import './Homepage.css';
import RoomCard from '../components/RoomCard';
import PGContext from '../context/PgContext';

function Homepage() {
  const { pgData, fetchPGData } = useContext(PGContext); // Using PGContext
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch PG data on component mount
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
  }, [fetchPGData]);

  const features = [
    { title: 'Spacious Rooms', description: 'Fully furnished rooms with all amenities.' },
    { title: 'Healthy Meals', description: 'Nutritious and delicious meals served daily.' },
    { title: 'Prime Location', description: 'Located near top colleges and transportation hubs.' },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <Searchbar />
        <h2>Welcome to PG</h2>
        <p>Comfortable, affordable, and student-friendly accommodation.</p>
        <button>Explore More</button>
      </section>

      {/* Room Cards */}
      <div className="cards">
        {loading ? (
          <p>Loading rooms...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          pgData.map((room, index) => (
            <RoomCard key={index} name={room.name} price={room.price} image={room.image} />
          ))
        )}
      </div>

      {/* Features Section */}
      <section id="features" className="features">
        <h3>Why Choose Us?</h3>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
