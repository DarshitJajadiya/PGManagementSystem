import React from 'react';
import { useNavigate } from 'react-router-dom';
function BookingConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmed!</h2>
      <p>Your booking has been successfully confirmed. Thank you for choosing our service.</p>
      <button onClick={() => navigate('/profile', { replace: true })}>view your bookings</button>
    </div>
  );
}

export default BookingConfirmation;
