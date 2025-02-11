import { Route, Routes } from 'react-router-dom';
import Homemain from './mainpage/Homemain';
import { AuthProvider } from './context/AuthContext';
import { PGProvider } from './context/PgContext';
import ResultsPage from './pages/results';
import PGDetailsPage from './pages/pg-details';
import Header from './components/Header';
import ProfilePage from './pages/profile';
import { BookingProvider } from './context/bookingContext';
import BookingPage from './pages/bookingpage';
import BookingConfirmation from './pages/bookingconfirmationpage';
import PaymentPage from './pages/payment';
function App() {
  return (
    <AuthProvider>
      <PGProvider>
        <BookingProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Homemain />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/pg-details" element={<PGDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/booking" element={<BookingPage />} /> 
          <Route path="/booking-confirmation" element={<BookingConfirmation />} /> 
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        </BookingProvider>
      </PGProvider>
    </AuthProvider>
  );
}

export default App;
