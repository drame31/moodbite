import { motion } from 'framer-motion';
import { MOOD_COLOR_THEMES } from '../data/moodRecommendations';
import { readableOn } from '../utils/color';

// Static lookup — full class strings so Tailwind JIT sees them at build time
const MOOD_GLOW_SHADOW = {
  'happy':           'shadow-glow-tomato',
  'tired':           'shadow-glow-caramel',
  'sad':             'shadow-glow-berry',
  'brutally-hungry': 'shadow-glow-mango',
  'movie-mode':      'shadow-glow-matcha',
  'date-mode':       'shadow-glow-rose',
};

function MoodChip({ mood, isActive, onSelect, index }) {
  const colorTheme = MOOD_COLOR_THEMES[mood.id];
  const glowClass = isActive ? MOOD_GLOW_SHADOW[mood.id] : 'shadow-sm';

  // Luminance-based text color decision — same readableOn() used in FilterBar.
  // Returns '#1C1410' (dark) or '#FFFFFF' (white) based on perceived brightness.
  // All six accents verified to pass WCAG AA (≥4.5:1) with the chosen text color.
  // See src/utils/color.js for per-accent contrast ratios.
  const activeTextColor = isActive ? readableOn(colorTheme.accent) : undefined;
  const textClass = isActive ? '' : 'text-ink dark:text-parchment';
  const subtitleClass = isActive ? '' : 'text-ink-muted dark:text-parchment-muted';

  // Slight rotation on chips at index 1 and 4 (standalone CSS `rotate` so it composes
  // with Tailwind's translate-based hover lift instead of overwriting it — r4-design-review #10)
  const rotation = index === 1 ? 1.5 : index === 4 ? -1.5 : 0;

  return (
    // motion.button provides whileTap press feedback (r5 §1A). The motion.div wrapper in
    // MoodSelector has been removed — animation is now on the button itself.
    <motion.button
      type="button"
      aria-pressed={isActive}
      aria-label={isActive ? `${mood.label} mood selected` : `Select ${mood.label} mood`}
      onClick={() => onSelect(mood.id)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      className={[
        'flex flex-col items-start rounded-xl px-5 py-4 min-w-[140px] border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango focus-visible:ring-offset-2',
        isActive
          ? `border-transparent ${glowClass} -translate-y-0.5 hover:brightness-90 active:brightness-75`
          : 'bg-cream-card dark:bg-espresso-card border-sand dark:border-bark hover:shadow-md hover:-translate-y-0.5',
      ].join(' ')}
      style={{
        backgroundColor: isActive ? colorTheme.accent : undefined,
        // Apply luminance-derived text color inline so it overrides any inherited class color
        color: isActive ? activeTextColor : undefined,
        rotate: `${rotation}deg`,
      }}
    >
      <span className="text-2xl mb-1">{mood.emoji}</span>
      {/* inherit from parent style.color when active; class color applies when inactive */}
      <span className={`font-sans ${isActive ? 'font-semibold' : 'font-medium'} text-md ${textClass}`}>{mood.label}</span>
      <span
        className={`font-sans text-sm ${subtitleClass} mt-0.5`}
        style={isActive ? { color: activeTextColor, opacity: 0.75 } : undefined}
      >
        {mood.subtitle}
      </span>
    </motion.button>
  );
}

export default function MoodSelector({ moods, selectedMood, onMoodSelect }) {
  return (
    <section id="moods" className="bg-cream-warm dark:bg-espresso-warm py-12 md:py-20">
      <div className="max-w-content mx-auto px-6">
        {/* Mono eyebrow — threads typographic identity from hero into core interaction (r5 §6C) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
          className="font-mono text-xs text-ink-muted dark:text-parchment-muted uppercase tracking-wider mb-2"
        >
          six moods
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="font-display text-xl font-semibold text-ink dark:text-parchment mb-8"
        >
          How are you feeling?
        </motion.h2>

        {/* CSS grid — enforces even two-column layout on mobile (r5 §8C) */}
        <div role="group" aria-label="Select your mood" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {moods.map((mood, i) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: i * 0.06 }}
            >
              <MoodChip
                mood={mood}
                isActive={selectedMood === mood.id}
                onSelect={onMoodSelect}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
