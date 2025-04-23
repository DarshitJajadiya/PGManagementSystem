import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PGContext from "../context/PgContext";
import BookedPGList from "./bookedpglist";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { fetchPGData } = useContext(PGContext);
  const [userPGs, setUserPGs] = useState([]);
  const [bookings, setBookings] = useState({});
  const [bookedPGs, setBookedPGs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      fetchPGData()
        .then((data) => {
          const ownerPGs = data.filter((pg) => pg.owner === user.id);
          setUserPGs(ownerPGs);
          fetchBookingsForPGs(ownerPGs);
        })
        .catch((err) => console.error("Error fetching PG data:", err));
    } else if (user.role === "user") {
      fetchUserBookings();
    }
  }, [user]);

  const fetchBookingsForPGs = async (pgs) => {
    try {
      const pgIds = pgs.map((pg) => pg._id);
      const res = await fetch("http://localhost:5000/api/bookings/owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pgIds }),
      });

      const result = await res.json();
      if (result.success) {
        setBookings(result.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      console.log("Fetching user bookings for user ID:", user.id);
      const res = await fetch(`http://localhost:5000/api/bookings/user/${user.id}`);
      const result = await res.json();
      console.log(result);
      if (!result.success) {
        alert("No bookings found for this user.");
        return;
      }
      if (result.success) {
        console.log("User bookings:", result.bookings);
        setBookedPGs(result.bookings);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking canceled successfully!");
        setBookedPGs((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
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
      <h1 className="profile-title">Profile</h1>

      <div className="user-info owner-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {user.role === "admin" && (
        <div className="pg-listings owner-listings">
          <h2>Your Listed PGs</h2>
          <div className="pg-list">
            {userPGs.map((pg) => (
              <div key={pg._id} className="pg-card owner-card">
                {pg.images?.length > 0 && (
                  <img
                    src={`http://localhost:5000/uploads/${pg.images[0]}`}
                    alt={pg.name}
                    className="pg-image owner-image"
                  />
                )}
                <h3>{pg.name}</h3>
                <p><strong>Location:</strong> {pg.location}</p>
                <p><strong>Price:</strong> ₹{pg.price}</p>


                <h4>Bookings:</h4>
                {bookings[pg._id] && bookings[pg._id].length > 0 ? (
                  bookings[pg._id].map((booking) => (
                    <div key={booking._id} className="booking-details owner-booking">
                      <p><strong>Booked By:</strong> {booking.userId.name}</p>
                      <p><strong>Email:</strong> {booking.userId.email}</p>
                      <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                      <p><strong>Duration:</strong> {booking.duration} months</p>
                      <p><strong>Status:</strong> {booking.status}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-pg-message owner-no-bookings">No bookings yet.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {user.role === "user" && (
        <div className="pg-listings">
          <h2>Your Booked PGs</h2>
          <BookedPGList data={bookedPGs} onDelete={deleteBooking} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
