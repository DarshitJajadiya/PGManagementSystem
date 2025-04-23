import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access user from AuthContext

  // Destructure the properties correctly
  const { id, name, price, location: pgLocation } = location.state;

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    contact: '',
    checkInDate: '',
    duration: '',
  });

  // Handle input field changes
  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // Handle booking form submission
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to book a room');
      return;
    }

    try {
      // Send booking details with correct field names (pgsId instead of id)
      console.log(user.id, id, bookingDetails.checkInDate, bookingDetails.duration, price);
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          pgsId: id,  // Send pgsId as the correct field name
          checkInDate: bookingDetails.checkInDate,
          duration: bookingDetails.duration,
          price,
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/payment', { state: { bookingId: data.bookingId, amount: price },replace: true });
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking could not be completed.');
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
