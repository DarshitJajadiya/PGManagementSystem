import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import PGContext from '../context/PgContext';
import PGList from './listedpglist';
import BookedPGList from './bookedpglist';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { pgData, fetchPGData } = useContext(PGContext);
  const [userPGs, setUserPGs] = useState([]);
  const [bookedPGs, setBookedPGs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchPGData().then((data) => {
      if (user.role === 'admin') {
        setUserPGs(data.filter(pg => pg.owner === user.id));
      }
    });
  }, [user, navigate, fetchPGData]);

  useEffect(() => {
    if (user?.role === 'user') {
      fetchUserBookings(user.id);
    }
  }, [user]);

  const fetchUserBookings = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
      const result = await res.json();

      if (result.success && result.bookings) {
        setBookedPGs(result.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking cancel successfully!");
        setBookedPGs(bookedPGs.filter(booking => booking._id !== bookingId));
      } else {
        alert("Failed to delete booking!");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="pg-listings">
        <h2>{user.role === 'admin' ? 'Your Listed PGs' : 'Your Booked PGs'}</h2>
        {user.role === 'admin' ? (
          <PGList data={userPGs} />
        ) : (
          <BookedPGList data={bookedPGs} onDelete={deleteBooking} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
