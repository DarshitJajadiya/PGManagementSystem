import React from 'react';

function RoomCard({ name, price, image }) {
  const imageUrl = `http://localhost:5000/${image}`;

  return (
    <div className="room-card">
      
      <img src={imageUrl} alt={name} className="room-image" />
      <h3>{name}</h3>
      <p>Price: ₹{price} per month</p>
      <button className="book-now-btn">Book Now</button>
    </div>
  );
}

export default RoomCard;
