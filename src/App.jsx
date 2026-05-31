import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useLocalStorage } from './hooks/useLocalStorage';
import {
  getRecsForMood,
  filterByTags,
  pickRandom,
  getNextRecommendation,
  isDuplicate,
  addFavorite,
  removeFavorite,
} from './utils/recommendationUtils';
import { moodRecommendations, MOODS, ALL_TAGS, MOOD_COLOR_THEMES } from './data/moodRecommendations';

import Header from './components/Header';
import Hero from './components/Hero';
import MoodSelector from './components/MoodSelector';
import FilterBar from './components/FilterBar';
import RecommendationCard from './components/RecommendationCard';
import RecommendationMeta from './components/RecommendationMeta';
import EmptyState from './components/EmptyState';
import FavoritesPanel from './components/FavoritesPanel';
import HowItWorks from './components/HowItWorks';

export default function App() {
  // ── Transient state (session-only) ────────────────────────────────────────
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [currentRecommendation, setCurrentRecommendation] = useState(null);

  // ── Persisted state (localStorage) ───────────────────────────────────────
  const [rawFavorites, setFavorites] = useLocalStorage('moodbite_favorites', []);
  const [rawTheme, setTheme] = useLocalStorage('moodbite_theme', 'light');

  // Type guards: protect against corrupted localStorage values (r3-data-logic-spec §D.6)
  const favorites = Array.isArray(rawFavorites) ? rawFavorites : [];
  const theme = rawTheme === 'dark' ? 'dark' : 'light';

  // ── AnimatePresence mode — ref so it doesn't cause re-renders ────────────
  // 'wait' for mood change, 'sync' for filter toggle / try-another (r3-react-integration §4E)
  const transitionMode = useRef('wait');

  // ── Derived values ────────────────────────────────────────────────────────
  const recsForCurrentMood = selectedMood
    ? getRecsForMood(moodRecommendations, selectedMood)
    : [];

  const filteredPool = filterByTags(recsForCurrentMood, activeTags);
  const isEmpty = selectedMood !== null && filteredPool.length === 0;
  const isFavorite = currentRecommendation
    ? isDuplicate(favorites, currentRecommendation.id)
    : false;

  const selectedMoodObj = MOODS.find(m => m.id === selectedMood) ?? null;

  // ── Theme side-effect (only useEffect in App besides mount) ──────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Add theme-ready class after mount so CSS transitions don't flash on first render
  useEffect(() => {
    const t = setTimeout(() => document.body.classList.add('theme-ready'), 100);
    return () => clearTimeout(t);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────

  // Behavior 1: Mood select.
  // New mood → reset tags, pick random from the new pool.
  // Re-click the ALREADY-active mood → re-randomize (try another), keep filters (r3-reconciliation §2)
  const handleMoodSelect = (moodId) => {
    if (moodId === selectedMood) {
      transitionMode.current = 'sync';
      if (currentRecommendation) {
        const next = getNextRecommendation(filteredPool, currentRecommendation.id);
        if (next) setCurrentRecommendation(next);
      }
      return;
    }
    transitionMode.current = 'wait';
    // Reset activeTags and compute pool with [] directly — closure is stale here
    setSelectedMood(moodId);
    setActiveTags([]);
    const pool = getRecsForMood(moodRecommendations, moodId);
    setCurrentRecommendation(pickRandom(pool));
  };

  // Behavior 2: Filter toggle — AND semantics, re-randomize within filtered pool
  const handleTagToggle = (tag) => {
    transitionMode.current = 'sync';
    const newTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    setActiveTags(newTags);
    const pool = filterByTags(recsForCurrentMood, newTags);
    setCurrentRecommendation(pool.length > 0 ? pickRandom(pool) : null);
  };

  // Behavior 4: Randomize — excludes current rec
  const handleRandomize = () => {
    transitionMode.current = 'sync';
    if (!currentRecommendation) return;
    const next = getNextRecommendation(filteredPool, currentRecommendation.id);
    if (next) setCurrentRecommendation(next);
  };

  // Behavior 5: Save favorite — addFavorite dedupes by id (functional updater = no race)
  const handleSaveFavorite = (rec) => {
    setFavorites(prev => addFavorite(prev, rec));
  };

  // Behavior 7: Remove favorite
  const handleRemoveFavorite = (id) => {
    setFavorites(prev => removeFavorite(prev, id));
  };

  // Behavior 9: Theme toggle
  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleStartClick = () => {
    document.getElementById('moods')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Behavior 10: Clear filters
  const handleClearFilters = () => {
    transitionMode.current = 'sync';
    setActiveTags([]);
    const pool = getRecsForMood(moodRecommendations, selectedMood);
    setCurrentRecommendation(pickRandom(pool));
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-espresso">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />

      {/* Offset content below fixed header */}
      <main className="pt-14">
        <Hero onStartClick={handleStartClick} moods={MOODS} />

        <MoodSelector
          moods={MOODS}
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
        />

        {/* Recommendation area */}
        <section id="recommendations" className="bg-cream dark:bg-espresso py-12 md:py-20">
          <div className="max-w-content mx-auto px-6">

            {/* Per-mood selected-state microcopy (r3-reconciliation §6) */}
            {selectedMoodObj && (
              <motion.p
                key={selectedMoodObj.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-sm text-ink-soft dark:text-parchment-soft italic mb-6 max-w-lg"
              >
                {selectedMoodObj.selectedMicrocopy}
              </motion.p>
            )}

            <FilterBar
              availableTags={ALL_TAGS}
              activeTags={activeTags}
              onTagToggle={handleTagToggle}
              onClearFilters={handleClearFilters}
              disabled={selectedMood === null}
              moodAccent={selectedMood ? MOOD_COLOR_THEMES[selectedMood]?.accent : undefined}
            />

            {/* Branch 1: Dormant — no mood selected (r5 §7A) */}
            {selectedMood === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                {/* Three overlapping rotated emojis — food, drink, music (r5 §7A) */}
                <div className="relative w-20 h-16 mb-5" aria-hidden="true">
                  <span
                    className="absolute text-3xl select-none"
                    style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(-8deg)' }}
                  >
                    🍜
                  </span>
                  <span
                    className="absolute text-2xl select-none opacity-60"
                    style={{ bottom: 0, left: '20%', transform: 'rotate(5deg)' }}
                  >
                    🫖
                  </span>
                  <span
                    className="absolute text-2xl select-none opacity-60"
                    style={{ bottom: 0, right: '15%', transform: 'rotate(-4deg)' }}
                  >
                    🎵
                  </span>
                </div>
                <p className="font-mono text-xs text-ink-muted dark:text-parchment-muted uppercase tracking-wider mb-2">
                  waiting for your mood
                </p>
                <p className="font-sans text-base text-ink-muted dark:text-parchment-muted max-w-xs">
                  Pick a mood above to get started.
                </p>
              </motion.div>
            )}

            {/* Branch 2: Empty state — mood selected but filters match nothing.
                Condition lives INSIDE AnimatePresence so the exit animation can fire. */}
            <AnimatePresence>
              {isEmpty && (
                <EmptyState
                  key="empty"
                  activeTags={activeTags}
                  onClearFilters={handleClearFilters}
                  moodLabel={selectedMoodObj?.label ?? 'this mood'}
                />
              )}
            </AnimatePresence>

            {/* Branch 3: Recommendation — card (65%) + metadata column (35%) on desktop */}
            {currentRecommendation && (
              <div
                aria-live="polite"
                aria-label={`Current recommendation for ${selectedMoodObj?.label ?? 'selected'} mood`}
              >
                <AnimatePresence mode={transitionMode.current}>
                  <motion.div
                    key={currentRecommendation.id}
                    initial={{ opacity: 0, y: transitionMode.current === 'sync' ? 8 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Enter: ease-out, settles in (280ms). Exit: ease-in, departs quickly (160ms). (r2-uxui-spec §10)
                    // Sync mode uses half the y displacement — reads as "same shelf, next card" (r5 §3)
                    exit={{
                      opacity: 0,
                      y: transitionMode.current === 'sync' ? -4 : -8,
                      transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
                    }}
                    transition={{
                      duration: transitionMode.current === 'wait' ? 0.28 : 0.2,
                      ease: [0, 0, 0.2, 1],
                    }}
                    className="lg:flex lg:gap-8 lg:items-start"
                  >
                    <div className="lg:w-[64%]">
                      <RecommendationCard recommendation={currentRecommendation} />
                    </div>
                    <aside className="lg:w-[36%] mt-6 lg:mt-0">
                      <RecommendationMeta
                        recommendation={currentRecommendation}
                        isFavorite={isFavorite}
                        onSaveFavorite={handleSaveFavorite}
                        onRemoveFavorite={handleRemoveFavorite}
                        onRandomize={handleRandomize}
                      />
                    </aside>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        <FavoritesPanel
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />

        <HowItWorks />

        {/* Footer */}
        <footer className="bg-cream-warm dark:bg-espresso-warm border-t border-sand dark:border-bark py-10">
          <div className="max-w-content mx-auto px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="font-display font-bold text-lg text-ink dark:text-parchment">
                MoodBite<span className="text-tomato">·</span>
              </span>
              <p className="font-sans text-sm text-ink-muted dark:text-parchment-muted mt-1 max-w-xs">
                A fictional project. No real restaurants were harmed. Built by Derek Muñoz.
              </p>
            </div>
            <p className="font-mono text-xs text-ink-muted dark:text-parchment-muted uppercase tracking-wider shrink-0">
              2026 · made in Costa Rica
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
