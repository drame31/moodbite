// src/data/moodRecommendations.js
// R4 build — all copy from r2-copy-deck.md, engineering fields from r3-data-logic-spec.md
// Tags: kebab-case throughout (r3 conflict resolution §1)
// Intensity: 1–3 scale, values clamped from copy deck 1–5 (r3 conflict resolution §2)
// IDs: zero-padded (r3 conflict resolution §3)

// ─── Canonical constants ─────────────────────────────────────────────────────

export const MOODS = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😄',
    subtitle: 'energy up ↑',
    selectedMicrocopy: 'Your mood has entered the kitchen. Something good is coming.',
  },
  {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    subtitle: 'comfort incoming',
    selectedMicrocopy: "You don't have to explain yourself. Here's what happens when cozy is the only acceptable outcome.",
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😔',
    subtitle: 'we got you',
    selectedMicrocopy: "This one's for the hard days. Not the fix — just something to make the next hour a little better.",
  },
  {
    id: 'brutally-hungry',
    label: 'Brutally Hungry',
    emoji: '🤤',
    subtitle: 'no time to wait',
    selectedMicrocopy: "For when your battery is at 3% but hunger is at 98%. Let's skip the niceties.",
  },
  {
    id: 'movie-mode',
    label: 'Movie Mode',
    emoji: '🎬',
    subtitle: 'lights down, snacks up',
    selectedMicrocopy: 'Movie mode detected. Crunch level: cinematic. Interruptions: none.',
  },
  {
    id: 'date-mode',
    label: 'Date Mode',
    emoji: '🕯️',
    subtitle: 'low-key impressive',
    selectedMicrocopy: 'Date mode. The food is doing all the right things. You just show up.',
  },
];

export const ALL_TAGS = [
  'comfort-food',
  'healthy',
  'fast',
  'sweet',
  'spicy',
  'budget-friendly',
];

// Canonical display labels for tag slugs — single source of truth (F-04c fix: was duplicated
// in FilterBar, RecommendationMeta, EmptyState, FavoriteCard — now imported from here).
export const TAG_LABELS = {
  'comfort-food':    'Comfort food',
  'healthy':         'Healthy',
  'fast':            'Fast',
  'sweet':           'Sweet',
  'spicy':           'Spicy',
  'budget-friendly': 'Budget-friendly',
};

export const MOOD_COLOR_THEMES = {
  'happy':           { accent: '#C84030', accentDark: '#E8604E', accentLight: '#FDECEA', accentDim: '#3D1A14' },
  'tired':           { accent: '#C47B2B', accentDark: '#D4924A', accentLight: '#FBF0E0', accentDim: '#3A200A' },
  'sad':             { accent: '#7B3F6E', accentDark: '#9B5490', accentLight: '#F4EBF2', accentDim: '#2A0F26' },
  'brutally-hungry': { accent: '#F5A623', accentDark: '#F7B53A', accentLight: '#FFFBE8', accentDim: '#3D2A00' },
  'movie-mode':      { accent: '#8BA888', accentDark: '#A0C49D', accentLight: '#F0F5F0', accentDim: '#1E2E1D' },
  'date-mode':       { accent: '#E8736B', accentDark: '#F08B84', accentLight: '#FFF2F1', accentDim: '#3D1714' },
};

// ─── Per-mood colorTheme constants (copied verbatim into each rec object) ────
const HAPPY_THEME   = { accent: '#C84030', accentDark: '#E8604E', accentLight: '#FDECEA', accentDim: '#3D1A14' };
const TIRED_THEME   = { accent: '#C47B2B', accentDark: '#D4924A', accentLight: '#FBF0E0', accentDim: '#3A200A' };
const SAD_THEME     = { accent: '#7B3F6E', accentDark: '#9B5490', accentLight: '#F4EBF2', accentDim: '#2A0F26' };
const HUNGRY_THEME  = { accent: '#F5A623', accentDark: '#F7B53A', accentLight: '#FFFBE8', accentDim: '#3D2A00' };
const MOVIE_THEME   = { accent: '#8BA888', accentDark: '#A0C49D', accentLight: '#F0F5F0', accentDim: '#1E2E1D' };
const DATE_THEME    = { accent: '#E8736B', accentDark: '#F08B84', accentLight: '#FFF2F1', accentDim: '#3D1714' };

