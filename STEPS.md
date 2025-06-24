# Metatag Platform Development Steps

## Project Setup

### Initial Creation
This app was created with 3 prompts. 

**Prompt:**
Review our ScopePrompt.txt, once you have a good understanding of your role and rules, let me know and I will provide a task

Once agent acknowledges the scope and role:

**Prompt:**
Perfect, now review the Requirements.md, we will building a metatag platfrom. Once you have a good understanding of what we are building, lets scope out each section and tackle them one by one, updating our Requirements.md as we finish eact item. 

Agent will then complete each section, one by one, stopping after completion of each, only prompt I used here is:

**Prompt:**
Sounds good, proceed


After the basic set up, we swtich to some debugging, the first thing we notice, is the suggested sample sites provided, wont resolve due to not having https://, to fix this we used: 

**Prompt:**
in components/UrlInput.tsx, we give example urls to try, however we dont append https:// to them which causes the app to fail to resolve those urls. We should update this to allow for https:// to not be needed

Once we have the basic site and functionality working, we work on snazzing up the UI a bit

Because we are moving to a new scope, we will remind the agent of their scope and role:

**Prompt:**
Review our ScopePrompt.txt, when you have a good understanding of your role, let me know and I will provide a task

**Prompt:**
I have installed next-theme, lets implement light/dark mode using shadcn, here is a reference link: @https://ui.shadcn.com/docs/dark-mode/next 

Once we have darkmode enabled, I want to make a few more adjustments to the ui, starting with the locations and layout of the preview and score cards

**Prompt:**
Now I want to focus on the current layout, I would like to location and styling of the ScoreCards and Preview cards. I would like 2 columns, the score cards on the left, and the preview cards on the right

## Bug Fixes & Improvements

### URL Resolution Issue
**Problem**: The suggested sample sites provided in the app wouldn't resolve due to missing `https://` protocol.

**Solution**: Updated `components/UrlInput.tsx` to automatically append `https://` when not provided, allowing example URLs to work without requiring users to manually add the protocol.

## UI Enhancements

### Dark/Light Mode Implementation
- Installed `next-themes` package
- Implemented dark/light mode toggle using shadcn components
- Reference: [shadcn Dark Mode Guide](https://ui.shadcn.com/docs/dark-mode/next)

### Layout Improvements
**Current Focus**: Restructuring the layout for better user experience

**Target Layout**:
- **2-column design**
  - **Left Column**: Score Cards
  - **Right Column**: Preview Cards

**Status**: In progress - adjusting locations and styling of ScoreCards and Preview cards

## Development Notes
- Each major change requires reviewing scope and requirements to maintain alignment
- UI improvements are being made incrementally
- Focus on user experience and visual appeal while maintaining functionality