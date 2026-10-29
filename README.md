# Habitly — Build Better Habits, One Day at a Time

A polished, responsive, and accessibility-first habit tracking application designed for daily consistency and focus. Habitly removes clutter, complex spreadsheets, and toxic pressure, replacing them with a calm, editorial productivity dashboard.

---

## 1. Project Overview

Habitly helps users build small, sustainable routines across Health, Learning, Mindfulness, and Productivity. Built entirely with local-first storage, it operates with zero-lag interactions and complete personal privacy.

### Core Highlights:
- **Landing Page (`/`)**: Includes a branded header with responsive navigation, a hero section with supporting copy and an interactive live product preview, three feature highlights, a 3-step "How It Works" guide, customer community stories, three-tier illustrative pricing (Free, Plus, Pro), and a semantic footer.
- **My Habits Dashboard (`/habits`)**: Interactive habit workspace with live summary metrics (Total Habits, Completed Today, Completion Rate, and Active Streaks), a 7-day completion momentum strip, instant search, multi-dimensional filters (Category, Completion Status, Schedule Frequency), and flexible sorting.
- **Accessible Habit Management**: Modal form for creating habits with focus trapping and keyboard Escape handling, instant one-click completion toggling, and non-blocking habit deletion with a 6-second live-region Undo toast.
- **Resilient UI States**: Features realistic skeleton loading, an inviting empty state, a dedicated no-results state with one-click filter reset, and a deterministic load error simulation with an active retry recovery flow.
- **Bonus Capabilities**: Persistent light/dark mode theme toggle, real consecutive streak calculation, 7-day calendar progress strip, and reduced-motion compliance (`prefers-reduced-motion`).

---

## 2. Technologies Used

- **Framework**: React 19 (Functional components, hooks)
- **Language**: TypeScript 5.8 / 7.0 (strict type safety, `verbatimModuleSyntax`)
- **Build Tool**: Vite 8.3
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` integration, CSS variables, dark mode)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Linter**: Oxlint

---

## 3. Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **Package Manager**: npm (v9+) or pnpm

---

## 4. Setup Commands

Clone or open the project folder `your_directory:\habitracker` in your terminal:

```bash
# Navigate to project directory
cd your_directory:\habitracker

# Install dependencies
npm install
```

---

## 5. Development & Production Build Commands

```bash
# Start local development server (with Hot Module Replacement)
npm run dev

# Run TypeScript compilation and production Vite build
npm run build

# Run Oxlint code inspection
npm run lint

# Preview the production build locally
npm run preview
```

---

## 6. Project Structure

```
D:\habitracker\
├── public\
│   ├── _redirects               # SPA client-side routing fallback
│   └── favicon.svg              # Habitly logo favicon
├── src\
│   ├── components\
│   │   ├── Button.tsx           # Reusable accessible button with variants
│   │   ├── EmptyState.tsx       # Zero-habits onboarding state
│   │   ├── ErrorState.tsx       # Simulated load error with retry action
│   │   ├── Footer.tsx           # Semantic footer with navigation & copyright
│   │   ├── HabitCard.tsx        # Habit item card with completion & delete
│   │   ├── HabitFilters.tsx     # Search, category, status, frequency, & sort
│   │   ├── HabitFormModal.tsx   # Add Habit dialog with focus trap & validation
│   │   ├── HabitHistoryModal.tsx# 30-day history and past logs modal
│   │   ├── HabitIcon.tsx        # Category-themed Lucide icon wrapper
│   │   ├── HabitSummary.tsx     # Dynamic summary statistics cards
│   │   ├── Header.tsx           # Responsive header, nav drawer, theme toggle
│   │   ├── LoadingSkeleton.tsx  # Skeleton placeholder matching real cards
│   │   ├── NoResultsState.tsx   # Filter mismatch state with reset button
│   │   ├── UserProfileModal.tsx # Personal details & focus goals modal
│   │   └── WeeklyProgress.tsx   # 7-day momentum visualization strip
│   ├── constants\
│   │   └── icons.ts             # Available icon identifiers
│   ├── context\
│   │   ├── ThemeContext.tsx     # Theme state provider (light/dark persistence)
│   │   └── ToastContext.tsx     # Accessible live-region notifications & Undo
│   ├── data\
│   │   └── habits.json          # Starter fake habit dataset
│   ├── pages\
│   │   ├── HabitsPage.tsx       # Interactive dashboard workspace (/habits)
│   │   ├── LandingPage.tsx      # Editorial landing page (/)
│   │   └── PricingPlanPage.tsx  # Dedicated plan overview and checkout page (/plan/:planId)
│   ├── types\
│   │   └── habit.ts             # Habit, Category, Frequency, & Filter types
│   ├── utils\
│   │   └── habitHelpers.ts      # Streaks, dates, filter/sort, & statistics helpers
│   ├── App.tsx                  # Router setup and providers
│   ├── index.css                # Design system tokens, full-width root, focus styles
│   └── main.tsx                 # Application entry point
├── index.html                   # HTML document with brand metadata & SEO tags
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.app.json            # Strict TypeScript configuration
└── vite.config.ts               # Vite configuration with React & Tailwind plugins
```

---

## 7. Design Decisions: Colors, Typography & Spacing

- **Color Palette**:
  - **Primary Accent**: Tasteful indigo (`#4f46e5` / `#6366f1`) providing an encouraging and professional visual anchor.
  - **Page Background**: Light warm slate neutral (`#f8fafc` / `#fafaf9`), switching to a refined dark navy slate (`#0b0f19` / `#0f172a`) in dark mode.
  - **Surface Cards**: Pure white (`#ffffff`) in light mode and deep card slate (`#131b2e`) in dark mode, defined by subtle borders (`border-slate-200` / `border-slate-800`).
  - **Category Accents**: Distinct semantic color badges (Emerald for Health, Blue for Learning, Purple for Mindfulness, Amber for Productivity) ensuring rapid visual recognition.
