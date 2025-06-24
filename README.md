# 🚀 Metatag Vibe Checker

**Built in under 1 hour using only AI prompts!** ⚡

This is a complete Next.js application that analyzes website metadata and provides platform-specific previews and scoring for Twitter/X, Facebook, and Google Search. The entire application was created through conversational prompting with AI, demonstrating the power of prompt-driven development.

## 🎯 What This App Does

- **URL Analysis**: Enter any website URL to analyze its metadata
- **Platform Previews**: See how your site appears on Twitter/X, Facebook, and Google
- **Smart Scoring**: Get scores (0-100) for each platform based on best practices
- **Actionable Suggestions**: Receive specific recommendations to improve your metadata
- **Responsive Design**: Works perfectly on desktop and mobile with dark/light mode

## 🏗️ Key Files & Architecture

The app follows a clean Next.js 14 structure with these core components:

### **Core Logic**
- `lib/fetchMetadata.ts` - URL parsing and metadata extraction
- `lib/scoring.ts` - Platform-specific scoring algorithms (0-100 scale)
- `app/api/metadata/route.ts` - Server-side API endpoint for URL analysis

### **UI Components**
- `components/UrlInput.tsx` - Smart URL input with validation and examples
- `components/ScoreCard.tsx` - Score display with improvement suggestions  
- `components/previews/TwitterPreview.tsx` - Twitter/X card preview
- `components/previews/FacebookPreview.tsx` - Facebook OpenGraph preview
- `components/previews/GooglePreview.tsx` - Google search snippet preview

### **Documentation**
- `requirements/Requirements.md` - Complete project requirements and acceptance criteria
- `requirements/ScopePrompt.txt` - The engineering methodology used for development
- `STEPS.md` - Step-by-step development process and prompts used

## 🤖 How This Was Built (Prompt-Driven Development)

This entire application was created using **just 3 main prompts** in under an hour:

### **Step 1: Setup & Context** 
```
Review our ScopePrompt.txt, once you have a good understanding of your role and rules, let me know and I will provide a task
```

### **Step 2: Requirements & Planning**
```
Perfect, now review the Requirements.md, we will building a metatag platform. Once you have a good understanding of what we are building, lets scope out each section and tackle them one by one, updating our Requirements.md as we finish each item.
```

### **Step 3: Execution**
```
Sounds good, proceed
```

The AI then built the entire application incrementally, completing each phase and updating documentation as it went.

## 🔧 Quick Start

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Metatag Vibe Checker in action!

## 📋 How to Recreate This (Your Prompt Guide)

Want to build something similar? Here's the exact methodology:

### **1. Create Your Scope Document**
Create a `ScopePrompt.txt` defining your engineering approach (see ours for reference)

### **2. Write Detailed Requirements** 
Create a comprehensive `Requirements.md` with:
- Project overview and tech stack
- Core features and acceptance criteria  
- Folder structure
- Implementation phases

### **3. Use These Exact Prompts:**

**Initial Setup:**
```
Review our ScopePrompt.txt, once you have a good understanding of your role and rules, let me know and I will provide a task
```

**Project Kickoff:**
```
Perfect, now review the Requirements.md, we will building a [YOUR PROJECT TYPE]. Once you have a good understanding of what we are building, lets scope out each section and tackle them one by one, updating our Requirements.md as we finish each item.
```

**Execute:**
```
Sounds good, proceed
```

### **4. Additional Refinements**
For UI improvements, bug fixes, or feature additions:

```
Review our ScopePrompt.txt, when you have a good understanding of your role, let me know and I will provide a task
```

Then provide specific requests like:
- "Add dark/light mode using shadcn"
- "Fix URL resolution to auto-add https://"
- "Restructure layout to use 2 columns"

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui 
- **Styling**: TailwindCSS
- **TypeScript**: Full type safety
- **Theme**: next-themes for dark/light mode

## 🎉 Results

**What we achieved in under 1 hour:**
- ✅ Complete working application
- ✅ 3 platform-specific preview generators
- ✅ Sophisticated scoring algorithms  
- ✅ Professional responsive UI
- ✅ Error handling and loading states
- ✅ Dark/light mode support
- ✅ Full TypeScript implementation
- ✅ Comprehensive documentation

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**🤯 The future of development is here!** This project proves that with good prompting, clear requirements, and the right AI tools, you can build production-ready applications in minutes, not hours or days.