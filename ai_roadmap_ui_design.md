UI Design Document – AI Learning Roadmap Application

Overview:
This document outlines the UI/UX design for the AI-powered Learning Roadmap app. The design is intended to match the existing aesthetic and branding of the Job Matching app, AI Roadmap course page, and the current website. It prioritises a slick, professional look with modular, responsive components suitable for both desktop and mobile interfaces.

Goals:
- Maintain visual consistency with existing brand assets
- Provide an intuitive and clean user journey from goal entry to roadmap completion
- Keep UI elements lightweight, modular, and easily extendable
- Support mobile-first responsiveness and dark mode out-of-the-box

Page-by-Page Design:

1. Landing / Input Page:
- Centered input card
  - Prompt: “What do you want to learn?”
  - Multiline input box
  - Toggle switch: “Use existing blueprint if available”
  - Button: "Generate My Roadmap"
- Subtle header with app logo/name
- Footer: links to "Blueprint Library" and "How It Works"
- Visual style: Glassy card with soft shadows, fade-in animation on submit

2. Generated Roadmap Page:
- Sticky or top header: Shows the learning goal (editable inline)
- Horizontal progress bar (% complete)
- Roadmap items displayed vertically, in modular concept cards:
  - Title of concept
  - One-line summary
  - List of 2–3 resource links (icons for YouTube, GitHub, Article, etc.)
  - “Mark as Done” checkbox or toggle
- Buttons:
  - Regenerate Resources (optional tooltip: "Get updated materials")
  - Export options (PDF, Notion, Markdown)
- Style: Soft gradient background, subtle shadowed cards, clean typography

3. Blueprint Library Page:
- Search bar and filter dropdown (e.g., AI, DevOps, Data Science)
- Grid layout of blueprint cards:
  - Title
  - Short list of roadmap topics
  - Usage metrics
  - Button: “Use this blueprint”
- On click: Expandable preview to view full topic list before use
- Design language: Reuse roadmap card style with lighter padding

4. Saved Roadmaps / Progress Page (Optional)
- List view:
  - Title of roadmap
  - Progress bar and last opened date
  - Buttons: Resume / Regenerate
- Expired courses flagged visually
- Design matches generated roadmap page, simplified for scroll

Responsive Design:
- All pages will support full mobile responsiveness
- Use vertical stacking on smaller screens
- Cards and buttons scale fluidly
- Hamburger menu for navigation

Dark Mode:
- Fully integrated dark mode experience that mirrors the aesthetic of the Job Matching app
- Global dark mode support using Tailwind's dark variant and/or CSS variables
- Backgrounds transition to darker gradients or deep neutral tones (e.g., `bg-slate-900`, `bg-gradient-to-r from-gray-800 via-gray-900 to-black`)
- Text shifts to `text-gray-100` or `text-white` for clarity
- Buttons retain gradients but adapt for visibility (`from-purple-700 to-indigo-700`)
- Inputs and cards use `bg-slate-800` or semi-transparent overlays
- Apply dark mode styles using `dark:` prefix for all components
- Toggle switch in app settings or header bar (default follows OS settings)

Reusable Components:
- RoadmapCard (title, summary, resources)
- BlueprintCard (preview layout)
- ProgressBar
- AnimatedSubmitButton
- RegenerateButton

Visual & Brand Integration:
The visual branding for the AI Roadmap Generator app is derived directly from two existing repositories:
- https://github.com/sagesilver/ITC2-Apps-Match
- https://github.com/sagesilver/flowinternals-website

The following core design tokens and conventions are extracted:

Font:
- Primary: `Inter`, fallback `sans-serif`
- Used for all body, heading, and interface text with consistent weight scaling

Colours:
- Primary: `#4F46E5` (Indigo-600), often rendered as gradient with `#9333EA` (Purple-600)
- Secondary Accent: `#22D3EE` (Cyan-400)
- Background base: `#F8FAFC` (Gray-50)
- Dark mode base: `#0F172A` (Slate-900), with text in `#F1F5F9`

Gradients:
- Common usage: `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`
- Buttons and hero headers use subtle animated linear gradients

Border Radius:
- Inputs/Buttons: `rounded-lg`
- Cards/Containers: `rounded-xl`

Shadows:
- Cards: `shadow-xl`
- Buttons: `shadow-md` with `hover:shadow-lg`

Spacing:
- Padding and margins follow Tailwind’s `p-4`, `p-6`, `py-2`, `gap-4` standards
- Consistent vertical rhythm across sections using `space-y-6`, `mt-10`, `mb-8`

Transitions:
- Smooth, fast (`transition-all duration-200 ease-in-out`)
- Used on hover, active, focus states for inputs and buttons

