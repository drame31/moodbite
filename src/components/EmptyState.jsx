import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { TAG_LABELS } from '../data/moodRecommendations';

// Rotating trailing phrases — picked once per tag combination change (r3-data-logic-spec §D.3)
// Updated in r5 copy pass: replaced weak phrases with sharper ones (r5-copy-refinement §1.6)
const TRAILING_PHRASES = [
  'Probably intentional.',
  'Fair enough.',
  "That's a very specific craving.",
  'Might be time to pick just one.',
  'The mood has opinions.',
];

export default function EmptyState({ activeTags, onClearFilters, moodLabel }) {
  // useMemo with activeTags as dep key — recalculates only when the combination changes
  const trailingPhrase = useMemo(() => {
    return TRAILING_PHRASES[Math.floor(Math.random() * TRAILING_PHRASES.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTags.join(',')]);

  const tagNames = activeTags.map(t => TAG_LABELS[t] ?? t).join(' and ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-start justify-center py-16 border-t border-sand-muted dark:border-bark-muted"
    >
      {/* Emoji + icon — mood-specific feel over generic search failure (r5 §7B) */}
      <div className="flex items-center gap-2 mb-4" aria-hidden="true">
        <span
          className="text-2xl select-none"
          style={{ filter: 'grayscale(0.6)', opacity: 0.6 }}
        >
          🍽️
        </span>
        <SearchX size={20} className="text-ink-muted dark:text-parchment-muted" />
      </div>
      <p className="font-sans text-base text-ink-soft dark:text-parchment-soft max-w-sm">
        Nothing in {moodLabel} that's also {tagNames}. {trailingPhrase}
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        aria-label="Remove all active filters and see recommendations again"
        // tomato (#D94F3D) is 3.87:1 on cream — fails WCAG AA for 13px text.
        // --tomato-accessible flips between #B03B2B (light, 6.1:1) and #E8604E (dark, 5.54:1) in index.css.
        className="font-sans text-sm underline underline-offset-2 hover:opacity-80 transition-opacity mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-1"
        style={{ color: 'var(--tomato-accessible)' }}
      >
        Clear filters
      </button>
    </motion.div>
  );
}
