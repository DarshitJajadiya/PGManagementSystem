import React, { useState } from 'react';
import LoginForm from './LoginForm';  
import SignUpForm from './SignUpForm';  
import Modal from './Modal';
import './HeaderFooter.css';

function Header() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

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
        <button onClick={openLoginModal}>Log In</button>
        <button onClick={openSignUpModal}>Sign Up</button>
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