Effects and Interactions:
- Backgrounds include soft textures and gradient overlays with a subtle blur (mimicking glassiness)
- Images and icons feature `hover:ring-2 ring-cyan-400 ring-offset-2` and `hover:shadow-cyan-500/20`
- Subtle glowing borders (`border border-transparent hover:border-cyan-400`) applied to cards and buttons
- Mouse-hover effects include `hover:scale-105`, `hover:brightness-110`, and background shimmer animations on key components
- Light animations on section load using fade-in and scroll-based transitions (via Framer Motion or Tailwind plugins)

Reusable Component Styles:
- **Buttons**: Gradient background, large hit area, hover scale animation (`hover:scale-105`), glowing focus ring
- **Cards**: Glass-like appearance, rounded corners, large padding, light shadows with hover glow
- **Form Fields**: Minimalist input fields with focus ring and inset shadows
- **Layout Wrappers**: Centered content blocks with `max-w-screen-md`, `py-16`, and mobile-first stacking

Theme Setup:
- These tokens will be centralised into a shared `tailwind.config.js` file for reuse
- Component styles will be modularised using functional utility classes and extracted into composable UI primitives (e.g. Button, Card, RoadmapItem)

These tokens and patterns ensure visual cohesion, hover delight, subtle animation, and match the interactive richness of the existing product suite. They will be used to build the base UI kit for the AI Roadmap Generator.

Architecture & Technology Stack:

Frontend:
- Firebase Studio for low-code rapid prototyping and publishing
- Tailwind CSS for design system styling and responsive layouts
- Optional use of React components (if integrating externally)
- Framer Motion or Tailwind plugins for animation handling

Backend:
- Firebase Cloud Functions to handle routing and orchestration
- Firestore for lightweight, fast NoSQL data storage
- Firebase Auth for secure login and user identity
- Firebase Hosting for static frontend deployment

AI Orchestration:
- n8n to orchestrate AI workflows, prompting OpenAI to:
  - Interpret learning goals
  - Generate roadmap structure and topics
  - Curate relevant resources (via RAG or prompt chaining)

AI Model:
- OpenAI GPT-4 or GPT-4o (via API or Assistants API)
- Optional Pinecone/Weaviate vector search for long-term blueprint or resource enrichment

Persistence & Expiry:
- Roadmaps stored in Firestore with TTL (time-to-live) metadata
- Expired entries cleaned via Firebase Scheduled Functions or Firestore TTL policies
- Blueprints stored permanently for reuse

Export & Integration:
- Export features to Notion (via Notion API), PDF (via html2pdf.js or Puppeteer), and Markdown
- Optional Stripe integration for premium roadmap generation (if monetisation is introduced later)

Structured Logging System:
- The application adopts the structured logging design from the Job Matching app.
- All logging is handled via a central `logger.js` subsystem with no use of `console.log` in production.
- Session IDs are assigned at job submission and propagated across all frontend, backend, and n8n logs.
- Logs include timestamp, level, message, user ID, session ID, and component context.
- Client logs are formatted as:
  `[CLIENT] [INFO] RoadmapGenerated: User abc123 generated roadmap from goal: "Learn LLMs"
  User: abc123 (user@example.com)`
- All authentication, roadmap generation, regeneration, and export actions are tracked for debugging, audit, and analytics purposes.
- Logs may be exported or integrated with Firebase Logging in the future.

Design Principles:
The core development rules from the Job Matching app are adopted in full, including:
- No regression of existing functionality
- Single implementation path per feature
- Modular component isolation (no logic in `index.html`)
- No console logging (all logs must go through `logger.js`)
- Codebase must remain optimised, minimalist, and testable
- All changes require test coverage and validation
- UI behaviours (e.g. close buttons, modals) must follow enforced style and layout standards
- Refactors and architectural changes require prior approval and must isolate impact
- Change documentation must be updated accordingly (README, architecture docs)

Security:
- All user input sanitised before AI processing
- Authenticated API routing via Firebase Function middleware
- Firestore access controlled with rules scoped by user ID

---

Next Step:
- Generate base Tailwind config or Chakra UI theme file using extracted styles
- Build 1–2 reusable components (e.g. roadmap card, input form) in your frontend framework
- Assemble skeleton layouts for the 3 core views (input, roadmap, library)

Optional:
- Provide embedded feedback module ("Was this helpful?") on each roadmap card
- Add AI chat bubble for support or follow-up questions
- Enable smooth transitions using Framer Motion for card expand/collapse

This UI is designed to be future-proof, extensible, and match the high standard of your existing apps.
- Provide embedded feedback module ("Was this helpful?") on each roadmap card
- Add AI chat bubble for support or follow-up questions
- Enable smooth transitions using Framer Motion for card expand/collapse

This UI is designed to be future-proof, extensible, and match the high standard of your existing apps.

