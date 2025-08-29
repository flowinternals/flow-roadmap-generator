
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  Calendar, Clock, BookOpen, Target, ChevronDown, ChevronRight, 
  Play, CheckCircle, Star, ExternalLink, User, Brain 
} from 'lucide-react';
import './RoadmapVisualization.css';

const RoadmapVisualization = ({ roadmapData, onViewChange }) => {
  const [activeView, setActiveView] = useState('overview');
  const [expandedPhases, setExpandedPhases] = useState({});
  const [completedTopics, setCompletedTopics] = useState({});

  // Set initial view based on user's selected output format
  useEffect(() => {
    if (roadmapData?.userProfile?.outputFormat) {
      const format = roadmapData.userProfile.outputFormat;
      if (format === 'interactive') {
        setActiveView('timeline');
        onViewChange?.('timeline');
      } else if (format === 'pdf') {
        setActiveView('pdf');
        onViewChange?.('pdf');
      } else if (format === 'checklist') {
        setActiveView('checklist');
        onViewChange?.('checklist');
      }
    }
  }, [roadmapData, onViewChange]);

  // Notify parent when view changes
  useEffect(() => {
    onViewChange?.(activeView);
  }, [activeView, onViewChange]);

  const togglePhaseExpansion = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#4ecdc4';
      case 'intermediate': return '#f39c12';
      case 'advanced': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'theory': return <BookOpen className="topic-icon" />;
      case 'practical': return <Play className="topic-icon" />;
      case 'framework': return <Brain className="topic-icon" />;
      case 'projects': return <Target className="topic-icon" />;
      default: return <Star className="topic-icon" />;
    }
  };

  const renderTimelineView = () => {
    const timelineData = roadmapData.timeline.filter(item => !item.isPhaseEnd);

    return (
      <div className="timeline-view">
        <div className="timeline-header">
          <h3>Learning Timeline</h3>
          <p>Your personalized learning journey over {roadmapData.estimatedDuration.weeks} weeks</p>
        </div>
        
        <div className="timeline-chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="title" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`${value} weeks`, 'Duration']}
                labelFormatter={(label) => `Topic: ${label}`}
              />
              <Bar 
                dataKey="duration" 
                fill="#667eea"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-list">
          {timelineData.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker">
                <div 
                  className="timeline-dot"
                  style={{ backgroundColor: getDifficultyColor(item.difficulty) }}
                >
                  {index + 1}
                </div>
                {index < timelineData.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-weeks">Week {item.startWeek}-{item.endWeek}</div>
                <h4>{item.title}</h4>
                <div className="timeline-meta">
                  <span className={`difficulty ${item.difficulty}`}>
                    {item.difficulty}
                  </span>
                  <span className="duration">
                    <Clock className="icon" />
                    {item.duration} weeks
                  </span>
                  <span className="phase">
                    {item.phase}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPhaseView = () => {
    return (
      <div className="phase-view">
        <div className="phase-header">
          <h3>Learning Phases</h3>
          <p>Organized curriculum broken down into manageable phases</p>
        </div>

        <div className="phases-container">
          {roadmapData.roadmap.phases.map((phase, phaseIndex) => (
            <div key={phase.id} className="phase-card">
              <div 
                className="phase-header-bar"
                onClick={() => togglePhaseExpansion(phase.id)}
              >
                <div className="phase-info">
                  <div className="phase-number">Phase {phaseIndex + 1}</div>
                  <div>
                    <h4>{phase.title}</h4>
                    <p>{phase.description}</p>
                  </div>
                </div>
                <div className="phase-toggle">
                  {expandedPhases[phase.id] ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>

              {expandedPhases[phase.id] && (
                <div className="phase-content">
                  <div className="topics-grid">
                    {phase.topics.map((topic) => (
                      <div 
                        key={topic.id} 
                        className={`topic-card ${completedTopics[topic.id] ? 'completed' : ''}`}
                      >
                        <div className="topic-header">
                          <div className="topic-type">
                            {getTypeIcon(topic.type)}
                            <span className={`difficulty ${topic.difficulty}`}>
                              {topic.difficulty}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleTopicCompletion(topic.id)}
                            className="completion-button"
                          >
                            {completedTopics[topic.id] ? 
                              <CheckCircle className="completed-icon" /> : 
                              <div className="incomplete-circle" />
                            }
                          </button>
                        </div>
                        
                        <h5>{topic.title}</h5>
                        <p>{topic.description}</p>
                        
                        <div className="topic-meta">
                          <span className="duration">
                            <Clock className="icon" />
                            {topic.duration}
                          </span>
                        </div>

                        {roadmapData.resources[topic.id] && (
                          <div className="topic-resources">
                            <h6>Recommended Resources:</h6>
                            <div className="resource-links">
                              {roadmapData.resources[topic.id].slice(0, 2).map((resource, idx) => (
                                resource && (
                                  <a 
                                    key={idx} 
                                    href={resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                  >
                                    <ExternalLink className="icon" />
                                    {resource.title}
                                  </a>
                                )
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    const totalTopics = roadmapData.roadmap.phases.reduce((acc, phase) => acc + phase.topics.length, 0);
    const completedCount = Object.values(completedTopics).filter(Boolean).length;
    const progressPercentage = (completedCount / totalTopics) * 100;

    return (
      <div className="overview-view">
        <div className="overview-header">
          <h3>Roadmap Overview</h3>
          <p>Complete overview of your learning journey</p>
        </div>

        <div className="progress-section">
          <div className="progress-stats">
            <div className="progress-circle">
              <div className="progress-value">{Math.round(progressPercentage)}%</div>
              <div className="progress-label">Complete</div>
            </div>
            <div className="progress-details">
              <div className="stat">
                <span className="number">{completedCount}</span>
                <span className="label">Completed</span>
              </div>
              <div className="stat">
                <span className="number">{totalTopics - completedCount}</span>
                <span className="label">Remaining</span>
              </div>
              <div className="stat">
                <span className="number">{totalTopics}</span>
                <span className="label">Total Topics</span>
              </div>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="user-profile">
          <h4>Your Learning Profile</h4>
          <div className="profile-grid">
            <div className="profile-item">
              <User className="icon" />
              <span>Level: {roadmapData.userProfile.level}</span>
            </div>
            <div className="profile-item">
              <Clock className="icon" />
              <span>Time: {roadmapData.userProfile.timeCommitment} hrs/week</span>
            </div>
            <div className="profile-item">
              <Target className="icon" />
              <span>Domain: {roadmapData.userProfile.domain}</span>
            </div>
            <div className="profile-item">
              <Calendar className="icon" />
              <span>Duration: {roadmapData.estimatedDuration.weeks} weeks</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPDFView = () => {
    return (
      <div className="pdf-view">
        <div className="pdf-header">
          <h3>PDF Document Format</h3>
          <p>Structured document view optimized for printing and sharing</p>
        </div>

        <div className="pdf-document">
          <div className="pdf-title-page">
            <h1>{roadmapData.title}</h1>
            <p className="subtitle">{roadmapData.description}</p>
            
            <div className="pdf-meta">
              <div className="meta-item">
                <strong>Level:</strong> {roadmapData.userProfile.level}
              </div>
              <div className="meta-item">
                <strong>Domain:</strong> {roadmapData.userProfile.domain}
              </div>
              <div className="meta-item">
                <strong>Duration:</strong> {roadmapData.estimatedDuration.weeks} weeks
              </div>
              <div className="meta-item">
                <strong>Time Commitment:</strong> {roadmapData.userProfile.timeCommitment} hours/week
              </div>
            </div>
          </div>

          {roadmapData.roadmap.phases.map((phase, phaseIndex) => (
            <div key={phase.id} className="pdf-phase">
              <h2>Phase {phaseIndex + 1}: {phase.title}</h2>
              <p className="phase-description">{phase.description}</p>
              
              <div className="pdf-topics">
                {phase.topics.map((topic, topicIndex) => (
                  <div key={topic.id} className="pdf-topic">
                    <h3>{topicIndex + 1}. {topic.title}</h3>
                    <p>{topic.description}</p>
                    <div className="topic-details">
                      <span className={`difficulty ${topic.difficulty}`}>
                        Difficulty: {topic.difficulty}
                      </span>
                      <span className="duration">
                        Duration: {topic.duration}
                      </span>
                      <span className="type">
                        Type: {topic.type}
                      </span>
                    </div>
                    
                    {roadmapData.resources[topic.id] && (
                      <div className="topic-resources">
                        <h4>Recommended Resources:</h4>
                        <ul>
                          {roadmapData.resources[topic.id].map((resource, idx) => (
                            resource && (
                              <li key={idx}>
                                <strong>{resource.title}</strong>
                                {resource.author && ` by ${resource.author}`}
                                {resource.provider && ` (${resource.provider})`}
                                {resource.url && (
                                  <span className="url"> - {resource.url}</span>
                                )}
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChecklistView = () => {
    const allTopics = roadmapData.roadmap.phases.flatMap(phase => 
      phase.topics.map(topic => ({ ...topic, phaseName: phase.title }))
    );

    return (
      <div className="checklist-view">
        <div className="checklist-header">
          <h3>Simple Checklist Format</h3>
          <p>Track your progress through each learning topic</p>
        </div>

        <div className="checklist-stats">
          <div className="progress-summary">
            <span className="completed-count">
              {Object.values(completedTopics).filter(Boolean).length}
            </span>
            <span className="separator">/</span>
            <span className="total-count">{allTopics.length}</span>
            <span className="label">Topics Completed</span>
          </div>
        </div>

        <div className="checklist-container">
          {roadmapData.roadmap.phases.map((phase, phaseIndex) => (
            <div key={phase.id} className="checklist-phase">
              <h3 className="phase-title">
                <span className="phase-number">Phase {phaseIndex + 1}</span>
                {phase.title}
              </h3>
              
              <div className="checklist-items">
                {phase.topics.map((topic, topicIndex) => (
                  <div key={topic.id} className="checklist-item">
                    <label className="checklist-label">
                      <input
                        type="checkbox"
                        checked={completedTopics[topic.id] || false}
                        onChange={() => toggleTopicCompletion(topic.id)}
                        className="checklist-checkbox"
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checklist-content">
                        <h4 className="topic-title">
                          {phaseIndex + 1}.{topicIndex + 1} {topic.title}
                        </h4>
                        <p className="topic-description">{topic.description}</p>
                        <div className="topic-meta">
                          <span className={`difficulty ${topic.difficulty}`}>
                            {topic.difficulty}
                          </span>
                          <span className="duration">
                            {topic.duration}
                          </span>
                          <span className="type">
                            {topic.type}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="roadmap-visualization">
      <div className="view-tabs">
        <button 
          className={activeView === 'overview' ? 'active' : ''}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={activeView === 'phases' ? 'active' : ''}
          onClick={() => setActiveView('phases')}
        >
          Learning Phases
        </button>
        <button 
          className={activeView === 'timeline' ? 'active' : ''}
          onClick={() => setActiveView('timeline')}
        >
          Interactive Timeline
        </button>
        <button 
          className={activeView === 'pdf' ? 'active' : ''}
          onClick={() => setActiveView('pdf')}
        >
          PDF Format
        </button>
        <button 
          className={activeView === 'checklist' ? 'active' : ''}
          onClick={() => setActiveView('checklist')}
        >
          Checklist
        </button>
      </div>

      <div className="view-content">
        {activeView === 'overview' && renderOverview()}
        {activeView === 'phases' && renderPhaseView()}
        {activeView === 'timeline' && renderTimelineView()}
        {activeView === 'pdf' && renderPDFView()}
        {activeView === 'checklist' && renderChecklistView()}
      </div>
    </div>
  );
};

export default RoadmapVisualization;