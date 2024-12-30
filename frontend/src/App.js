import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homemain from './mainpage/Homemain';
import { AuthProvider } from './context/AuthContext';
import { PGProvider } from './context/PgContext';
import ResultsPage from './pages/results'
import PGDetailsPage from './pages/pg-details'
function App() {
  return (
    <AuthProvider>
      <PGProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homemain />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/pg-details" element={<PGDetailsPage />} />

          </Routes>
        </Router>
      </PGProvider>
    </AuthProvider>
  );
}

export default App;
