import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homemain from './mainpage/Homemain';
import { AuthProvider } from './context/AuthContext';
import { PGProvider } from './context/PgContext';

function App() {
  return (
    <AuthProvider>
      <PGProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homemain />} />
          </Routes>
        </Router>
      </PGProvider>
    </AuthProvider>
  );
}

export default App;
