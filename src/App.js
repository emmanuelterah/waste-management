import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkipLandingPage, { NextStep } from '../src/components/pages/skip-landing-page/SkipLandingPage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<SkipLandingPage />} />
          <Route path="/next-step" element={<NextStep />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
