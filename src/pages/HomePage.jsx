import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapForm from '../components/RoadmapForm';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to roadmap page with the form data
    navigate('/roadmap', { state: { formData } });
    setIsGenerating(false);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Create Your Personalized Learning Roadmap</h2>
        <p>
          Tell us about your goals, current skill level, and preferences, 
          and we'll generate a customized learning path just for you.
        </p>
      </div>
      
      <div className="form-section">
        <RoadmapForm onSubmit={handleFormSubmit} isLoading={isGenerating} />
      </div>
      
      {isGenerating && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Generating your personalized roadmap...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;