import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);  // Access user from AuthContext
  const { pgId, name,price, location: pgLocation} = location.state;

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    contact: '',
    checkInDate: '',
    duration: '',
  });

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to book a room');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        userId: user.id,  
        pgId: location.state.id,
        checkInDate: bookingDetails.checkInDate,
        duration: bookingDetails.duration,
        price:location.state.price,
      });

      if (response.data.success) {
        navigate('/payment', { state: { bookingId: response.data.bookingId, amount: price } });
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className="booking-page">
      <h2>Booking for {name}</h2>
      <p>Location: {pgLocation}</p>
      <p>Price: ₹{price} per month</p>

      <form onSubmit={handleBooking}>
        <label>Your Name</label>
        <input type="text" name="name" value={bookingDetails.name} onChange={handleChange} required />

        <label>Contact Number</label>
        <input type="text" name="contact" value={bookingDetails.contact} onChange={handleChange} required />

        <label>Check-in Date</label>
        <input type="date" name="checkInDate" value={bookingDetails.checkInDate} onChange={handleChange} required />

        <label>Duration (months)</label>
        <input type="number" name="duration" value={bookingDetails.duration} onChange={handleChange} required />

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default BookingPage;
