import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Searchbar from '../components/Searchbar';
import './Homepage.css';
import RoomCard from '../components/RoomCard';
import PGContext from '../context/PgContext';

function Homepage() {
  const { pgData } = useContext(PGContext); // Access PG data from context
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(false); // Loading state

  const features = [
    { title: 'Spacious Rooms', description: 'Fully furnished rooms with all amenities.' },
    { title: 'Healthy Meals', description: 'Nutritious and delicious meals served daily.' },
    { title: 'Prime Location', description: 'Located near top colleges and transportation hubs.' },
  ];

  const handleExploreMore = () => {
    setLoading(true);
    navigate('/pg-details'); // Navigate to PG details page
    setLoading(false);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <Searchbar />
        <h1>Welcome </h1> 
        <h2>Vidyashram PG</h2>
        <p>Comfortable, affordable, and student-friendly accommodation.</p>
        <button onClick={handleExploreMore} disabled={loading}>
          {loading ? 'Loading...' : 'Explore More'}
        </button>
      </section>

      {/* {
      Room Cards
      <div className="cards">
        {pgData && pgData.length > 0 ? (
          pgData.slice(0, 3).map((room, index) => (
            <RoomCard key={index} name={room.name} price={room.price} image={room.images} />
          ))
        ) : (
          <p>No PGs available at the moment.</p>
        )}
      </div> 
      } */}

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
