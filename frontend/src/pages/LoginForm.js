import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

function LoginForm({ close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await login(email, password);
      setSuccess('Successfully logged in!');
      setShowPopup(true); // Show the pop-up
      setTimeout(() => {
        setShowPopup(false); // Hide the pop-up after 3 seconds
        close(); // Close the login form
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-modal">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>

      {/* Pop-up Notification */}
      {showPopup && (
        <div className="popup">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
