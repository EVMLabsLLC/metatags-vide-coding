🧠 Requirements.md
📌 Project Overview
Name: Metatag Vibe Checker
Description:
A web-based tool that allows users to input a URL and view its rich preview for:

X (formerly Twitter) via OpenGraph/Twitter Card

Facebook via OpenGraph

Google Search via structured data/snippets

The app will:

Display each platform's preview

Assign a score to each based on best practices and standards

Provide AI-generated suggestions for improving visibility, structure, and appeal

🚀 Tech Stack
Framework: Next.js

UI Components: shadcn/ui

Styling: TailwindCSS (via shadcn)

Runtime: Node.js (via Next.js API routes or edge functions)

AI Suggestions: OpenAI (optional integration for scoring and improvement suggestions)

OG Parsing: Custom parser or use open-source libraries (e.g., metascraper, unfurl.js)

🎯 Core Features
1. URL Input and Fetch
Input field for user to enter any valid URL

Server-side fetch to retrieve HTML content

Parse <head> for:

OpenGraph (og:title, og:description, og:image, etc.)

Twitter Card (twitter:title, twitter:image, etc.)

Structured Data (Schema.org / JSON-LD)

2. Preview Generation
X Preview

Mimic Twitter Card style (summary / summary_large_image)

Facebook Preview

Display OG meta preview

Google Preview

Simulated search snippet with title, URL, and description

3. Scoring System
Evaluate presence and quality of key tags

Scoring range: 0–100 per platform

Criteria: completeness, media optimization, character limits, mobile-friendliness

4. Suggestions
Natural language suggestions to improve score

Example: “Your description is too short for Facebook. Aim for 100–200 characters.”

Optional: use GPT-4 to generate improvement text

🧪 Stretch Goals
Live preview updates as user edits tags (in future HTML mode)

Dark mode for previews

Browser extension version

Save + compare historical previews

Webhook/API endpoint for programmatic preview generation

🧩 Folder Structure
bash
Copy
Edit
/
├── pages/
│   └── index.tsx             # Main app page with input + previews
├── lib/
│   ├── fetchMetadata.ts      # Handles URL fetch and parsing
│   └── scoring.ts            # Calculates platform scores
├── components/
│   ├── PlatformPreview.tsx   # Individual preview components
│   ├── ScoreCard.tsx         # Displays score and suggestions
│   └── UrlInput.tsx          # Input + validation
├── ui/                       # shadcn components
├── styles/
├── public/
└── Requirements.md
✅ Acceptance Criteria
✅ User can input a URL and receive 3 previews (X, Facebook, Google)

✅ Each preview receives a score out of 100

✅ User receives suggestions to improve each preview

✅ Fully responsive UI using shadcn/ui

✅ Works with both HTTP and HTTPS URLs

✅ Handles timeouts and invalid URLs gracefully

## ✅ PROJECT COMPLETE! 🎉

**The Metatag Vibe Checker is now fully functional with:**
- ✅ URL input with smart validation and test examples
- ✅ Platform-specific previews (Twitter/X, Facebook, Google)
- ✅ Comprehensive scoring system (0-100 per platform)
- ✅ Actionable improvement suggestions
- ✅ Responsive design for all screen sizes
- ✅ Robust error handling and edge cases
- ✅ Professional UI with loading states

## 🚧 Implementation Progress

### ✅ Phase 1: Foundation & URL Processing (COMPLETED)
- ✅ URL input component with validation
- ✅ Metadata fetching service (lib/fetchMetadata.ts)
- ✅ Parse OpenGraph, Twitter Cards, and structured data
- ✅ Handle errors (timeouts, invalid URLs)
- ✅ API route for server-side metadata fetching
- ✅ Basic UI integration and state management

### ✅ Phase 2: Preview Components (COMPLETED)
- ✅ Build X/Twitter Card preview component
- ✅ Build Facebook OpenGraph preview component  
- ✅ Build Google Search snippet preview component
- ✅ Style them to match each platform's appearance

### ✅ Phase 3: Scoring System (COMPLETED)
- ✅ Implement scoring logic (lib/scoring.ts)
- ✅ Define criteria for each platform (0-100 scale)
- ✅ Score based on completeness, character limits, media optimization

### ✅ Phase 4: Suggestions & Integration (COMPLETED)
- ✅ Generate improvement suggestions (integrated in scoring)
- ✅ Create ScoreCard component to display scores + suggestions
- ✅ Integrate all components into main page
- ✅ Polish responsive UI

### ✅ Phase 5: Testing & Refinement (COMPLETED)
- ✅ Test with various URLs (test examples provided)
- ✅ Handle edge cases (improved error handling)
- ✅ Final UI polish (loading states, responsive design)
- ✅ Created comprehensive test plan (TEST_PLAN.md)

