import React from 'react';
import './HeaderFooter.css';

function RoomCard({ name, price, image }) {
  return (
    <div className="room-card">
      <img src={image} alt={name} className="room-image" />
      <h3>{name}</h3>
      <p>Price: ₹{price} per month</p>
      <button className="book-now-btn">Book Now</button>
    </div>
  );
}

export default RoomCard;
