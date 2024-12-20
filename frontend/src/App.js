import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Homemain from './mainpage/Homemain';
function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Homemain />} /> 
      </Routes>
    </Router>
  );
}

export default App;
