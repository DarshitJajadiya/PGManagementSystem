import React from 'react';
import './Homepage.css';
import '../components/HeaderFooter.css';
import RoomCard from '../components/RoomCard';
import ahmedabad from '../img/ahm.jpeg';
function Homepage() {
  return (
    <div className="homepage">
      <section className="hero">
        <h2>Welcome to PG</h2>
        <p>Comfortable, affordable, and student-friendly accommodation.</p>
        <button>Explore More</button>
      </section>
<div className="cards">
      <RoomCard name='ahmedabad' price='100' image={ahmedabad}/>
      <RoomCard name='surat' price='200' image={ahmedabad}/>
      <RoomCard name='dubai' price='300' image={ahmedabad}/>
      <RoomCard name='rajkot' price='400' image={ahmedabad}/>
      <RoomCard name='bhesan' price='500' image={ahmedabad}/>
      <RoomCard name='bhav' price='600' image={ahmedabad}/>
</div>
      {/* Features Section */}
      <section id="features" className="features">
        <h3>Why Choose Us?</h3>
        <div className="feature-cards">
          <div className="feature-card">
            <h4>Spacious Rooms</h4>
            <p>Fully furnished rooms with all amenities.</p>
          </div>
          <div className="feature-card">
            <h4>Healthy Meals</h4>
            <p>Nutritious and delicious meals served daily.</p>
          </div>
          <div className="feature-card">
            <h4>Prime Location</h4>
            <p>Located near top colleges and transportation hubs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
