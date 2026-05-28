const QUESTION_BANK = {
  daily: {
    label: 'Daily Life',
    icon: '☀️',
    questions: [
      {
        id: 'dl1',
        text: "When you get home after a long day, your first move is usually:",
        options: [
          "Change into comfortable clothes immediately",
          "Grab something to eat or drink",
          "Sit down and fully decompress",
          "Check my phone and catch up on things"
        ]
      },
      {
        id: 'dl2',
        text: "When you can't fall asleep, what do you actually do?",
        options: [
          "Scroll my phone until I drift off",
          "Get up and do something until I'm tired",
          "Just lie there and wait it out",
          "Put on something to watch or listen to"
        ]
      },
      {
        id: 'dl3',
        text: "When you're in a bad mood, what actually helps?",
        options: [
          "Being left alone for a bit",
          "Talking through what's bothering me",
          "Something physical — a walk, the gym",
          "Distraction — a show, food, something fun"
        ]
      },
      {
        id: 'dl4',
        text: "A completely free Sunday with no plans. How do you spend it?",
        options: [
          "Stay home and fully recharge",
          "Get out of the house for something low-key",
          "Catch up on things I've been putting off",
          "Socialize — visit someone or have people over"
        ]
      },
      {
        id: 'dl5',
        text: "When the check arrives at a restaurant, your instinct is:",
        options: [
          "Reach for it immediately",
          "Wait a moment to see what happens",
          "Suggest splitting it",
          "Let the other person handle it this time"
        ]
      },
      {
        id: 'dl6',
        text: "How do you handle a week with a packed social calendar?",
        options: [
          "Love it — I get energy from being around people",
          "Fine, but I need recovery time after",
          "I start canceling things — I have a limit",
          "Anxious from the start, would rather scale back"
        ]
      },
      {
        id: 'dl7',
        text: "When something small goes wrong in your day, your reaction is usually:",
        options: [
          "I move on quickly — small things don't stick",
          "I get annoyed but bounce back in minutes",
          "It affects my mood longer than it probably should",
          "I want to solve it immediately before moving on"
        ]
      },
      {
        id: 'dl8',
        text: "Your preferred lunch break, if you had full control:",
        options: [
          "Eat alone — I need the quiet",
          "Eat with someone — I like the company",
          "Get completely out of whatever environment I'm in",
          "Work through it so I can leave earlier"
        ]
      },
      {
        id: 'dl9',
        text: "When you're stressed, the first thing you're likely to neglect is:",
        options: [
          "Sleep — I stay up too late",
          "Eating well — I grab whatever's fast",
          "Exercise — the first thing to go",
          "People — I go quiet and pull back"
        ]
      },
      {
        id: 'dl10',
        text: "How do you prefer to handle disagreements in the moment?",
        options: [
          "Talk it through right then and there",
          "Take space first, then discuss when calm",
          "Let it go if it's not that serious",
          "Write or think through my thoughts before talking"
        ]
      }
    ]
  },
  fun: {
    label: 'Just for Fun',
    icon: '🎯',
    questions: [
      {
        id: 'fn1',
        text: "If you won $500 right now, what would you most likely do with it?",
        options: [
          "Save it or set it aside",
          "Spend it on something I've been wanting",
          "Take us somewhere or do something together",
          "Chip away at something owed"
        ]
      },
      {
        id: 'fn2',
        text: "How competitive do you actually get during games?",
        options: [
          "Very — I genuinely want to win",
          "Somewhat — I care more than I admit",
          "Not really — I'm there for the fun",
          "Only if the other person is being competitive"
        ]
      },
      {
        id: 'fn3',
        text: "If we could travel anywhere for two weeks starting tomorrow, your first instinct is:",
        options: [
          "Somewhere warm with beaches and no schedule",
          "Europe — cities, food, history",
          "Somewhere off the grid — hiking, nature, adventure",
          "Back somewhere meaningful to us already"
        ]
      },
      {
        id: 'fn4',
        text: "You're watching something together and it's clearly bad. You:",
        options: [
          "Stick with it — I hate leaving things unfinished",
          "Suggest changing it after 20 minutes",
          "Check my phone but stay on the couch",
          "Say it's bad early and find something else"
        ]
      },
      {
        id: 'fn5',
        text: "Your go-to order when you genuinely don't know what to get:",
        options: [
          "Something familiar — I default to what I know I like",
          "Whatever sounds most interesting on the menu",
          "Ask the server for their recommendation",
          "Whatever my partner is having"
        ]
      },
      {
        id: 'fn6',
        text: "The hardest thing for me to resist when I'm tired:",
        options: [
          "Ordering food instead of cooking",
          "Staying up too late for no real reason",
          "Skipping something I said I'd do",
          "Saying yes to plans I don't actually want to go to"
        ]
      },
      {
        id: 'fn7',
        text: "Given a free afternoon with no obligations, I'd most likely:",
        options: [
          "Do something creative — cook, build, make something",
          "Get outside — a walk, a drive, fresh air",
          "Completely zone out with a show or game",
          "Get ahead on something so I can truly relax later"
        ]
      },
      {
        id: 'fn8',
        text: "My version of a perfect night in looks like:",
        options: [
          "Good food, a great show, zero plans",
          "A project or game we can do together",
          "Something low-effort but fun — cards, trivia, snacks",
          "Early night — rest is the reward"
        ]
      },
      {
        id: 'fn9',
        text: "In a group setting, I'm usually the one who:",
        options: [
          "Keeps the energy up and drives conversation",
          "Listens more than talks, chimes in when I have something",
          "Makes sure everyone's included",
          "Watches the room and decides how I want to show up"
        ]
      },
      {
        id: 'fn10',
        text: "What's most likely to make me laugh out loud?",
        options: [
          "Something absurd or totally unexpected",
          "A sharp observation about real life",
          "Physical comedy or someone's reaction",
          "When someone's laughing so hard it gets me laughing"
        ]
      }
    ]
  },
  early: {
    label: 'Early Days',
    icon: '💌',
    questions: [
      {
        id: 'er1',
        text: "What did you first notice about your partner when you met?",
        options: [
          "Their smile or the way they looked",
          "Their energy and how they carried themselves",
          "How they treated the people around them",
          "Something specific they said"
        ]
      },
      {
        id: 'er2',
        text: "Your honest first impression when you met your partner:",
        options: [
          "Immediately attracted — I knew something was there",
          "Interesting, but I wasn't sure yet",
          "Didn't think much of it — it grew slowly over time",
          "A little intimidated, honestly"
        ]
      },
      {
        id: 'er3',
        text: "What did your partner do early on that showed you they were serious?",
        options: [
          "Consistent effort — always reached out and showed up",
          "Introduced me to people important to them",
          "Showed real vulnerability — shared something genuine",
          "Was there when I actually needed someone"
        ]
      },
      {
        id: 'er4',
        text: "Your biggest worry about this relationship in the early days:",
        options: [
          "Whether they liked me as much as I liked them",
          "Whether we were actually compatible long-term",
          "The timing — things felt complicated",
          "I didn't have many worries — it felt natural"
        ]
      },
      {
        id: 'er5',
        text: "The earliest version of your partner you remember — they were most:",
        options: [
          "Energetic and excited about everything",
          "Calm and steady — harder to read at first",
          "Funny — they made me laugh constantly",
          "Thoughtful — they said things that surprised me"
        ]
      },
      {
        id: 'er6',
        text: "If you had to describe the early days of this relationship in one word:",
        options: [
          "Electric — charged and exciting",
          "Easy — it flowed without any effort",
          "Uncertain — exciting but I didn't know where it was going",
          "Gradual — it built slowly but surely"
        ]
      },
      {
        id: 'er7',
        text: "What did you talk about most in the early months?",
        options: [
          "Where we came from — our backstories and families",
          "What we wanted out of life — big picture stuff",
          "Current life — work, friends, what was happening",
          "Honestly, everything — it all just flowed"
        ]
      },
      {
        id: 'er8',
        text: "The moment you knew this relationship was different from others:",
        options: [
          "A specific conversation where something clicked",
          "Realizing I was fully myself without trying",
          "When they showed up in a way no one had before",
          "There wasn't one moment — it accumulated over time"
        ]
      }
    ]
  },
  dreams: {
    label: 'Big Dreams',
    icon: '✨',
    questions: [
      {
        id: 'dr1',
        text: "If you could change one thing about your daily life right now, it would be:",
        options: [
          "More financial freedom or stability",
          "More time — less busy, more room to breathe",
          "More meaningful work or a stronger sense of purpose",
          "Better health, energy, or fitness"
        ]
      },
      {
        id: 'dr2',
        text: "A great life 10 years from now looks like:",
        options: [
          "Financial security and the freedom to do what I want",
          "Strong relationships — family, friends, partner, community",
          "Work I'm genuinely proud of that matters",
          "Experiences — travel, memories, adventures"
        ]
      },
      {
        id: 'dr3',
        text: "Something you've always wanted to do but haven't yet:",
        options: [
          "Travel somewhere specific or for an extended period",
          "Build or start something — a project, business, or creative work",
          "Reach a personal goal — fitness, skill, or challenge",
          "Make a significant life change — move, career shift, lifestyle"
        ]
      },
      {
        id: 'dr4',
        text: "How money fits into your idea of a good life:",
        options: [
          "It's the foundation — most things depend on financial stability",
          "It matters a lot but it's a means to an end",
          "Important but not the priority — I'd trade salary for meaning",
          "I think about it less than most people"
        ]
      },
      {
        id: 'dr5',
        text: "The thing you most want to be known for at the end of your life:",
        options: [
          "Being a great partner and parent",
          "Making a real difference in my work or community",
          "Living fully and without regrets",
          "Being the person people could always count on"
        ]
      },
      {
        id: 'dr6',
        text: "If you could master one skill over the next two years, it would be:",
        options: [
          "A creative skill — music, writing, art, design",
          "A physical skill — sport, fitness, something demanding",
          "A career or business skill that changes my trajectory",
          "Something practical — cooking, building, fixing things"
        ]
      },
      {
        id: 'dr7',
        text: "If you were starting your career over with what you know now, you'd choose:",
        options: [
          "The same path — I believe in what I'm doing",
          "Something more creative or expressive",
          "Something entrepreneurial — I'd build my own thing",
          "Something with more direct human impact"
        ]
      },
      {
        id: 'dr8',
        text: "The version of yourself you're working toward is someone who is:",
        options: [
          "Financially free and in control of their time",
          "Deeply healthy — physically and mentally",
          "Building something meaningful and lasting",
          "Present and grounded — less anxious, more at peace"
        ]
      }
    ]
  },
  family: {
    label: 'Family & Home',
    icon: '🏡',
    questions: [
      {
        id: 'fm1',
        text: "A perfect home, to you, feels:",
        options: [
          "Warm and cozy — a place to fully decompress",
          "Organized and clean — clutter genuinely stresses me out",
          "Lively — people in and out, full of energy",
          "A mix — calm but never empty or boring"
        ]
      },
      {
        id: 'fm2',
        text: "When it comes to parenting style, I'd naturally lean toward:",
        options: [
          "Structured — routines, boundaries, consistency",
          "Relaxed — give them space to figure things out",
          "Involved in everything — I want to be close to the details",
          "Balanced — adjusting to whatever the moment needs"
        ]
      },
      {
        id: 'fm3',
        text: "The family ritual that matters most to you:",
        options: [
          "Holiday gatherings — showing up for the big moments",
          "Small regular rituals — weekly dinners, consistent routines",
          "Milestones — birthdays, anniversaries, major life events",
          "Making new traditions rather than preserving old ones"
        ]
      },
      {
        id: 'fm4',
        text: "How do you feel about living near family?",
        options: [
          "It matters to me — proximity strengthens relationships",
          "Nice but not necessary — connection doesn't need closeness",
          "I prefer some distance — space keeps things healthier",
          "I haven't really thought about it — wherever life leads"
        ]
      },
      {
        id: 'fm5',
        text: "What 'a good home environment' means to you most:",
        options: [
          "Physical order — everything has a place",
          "Emotional safety — we can say anything without judgment",
          "Hospitality — it's a place others want to be",
          "Simplicity — not too much stuff, not too much scheduled"
        ]
      },
      {
        id: 'fm6',
        text: "The role you naturally play in your family of origin:",
        options: [
          "The responsible one — I hold things together",
          "The one people come to for advice and support",
          "The one who keeps it light — humor, energy",
          "More of an observer — I watch more than I lead"
        ]
      },
      {
        id: 'fm7',
        text: "When there's tension with extended family, your instinct is:",
        options: [
          "Address it directly — I'd rather say something than let it build",
          "Give it time — most things resolve on their own",
          "Protect our immediate family unit first",
          "Try to mediate — I'm usually the peacekeeper"
        ]
      },
      {
        id: 'fm8',
        text: "If you had to name the non-negotiable in how you'd raise kids, it's:",
        options: [
          "Education and a love of learning",
          "Emotional intelligence and empathy",
          "Work ethic and resilience",
          "Strong values and knowing what they stand for"
        ]
      }
    ]
  },
  spicy: {
    label: 'Spicy',
    icon: '🌶️',
    questions: [
      {
        id: 'sp1',
        text: "The thing that makes you feel most desired by your partner:",
        options: [
          "A genuine compliment out of nowhere",
          "Physical affection without being asked",
          "Them being proud of me in front of others",
          "Undivided, fully present attention"
        ]
      },
      {
        id: 'sp2',
        text: "If you could change one thing about how you and your partner handle conflict:",
        options: [
          "We'd take more space before responding",
          "We'd say what we actually mean faster",
          "We'd end arguments with less lingering tension",
          "We'd disagree less — find ways to avoid it"
        ]
      },
      {
        id: 'sp3',
        text: "The most romantic thing your partner could do this week:",
        options: [
          "Plan a date without telling me the details",
          "Write me a note or send a real message",
          "Initiate physical closeness more",
          "Do something thoughtful without being asked"
        ]
      },
      {
        id: 'sp4',
        text: "The love language you wish your partner used more often:",
        options: [
          "Words — tell me how you feel more often",
          "Touch — physical presence and closeness",
          "Quality time — phone down, fully present",
          "Acts of service — doing things unprompted"
        ]
      },
      {
        id: 'sp5',
        text: "The topic you and your partner should probably discuss more openly:",
        options: [
          "Money — how we handle it and plan together",
          "The future — timelines and shared expectations",
          "A recurring tension that never fully resolves",
          "What we each need but haven't said out loud"
        ]
      },
      {
        id: 'sp6',
        text: "What your partner does that you find most attractive:",
        options: [
          "Small acts of care and thoughtfulness",
          "Confidence in who they are",
          "When they're genuinely passionate about something",
          "When we feel close and deeply connected"
        ]
      },
      {
        id: 'sp7',
        text: "The time of day you feel most connected to your partner:",
        options: [
          "Morning — before the day takes over",
          "Evening — winding down side by side",
          "Night — talking with no agenda",
          "Whenever we're doing something just the two of us"
        ]
      },
      {
        id: 'sp8',
        text: "What 'feeling close' to your partner most often looks like:",
        options: [
          "A long honest conversation where nothing is held back",
          "Laughing about something only we'd find funny",
          "Physical closeness — just being near each other",
          "Doing something side by side without needing to talk"
        ]
      }
    ]
  }
};
