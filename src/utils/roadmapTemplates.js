// Comprehensive roadmap templates for different AI domains and skill levels

export const roadmapTemplates = {
  'Machine Learning': {
    beginner: {
      title: 'Machine Learning Fundamentals',
      description: 'Complete beginner\'s path to machine learning mastery',
      phases: [
        {
          id: 'foundations',
          title: 'Mathematical Foundations',
          description: 'Build the mathematical foundation needed for ML',
          topics: [
            {
              id: 'math-basics',
              title: 'Linear Algebra Essentials',
              description: 'Vectors, matrices, eigenvalues, and their applications in ML',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'theory'
            },
            {
              id: 'statistics',
              title: 'Statistics & Probability',
              description: 'Statistical concepts crucial for understanding ML algorithms',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'theory'
            },
            {
              id: 'calculus',
              title: 'Calculus for ML',
              description: 'Derivatives and optimization fundamentals',
              duration: '1 week',
              difficulty: 'beginner',
              type: 'theory'
            }
          ]
        },
        {
          id: 'programming',
          title: 'Programming Skills',
          description: 'Master the tools and languages for ML development',
          topics: [
            {
              id: 'python-basics',
              title: 'Python Programming',
              description: 'Python fundamentals with focus on data manipulation',
              duration: '3 weeks',
              difficulty: 'beginner',
              type: 'practical'
            },
            {
              id: 'numpy-pandas',
              title: 'NumPy & Pandas',
              description: 'Data manipulation and analysis libraries',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'practical'
            },
            {
              id: 'matplotlib',
              title: 'Data Visualization',
              description: 'Creating plots and visualizations with Matplotlib and Seaborn',
              duration: '1 week',
              difficulty: 'beginner',
              type: 'practical'
            }
          ]
        },
        {
          id: 'core-ml',
          title: 'Core Machine Learning',
          description: 'Fundamental ML algorithms and concepts',
          topics: [
            {
              id: 'supervised-learning',
              title: 'Supervised Learning',
              description: 'Classification and regression algorithms',
              duration: '3 weeks',
              difficulty: 'intermediate',
              type: 'theory'
            },
            {
              id: 'unsupervised-learning',
              title: 'Unsupervised Learning',
              description: 'Clustering and dimensionality reduction',
              duration: '2 weeks',
              difficulty: 'intermediate',
              type: 'theory'
            },
            {
              id: 'model-evaluation',
              title: 'Model Evaluation & Validation',
              description: 'Cross-validation, metrics, and performance assessment',
              duration: '2 weeks',
              difficulty: 'intermediate',
              type: 'practical'
            }
          ]
        },
        {
          id: 'implementation',
          title: 'Hands-on Implementation',
          description: 'Apply ML concepts through practical projects',
          topics: [
            {
              id: 'scikit-learn',
              title: 'Scikit-learn Mastery',
              description: 'Complete guide to scikit-learn for ML implementation',
              duration: '3 weeks',
              difficulty: 'intermediate',
              type: 'framework'
            },
            {
              id: 'ml-projects',
              title: 'ML Projects Portfolio',
              description: 'Build 3-5 complete ML projects from data to deployment',
              duration: '4 weeks',
              difficulty: 'intermediate',
              type: 'projects'
            }
          ]
        }
      ]
    },
    intermediate: {
      title: 'Advanced Machine Learning',
      description: 'Deep dive into advanced ML concepts and techniques',
      phases: [
        {
          id: 'advanced-algorithms',
          title: 'Advanced Algorithms',
          description: 'Sophisticated ML techniques and ensemble methods',
          topics: [
            {
              id: 'ensemble-methods',
              title: 'Ensemble Methods',
              description: 'Random Forests, Gradient Boosting, XGBoost',
              duration: '2 weeks',
              difficulty: 'advanced',
              type: 'theory'
            },
            {
              id: 'feature-engineering',
              title: 'Advanced Feature Engineering',
              description: 'Feature selection, extraction, and transformation techniques',
              duration: '2 weeks',
              difficulty: 'advanced',
              type: 'practical'
            },
            {
              id: 'hyperparameter-tuning',
              title: 'Hyperparameter Optimization',
              description: 'Grid search, random search, and Bayesian optimization',
              duration: '1 week',
              difficulty: 'advanced',
              type: 'practical'
            }
          ]
        },
        {
          id: 'specialization',
          title: 'Domain Specialization',
          description: 'Focus on specific application areas',
          topics: [
            {
              id: 'time-series',
              title: 'Time Series Analysis',
              description: 'ARIMA, seasonal decomposition, and forecasting',
              duration: '3 weeks',
              difficulty: 'advanced',
              type: 'theory'
            },
            {
              id: 'nlp-basics',
              title: 'Natural Language Processing',
              description: 'Text preprocessing, sentiment analysis, and topic modeling',
              duration: '3 weeks',
              difficulty: 'advanced',
              type: 'theory'
            }
          ]
        }
      ]
    },
    advanced: {
      title: 'ML Engineering & Production',
      description: 'Production-ready ML systems and advanced topics',
      phases: [
        {
          id: 'ml-engineering',
          title: 'ML Engineering',
          description: 'Building scalable and maintainable ML systems',
          topics: [
            {
              id: 'mlops',
              title: 'MLOps & Model Deployment',
              description: 'CI/CD for ML, model versioning, and monitoring',
              duration: '3 weeks',
              difficulty: 'advanced',
              type: 'practical'
            },
            {
              id: 'distributed-ml',
              title: 'Distributed Machine Learning',
              description: 'Scaling ML with distributed computing frameworks',
              duration: '2 weeks',
              difficulty: 'advanced',
              type: 'practical'
            }
          ]
        }
      ]
    }
  },

  'Deep Learning': {
    beginner: {
      title: 'Deep Learning Fundamentals',
      description: 'Introduction to neural networks and deep learning',
      phases: [
        {
          id: 'neural-networks',
          title: 'Neural Network Basics',
          description: 'Understanding the building blocks of deep learning',
          topics: [
            {
              id: 'perceptron',
              title: 'Perceptron & Multi-layer Networks',
              description: 'From single perceptron to multi-layer neural networks',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'theory'
            },
            {
              id: 'backpropagation',
              title: 'Backpropagation Algorithm',
              description: 'Understanding how neural networks learn',
              duration: '2 weeks',
              difficulty: 'intermediate',
              type: 'theory'
            },
            {
              id: 'activation-functions',
              title: 'Activation Functions & Optimization',
              description: 'Different activation functions and optimization algorithms',
              duration: '1 week',
              difficulty: 'beginner',
              type: 'theory'
            }
          ]
        },
        {
          id: 'frameworks',
          title: 'Deep Learning Frameworks',
          description: 'Master popular deep learning frameworks',
          topics: [
            {
              id: 'tensorflow-basics',
              title: 'TensorFlow Fundamentals',
              description: 'Getting started with TensorFlow and Keras',
              duration: '3 weeks',
              difficulty: 'intermediate',
              type: 'framework'
            },
            {
              id: 'pytorch-basics',
              title: 'PyTorch Introduction',
              description: 'Dynamic neural networks with PyTorch',
              duration: '2 weeks',
              difficulty: 'intermediate',
              type: 'framework'
            }
          ]
        }
      ]
    },
    intermediate: {
      title: 'Advanced Deep Learning',
      description: 'Specialized architectures and advanced techniques',
      phases: [
        {
          id: 'advanced-architectures',
          title: 'Advanced Neural Architectures',
          description: 'CNNs, RNNs, and modern architectures',
          topics: [
            {
              id: 'cnn',
              title: 'Convolutional Neural Networks',
              description: 'Image processing and computer vision with CNNs',
              duration: '3 weeks',
              difficulty: 'advanced',
              type: 'theory'
            },
            {
              id: 'rnn-lstm',
              title: 'RNNs and LSTMs',
              description: 'Sequential data processing and memory networks',
              duration: '3 weeks',
              difficulty: 'advanced',
              type: 'theory'
            },
            {
              id: 'transformers',
              title: 'Transformers & Attention',
              description: 'Modern attention mechanisms and transformer architecture',
              duration: '3 weeks',
              difficulty: 'advanced',
              type: 'theory'
            }
          ]
        }
      ]
    }
  },

  'Natural Language Processing': {
    beginner: {
      title: 'NLP Fundamentals',
      description: 'Introduction to natural language processing',
      phases: [
        {
          id: 'text-basics',
          title: 'Text Processing Fundamentals',
          description: 'Basic text processing and linguistic concepts',
          topics: [
            {
              id: 'text-preprocessing',
              title: 'Text Preprocessing',
              description: 'Tokenization, stemming, lemmatization, and cleaning',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'practical'
            },
            {
              id: 'regex',
              title: 'Regular Expressions',
              description: 'Pattern matching and text extraction with regex',
              duration: '1 week',
              difficulty: 'beginner',
              type: 'practical'
            }
          ]
        },
        {
          id: 'classical-nlp',
          title: 'Classical NLP Techniques',
          description: 'Traditional approaches to NLP problems',
          topics: [
            {
              id: 'bag-of-words',
              title: 'Bag of Words & TF-IDF',
              description: 'Text representation and feature extraction',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'theory'
            },
            {
              id: 'sentiment-analysis',
              title: 'Sentiment Analysis',
              description: 'Analyzing emotions and opinions in text',
              duration: '2 weeks',
              difficulty: 'intermediate',
              type: 'practical'
            }
          ]
        }
      ]
    }
  },

  'Computer Vision': {
    beginner: {
      title: 'Computer Vision Fundamentals',
      description: 'Introduction to image processing and computer vision',
      phases: [
        {
          id: 'image-basics',
          title: 'Image Processing Basics',
          description: 'Fundamental concepts in digital image processing',
          topics: [
            {
              id: 'image-representation',
              title: 'Digital Image Representation',
              description: 'Pixels, color spaces, and image formats',
              duration: '1 week',
              difficulty: 'beginner',
              type: 'theory'
            },
            {
              id: 'opencv',
              title: 'OpenCV Fundamentals',
              description: 'Image manipulation and basic operations with OpenCV',
              duration: '3 weeks',
              difficulty: 'beginner',
              type: 'framework'
            },
            {
              id: 'image-filters',
              title: 'Image Filtering & Enhancement',
              description: 'Noise reduction, edge detection, and image enhancement',
              duration: '2 weeks',
              difficulty: 'intermediate',
              type: 'practical'
            }
          ]
        }
      ]
    }
  },

  'Data Science': {
    beginner: {
      title: 'Data Science Foundations',
      description: 'Complete introduction to data science workflow',
      phases: [
        {
          id: 'data-fundamentals',
          title: 'Data Fundamentals',
          description: 'Understanding data types, sources, and quality',
          topics: [
            {
              id: 'data-types',
              title: 'Data Types & Structures',
              description: 'Structured vs unstructured data, databases, APIs',
              duration: '1 week',
              difficulty: 'beginner',
              type: 'theory'
            },
            {
              id: 'data-collection',
              title: 'Data Collection & Web Scraping',
              description: 'Gathering data from various sources',
              duration: '2 weeks',
              difficulty: 'beginner',
              type: 'practical'
            },
            {
              id: 'eda',
              title: 'Exploratory Data Analysis',
              description: 'Understanding your data through visualization and statistics',
              duration: '3 weeks',
              difficulty: 'beginner',
              type: 'practical'
            }
          ]
        }
      ]
    }
  }
};

export default roadmapTemplates;