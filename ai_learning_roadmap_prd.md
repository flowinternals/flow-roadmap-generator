Product Requirements Document (PRD) - AI-Powered Learning Roadmap Application

Overview:
This application is designed to dynamically generate personalised learning roadmaps based on a user's input goal or question. It replaces traditional, static course creation with a lightweight, scalable, and evergreen alternative that uses AI to generate both the structure (course skeleton) and the content (curated resources). It includes user progress tracking, blueprint sharing, and the ability to refresh learning materials over time.

Goals:
- Automatically generate personalised learning roadmaps using an AI agent
- Minimise manual content creation and maintenance
- Allow users to track progress without permanent storage growth
- Provide reusable and shareable course blueprints
- Enable regeneration of fresh content from saved course foundations

Core Features:
1. User submits a learning goal or query via a web form
2. AI agent generates a roadmap: 3–7 structured concepts/modules with summaries and 2–3 curated resources per module
3. The structure of the course is saved permanently as a blueprint
4. The generated roadmap is saved temporarily for each user with a TTL (e.g., 30–60 days)
5. Users can track progress against the roadmap and resume within the TTL window
6. Users can regenerate content from saved blueprints with updated materials
7. Popular course blueprints are publicly accessible and can be reused by others

Persistence Strategy:
- Only course skeletons (blueprints) are saved permanently in Firestore
- User-specific roadmap content (including links) and progress is stored with an expiry
- Expired sessions are automatically cleaned up using Firestore TTL or scheduled jobs
- Regeneration uses the original skeleton ID to fetch new resources

AI Agent Workflow:
- Input: User question/goal, optional blueprint ID
- Step 1: Generate 3–7 learning objectives (topics)
- Step 2: For each topic, generate a one-line summary and search for 2–3 high-quality resources (docs, tutorials, videos)
- Step 3: Format and return the roadmap as JSON
- Output includes structureHash used to identify and match reusable blueprints

Example Agent Output:
{
  "roadmap": [
    {
      "topic": "LangChain Basics",
      "summary": "Understand LangChain's modular framework",
      "resources": [
        {"title": "LangChain Docs", "url": "..."},
        {"title": "Intro Video", "url": "..."}
      ]
    },
    ...
  ],
  "structureHash": "abc123-langchain"
}

Data Model:
Collection: blueprints
{
  id: "llm-agents-langchain",
  title: "Build LLM Agents in LangChain",
  structure: ["LangChain Basics", "Agents", "Tools", "Memory", "Custom Executors"],
  usageCount: 57
}

Collection: userCourses
{
  userId: "xyz",
  blueprintId: "llm-agents-langchain",
  createdAt: timestamp,
  expiresAt: timestamp,
  roadmap: [
    { topic: "LangChain Basics", completed: true },
    { topic: "Agents", completed: false }
  ]
}

Technology Stack:
Frontend: Firebase Studio (Web Builder)
Auth: Firebase Authentication
Backend: Firebase Cloud Functions (for API proxying and validation)
AI Orchestration: n8n + OpenAI API (with optional RAG)
Database: Firestore
Hosting: Firebase Hosting

Functional Pages:
1. Landing Page: User enters learning goal
2. Course View Page: Displays roadmap and progress tracking
3. Library: List of available course blueprints
4. Account (optional): User sees their active and expired courses

TTL and Regeneration Rules:
- Roadmap data expires after 30–60 days
- Blueprint structure persists indefinitely
- Upon expiry, roadmap is regenerated using the saved blueprint structure
- Users are notified or prompted when reactivation occurs

Optional Features:
- Gamification (badges, completion streaks)
- Upvote or recommend blueprints
- Export to PDF/Notion/Markdown
- Blueprint versioning and change tracking

Future Considerations:
- Enable community-submitted blueprints
- Add support for tagging and filtering blueprints by domain (AI, Web Dev, etc.)
- Integrate AI follow-up agents that suggest what to learn next

Next Steps:
- Build n8n agent flow for concept generation and resource curation
- Scaffold Firestore schema with TTL rules and blueprint linking
- Create Firebase Studio UI: input form, roadmap viewer, progress tracker
- Deploy Firebase Function to proxy and secure communication with n8n

