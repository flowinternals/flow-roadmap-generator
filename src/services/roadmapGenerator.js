// AI Roadmap Generation Service
// This simulates an AI-powered roadmap generation system

import { roadmapTemplates } from '../utils/roadmapTemplates';
import { learningResources } from '../utils/learningResources';

class RoadmapGenerator {
  constructor() {
    this.templates = roadmapTemplates;
    this.resources = learningResources;
  }

  async generateRoadmap(userInput) {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const {
      learningGoal,
      currentLevel,
      timeCommitment,
      preferredFormat,
      aiDomain,
      specificTopics,
      outputFormat
    } = userInput;

    // Find the most suitable template based on AI domain
    const template = this.getTemplateForDomain(aiDomain, currentLevel);
    
    // Customize the roadmap based on user preferences
    const customizedRoadmap = this.customizeRoadmap(template, {
      currentLevel,
      timeCommitment,
      preferredFormat,
      specificTopics,
      learningGoal
    });

    // Generate timeline based on time commitment
    const timeline = this.generateTimeline(customizedRoadmap, timeCommitment);

    // Select appropriate resources
    const selectedResources = this.selectResources(customizedRoadmap, preferredFormat);

    return {
      id: this.generateId(),
      title: `${aiDomain} Learning Roadmap`,
      description: `Personalized roadmap for: ${learningGoal}`,
      userProfile: {
        level: currentLevel,
        timeCommitment,
        preferences: preferredFormat,
        domain: aiDomain,
        outputFormat
      },
      roadmap: customizedRoadmap,
      timeline,
      resources: selectedResources,
      estimatedDuration: this.calculateDuration(timeline),
      createdAt: new Date().toISOString()
    };
  }

  getTemplateForDomain(domain, level) {
    const domainTemplates = this.templates[domain] || this.templates['Machine Learning'];
    return domainTemplates[level] || domainTemplates.beginner;
  }

  customizeRoadmap(template, preferences) {
    const { currentLevel, specificTopics } = preferences;
    
    let customizedPhases = template.phases.map(phase => ({
      ...phase,
      topics: phase.topics.map(topic => ({
        ...topic,
        difficulty: this.adjustDifficulty(topic.difficulty, currentLevel)
      }))
    }));

    // Add specific topics if mentioned
    if (specificTopics) {
      customizedPhases = this.integrateSpecificTopics(customizedPhases, specificTopics);
    }

    return {
      ...template,
      phases: customizedPhases
    };
  }

  adjustDifficulty(baseDifficulty, userLevel) {
    const levelMap = { beginner: 1, intermediate: 2, advanced: 3 };
    const userLevelNum = levelMap[userLevel];
    
    if (userLevelNum >= 2 && baseDifficulty === 'beginner') {
      return 'intermediate';
    }
    if (userLevelNum >= 3 && baseDifficulty === 'intermediate') {
      return 'advanced';
    }
    return baseDifficulty;
  }

  integrateSpecificTopics(phases, specificTopics) {
    const topics = specificTopics.toLowerCase();
    
    // Add relevant topics to appropriate phases
    phases.forEach(phase => {
      if (topics.includes('tensorflow') && phase.title.toLowerCase().includes('implementation')) {
        phase.topics.push({
          id: 'tensorflow-spec',
          title: 'TensorFlow Deep Dive',
          description: 'Advanced TensorFlow concepts and implementation',
          duration: '2 weeks',
          difficulty: 'intermediate',
          type: 'framework'
        });
      }
      
      if (topics.includes('pytorch') && phase.title.toLowerCase().includes('implementation')) {
        phase.topics.push({
          id: 'pytorch-spec',
          title: 'PyTorch Mastery',
          description: 'Comprehensive PyTorch training and best practices',
          duration: '2 weeks',
          difficulty: 'intermediate',
          type: 'framework'
        });
      }
      
      if (topics.includes('ethics') && phase.title.toLowerCase().includes('advanced')) {
        phase.topics.push({
          id: 'ai-ethics-spec',
          title: 'AI Ethics & Responsible AI',
          description: 'Understanding bias, fairness, and ethical AI development',
          duration: '1 week',
          difficulty: 'intermediate',
          type: 'theory'
        });
      }
    });

    return phases;
  }

  generateTimeline(roadmap, timeCommitment) {
    const hoursPerWeek = this.parseTimeCommitment(timeCommitment);
    let currentWeek = 1;
    const timeline = [];

    roadmap.phases.forEach((phase, phaseIndex) => {
      const phaseStart = currentWeek;
      let phaseWeeks = 0;

      phase.topics.forEach(topic => {
        const topicDuration = this.parseTopicDuration(topic.duration);
        const weeksNeeded = Math.ceil(topicDuration / hoursPerWeek);
        
        timeline.push({
          id: topic.id,
          title: topic.title,
          phase: phase.title,
          startWeek: currentWeek,
          endWeek: currentWeek + weeksNeeded - 1,
          duration: weeksNeeded,
          estimatedHours: topicDuration,
          difficulty: topic.difficulty,
          type: topic.type
        });
        
        currentWeek += weeksNeeded;
        phaseWeeks += weeksNeeded;
      });

      // Add phase summary
      timeline.push({
        id: `phase-${phaseIndex}`,
        title: `${phase.title} - Phase Complete`,
        phase: phase.title,
        startWeek: phaseStart,
        endWeek: currentWeek - 1,
        duration: phaseWeeks,
        type: 'milestone',
        isPhaseEnd: true
      });
    });

    return timeline;
  }

  parseTimeCommitment(commitment) {
    const hourMap = {
      '1-5': 3,
      '5-10': 7,
      '10-20': 15,
      '20+': 25
    };
    return hourMap[commitment] || 7;
  }

  parseTopicDuration(duration) {
    // Parse duration strings like "2 weeks", "1 week", etc.
    const match = duration.match(/(\d+)\s*week/);
    if (match) {
      return parseInt(match[1]) * 7; // Convert weeks to hours (assuming 7 hours per week average)
    }
    return 7; // Default to 1 week worth
  }

  selectResources(roadmap, preferredFormats) {
    const selectedResources = {};

    roadmap.phases.forEach(phase => {
      phase.topics.forEach(topic => {
        const topicResources = this.resources[topic.type] || this.resources.general;
        
        selectedResources[topic.id] = preferredFormats.map(format => {
          const formatResources = topicResources[format] || [];
          return formatResources[Math.floor(Math.random() * formatResources.length)];
        }).filter(Boolean);
      });
    });

    return selectedResources;
  }

  calculateDuration(timeline) {
    const maxWeek = Math.max(...timeline.map(item => item.endWeek || item.startWeek));
    return {
      weeks: maxWeek,
      months: Math.ceil(maxWeek / 4)
    };
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const roadmapGenerator = new RoadmapGenerator();
export default RoadmapGenerator;