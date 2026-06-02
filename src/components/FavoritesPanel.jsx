import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Heart } from 'lucide-react';
import FavoriteCard from './FavoriteCard';

export default function FavoritesPanel({ favorites, onRemoveFavorite, theme }) {
  const isEmpty = favorites.length === 0;
  const isDark = theme === 'dark';
  const [showRemoveToast, setShowRemoveToast] = useState(false);

  // Auto-dismiss remove toast after 2000ms (r5 copy §2.1)
  useEffect(() => {
    if (!showRemoveToast) return;
    const timer = setTimeout(() => setShowRemoveToast(false), 2000);
    return () => clearTimeout(timer);
  }, [showRemoveToast]);

  const handleRemove = (id) => {
    onRemoveFavorite(id);
    setShowRemoveToast(true);
  };

  return (
    <section id="favorites" className="bg-cream dark:bg-espresso py-12 md:py-20">
      <div className="max-w-content mx-auto px-6">
        {/* Mono eyebrow — threads typographic identity (r5 §6C) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
          className="font-mono text-xs text-ink-soft dark:text-parchment-soft uppercase tracking-wider mb-2"
        >
          saved bites
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="font-display text-xl font-semibold text-ink dark:text-parchment mb-8"
        >
          Your saved bites
        </motion.h2>

        {/* AnimatePresence mode="wait" prevents layout jump when last card is removed (r5 §5D) */}
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              {/* Icon composition: Bookmark with a small Heart overlapping bottom-right */}
              <div className="relative inline-flex mb-4 w-12 h-12 items-center justify-center" aria-hidden="true">
                <Bookmark size={32} className="text-ink-muted dark:text-parchment-muted" />
                <Heart
                  size={16}
                  className="absolute bottom-0 right-0 text-ink-muted dark:text-parchment-muted rotate-45 fill-cream dark:fill-espresso"
                />
              </div>
              <p className="font-sans text-base text-ink-soft dark:text-parchment-soft max-w-xs">
                Nothing here yet. Pick a mood and save the ones that feel right.
              </p>
              <a
                href="#moods"
                aria-label="Go to mood selector"
                // --tomato-accessible: light #B03B2B (6.1:1 on cream) / dark #E8604E (5.54:1 on espresso) — index.css
                className="font-sans text-sm underline underline-offset-2 hover:opacity-80 transition-opacity mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-1"
                style={{ color: 'var(--tomato-accessible)' }}
              >
                Find something now
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="relative grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <AnimatePresence>
                {favorites.map((fav, i) => (
                  <motion.div
                    key={fav.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Micro-pulse before exit: 60ms scale blink then slide (r5 §1E)
                    exit={{ opacity: [1, 1, 0], x: [0, 0, 24], scale: [1, 1.015, 1.015] }}
                    transition={{
                      duration: 0.28,
                      times: [0, 0.2, 1],
                      ease: [0.4, 0, 1, 1],
                      delay: i * 0.06,
                    }}
                  >
                    <FavoriteCard fav={fav} onRemove={handleRemove} isDark={isDark} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remove confirmation toast — section-level, not card-level (r5 copy §2.1) */}
        <AnimatePresence>
          {showRemoveToast && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] } }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
              className="mt-4 bg-ink dark:bg-parchment text-parchment dark:text-ink font-sans text-sm px-3 py-1.5 rounded-md shadow-sm inline-flex items-center gap-1.5 w-fit"
              role="status"
              aria-live="polite"
            >
              Removed from your bites.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
