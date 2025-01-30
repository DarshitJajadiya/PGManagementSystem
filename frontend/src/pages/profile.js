import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