- **Typography**:
  - Uses modern system typography (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`) with tight letter-spacing on headings for an editorial feel and relaxed line-heights for comfortable readability.
- **Spacing & Elevation**:
  - Purposeful 4px/8px grid with generous whitespace (`py-12`, `py-20`, `gap-6`, `gap-8`) prevents visual cognitive overload. Cards use soft micro-shadows (`shadow-xs`, `shadow-sm`) and rounded corners (`rounded-xl`, `rounded-2xl`).

---

## 8. UX Reflection

> **What UX problem did you notice and fix?**
>
> In many habit-tracking applications, deleting a habit either triggers an abrupt, blocking browser `confirm()` modal or deletes the record irreversibly, creating user anxiety and disrupting flow. We replaced disruptive blocking alerts with an immediate, non-blocking delete action backed by a temporary 6-second accessible toast featuring a one-click **Undo** button. This gives users immediate speed and confident control, allowing accidental taps on touch screens to be painlessly reversed while keeping focus uninterrupted.

---

## 9. Instructions for Testing All UI States

1. **Loading State**:
   - Refresh the `/habits` page or click the **Retry Load** button in the error state. A skeleton dashboard will display for ~350ms, matching the exact layout of the summary cards, 7-day progress strip, and habit list.
2. **Empty State**:
   - Delete all habits one by one (or open browser console and run `localStorage.setItem('habitly_habits_v1', '[]')` and refresh). An encouraging empty state illustration with an **"Add Your First Habit"** button appears. Clicking it directly opens the creation modal.
   - You can click **"Reset Sample Data"** in the top-right header at any time to restore the full sample dataset.
3. **No-Results State**:
   - In the search bar on `/habits`, type a non-matching query (e.g. `xyz999`). A dedicated no-results card explains that no habits match. Clicking **"Reset search and filters"** clears the query and restores the list.
4. **Error State & Recovery**:
   - Click the **"Simulate Error"** button in the top-right actions toolbar. The dashboard instantly enters the simulated failure state displaying a friendly error card with a **"Retry Load"** button. Clicking **"Retry Load"** triggers the data reloader and recovers your habits cleanly.
5. **Success Feedback & Undo**:
   - Click any habit's completion button to view an immediate completion toast.
   - Add a new habit via **"Add Habit"** to view the creation toast.
   - Click the trash icon on any habit: notice the item disappears instantly and a toast appears with an **"Undo"** button. Click **Undo** to restore the habit back to its original position.
6. **Dark Mode**:
   - Click the Sun/Moon icon in the site header to toggle between light and dark themes. Your preference is automatically stored in `localStorage` and respected across reloads.

---

## 10. Deployment Instructions

### Deploying to Vercel
1. Install the Vercel CLI via `npm i -g vercel` or connect your repository on the [Vercel Dashboard](https://vercel.com).
2. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add a rewrite rule for client-side routing in a `vercel.json` file at the root:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
4. Run `vercel --prod` to deploy.

### Deploying to Netlify
1. Connect your repository on [Netlify](https://www.netlify.com).
2. Configure settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. To support client-side routing in single-page applications, create a `public/_redirects` file with the content:
   ```
   /*    /index.html   200
   ```
4. Trigger deploy.
