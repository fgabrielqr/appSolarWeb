import CalculationPage from './pages/CalculationPage';
import EnergySavingScreen from './pages/EnergySavingScreen';
import HomePage from './pages/HomePage'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculation" element={<CalculationPage />} />
        <Route path="/energy" element={<EnergySavingScreen />} /> 
      </Routes>
    </Router>
  );
}

export default App;
