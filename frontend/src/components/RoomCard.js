import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function RoomCard({ id,name, price, image, location }) {
  const navigate = useNavigate();
  const imageUrl = `http://localhost:5000/uploads/${image}`;
  const {user} =use(AuthContext);

  const handleBooking = () => {
    if(!user){
      alert('Please login to book a room');
      return;
    }
    navigate('/booking', { state: { id,name, price, location } });
  };

  return (
    <div className="room-card">
      <img src={imageUrl} alt={name} className="room-image" />
      <h3>{name}</h3>
      <p>{location}</p>
      <p>Price: ₹{price} per month</p>
      <button className="book-now-btn" onClick={handleBooking}>Book Now</button>
    </div>
  );
}

export default RoomCard;
