import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-container">
        <div className={`toggle-slider ${isDarkMode ? 'dark' : 'light'}`}>
          {isDarkMode ? (
            <Moon className="toggle-icon" />
          ) : (
            <Sun className="toggle-icon" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;