// ─── Recommendations ─────────────────────────────────────────────────────────

export const moodRecommendations = {

  // ── HAPPY (tomato accent) ──────────────────────────────────────────────────
  'happy': [
    {
      id: 'happy-01',
      mood: 'happy',
      title: 'The Usual, But Make It a Moment',
      food: {
        name: 'Margherita Pizza',
        note: 'Thin crust, fresh basil, the kind you actually finish.',
      },
      drink: {
        name: 'San Pellegrino Blood Orange',
        note: 'Fizzy, slightly tart — pairs with almost everything.',
      },
      playlist: {
        name: 'Good Vibes',
        description: 'Upbeat and warm. The kind of playlist that makes you move around the kitchen.',
        // Official Spotify editorial "Good Vibes" playlist — verify URL before shipping
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0',
      },
      ambiance: 'All the windows open, something good on low in the background.',
      description: "The best meals aren't always elaborate. Sometimes perfect is a pizza and the right company.",
      tags: ['comfort-food', 'fast'],
      intensity: 3,
      estimatedPrepTime: '20 min',
      emoji: '🍕',
      colorTheme: HAPPY_THEME,
    },
    {
      id: 'happy-02',
      mood: 'happy',
      title: 'Brunch Energy, Any Day of the Week',
      food: {
        name: 'Avocado Toast with Poached Eggs',
        note: 'Flaky salt, red pepper flakes, a squeeze of lemon.',
      },
      drink: {
        name: 'Iced Oat Milk Latte',
        note: 'Frothy, slightly sweet — brunch in a cup.',
      },
      playlist: {
        name: 'Sunday Morning Brunch',
        description: 'Slow jazz and acoustic sets. Makes any morning feel unhurried.',
        // Spotify "Sunday Morning" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXbTxeAdrVG2l',
      },
      ambiance: 'Sunlight hitting the table at the right angle.',
      description: "This one's for when life is actually going okay. You know the feeling — lean into it.",
      tags: ['healthy', 'sweet'],
      intensity: 2,
      estimatedPrepTime: '15 min',
      emoji: '🥑',
      colorTheme: HAPPY_THEME,
    },
    {
      id: 'happy-03',
      mood: 'happy',
      title: 'Street Taco Tuesday (Any Day Counts)',
      food: {
        name: 'Carne Asada Tacos',
        note: 'Three corn tortillas, charred meat, white onion, cilantro, salsa verde.',
      },
      drink: {
        name: 'Hibiscus Agua Fresca',
        note: 'Deep magenta, floral, ice cold — better than anything from a can.',
      },
      playlist: {
        name: 'Baila',
        description: 'Latin pop and reggaeton. Play it loud enough that the neighbors hear.',
        // Spotify "Baila Reggaeton" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX10zKzsJ2jva',
      },
      ambiance: 'Napkins on the table, juice running down your hand, zero regrets.',
      description: 'There is no happy mood that tacos cannot confirm. This one practically throws a party.',
      tags: ['fast', 'spicy', 'budget-friendly'],
      intensity: 3,
      estimatedPrepTime: '25 min',
      emoji: '🌮',
      colorTheme: HAPPY_THEME,
    },
    {
      id: 'happy-04',
      mood: 'happy',
      title: 'Cheeseburger, Fully Loaded',
      food: {
        name: 'Smash Burger',
        note: 'Double patty, American cheese, pickles, special sauce — smashed flat on a griddle.',
      },
      drink: {
        name: 'Chocolate Milkshake',
        note: 'Thick, cold, unapologetically indulgent.',
      },
      playlist: {
        name: 'Happy Hits',
        description: 'Pop songs that make you do the shoulder shimmy. No shame.',
        // Spotify "Happy Hits!" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC',
      },
      ambiance: 'Nowhere to be, something to look forward to.',
      description: 'Some food just tastes like winning. This is that food.',
      tags: ['comfort-food', 'fast'],
      intensity: 3,
      estimatedPrepTime: '20 min',
      emoji: '🍔',
      colorTheme: HAPPY_THEME,
    },
    {
      id: 'happy-05',
      mood: 'happy',
      title: "Pad Thai for One (or Two, if You're Sharing)",
      food: {
        name: 'Pad Thai',
        note: 'Rice noodles, shrimp, crushed peanuts, squeeze of lime — the whole formula.',
      },
      drink: {
        name: 'Thai Iced Tea',
        note: 'Orange, sweet, layered — it photographs well and tastes better.',
      },
      playlist: {
        name: 'Feel-Good Indie',
        description: 'Warm acoustic guitar and lyrics about nothing too serious. Exactly right.',
        // Spotify "Feel Good Indie Rock" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL',
      },
      ambiance: 'Takeout containers optional, chopsticks mandatory.',
      description: "The dish you reach for when nothing is wrong and that just feels like a reason to eat well. Right call.",
      tags: ['spicy', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '30 min',
      emoji: '🍜',
      colorTheme: HAPPY_THEME,
    },
  ],

  // ── TIRED (caramel accent) ─────────────────────────────────────────────────
  'tired': [
    {
      id: 'tired-01',
      mood: 'tired',
      title: 'The Pot of Soup That Fixes Things',
      food: {
        name: 'Tomato Basil Soup with Grilled Cheese',
        note: 'Creamy, from scratch ideally — but the good canned kind works tonight.',
      },
      drink: {
        name: 'Chamomile Honey Tea',
        note: 'Mug, both hands, somewhere soft to sit.',
      },
      playlist: {
        name: 'Sleep',
        description: 'Ambient and slow. Brian Eno energy. Zero demands on your brain.',
        // Spotify "Sleep" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp',
      },
      ambiance: 'Blanket nearby, low light, phone face down.',
      description: "You don't need to explain why you're tired. This one doesn't ask. It just helps.",
      tags: ['comfort-food', 'budget-friendly'],
      intensity: 1,
      estimatedPrepTime: '15 min',
      emoji: '🍵',
      colorTheme: TIRED_THEME,
    },
    {
      id: 'tired-02',
      mood: 'tired',
      title: "Pasta Like Your Brain Isn't Working",
      food: {
        name: 'Cacio e Pepe',
        note: 'Pasta, pecorino, black pepper. Four ingredients. No decisions required.',
      },
      drink: {
        name: 'Sparkling Water with Lemon',
        note: "Simple. Hydrating. Reminds you you're a person.",
      },
      playlist: {
        name: 'lo-fi beats to study/relax to',
        description: "The internet's favorite homework soundtrack. Still works.",
        // Spotify "lofi hip hop" playlist — verify URL
        url: 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4eZs8YY',
      },
      ambiance: 'Kitchen cleanup optional. Eat directly from the pot if needed. No judgment.',
      description: 'This one feels like emotional support fries, but make it pasta. Exactly as few steps as it sounds.',
      tags: ['comfort-food', 'fast', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '20 min',
      emoji: '🍝',
      colorTheme: TIRED_THEME,
    },
    {
      id: 'tired-03',
      mood: 'tired',
      title: 'The Breakfast-for-Dinner Pivot',
      food: {
        name: 'Scrambled Eggs and Toast',
        note: 'Soft eggs, butter on both sides of the toast, one more slice than you planned.',
      },
      drink: {
        name: 'Warm Milk with Honey',
        note: 'Old-fashioned and it works. Science confirms it. Trust it.',
      },
      playlist: {
        name: 'Peaceful Piano',
        description: 'Slow solo piano. The musical equivalent of exhaling.',
        // Spotify "Peaceful Piano" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
      },
      ambiance: 'Table optional. Couch entirely acceptable. Turn on something you\'ve already seen.',
      description: 'At the end of a long day, sometimes the best thing you can eat is the simplest thing you know how to make.',
      tags: ['comfort-food', 'fast', 'budget-friendly'],
      intensity: 1,
      estimatedPrepTime: '10 min',
      emoji: '🥚',
      colorTheme: TIRED_THEME,
    },
    {
      id: 'tired-04',
      mood: 'tired',
      title: 'Ramen Without the Effort',
      food: {
        name: 'Shoyu Ramen',
        note: 'The good instant kind dressed up with a soft-boiled egg and a handful of green onion.',
      },
      drink: {
        name: 'Hot Green Tea',
        note: "Drink it while it's hot. Sit for five minutes. You earned those five minutes.",
      },
      playlist: {
        name: 'Japanese Lo-Fi Chill',
        description: 'Rain sounds, soft keys, something almost sleepy. Perfect.',
        // Spotify "Tokyo Lofi" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      },
      ambiance: 'Steam rising, small bowl, the good light left on in the kitchen.',
      description: 'A bowl of noodles at the end of a hard day is not a small thing. It\'s actually the whole point.',
      tags: ['comfort-food', 'fast', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '10 min',
      emoji: '🍜',
      colorTheme: TIRED_THEME,
    },
    {
      id: 'tired-05',
      mood: 'tired',
      title: 'Takeout You Actually Feel Good About',
      food: {
        name: 'Butter Chicken with Garlic Naan',
        note: 'Rich, warm, requires absolutely zero effort on your part.',
      },
      drink: {
        name: 'Mango Lassi',
        note: 'Thick and cold — the contrast with hot curry is half the reason.',
      },
      playlist: {
        name: 'Chill Bollywood Vibes',
        description: "Melodic and easy. You don't have to understand the words to feel them.",
        // Spotify "Bollywood Lounge" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634',
      },
      ambiance: 'Straight from the container, TV on, phone away.',
      description: 'Tired days deserve full flavor. This is the order that arrives and you immediately feel less bad about the day.',
      tags: ['comfort-food', 'spicy'],
      intensity: 3,
      estimatedPrepTime: 'Order it',
      emoji: '🍛',
      colorTheme: TIRED_THEME,
    },
  ],

  // ── SAD (berry accent) ─────────────────────────────────────────────────────
  'sad': [
    {
      id: 'sad-01',
      mood: 'sad',
      title: 'Mac and Cheese, Made Properly',
      food: {
        name: 'Baked Mac and Cheese',
        note: 'Breadcrumb crust, three cheeses if you have them, more than one serving.',
      },
      drink: {
        name: 'Hot Cocoa',
        note: 'Made with whole milk. A little salt. Do not rush this.',
      },
      playlist: {
        name: 'Sad Indie',
        description: "Songs that understand. You're allowed to feel it.",
        // Spotify "Sad Indie" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1',
      },
      ambiance: 'Curtains drawn, candle if you have one, no obligations for at least an hour.',
      description: 'This one feels like someone made it for you even though you made it yourself. That\'s the point.',
      tags: ['comfort-food', 'sweet'],
      intensity: 2,
      estimatedPrepTime: '35 min',
      emoji: '🧀',
      colorTheme: SAD_THEME,
    },
    {
      id: 'sad-02',
      mood: 'sad',
      title: 'Chocolate for the Hard Day',
      food: {
        name: 'Warm Brownies',
        note: 'Dark chocolate, slightly underbaked in the middle — gooey is the requirement.',
      },
      drink: {
        name: 'Red Wine (one glass)',
        note: 'Something full-bodied. This is medicine with a label.',
      },
      playlist: {
        name: 'Songs to Cry To',
        description: 'The cathartic playlist. Let it do its work.',
        // Spotify "Songs to Cry To" editorial playlist — verify URL before shipping
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX64Y3ftC1cGM',
      },
      ambiance: 'Low light. Wherever you feel least alone.',
      description: 'Not every sad day calls for a solution. Sometimes the only plan is brownies and letting the feeling be there.',
      tags: ['sweet', 'comfort-food'],
      intensity: 2,
      estimatedPrepTime: '30 min',
      emoji: '🍫',
      colorTheme: SAD_THEME,
    },
    {
      id: 'sad-03',
      mood: 'sad',
      title: 'Ramen, the Real Kind',
      food: {
        name: 'Tonkotsu Ramen',
        note: 'Rich pork broth, soft-boiled egg, chashu — order in or do it right.',
      },
      drink: {
        name: 'Sencha Green Tea',
        note: 'Slightly bitter, warm, oddly grounding.',
      },
      playlist: {
        name: 'Melancholy but Beautiful',
        description: 'Music that makes sadness feel like a human thing instead of a problem.',
        // Spotify "Melancholy" editorial playlist — verify URL before shipping
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX3Osh0TIXtitx',
      },
      ambiance: 'Steam, quiet, no screens for at least the first ten minutes.',
      description: "There's something about a long-cooked broth that feels like it took someone's time. Like it was made for exactly this.",
      tags: ['comfort-food', 'spicy'],
      intensity: 3,
      estimatedPrepTime: '15 min',
      emoji: '🍜',
      colorTheme: SAD_THEME,
    },
    {
      id: 'sad-04',
      mood: 'sad',
      title: 'Pancakes at 8pm',
      food: {
        name: 'Fluffy Buttermilk Pancakes',
        note: 'Stack of three, real maple syrup, salted butter — breakfast logic does not apply.',
      },
      drink: {
        name: 'Warm Apple Cider',
        note: 'Spiced, slightly sweet, the smell alone does 40% of the work.',
      },
      playlist: {
        name: 'Acoustic Covers',
        description: 'Familiar songs slowed down to half their original tempo. Comforting in a specific way.',
        // Spotify "Acoustic Covers" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DWXmlLSKkfdAC',
      },
      ambiance: 'Soft light, quiet kitchen, the minor satisfaction of flipping them right.',
      description: "Pancakes don't care what time it is. They just want to help. Let them.",
      tags: ['comfort-food', 'sweet', 'budget-friendly'],
      intensity: 1,
      estimatedPrepTime: '20 min',
      emoji: '🥞',
      colorTheme: SAD_THEME,
    },
    {
      id: 'sad-05',
      mood: 'sad',
      title: 'Grilled Cheese, Elevated Slightly',
      food: {
        name: 'Brie and Jam Grilled Cheese',
        note: 'Sourdough, brie, fig jam, a thin smear of dijon — small effort, big return.',
      },
      drink: {
        name: 'Earl Grey with Milk',
        note: 'The classic for a reason. Hot, slightly floral, actually calming.',
      },
      playlist: {
        name: 'Rainy Day Jazz',
        description: 'The playlist that makes rain through a window look like a still life.',
        // Spotify "Rainy Day Jazz" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt',
      },
      ambiance: 'Rain outside if you\'re lucky. The sound of butter in a pan regardless.',
      description: 'Sometimes the nicest thing you can do for yourself is take a basic thing and make it slightly better. This is that.',
      tags: ['comfort-food', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '15 min',
      emoji: '🧇',
      colorTheme: SAD_THEME,
    },
  ],

  // ── BRUTALLY HUNGRY (mango accent) ────────────────────────────────────────
  'brutally-hungry': [
    {
      id: 'brutally-hungry-01',
      mood: 'brutally-hungry',
      title: 'The Double-Stack Verdict',
      food: {
        name: 'Double Smash Burger',
        note: 'Two patties, two slices of American cheese, special sauce, absolutely no restraint.',
      },
      drink: {
        name: 'Large Coke, no ice',
        note: 'You need the sugar. Trust the process.',
      },
      playlist: {
        name: 'Workout Motivation',
        description: 'High BPM. No patience for slow songs right now.',
        // Spotify "Workout" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP',
      },
      ambiance: 'Wherever you land. Floor counts. You\'re in crisis mode.',
      description: 'This is not a meal. This is a rescue operation. It will work.',
      tags: ['fast', 'comfort-food'],
      intensity: 3,
      estimatedPrepTime: '15 min',
      emoji: '🍔',
      colorTheme: HUNGRY_THEME,
    },
    {
      id: 'brutally-hungry-02',
      mood: 'brutally-hungry',
      title: 'Quesadilla with Absolutely No Time to Spare',
      food: {
        name: 'Loaded Chicken Quesadilla',
        note: 'Full pan, maximum cheese pull, sour cream, salsa on the side — cook time seven minutes.',
      },
      drink: {
        name: 'Cold Water, Immediately',
        note: 'And then something with electrolytes. Your body is making demands.',
      },
      playlist: {
        name: 'Energize',
        description: 'Fast, loud, functional. Background noise while you cook at full speed.',
        // Spotify "Energy Booster" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX0tnl0zs9oGg',
      },
      ambiance: 'Standing at the counter is fine. Plates optional.',
      description: 'When the hunger hits a specific level, the quesadilla is not a compromise. It is the correct answer.',
      tags: ['fast', 'spicy', 'budget-friendly'],
      intensity: 3,
      estimatedPrepTime: '10 min',
      emoji: '🫓',
      colorTheme: HUNGRY_THEME,
    },
    {
      id: 'brutally-hungry-03',
      mood: 'brutally-hungry',
      title: 'Rice Bowl. No Notes.',
      food: {
        name: 'Korean Beef Bibimbap',
        note: 'Rice, ground beef, gochujang, a fried egg on top — one bowl, extremely filling.',
      },
      drink: {
        name: 'Barley Tea (Boricha)',
        note: 'Nutty, room temperature, somehow exactly right for this.',
      },
      playlist: {
        name: 'K-Pop Hits',
        description: 'High energy, precise, works well while cooking fast.',
        // Spotify "K-Pop Daebak" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX9tPFwDMOBHm',
      },
      ambiance: 'Fastest route to full. No ceremony necessary.',
      description: 'A bowl that earns its keep. Heavy enough to matter, specific enough to remember.',
      tags: ['fast', 'spicy', 'budget-friendly'],
      intensity: 3,
      estimatedPrepTime: '20 min',
      emoji: '🍚',
      colorTheme: HUNGRY_THEME,
    },
    {
      id: 'brutally-hungry-04',
      mood: 'brutally-hungry',
      title: 'The Emergency Pasta',
      food: {
        name: 'Aglio e Olio',
        note: 'Spaghetti, garlic, olive oil, chili flakes, parmesan — this is what the pantry was made for.',
      },
      drink: {
        name: 'Sparkling Water',
        note: 'Cold. Right now. While the pasta boils.',
      },
      playlist: {
        name: 'Italian Cooking Soundtrack',
        description: 'Operatic but not pretentious. Somehow matches the urgency.',
        // Spotify "Italian Cooking" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX782GGwMBUPm',
      },
      ambiance: 'The stove is your only friend right now. Ten minutes. You\'ve got this.',
      description: 'The pasta that exists precisely for this situation. It knows what it\'s for.',
      tags: ['fast', 'budget-friendly', 'comfort-food'],
      intensity: 2,
      estimatedPrepTime: '15 min',
      emoji: '🍝',
      colorTheme: HUNGRY_THEME,
    },
    {
      id: 'brutally-hungry-05',
      mood: 'brutally-hungry',
      title: 'Nachos, Built to Feed a Crisis',
      food: {
        name: 'Loaded Sheet Pan Nachos',
        note: 'Layer chips, cheese, jalapeños, black beans — oven at 400°F, eight minutes, done.',
      },
      drink: {
        name: 'Limeade or Lemonade',
        note: 'Cold, tart, immediate.',
      },
      playlist: {
        name: 'Party Hits',
        description: "It's a party of one and the nachos are the guest of honor.",
        // Spotify "Party" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xqF',
      },
      ambiance: 'Pan goes directly on the table. No plates. Full commitment.',
      description: 'There is no elegant version of this hunger. Nachos don\'t pretend otherwise and neither should you.',
      tags: ['fast', 'spicy', 'budget-friendly'],
      intensity: 3,
      estimatedPrepTime: '12 min',
      emoji: '🧀',
      colorTheme: HUNGRY_THEME,
    },
  ],

  // ── MOVIE MODE (matcha accent) ────────────────────────────────────────────
  'movie-mode': [
    {
      id: 'movie-mode-01',
      mood: 'movie-mode',
      title: 'The Classic Setup',
      food: {
        name: 'Buttered Popcorn',
        note: 'Real butter, extra salt — the movie theater version, not the sad microwave kind.',
      },
      drink: {
        name: 'Cherry Coke over Ice',
        note: 'The tall glass version. This is the one.',
      },
      playlist: {
        name: 'Movie Night',
        description: 'Cinematic scores and iconic soundtracks. Pre-show only — once the movie starts, everything else is off.',
        // Spotify "Movie Scores" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX4OzrY981I1W',
      },
      ambiance: 'Lights off, volume up, phone in another room if you can manage it.',
      description: "There's a reason this combination has survived for a hundred years. It just works.",
      tags: ['comfort-food', 'fast', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '5 min',
      emoji: '🍿',
      colorTheme: MOVIE_THEME,
    },
    {
      id: 'movie-mode-02',
      mood: 'movie-mode',
      title: 'Loaded Nachos for the Long Movie',
      food: {
        name: 'Queso Nachos',
        note: 'Thick queso dip, tortilla chips, pickled jalapeños — designed for grazing across two hours.',
      },
      drink: {
        name: 'Frozen Margarita',
        note: 'Make a pitcher. This is a commitment.',
      },
      playlist: {
        name: 'Chill Evening Vibes',
        description: 'Relaxed and ambient. The pre-movie hour is its own experience.',
        // Spotify "Chill Evening" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj',
      },
      ambiance: 'Blanket fort optional but encouraged. Remote already in hand.',
      description: 'The kind of setup where you pause the movie three times just to refill something. Worth every interruption.',
      tags: ['comfort-food', 'spicy'],
      intensity: 3,
      estimatedPrepTime: '20 min',
      emoji: '🌮',
      colorTheme: MOVIE_THEME,
    },
    {
      id: 'movie-mode-03',
      mood: 'movie-mode',
      title: 'Pizza Night (The Good Version)',
      food: {
        name: 'Pepperoni and Hot Honey Pizza',
        note: 'Crispy edges, pool of pepperoni grease, hot honey drizzle at the end.',
      },
      drink: {
        name: 'Cold Beer or Root Beer',
        note: 'Pick your version. Both are correct.',
      },
      playlist: {
        name: 'Alternative 00s Rock',
        description: 'The playlist that defined movie nights in a specific decade. Still holds up.',
        // Spotify "2000s Rock Anthems" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX3oM43sN5Lol',
      },
      ambiance: 'Box on the coffee table, slices go directly from box to hand to mouth.',
      description: 'Movie night pizza is its own category of pizza. This is the peak of that category.',
      tags: ['comfort-food', 'spicy', 'fast'],
      intensity: 3,
      estimatedPrepTime: 'Order it',
      emoji: '🍕',
      colorTheme: MOVIE_THEME,
    },
    {
      id: 'movie-mode-04',
      mood: 'movie-mode',
      title: 'The Grazing Board',
      food: {
        name: 'Charcuterie and Crackers',
        note: 'Prosciutto, aged cheddar, marcona almonds, fig jam, sourdough crackers — no assembly required.',
      },
      drink: {
        name: 'Sparkling Wine or Sparkling Cider',
        note: 'A small glass, poured slowly, for the beginning of something good.',
      },
      playlist: {
        name: 'Indie Folk Evening',
        description: 'Soft and warm. A transitional playlist — dinner into couch into movie.',
        // Spotify "Indie Folk" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DWXJyjYpnMFaG',
      },
      ambiance: 'Everything on a board in the center of the table. Low stakes. Everyone reaches.',
      description: "The meal that says: we're not in a hurry. We're doing this right.",
      tags: ['comfort-food', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '10 min',
      emoji: '🧀',
      colorTheme: MOVIE_THEME,
    },
    {
      id: 'movie-mode-05',
      mood: 'movie-mode',
      title: 'Spicy Wings, Full Commitment',
      food: {
        name: 'Buffalo Wings with Ranch',
        note: "Proper hot sauce, crispy skin, enough ranch to be diplomatic about it.",
      },
      drink: {
        name: 'IPA or Craft Soda',
        note: 'Something with enough bite to hold up against the heat.',
      },
      playlist: {
        name: 'Late Night Drive',
        description: 'Dark, atmospheric, cinematic. The playlist you could score something to.',
        // Spotify "Late Night Drive" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX6ziVCJnEm59',
      },
      ambiance: 'Paper towels stacked on the side. These are messy and that\'s part of the deal.',
      description: "Wings demand full presence. No multitasking. No side conversations. Just the sauce and whatever's on screen.",
      tags: ['comfort-food', 'spicy', 'fast'],
      intensity: 3,
      estimatedPrepTime: '35 min',
      emoji: '🍗',
      colorTheme: MOVIE_THEME,
    },
  ],

  // ── DATE MODE (rose accent) ───────────────────────────────────────────────
  'date-mode': [
    {
      id: 'date-mode-01',
      mood: 'date-mode',
      title: 'The Pasta That Always Impresses',
      food: {
        name: 'Mushroom Risotto',
        note: 'Arborio rice, white wine, parmesan — slow-cooked, absolutely worth the 35 minutes.',
      },
      drink: {
        name: 'Pinot Grigio',
        note: 'Chilled, poured into proper glasses. The detail matters here.',
      },
      playlist: {
        name: 'Romantic Dinner',
        description: 'Jazz-leaning, warm, the right amount of space between songs.',
        // Spotify "Romantic Evening" editorial playlist — verify URL before shipping
        url: 'https://open.spotify.com/playlist/37i9dQZF1DWSmyy8M1UgXy',
      },
      ambiance: 'Two candles minimum. Plates that match. Distractions turned off.',
      description: 'This is a meal that says: I thought about this. Not in a loud way. In the way that matters.',
      tags: ['comfort-food', 'sweet'],
      intensity: 3,
      estimatedPrepTime: '35 min',
      emoji: '🍄',
      colorTheme: DATE_THEME,
    },
    {
      id: 'date-mode-02',
      mood: 'date-mode',
      title: 'Tapas for Two',
      food: {
        name: 'Spanish Tapas Spread',
        note: 'Patatas bravas, jamón, manchego, warm bread — small plates, long conversation.',
      },
      drink: {
        name: 'Sangria',
        note: 'Made the evening before if possible. Red wine, brandy, citrus, patience.',
      },
      playlist: {
        name: 'Flamenco Chill',
        description: 'Spanish guitar and warmth. The playlist that makes a kitchen feel like Barcelona.',
        // Spotify "Flamenco" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXb1RjjtLWNlF',
      },
      ambiance: 'Small table, candle, everything within reach — the arrangement matters.',
      description: 'Tapas are designed for this. The sharing, the slowing down, the excuse to sit across from someone for two hours.',
      tags: ['spicy', 'budget-friendly'],
      intensity: 3,
      estimatedPrepTime: '30 min',
      emoji: '🫒',
      colorTheme: DATE_THEME,
    },
    {
      id: 'date-mode-03',
      mood: 'date-mode',
      title: 'Sushi Night (Done Right)',
      food: {
        name: 'Hand Roll Sushi Night',
        note: "Salmon, tuna, avocado, nori sheets, sushi rice — make them together, that's the activity.",
      },
      drink: {
        name: 'Sake or Jasmine Green Tea',
        note: 'Warm sake in small cups if you can. The ritual of it is the point.',
      },
      playlist: {
        name: 'Tokyo Night',
        description: 'J-Pop and city ambiance. Something unfamiliar and interesting.',
        // Spotify "Tokyo" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXaF4JhZXIEeO',
      },
      ambiance: 'All the ingredients out at once. You make them, you eat them immediately. Genuinely fun.',
      description: 'The date night that becomes a story. The one you describe later when someone asks how it went.',
      tags: ['healthy', 'sweet'],
      intensity: 3,
      estimatedPrepTime: '45 min',
      emoji: '🍣',
      colorTheme: DATE_THEME,
    },
    {
      id: 'date-mode-04',
      mood: 'date-mode',
      title: 'Steakhouse, at Home',
      food: {
        name: 'Pan-Seared Ribeye with Roasted Garlic Potatoes',
        note: 'Cast iron, butter baste, one minute over medium — let it rest, please.',
      },
      drink: {
        name: 'Malbec',
        note: 'Argentinian. Full-bodied. The pairing here is not optional.',
      },
      playlist: {
        name: 'Jazz Classics',
        description: 'Coltrane energy. The meal is already impressive — the music just confirms it.',
        // Spotify "Jazz Classics" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXbHcQh3jhuAB',
      },
      ambiance: 'The good plates. Cloth napkins if you have them. No phones on the table.',
      description: 'Some dinners are about showing what you can do in a kitchen. This is one of those dinners.',
      tags: ['comfort-food'],
      intensity: 3,
      estimatedPrepTime: '40 min',
      emoji: '🥩',
      colorTheme: DATE_THEME,
    },
    {
      id: 'date-mode-05',
      mood: 'date-mode',
      title: 'Fondue and the Good Wine',
      food: {
        name: 'Swiss Cheese Fondue with Dipping Bread and Vegetables',
        note: 'Gruyère and emmental, white wine in the pot, cubed sourdough for dipping.',
      },
      drink: {
        name: 'Crisp White Wine',
        note: 'Same wine you put in the fondue. Dry, cold, poured generously.',
      },
      playlist: {
        name: 'French Café',
        description: 'Accordion and warmth. The playlist that makes everything feel slightly more romantic and slightly more European.',
        // Spotify "French Café" editorial playlist — verify URL
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXaa6dlzNzNYV',
      },
      ambiance: 'One pot in the center, two forks, nothing else necessary.',
      description: 'Fondue is inherently intimate. There is no way to eat fondue and not be present with the person across from you.',
      tags: ['comfort-food', 'budget-friendly'],
      intensity: 2,
      estimatedPrepTime: '20 min',
      emoji: '🫕',
      colorTheme: DATE_THEME,
    },
  ],
};
