import React, { createContext, useState, useContext } from 'react';

// Create BookingContext
const BookingContext = createContext();

// BookingProvider to provide context values
export const BookingProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);

  // Function to open the booking modal
  const openBookingModal = (room) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  // Function to close the booking modal
  const closeBookingModal = () => {
    setSelectedRoom(null);
    setBookingModalOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{ selectedRoom, isBookingModalOpen, openBookingModal, closeBookingModal }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the BookingContext
export const useBooking = () => useContext(BookingContext);
