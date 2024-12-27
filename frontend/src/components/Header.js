import React, { useContext } from 'react';
import LoginForm from '../pages/LoginForm';
import SignUpForm from '../pages/SignUpForm';
import Modal from './Modal';
import AuthContext from '../context/AuthContext';
import AddPGForm from '../components/addpg'

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = React.useState(false);
  const [isAddPGModalOpen, setAddPGModalOpen] = React.useState(false); // State for Add PG modal

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);
  const openAddPGModal = () => setAddPGModalOpen(true); // Open Add PG modal
  const closeAddPGModal = () => setAddPGModalOpen(false); // Close Add PG modal

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

      {/* Login Modal */}
      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <LoginForm close={closeLoginModal} />
        </Modal>
      )}

      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <Modal onClose={closeSignUpModal}>
          <SignUpForm />
        </Modal>
      )}

      {/* Add PG Modal */}
      {isAddPGModalOpen && (
        <Modal onClose={closeAddPGModal}>
          <AddPGForm />
        </Modal>
      )}
    </header>
  );
}

export default Header;
