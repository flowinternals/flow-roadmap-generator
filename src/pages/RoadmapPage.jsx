import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { roadmapGenerator } from '../services/roadmapGenerator';
import RoadmapVisualization from '../components/RoadmapVisualization';
import RoadmapExport from '../components/RoadmapExport';
import { ArrowLeft, Download, Share2, Calendar, Clock, Target } from 'lucide-react';
import './RoadmapPage.css';

const RoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('overview');

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        if (!location.state?.formData) {
          navigate('/');
          return;
        }

        setLoading(true);
        const data = await roadmapGenerator.generateRoadmap(location.state.formData);
        setRoadmapData(data);
      } catch (err) {
        setError('Failed to generate roadmap. Please try again.');
        console.error('Roadmap generation error:', err);
      } finally {
        setLoading(false);
      }
    };

    generateRoadmap();
  }, [location.state, navigate]);

  const handleBackToForm = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="roadmap-page loading">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <h2>Generating Your Personalized Roadmap...</h2>
            <p>Analyzing your preferences and creating the perfect learning path</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="roadmap-page error">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleBackToForm} className="back-button">
            <ArrowLeft className="icon" />
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="roadmap-page error">
        <div className="error-container">
          <h2>No roadmap data available</h2>
          <button onClick={handleBackToForm} className="back-button">
            <ArrowLeft className="icon" />
            Create New Roadmap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <button onClick={handleBackToForm} className="back-button">
          <ArrowLeft className="icon" />
          Back to Form
        </button>
        
        <div className="roadmap-title">
          <h1>{roadmapData.title}</h1>
          <p>{roadmapData.description}</p>
        </div>

        <div className="roadmap-actions">
          <RoadmapExport roadmapData={roadmapData} currentView={currentView} />
        </div>
      </div>

      <div className="roadmap-stats">
        <div className="stat-card">
          <Calendar className="icon" />
          <div>
            <h3>{roadmapData.estimatedDuration.weeks}</h3>
            <p>Weeks</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock className="icon" />
          <div>
            <h3>{roadmapData.userProfile.timeCommitment}</h3>
            <p>Hours/Week</p>
          </div>
        </div>
        <div className="stat-card">
          <Target className="icon" />
          <div>
            <h3>{roadmapData.roadmap.phases.length}</h3>
            <p>Phases</p>
          </div>
        </div>
      </div>

      <div className="roadmap-content">
        <RoadmapVisualization roadmapData={roadmapData} onViewChange={setCurrentView} />
      </div>
    </div>
  );
};

export default RoadmapPage;