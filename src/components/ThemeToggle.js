import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <div className="slider round">
          <span className="slider-icon">🌙</span>
          <span className="slider-icon">☀️</span>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle; 