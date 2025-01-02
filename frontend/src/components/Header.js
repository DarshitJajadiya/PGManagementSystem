import React, { useContext } from 'react';
import LoginForm from '../pages/LoginForm';
import SignUpForm from '../pages/SignUpForm';
import Modal from './Modal';
import AuthContext from '../context/AuthContext';
import AddPGForm from '../components/addpg';
import ContactUsModal from '../components/contactus';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = React.useState(false);
  const [isAddPGModalOpen, setAddPGModalOpen] = React.useState(false);
  const [isContactUsModalOpen, setContactUsModalOpen] = React.useState(false); // State for Contact Us modal

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  const openAddPGModal = () => setAddPGModalOpen(true);
  const closeAddPGModal = () => setAddPGModalOpen(false);

  const openContactUsModal = () => setContactUsModalOpen(true); // Open Contact Us modal
  const closeContactUsModal = () => setContactUsModalOpen(false); // Close Contact Us modal

  return (
    <header className="header">
      <h1>Vidyashram PG</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact" onClick={openContactUsModal}>Contact Us</a> {/* Open Contact Us modal */}
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <span className="login-btn">Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
            {/* Add PG button visible only to admins or logged-in users */}
            {user.role === 'admin' && (
              <button onClick={openAddPGModal}>Add PG</button>
            )}
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
          <LoginForm close={closeLoginModal} />
        </Modal>
      )}

      {isSignUpModalOpen && (
        <Modal onClose={closeSignUpModal}>
          <SignUpForm />
        </Modal>
      )}

      {isAddPGModalOpen && (
        <Modal onClose={closeAddPGModal}>
          <AddPGForm />
        </Modal>
      )}

      {isContactUsModalOpen && (
        <Modal onClose={closeContactUsModal}>
          <ContactUsModal />
        </Modal>
      )}
    </header>
  );
}

export default Header;
