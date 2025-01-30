import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/bookingContext'; // Import the context hook

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { closeBookingModal } = useBooking();
  
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    contact: '',
  });

  const room = location.state?.room; // Get room data passed via React Router

  useEffect(() => {
    if (!room) {
      navigate('/'); // Redirect to home page if no room data is available
    }
  }, [room, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic (e.g., API call)
    console.log('Booking details:', bookingDetails);
    // Close the modal or navigate to a confirmation page
    closeBookingModal();
    navigate('/booking-confirmation'); // Navigate to a confirmation page
  };

  if (!room) return null;

  return (
    <div className="booking-page">
      <h2>Booking for {room.name}</h2>
      <p>Location: {room.location}</p>
      <p>Price: ₹{room.price} per month</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={bookingDetails.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact">Contact Number</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={bookingDetails.contact}
          onChange={handleChange}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingPage;
