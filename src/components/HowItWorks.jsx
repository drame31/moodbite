import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Pick your mood',
    body: "Start with how you feel right now — not how you want to feel, not your usual order. There are six moods. One of them is accurate.",
  },
  {
    number: '02',
    title: 'Match your craving',
    body: 'We match the mood to a food, a drink, a playlist, and an ambiance. Not a suggestion — a full setup. Hit "try another" if the first one misses.',
  },
  {
    number: '03',
    title: 'Save your perfect bite',
    body: "Found one that fits? Save it. It'll be there next time you're back, even if you close the tab. No account required.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream-warm dark:bg-espresso-warm py-12 md:py-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="mb-12"
        >
          {/* Mono eyebrow — same system as the Moods + Favorites sections */}
          <p className="font-mono text-xs text-ink-soft dark:text-parchment-soft uppercase tracking-wider mb-2">
            how it works
          </p>
          <h2 className="font-display text-xl font-semibold text-ink dark:text-parchment">
            How MoodBite works
          </h2>
          <p className="font-sans text-base text-ink-soft dark:text-parchment-soft mt-2">
            No quiz, no sign-up. You already know how you feel — the app does the rest.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: i * 0.06 }}
              // Zig-zag: even index = normal, odd index = reversed (desktop only)
              className={`flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-start gap-8 md:gap-12`}
            >
              {/* Step number — large watermark numeral */}
              <div
                className={`font-display text-4xl font-bold text-sand dark:text-bark opacity-60 shrink-0 w-16 md:w-24 ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Step content */}
              <div className="flex flex-col gap-2 max-w-lg">
                <h3 className="font-display text-xl font-semibold text-ink dark:text-parchment">
                  {step.title}
                </h3>
                <p className="font-sans text-base text-ink-soft dark:text-parchment-soft">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
