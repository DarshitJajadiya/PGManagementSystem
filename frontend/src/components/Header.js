import React, { useContext } from 'react';
import LoginForm from '../pages/LoginForm';
import SignUpForm from '../pages/SignUpForm';
import Modal from './Modal';
import AuthContext from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = React.useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  return (
    <header className="header">
      <h1>Vidyashram PG</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact Us</a>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={openLoginModal}>Log In</button>
            <button onClick={openSignUpModal}>Sign Up</button>
          </>
        )}
      </div>

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <LoginForm />
        </Modal>
      )}

      {isSignUpModalOpen && (
        <Modal onClose={closeSignUpModal}>
          <SignUpForm />
        </Modal>
      )}
    </header>
  );
}

export default Header;
