import React from 'react';
import { useBooking } from '../context/bookingContext'; // Import the useBooking hook

function BookingModal() {
  const { selectedRoom, isBookingModalOpen, closeBookingModal } = useBooking();

  if (!isBookingModalOpen || !selectedRoom) return null; // Don't render the modal if it's closed or no room is selected

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={closeBookingModal}>
          Close
        </button>
        <h2>Booking for {selectedRoom.name}</h2>
        <p>Location: {selectedRoom.location}</p>
        <p>Price: ₹{selectedRoom.price} per month</p>
        <form>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required />

          <label htmlFor="contact">Contact Number</label>
          <input type="text" id="contact" required />

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
