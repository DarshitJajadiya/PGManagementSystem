import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useBooking } from '../context/bookingContext'; // Import the useBooking hook

function RoomCard({ id, name, price, image, location }) {
  const navigate = useNavigate();
  const { openBookingModal } = useBooking(); // Access the openBookingModal function from context
  const imageUrl = `http://localhost:5000/${image}`;

  // Function to handle booking
  const handleBookNow = () => {
    // Navigate to the booking page and pass the room data
    navigate('/booking', { state: { room: { id, name, price, location, image } } });
  };

  return (
    <div className="room-card">
      <img src={imageUrl} alt={name} className="room-image" />
      <h3>{name}</h3>
      <p>{location}</p>
      <p>Price: ₹{price} per month</p>
      <button className="book-now-btn" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
}

export default RoomCard;
