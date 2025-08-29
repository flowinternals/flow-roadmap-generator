// Curated learning resources organized by type and format

export const learningResources = {
  theory: {
    videos: [
      {
        title: 'Machine Learning Course by Andrew Ng',
        provider: 'Coursera',
        url: 'https://coursera.org/learn/machine-learning',
        rating: 4.9,
        duration: '11 weeks',
        level: 'beginner'
      },
      {
        title: 'Deep Learning Specialization',
        provider: 'Coursera',
        url: 'https://coursera.org/specializations/deep-learning',
        rating: 4.8,
        duration: '5 courses',
        level: 'intermediate'
      },
      {
        title: 'CS231n: Convolutional Neural Networks',
        provider: 'Stanford',
        url: 'https://cs231n.stanford.edu/',
        rating: 4.9,
        duration: '16 lectures',
        level: 'advanced'
      }
    ],
    books: [
      {
        title: 'Hands-On Machine Learning',
        author: 'Aurélien Géron',
        isbn: '978-1492032649',
        rating: 4.7,
        level: 'intermediate',
        description: 'Practical approach to ML with Scikit-Learn and TensorFlow'
      },
      {
        title: 'Pattern Recognition and Machine Learning',
        author: 'Christopher Bishop',
        isbn: '978-0387310732',
        rating: 4.5,
        level: 'advanced',
        description: 'Comprehensive mathematical treatment of ML algorithms'
      },
      {
        title: 'The Elements of Statistical Learning',
        author: 'Hastie, Tibshirani, Friedman',
        isbn: '978-0387848570',
        rating: 4.6,
        level: 'advanced',
        description: 'Statistical foundations of machine learning'
      }
    ],
    articles: [
      {
        title: 'A Visual Introduction to Machine Learning',
        provider: 'R2D3',
        url: 'http://www.r2d3.us/visual-intro-to-machine-learning-part-1/',
        level: 'beginner',
        description: 'Interactive visual explanation of ML concepts'
      },
      {
        title: 'Understanding LSTM Networks',
        author: 'Christopher Olah',
        url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/',
        level: 'intermediate',
        description: 'Clear explanation of LSTM architecture and function'
      }
    ],
    interactive: [
      {
        title: 'Machine Learning Crash Course',
        provider: 'Google',
        url: 'https://developers.google.com/machine-learning/crash-course',
        duration: '15 hours',
        level: 'beginner',
        description: 'Interactive course with TensorFlow exercises'
      },
      {
        title: 'Kaggle Learn',
        provider: 'Kaggle',
        url: 'https://www.kaggle.com/learn',
        level: 'all',
        description: 'Practical micro-courses on various ML topics'
      }
    ]
  },

  practical: {
    videos: [
      {
        title: 'Python for Data Science',
        provider: 'Corey Schafer',
        url: 'https://youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS',
        rating: 4.8,
        duration: '20+ videos',
        level: 'beginner'
      },
      {
        title: 'Data Analysis with Python',
        provider: 'freeCodeCamp',
        url: 'https://youtube.com/watch?v=r-uOLxNrNk8',
        rating: 4.7,
        duration: '10 hours',
        level: 'beginner'
      }
    ],
    books: [
      {
        title: 'Python for Data Analysis',
        author: 'Wes McKinney',
        isbn: '978-1491957660',
        rating: 4.4,
        level: 'intermediate',
        description: 'Data wrangling with Pandas, NumPy, and IPython'
      },
      {
        title: 'Automate the Boring Stuff with Python',
        author: 'Al Sweigart',
        isbn: '978-1593279929',
        rating: 4.6,
        level: 'beginner',
        description: 'Practical programming for total beginners'
      }
    ],
    interactive: [
      {
        title: 'DataCamp Python Track',
        provider: 'DataCamp',
        url: 'https://datacamp.com/tracks/python-programmer',
        level: 'beginner',
        description: 'Interactive Python programming exercises'
      },
      {
        title: 'Codecademy Data Science Path',
        provider: 'Codecademy',
        url: 'https://codecademy.com/learn/paths/data-science',
        level: 'beginner',
        description: 'Hands-on data science curriculum'
      }
    ]
  },

  framework: {
    videos: [
      {
        title: 'TensorFlow 2.0 Complete Course',
        provider: 'freeCodeCamp',
        url: 'https://youtube.com/watch?v=tPYj3fFJGjk',
        rating: 4.6,
        duration: '7 hours',
        level: 'intermediate'
      },
      {
        title: 'PyTorch Tutorials',
        provider: 'PyTorch',
        url: 'https://pytorch.org/tutorials/',
        rating: 4.7,
        level: 'intermediate',
        description: 'Official PyTorch tutorials and examples'
      }
    ],
    books: [
      {
        title: 'Programming PyTorch for Deep Learning',
        author: 'Ian Pointer',
        isbn: '978-1492045359',
        rating: 4.3,
        level: 'intermediate',
        description: 'Creating and deploying deep learning applications'
      },
      {
        title: 'TensorFlow 2 in Action',
        author: 'Thushan Ganegedara',
        isbn: '978-1617296062',
        rating: 4.4,
        level: 'intermediate',
        description: 'Practical guide to TensorFlow 2.x'
      }
    ],
    interactive: [
      {
        title: 'TensorFlow Developer Certificate',
        provider: 'TensorFlow',
        url: 'https://tensorflow.org/certificate',
        level: 'intermediate',
        description: 'Official certification program for TensorFlow'
      },
      {
        title: 'Fast.ai Practical Deep Learning',
        provider: 'Fast.ai',
        url: 'https://course.fast.ai/',
        level: 'intermediate',
        description: 'Top-down approach to deep learning'
      }
    ]
  },

  projects: {
    videos: [
      {
        title: 'End-to-End ML Project Tutorial',
        provider: 'Krish Naik',
        url: 'https://youtube.com/playlist?list=PLZoTAELRMXVPS-dOaVbAux22vzqdgoGhG',
        rating: 4.5,
        duration: '20+ videos',
        level: 'intermediate'
      }
    ],
    books: [
      {
        title: 'Building Machine Learning Powered Applications',
        author: 'Emmanuel Ameisen',
        isbn: '978-1492045106',
        rating: 4.2,
        level: 'intermediate',
        description: 'Going from idea to product'
      }
    ],
    interactive: [
      {
        title: 'Kaggle Competitions',
        provider: 'Kaggle',
        url: 'https://kaggle.com/competitions',
        level: 'all',
        description: 'Real-world data science competitions'
      },
      {
        title: 'GitHub ML Projects',
        provider: 'GitHub',
        url: 'https://github.com/topics/machine-learning',
        level: 'all',
        description: 'Open source ML projects to contribute to'
      }
    ],
    articles: [
      {
        title: 'Machine Learning Project Checklist',
        author: 'Aurélien Géron',
        url: 'https://github.com/ageron/handson-ml2/blob/master/ml-project-checklist.md',
        level: 'intermediate',
        description: 'Comprehensive checklist for ML projects'
      }
    ]
  },

  general: {
    videos: [
      {
        title: '3Blue1Brown Neural Networks',
        provider: '3Blue1Brown',
        url: 'https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
        rating: 4.9,
        duration: '4 videos',
        level: 'beginner',
        description: 'Visual explanation of neural networks'
      }
    ],
    podcasts: [
      {
        title: 'The TWIML AI Podcast',
        provider: 'TWIML',
        url: 'https://twimlai.com/podcast/',
        level: 'all',
        description: 'Interviews with ML researchers and practitioners'
      },
      {
        title: 'Data Skeptic',
        provider: 'Data Skeptic',
        url: 'https://dataskeptic.com/',
        level: 'intermediate',
        description: 'Data science and machine learning concepts'
      }
    ],
    articles: [
      {
        title: 'Towards Data Science',
        provider: 'Medium',
        url: 'https://towardsdatascience.com/',
        level: 'all',
        description: 'Platform for data science articles and tutorials'
      },
      {
        title: 'Distill',
        provider: 'Distill',
        url: 'https://distill.pub/',
        level: 'advanced',
        description: 'Clear explanations of machine learning concepts'
      }
    ]
  }
};

export default learningResources;