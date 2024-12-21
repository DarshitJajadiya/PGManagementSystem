import React from 'react';
import Searchbar from '../components/Searchbar'
import './Homepage.css';
import '../components/HeaderFooter.css';
import RoomCard from '../components/RoomCard';
import ahmedabad from '../img/ahm.jpeg';

const roomData = [
  { name: 'Ahmedabad', price: 100, image: ahmedabad },
  { name: 'Surat', price: 200, image: ahmedabad },
  { name: 'Dubai', price: 300, image: ahmedabad },
  { name: 'Rajkot', price: 400, image: ahmedabad },
  { name: 'Bhesan', price: 500, image: ahmedabad },
  { name: 'Bhavnagar', price: 600, image: ahmedabad },
];

const features = [
  { title: 'Spacious Rooms', description: 'Fully furnished rooms with all amenities.' },
  { title: 'Healthy Meals', description: 'Nutritious and delicious meals served daily.' },
  { title: 'Prime Location', description: 'Located near top colleges and transportation hubs.' },
];

function Homepage() {
  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero">
      <Searchbar/>

        <h2>Welcome to PG</h2>
        <p>Comfortable, affordable, and student-friendly accommodation.</p>
        <button>Explore More</button>
      </section>

      {/* Room Cards */}
      <div className="cards">
        {roomData.map((room, index) => (
          <RoomCard key={index} name={room.name} price={room.price} image={room.image} />
        ))}
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
