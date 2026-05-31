# MoodBite

Pick how you feel. Get the food, drink, playlist, and vibe to match.

Six moods. Thirty recommendation sets. One click to a complete setup — no account, no sign-up.

**This is a fictional portfolio project.** No real users, no real restaurant data, no external APIs. Built to demonstrate React component architecture, state management, localStorage persistence, and accessible UI interactions.

---

## Features

- **Six moods:** Happy, Tired, Sad, Brutally Hungry, Movie Mode, Date Mode
- **Thirty recommendation sets:** 5 per mood. Each includes a food, drink, a playlist that links out to Spotify, ambiance note, "why this fits" copy, tags, intensity, estimated prep time, emoji, and a per-mood color theme.
- **Tag filtering:** filter by Comfort food, Healthy, Fast, Sweet, Spicy, or Budget-friendly. AND logic — combinations narrow results meaningfully instead of returning near-universal matches.
- **Try another:** randomize within the current mood and active filters. Never repeats the recommendation you just saw (when the pool has options).
- **Save favorites:** bookmark any recommendation. Persists across sessions in localStorage with deduplication and remove support. No account needed. Works gracefully when storage is unavailable.
- **Dark / light theme:** toggle anytime. Persists in localStorage. No flash on load — an inline script in `index.html` applies the saved class before React mounts.
- **Responsive:** mobile (375px+), tablet (768px+), desktop (1280px+). Touch targets 44px+. Desktop layout: recommendation card at 64%, metadata column at 36%.
- **Framer Motion animations:** `AnimatePresence mode="wait"` on mood change, `mode="sync"` on filter toggle and try-another. `whileInView` section entrances. Save feedback animation. All collapse with `prefers-reduced-motion`.
- **Accessibility:** WCAG AA contrast on all mood accents (luminance-based text color selection), keyboard navigation, `aria-live` on the recommendation area, semantic `<main>` landmark, reduced-motion support.

---

## Tech stack

| Tool | Version |
|---|---|
| React | 19.2.6 |
| Vite | 8.0.x |
| Tailwind CSS | 3.4.x |
| Framer Motion | 12.x |
| Lucide React | 1.17.x |
| JavaScript | ES2022+ (no TypeScript — deliberate) |
| localStorage | No backend, no database, no external API |

Front-end only. Zero server-side code.

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
    ├── Hero.jsx                   # Landing section. CTA scrolls to #moods.
    ├── MoodSelector.jsx           # Mood chip grid. Emits onMoodSelect.
    ├── FilterBar.jsx              # Tag toggle row. Disabled until a mood is selected.
    │                              # Resolves accent color via color.js for active state.
    ├── RecommendationCard.jsx     # Primary content card (64% column on desktop).
    │                              # Displays food, drink, Spotify playlist link, ambiance.
    ├── RecommendationMeta.jsx     # Sidebar column (36%). Tags, intensity, prep time,
    │                              # save/remove button, try-another button.
    ├── EmptyState.jsx             # Shown when AND filters match nothing in the pool.
    │                              # Prompts to clear filters.
    ├── FavoritesPanel.jsx         # Saved favorites section. Renders FavoriteCard list.
    │                              # Hidden when favorites is empty.
    ├── FavoriteCard.jsx           # Individual saved rec. Remove button.
    └── HowItWorks.jsx             # Static explainer section. No props.
```

State is all in `App.jsx`. Components receive what they need via props. No context, no external state library.

---

## What I learned

This started as a data and state management exercise. It turned into something more layered than expected.

**AND-logic tag filtering.** OR logic on 5-item mood pools returns near-universal matches — filters become decorative. AND means "narrow to exactly this." Keeping that decision consistent required that the data model use kebab-case tag slugs throughout, with display labels resolved only in the UI layer.

**Stale closure guard.** When `handleMoodSelect` resets tags and picks a new recommendation in the same event, you cannot read `activeTags` from the closure — React 19 batches the updates and the old value is still there. The fix is passing fresh values directly to the utility functions rather than reading from state. The pure-function architecture in `recommendationUtils.js` made this straightforward.

**No-flash dark mode.** A small inline script in `index.html` reads `localStorage` and applies `.dark` to the `<html>` element before React mounts. The `useEffect` in `App.jsx` that syncs the class runs after — by then the class is already correct on load, and the effect handles subsequent toggles. Without the inline script, there is a visible flash of the wrong theme on every hard reload.

**AnimatePresence mode switching.** Mood changes need `mode="wait"` (full exit, then enter). Filter toggles and try-another need `mode="sync"` (cross-fade — the card is on the same "shelf"). Same `AnimatePresence` wrapper, different behavior on each render. A `useRef` tracks which action triggered the last change so the wrapper reads the correct mode without causing extra re-renders.

**localStorage hardening.** `useLocalStorage` wraps every read and write in `try/catch` — this handles `SecurityError` in private browsing and `QuotaExceededError` when storage is full. On top of that, `App.jsx` adds type guards (`Array.isArray` etc.) to handle the edge case where valid JSON but the wrong type was stored from a previous session. Both layers are needed.

**Luminance-based contrast.** `color.js` uses the Rec. 601 perceived-brightness formula to choose dark or white text for each mood accent. This way any future accent change stays AA-compliant automatically, rather than hand-picking text colors per mood.

**Reduced-motion.** Framer Motion respects `prefers-reduced-motion` at the library level when you use the `motion` component. The explicit check is still useful for animations that bypass Framer (CSS transitions, class-based effects) — those needed their own media query guards.

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

### GitHub Pages (recommended)

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. Once the repo is on GitHub:

1. Go to **Settings → Pages → Source** and set it to **GitHub Actions**.
2. Push to `main`. The workflow builds and deploys automatically.
3. The live URL will be `https://drame31.github.io/moodbite/`.

No `gh-pages` branch. No manual steps after the initial setup.

### Vercel

Import the repo in the Vercel dashboard. Framework: **Vite**. Build command: `npm run build`. Output directory: `dist`. No environment variables needed. Deploy.

### Netlify

Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop), or connect the repo with build command `npm run build` and publish directory `dist`. A `netlify.toml` is included in the repo for the connected-repo path.

---

## Future improvements

- Embed a Spotify player inline instead of linking out (each recommendation already links to a real Spotify playlist; the Web Playback SDK or an iframe embed would let you preview without leaving the page)
- Add more moods — the data model supports it without code changes
- Persist last-selected mood across sessions
- History rotation: track which recs have been served per mood so randomization completes a full cycle before repeating
- Share button: encode mood + rec ID in a query string so a specific recommendation is linkable
- Search / filter within the favorites panel as it grows
- A test suite — the pure utility functions in `recommendationUtils.js` are the obvious starting point

---

A fictional project built for the fun of it. Code by Derek Muñoz · 2026 · Costa Rica.

Not affiliated with Spotify.
