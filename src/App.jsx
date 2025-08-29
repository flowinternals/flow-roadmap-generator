import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <h1>🚀 Flow Roadmap Generator</h1>
              <p>AI-Powered Learning Path Creator</p>
            </div>
            <div className="theme-toggle-container">
              <ThemeToggle />
            </div>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;