import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import PGContext from '../context/PgContext';

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
        setBookedPGs(result.bookings.map(booking => booking.pgId)); 
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
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
          <PGList data={bookedPGs} />
        )}
      </div>
    </div>
  );
};

const PGList = ({ data }) => {
  return data.length > 0 ? (
    <div className="pg-list">
      {data.map((pg) => (
        <div key={pg._id} className="pg-card">
          {pg.images?.length > 0 && (
            <img src={`http://localhost:5000/uploads/${pg.images[0]}`} alt={pg.name} className="pg-image" />
          )}
          <h3>{pg.name}</h3>
          <p><strong>Location:</strong> {pg.location}</p>
          <p><strong>Price:</strong> ₹{pg.price}</p>
          <p><strong>Amenities:</strong> {pg.amenities?.join(', ')}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-pg-message">No PGs found.</p>
  );
};

export default ProfilePage;
