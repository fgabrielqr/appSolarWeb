import CalculationPage from './pages/CalculationPage';
import EnergySavingScreen from './pages/EnergySavingScreen';
import HomePage from './pages/HomePage'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comodato" element={<CalculationPage />} />
        <Route path="/compensacao" element={<EnergySavingScreen />} /> 
      </Routes>
    </Router>
  );
}

export default App;
