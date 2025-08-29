import React, { useState } from 'react';
import { User, Target, Clock, BookOpen, Settings, Brain } from 'lucide-react';
import './RoadmapForm.css';

const RoadmapForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    learningGoal: '',
    currentLevel: 'beginner',
    timeCommitment: '5-10',
    preferredFormat: [],
    aiDomain: '',
    specificTopics: '',
    outputFormat: 'interactive'
  });

  const [errors, setErrors] = useState({});

  const aiDomains = [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
    'Data Science',
    'AI Ethics',
    'Robotics',
    'Neural Networks',
    'AI Tools & Frameworks'
  ];

  const formatOptions = [
    { value: 'videos', label: 'Video Courses' },
    { value: 'books', label: 'Books & eBooks' },
    { value: 'articles', label: 'Articles & Blogs' },
    { value: 'interactive', label: 'Interactive Courses' },
    { value: 'projects', label: 'Hands-on Projects' },
    { value: 'podcasts', label: 'Podcasts' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        preferredFormat: checked 
          ? [...prev.preferredFormat, value]
          : prev.preferredFormat.filter(format => format !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.learningGoal.trim()) {
      newErrors.learningGoal = 'Learning goal is required';
    }
    
    if (!formData.aiDomain) {
      newErrors.aiDomain = 'Please select an AI domain';
    }
    
    if (formData.preferredFormat.length === 0) {
      newErrors.preferredFormat = 'Please select at least one learning format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="roadmap-form" onSubmit={handleSubmit}>
      <h3><Target className="icon" /> Define Your Learning Goal</h3>
      
      <div className="form-group">
        <label htmlFor="learningGoal">
          <Brain className="icon" />
          What do you want to achieve? *
        </label>
        <textarea
          id="learningGoal"
          name="learningGoal"
          value={formData.learningGoal}
          onChange={handleChange}
          placeholder="e.g., I want to become a machine learning engineer, build chatbots, understand AI ethics..."
          rows={3}
          className={errors.learningGoal ? 'error' : ''}
        />
        {errors.learningGoal && <span className="error-message">{errors.learningGoal}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="aiDomain">
          <BookOpen className="icon" />
          Primary AI Domain *
        </label>
        <select
          id="aiDomain"
          name="aiDomain"
          value={formData.aiDomain}
          onChange={handleChange}
          className={errors.aiDomain ? 'error' : ''}
        >
          <option value="">Select your area of interest</option>
          {aiDomains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
        {errors.aiDomain && <span className="error-message">{errors.aiDomain}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="currentLevel">
          <User className="icon" />
          Current Skill Level
        </label>
        <select
          id="currentLevel"
          name="currentLevel"
          value={formData.currentLevel}
          onChange={handleChange}
        >
          <option value="beginner">Beginner - New to AI/ML</option>
          <option value="intermediate">Intermediate - Some experience</option>
          <option value="advanced">Advanced - Strong background</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="timeCommitment">
          <Clock className="icon" />
          Weekly Time Commitment
        </label>
        <select
          id="timeCommitment"
          name="timeCommitment"
          value={formData.timeCommitment}
          onChange={handleChange}
        >
          <option value="1-5">1-5 hours per week</option>
          <option value="5-10">5-10 hours per week</option>
          <option value="10-20">10-20 hours per week</option>
          <option value="20+">20+ hours per week</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <BookOpen className="icon" />
          Preferred Learning Formats *
        </label>
        <div className="checkbox-group">
          {formatOptions.map(option => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.preferredFormat.includes(option.value)}
                onChange={handleChange}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.preferredFormat && <span className="error-message">{errors.preferredFormat}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="specificTopics">
          <Settings className="icon" />
          Specific Topics/Technologies (Optional)
        </label>
        <textarea
          id="specificTopics"
          name="specificTopics"
          value={formData.specificTopics}
          onChange={handleChange}
          placeholder="e.g., TensorFlow, PyTorch, computer vision applications, ethical AI..."
          rows={2}
        />
      </div>

      <div className="form-group">
        <label htmlFor="outputFormat">
          <Target className="icon" />
          Roadmap Format
        </label>
        <select
          id="outputFormat"
          name="outputFormat"
          value={formData.outputFormat}
          onChange={handleChange}
        >
          <option value="interactive">Interactive Timeline</option>
          <option value="pdf">PDF Document</option>
          <option value="checklist">Simple Checklist</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate My Roadmap 🚀'}
      </button>
    </form>
  );
};

export default RoadmapForm;