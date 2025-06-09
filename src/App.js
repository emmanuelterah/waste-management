import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkipLandingPage, { NextStep } from '../src/components/pages/skip-landing-page/SkipLandingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkipLandingPage />} />
        <Route path="/next-step" element={<NextStep />} />
      </Routes>
    </Router>
  );
}

export default App;
