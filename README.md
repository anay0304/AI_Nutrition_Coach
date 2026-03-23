# AI Nutrition Coach

An AI-powered nutrition coaching web app that guides users through structured coaching sessions based on real behavior-change principles.

## What it does

- Conducts a structured initial coaching session with the user, following a 6-stage framework: building connection, assessing the situation, exploring motivations, strategizing, refining an action plan, and closing with clarity
- Guides the user to one realistic, confident action step by the end of each session
- Supports progress check-in sessions for returning users to reflect and adjust
- Provides a user dashboard with helpful resources (nutrition guides, meal planning tools)
- Stores session history so users can revisit past conversations

## Tech stack

- **Next.js** — frontend and backend in one project
- **OpenAI API (GPT-4o mini)** — powers the AI coach
- **Clerk** — user authentication
- **Tailwind CSS** — styling

## Coaching approach

The AI coach is not a generic chatbot. It follows a structured coaching philosophy built around:
- Asking one question at a time
- Listening before giving advice
- Keeping action steps simple and realistic
- Prioritizing the user's confidence over optimization
- Treating setbacks as feedback, not failure

## Project structure

```
AI_nutrition_coach/
├── coaching_docs/        # Coaching frameworks and philosophy
├── prompts/              # AI system prompt
├── scripts/              # Terminal-based chat scripts for testing
└── web/                  # Next.js web application
    ├── app/
    │   ├── api/chat/     # API route that handles OpenAI calls
    │   ├── sign-in/      # Clerk sign-in page
    │   ├── sign-up/      # Clerk sign-up page
    │   └── page.js       # Main chat UI
```

