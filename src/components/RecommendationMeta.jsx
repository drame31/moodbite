import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { TAG_LABELS } from '../data/moodRecommendations';

// PrepTimeBadge: if value starts with a digit, prepend ~. Otherwise show as-is ("Order it").
function PrepTimeBadge({ value }) {
  const display = value && /^\d/.test(value) ? `~${value}` : value;
  return (
    <span className="inline-flex items-center gap-1 bg-cream-muted dark:bg-espresso-muted px-2.5 py-1 rounded-md">
      <Clock size={12} className="text-ink-muted dark:text-parchment-muted shrink-0" />
      <span className="font-mono text-xs text-ink-muted dark:text-parchment-muted">{display}</span>
    </span>
  );
}

// Intensity dots — 3 total, filled count = intensity value
function IntensityDots({ intensity }) {
  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-label={`Intensity: ${intensity} of 3`}
      title={`Intensity: ${intensity} of 3`}
    >
      <span className="font-mono text-xs text-ink-muted dark:text-parchment-muted uppercase tracking-wider mr-1">
        Intensity
      </span>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= intensity ? 'bg-[var(--mood-accent)]' : 'bg-sand dark:bg-bark'}`}
        />
      ))}
    </span>
  );
}

// The metadata + actions column. On desktop it sits to the right of the card (35%).
export default function RecommendationMeta({
  recommendation,
  isFavorite,
  onSaveFavorite,
  onRemoveFavorite,
  onRandomize,
}) {
  const [showToast, setShowToast] = useState(false);
  const { tags, intensity, estimatedPrepTime, colorTheme } = recommendation;

  // Auto-dismiss toast after 2500ms
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(timer);
  }, [showToast]);

  // Save button is a TOGGLE (r3-reconciliation §1): saved → click removes; not saved → click saves + toast.
  const handleSave = () => {
    if (isFavorite) {
      onRemoveFavorite?.(recommendation.id);
    } else {
      onSaveFavorite(recommendation);
      setShowToast(true);
    }
  };

  return (
    <div
      className="relative flex flex-col gap-5 lg:sticky lg:top-20"
      style={{ '--mood-accent': colorTheme.accent }}
    >
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-cream-muted dark:bg-espresso-muted border border-sand dark:border-bark font-mono text-xs uppercase tracking-wider text-ink-soft dark:text-parchment-soft px-2 py-0.5 rounded-md"
            >
              {TAG_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>
      )}

      {/* Prep time + intensity */}
      <div className="flex flex-wrap items-center gap-4">
        <PrepTimeBadge value={estimatedPrepTime} />
        <IntensityDots intensity={intensity} />
      </div>

      {/* Actions row + toast — toast sits directly below the row (r5 §5A) */}
      <div className="relative flex flex-col gap-3 pt-1 border-t border-sand-muted dark:border-bark-muted mt-1">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={handleSave}
            aria-label={isFavorite ? 'Saved — remove from favorites' : 'Save this recommendation to favorites'}
            className="inline-flex items-center gap-2 font-sans text-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango rounded-md min-h-[44px] transition-colors duration-200 hover:text-ink dark:hover:text-parchment"
            style={{
              color: isFavorite ? colorTheme.accent : undefined,
            }}
          >
            {/* Keyframe pop fires when saved state turns on (r2-uxui-spec §10 / r4 #8) */}
            <motion.span
              animate={isFavorite ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, times: [0, 0.55, 1], ease: 'easeOut' }}
              className="inline-flex"
            >
              {/* Icon color transition via .save-icon-transition — settles after pop (r5 §1B) */}
              {isFavorite
                ? <BookmarkCheck size={18} className="save-icon-transition" style={{ color: colorTheme.accent }} />
                : <Bookmark size={18} className="save-icon-transition" />}
            </motion.span>

            {/* Label cross-fade on save state change (r5 §5B) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isFavorite ? 'saved' : 'unsaved'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className={isFavorite ? '' : 'text-ink-soft dark:text-parchment-soft'}
              >
                {isFavorite ? 'Saved' : 'Save this bite'}
              </motion.span>
            </AnimatePresence>
          </button>

          {onRandomize && (
            // Arrow nudge on hover (r5 §1C) — arrow split into separate span with group-hover translate
            <button
              type="button"
              onClick={onRandomize}
              aria-label="Show a different recommendation for this mood"
              // text-ink-soft (#5C4A38) = 5.13:1 on cream — passes WCAG AA (was text-ink-muted at 3.52:1)
              className="group font-sans text-sm text-ink-soft dark:text-parchment-soft hover:text-ink dark:hover:text-parchment hover:underline underline-offset-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango rounded-md min-h-[44px] flex items-center gap-1"
            >
              Try another
              <span
                className="inline-block transition-transform duration-150 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          )}
        </div>

        {/* Toast — directly below actions row, tighter than before (r5 §5A) */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] } }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
              className="bg-ink dark:bg-parchment text-parchment dark:text-ink font-sans text-sm px-3 py-1.5 rounded-md shadow-sm inline-flex items-center gap-1.5 w-fit"
              role="status"
              aria-live="polite"
            >
              Saved to your bites.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
