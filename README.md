# MoodBite

Pick a vibe. Get the bite.

---

A mood-based food, drink, playlist, and ambiance recommender — pick how you feel, get a complete setup for the next hour, with a plain-language reason why it fits the mood you picked.

Built in React 19 with AND-logic tag filtering, localStorage persistence, a no-flash dark mode, and WCAG AA accessibility. A front-end portfolio project.

---

## Features

- Pick a mood from six options and get a matching food, drink, playlist, and ambiance recommendation
- Every recommendation carries a plain-language explanation of why it fits the mood you picked
- AND-logic tag filtering — select multiple tags and get recs that match all of them, not just one
- Tags dim (rather than disappear) when nothing in the active mood matches, so the UI stays readable
- Save favorites across sessions with localStorage — they persist when you close the tab
- "Try another" pulls a fresh rec from the same mood without repeating what you just saw
- No-flash dark mode: preference is saved and applied before React initializes, so there is no flicker on load
- WCAG AA contrast in both light and dark themes, keyboard navigation, reduced-motion support, and skip-nav link
- Hero preview card shows a real recommendation so the concept lands before you interact with anything

---

## Tech stack

`React 19 · JavaScript · Vite · Tailwind CSS · Framer Motion · localStorage`

Front-end only. No backend, no database, no external API.

---

## Project structure

```
src/
├── App.jsx                        # Root component. All state lives here. Props down.
├── main.jsx                       # Entry point. Mounts App into #root.
│
├── data/
│   └── moodRecommendations.js     # All 30 recommendation objects + MOODS, ALL_TAGS,
│                                  # MOOD_COLOR_THEMES constants. Single source of truth
│                                  # for data shape and tag vocabulary.
│
├── hooks/
│   └── useLocalStorage.js         # useState-compatible hook backed by localStorage.
│                                  # Lazy init, write-through, try/catch on every op.
│                                  # Used for both favorites and theme preference.
│
├── utils/
│   ├── recommendationUtils.js     # Pure functions: getRecsForMood, filterByTags (AND),
│                                  # pickRandom, getNextRecommendation, addFavorite
│                                  # (with dedupe), removeFavorite, isDuplicate.
│                                  # No React imports, no side effects.
│   └── color.js                   # readableOn(hex): Rec. 601 luma coefficients →
│                                  # returns dark or white text color for a given
│                                  # accent background. Ensures AA contrast per mood.
│
└── components/
    ├── Header.jsx                 # Fixed top bar. Logo + ThemeToggle.
    ├── ThemeToggle.jsx            # Sun/moon icon button. Calls onThemeToggle.
    ├── Hero.jsx                   # Landing section with decorative chip cluster
    │                              # and ghost preview card (desktop only).
    ├── MoodSelector.jsx           # Mood chip grid (6-across desktop, 2-col mobile).
    │                              # Emits onMoodSelect.
    ├── FilterBar.jsx              # Tag toggle row. Disabled until a mood is selected.
    │                              # Dims tags with zero matches for the active mood.
    ├── RecommendationCard.jsx     # Primary content card (64% column on desktop).
    │                              # Displays food, drink, Spotify playlist link, ambiance.
    │                              # Hosts RecommendationDetails zone.
    ├── RecommendationDetails.jsx  # "WHY THIS FITS" zone — plain-language reason why
    │                              # each recommendation matches the selected mood.
    ├── RecommendationMeta.jsx     # Sidebar column (36%). Tags, intensity, prep time,
    │                              # save/remove button, try-another button.
    ├── EmptyState.jsx             # Shown when AND filters match nothing in the pool.
    │                              # Prompts to clear filters.
    ├── FavoritesPanel.jsx         # Saved favorites section. Renders FavoriteCard list.
    ├── FavoriteCard.jsx           # Individual saved rec. Remove button.
    └── HowItWorks.jsx             # Static explainer section. No props.
```

State is all in `App.jsx`. Components receive what they need via props. No context, no external state library.

---

## What I built

MoodBite is a mood-based recommender for food, drink, playlists, and ambiance — pick one of six moods, get a complete setup for the next hour. It is a portfolio project, not a real product, but I built it to behave like one.

The core is a 30-recommendation data model where each rec belongs to a mood and carries a plain-language explanation of why it fits — not marketing copy, an actual rationale. Tired does not mean "something easy." It means warmth, low decision fatigue, and sensory softness. Writing those 30 explanations meant having a clear mental model before writing any code.

The technical layer is the stuff that makes or breaks a demo: AND-logic tag filtering that re-runs cleanly on every mood change, localStorage hardened against silent failures, no-flash dark mode that reads preference before the first paint, and WCAG AA contrast throughout both themes.

---

## What I learned

The stale closure was the biggest surprise. The filter logic worked fine in isolation — pure functions, predictable outputs. What I did not expect was `handleMoodSelect` reading stale mood state because React 19's batching had not committed the update yet. It broke in a specific sequence of interactions, not in any obvious test case. The fix was passing fresh values directly into the utility functions instead of reading from the hook. Small, but it required actually understanding what batching does, not just knowing it exists.

Dark mode without the flash is one of those things you only learn by shipping the broken version. The `useEffect` approach causes a visible flicker. The fix is an inline script in `index.html` that reads localStorage and applies `.dark` before React initializes. Six lines.

The localStorage hardening — try/catch, type validation, deduplication — and the luminance-based contrast checks for both themes were the unglamorous work that made everything else hold up.

---

## Run locally

Node 18+ required. No environment variables needed — there is no backend.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Build for production:

```bash
npm run build
```

Output goes to `dist/`. Preview the production build:

```bash
npm run preview
```

---

## Deploying

### GitHub Pages

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. Once the repo is on GitHub:

1. Go to **Settings → Pages → Source** and set it to **GitHub Actions**.
2. Push to `main`. The workflow builds and deploys automatically.
3. The live URL is `https://drame31.github.io/moodbite/`.

No `gh-pages` branch. No manual steps after the initial setup.

### Vercel

Import the repo in the Vercel dashboard. Framework: **Vite**. Build command: `npm run build`. Output directory: `dist`. No environment variables needed.

### Netlify

Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop), or connect the repo with build command `npm run build` and publish directory `dist`. A `netlify.toml` is included in the repo for the connected-repo path.

---

## Project notes

This is a fictional portfolio project. There is no backend, no real restaurant data, and no user accounts. The Spotify links are syntactically valid and distinct; individual playlist reachability is not verified. The `category` field on each recommendation exists in the data but is not exposed as a filter dimension. No og-image exists yet — social cards will show no image until one is created and placed at `public/og-image.png`.

---

A fictional project built for the fun of it. Code by Derek Muñoz · 2026 · Costa Rica.

Not affiliated with Spotify.
