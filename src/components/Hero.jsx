import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { moodRecommendations } from '../data/moodRecommendations';

// Decorative chip cluster — 3 chips, non-interactive, aria-hidden
function DecorativeChip({ label, emoji, subtitle, rotate, translateY = 0 }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className="bg-cream-card dark:bg-espresso-card border border-sand dark:border-bark shadow-sm rounded-xl px-5 py-4 min-w-[140px] pointer-events-none select-none"
      style={{ transform: `rotate(${rotate}deg) translateY(${translateY}px)` }}
    >
      <span className="text-2xl">{emoji}</span>
      <div className="font-sans font-medium text-md text-ink dark:text-parchment mt-1">{label}</div>
      {subtitle && (
        <div className="font-sans text-sm text-ink-muted dark:text-parchment-muted mt-0.5">{subtitle}</div>
      )}
    </div>
  );
}

// Ghost preview card — uses happy-01 data, desktop only, aria-hidden, non-interactive.
// Spec: rb-uxui-direction.md §4. Shows emoji + title + food/drink labels only.
// Left border hardcoded to updated tomato (#C84030) — matches Happy mood accent in
// MOOD_COLOR_THEMES and tomato.DEFAULT token (updated for WCAG AA in R-C Fix 4).
// rc-design-review item #33: corrected from old #D94F3D to keep continuity with the real card.
function HeroPreviewCard({ rec }) {
  return (
    <div
      className="hidden lg:block mt-6 ml-4"
      aria-hidden="true"
      tabIndex={-1}
      style={{ pointerEvents: 'none', opacity: 0.58 }}
    >
      <div
        className="rounded-2xl shadow-sm bg-cream-card dark:bg-espresso-card overflow-hidden max-w-[240px]"
        style={{ borderLeft: '3px solid #C84030' }}
      >
        {/* Header row */}
        <div className="px-4 pt-4 pb-3 flex items-start gap-2">
          <span className="text-2xl shrink-0" aria-hidden="true">{rec.emoji}</span>
          <h4 className="font-display text-lg font-medium text-ink dark:text-parchment leading-snug">
            {rec.title}
          </h4>
        </div>
        {/* Food + Drink row */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-4 border-t border-sand-muted dark:border-bark-muted pt-3">
          <div>
            <p className="font-mono text-xs text-ink-soft dark:text-parchment-soft uppercase tracking-wider mb-0.5">Food</p>
            <p className="font-sans text-sm text-ink-soft dark:text-parchment-soft">{rec.food.name}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-ink-soft dark:text-parchment-soft uppercase tracking-wider mb-0.5">Drink</p>
            <p className="font-sans text-sm text-ink-soft dark:text-parchment-soft">{rec.drink.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onStartClick, moods }) {
  // Show 3 decorative chips per r1-decisions-locked.md + copy deck §1
  const previewMoods = moods.filter(m => ['happy', 'tired', 'movie-mode'].includes(m.id));

  // Preview card uses happy-01 — static, hardcoded, not dynamic. Spec: rb-uxui §4.
  const previewRec = moodRecommendations['happy']?.[0];

  return (
    <section id="hero" className="bg-cream dark:bg-espresso pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="max-w-content mx-auto px-6 flex flex-col lg:flex-row items-start gap-12">

        {/* Left column — 60% */}
        <div className="lg:w-3/5">
          {/* Eyebrow tagline — locked */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: 0.1 }}
            className="font-mono text-xs text-ink-soft dark:text-parchment-soft uppercase tracking-wider mb-4"
          >
            Pick a vibe. Get the bite.
          </motion.p>

          {/* H1 — locked */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay: 0.15 }}
            className="font-display text-3xl lg:text-4xl font-bold text-ink dark:text-parchment leading-tight"
          >
            Your mood has entered the kitchen.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: 0.25 }}
            className="font-sans text-base text-ink-soft dark:text-parchment-soft mt-4 max-w-lg"
          >
            Pick how you feel. We'll sort the food, drink, playlist, and vibe.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: 0.35 }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={onStartClick}
              aria-label="Pick your mood to get a food recommendation"
              className="group inline-flex items-center gap-2 bg-tomato text-white font-sans font-semibold text-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2 min-h-[44px]"
            >
              Pick your mood
              <ArrowDown size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Right column — 40% — decorative chip cluster + hero preview card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1], delay: 0.4 }}
          className="lg:w-2/5 flex flex-row lg:flex-col gap-4 lg:gap-3 lg:pt-4"
          aria-hidden="true"
        >
          {previewMoods.map((mood, i) => {
            const rotations = [-1.5, 2, -0.5];
            const translations = [0, -6, 12];
            return (
              <DecorativeChip
                key={mood.id}
                label={mood.label}
                emoji={mood.emoji}
                subtitle={mood.subtitle}
                rotate={rotations[i] ?? 0}
                translateY={translations[i] ?? 0}
              />
            );
          })}

          {/* Ghost preview card — desktop only, static, aria-hidden via parent */}
          {previewRec && <HeroPreviewCard rec={previewRec} />}
        </motion.div>

      </div>
    </section>
  );
}
