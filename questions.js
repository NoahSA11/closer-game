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
      },
      {
        id: 'dl11',
        text: "The gift you'd most want but would never actually ask for:",
        options: [
          "A full day with no responsibilities and no guilt",
          "Someone to handle all the admin of my life for a week",
          "An experience — a trip, a meal, something memorable",
          "Something they thought of themselves, totally unprompted"
        ]
      },
      {
        id: 'dl12',
        text: "When you're avoiding something you need to do, your go-to distraction is:",
        options: [
          "My phone — endless scrolling",
          "Cleaning or tidying something",
          "Food — I snack my way through procrastination",
          "Starting a different task so it at least feels productive"
        ]
      },
      {
        id: 'dl13',
        text: "The thing that most often throws off your whole day:",
        options: [
          "A bad night of sleep",
          "Feeling behind from the start",
          "A tense interaction with someone",
          "Skipping a workout or routine I rely on"
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
      },
      {
        id: 'fn11',
        text: "If we had a completely unplanned day together — no phones, no agenda — your first instinct would be:",
        options: [
          "Drive somewhere with no destination in mind",
          "Cook or make something together",
          "Find a spot outside and just be",
          "Make it a proper lazy day — movies, blankets, nowhere to be"
        ]
      },
      {
        id: 'fn12',
        text: "The thing about yourself that most people would be surprised to learn:",
        options: [
          "I'm much more sensitive than I let on",
          "I have a hidden competitive streak",
          "I've done something most people haven't",
          "I genuinely enjoy something usually seen as uncool or boring"
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
      },
      {
        id: 'dr9',
        text: "The thing on your 'someday' list that's been there the longest:",
        options: [
          "A trip or place I've always meant to go",
          "Learning something I keep starting and stopping",
          "A creative project I've been meaning to begin",
          "A life change I keep telling myself I'll make"
        ]
      },
      {
        id: 'dr10',
        text: "If you could be truly exceptional at one thing — known for it — it would be:",
        options: [
          "Something creative: writing, music, art, design",
          "Something physical: a sport, craft, or skill",
          "Something intellectual: building, solving, innovating",
          "Something relational: leading people, helping, connecting"
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

// ─── Friend Mode Question Bank ───────────────────────────────────────────────
// Used when state.gameType === 'friends'. No romantic/couple framing anywhere.

const FRIEND_QUESTION_BANK = {
  habits: {
    label: 'Habits & Quirks',
    icon: '☀️',
    questions: [
      {
        id: 'fh1',
        text: "Your most-checked app in the first five minutes of waking up:",
        options: [
          "Instagram or TikTok",
          "Messages or email",
          "News or a podcast app",
          "I don't check my phone right away"
        ]
      },
      {
        id: 'fh2',
        text: "Your approach to replying to texts:",
        options: [
          "I reply almost immediately",
          "I see it and reply when I have energy",
          "I forget and apologize later",
          "Depends entirely on who it's from"
        ]
      },
      {
        id: 'fh3',
        text: "At a restaurant, you usually:",
        options: [
          "Know what you want before opening the menu",
          "Order whatever sounds best that day",
          "Ask the table what they're getting first",
          "Panic-order whatever the server suggests"
        ]
      },
      {
        id: 'fh4',
        text: "When a new show is recommended to you, you:",
        options: [
          "Binge it immediately",
          "Add it to a list and maybe never watch it",
          "Watch one episode to test it first",
          "Need multiple recommendations before I start"
        ]
      },
      {
        id: 'fh5',
        text: "Your sleep schedule is best described as:",
        options: [
          "Early to bed, early to rise — consistently",
          "Night owl, always",
          "Totally inconsistent, no pattern",
          "Whatever gets me 8 hours, I don't care when"
        ]
      },
      {
        id: 'fh6',
        text: "When you're bored, your default is to:",
        options: [
          "Scroll social media",
          "Find someone to hang out with",
          "Start a project or creative thing",
          "Watch something or play a game"
        ]
      },
      {
        id: 'fh7',
        text: "Your relationship with being on time:",
        options: [
          "Always early — punctuality is non-negotiable",
          "I aim for on time and mostly succeed",
          "Chronically 5 minutes late, it's a thing",
          "I try but life always conspires against me"
        ]
      },
      {
        id: 'fh8',
        text: "When you can't find something, you:",
        options: [
          "Retrace my steps methodically",
          "Ask someone else immediately",
          "Tear everything apart looking",
          "Give up and assume it'll turn up"
        ]
      },
      {
        id: 'fh9',
        text: "Your desk or workspace is usually:",
        options: [
          "Spotlessly organized",
          "Organized chaos — messy but I know where everything is",
          "A disaster, but it works for me",
          "It varies wildly depending on the week"
        ]
      },
      {
        id: 'fh10',
        text: "Planning a night out, you prefer:",
        options: [
          "All details sorted well in advance",
          "A rough plan is fine, we'll figure it out",
          "Last-minute always feels more alive",
          "Whatever the group decides — I'm easy"
        ]
      }
    ]
  },

  opinions: {
    label: 'Hot Takes',
    icon: '🎯',
    questions: [
      {
        id: 'fo1',
        text: "Your honest take on small talk:",
        options: [
          "I actually enjoy it",
          "Necessary evil — I've made peace with it",
          "Genuinely painful every time",
          "Fine if it leads somewhere real quickly"
        ]
      },
      {
        id: 'fo2',
        text: "Mornings on weekends should be:",
        options: [
          "Productive — best time of day",
          "Slow and sacred — no agenda allowed",
          "Used for exercise or movement",
          "Slept through, honestly"
        ]
      },
      {
        id: 'fo3',
        text: "The right number of people at a hangout:",
        options: [
          "2 or 3 max — anything bigger is exhausting",
          "4 to 6 — perfect group energy",
          "The more the better, I love a crowd",
          "Depends entirely on my mood"
        ]
      },
      {
        id: 'fo4',
        text: "Your honest take on social media:",
        options: [
          "Mostly fine — I'm intentional about it",
          "A necessary evil for staying connected",
          "A net negative I keep using anyway",
          "Something I'm actively trying to use less"
        ]
      },
      {
        id: 'fo5',
        text: "When someone gives you a bad movie recommendation:",
        options: [
          "I tell them my honest opinion",
          "I give a vague 'it was interesting'",
          "I say nothing and quietly note it",
          "I ask what they liked and try to understand"
        ]
      },
      {
        id: 'fo6',
        text: "The best part of a vacation is:",
        options: [
          "Getting there — I love the travel itself",
          "The first day somewhere completely new",
          "The middle days when you're in the groove",
          "Coming home and telling people about it"
        ]
      },
      {
        id: 'fo7',
        text: "Your take on being wrong about something:",
        options: [
          "I admit it pretty easily and move on",
          "I admit it but quietly think about it after",
          "I need a minute before I can own it",
          "It haunts me longer than it should"
        ]
      },
      {
        id: 'fo8',
        text: "Your relationship with exercise:",
        options: [
          "I genuinely enjoy it",
          "I feel good after — it's just hard to start",
          "I do it out of obligation, not joy",
          "Still searching for a form I actually like"
        ]
      },
      {
        id: 'fo9',
        text: "The worst part of traveling:",
        options: [
          "Airports, transit, and logistics",
          "Living out of a suitcase",
          "The planning before you go",
          "Coming back to normal life"
        ]
      },
      {
        id: 'fo10',
        text: "Settling down vs. keeping options open:",
        options: [
          "I want roots — stability is the goal",
          "I want flexibility for as long as possible",
          "Somewhere in the middle, honestly",
          "I've already settled into what I want"
        ]
      }
    ]
  },

  story: {
    label: 'Your Story',
    icon: '💌',
    questions: [
      {
        id: 'fs1',
        text: "What your younger self would be most surprised by about your life now:",
        options: [
          "How different my priorities turned out to be",
          "How similar to what I imagined it actually is",
          "How much harder certain things are than I expected",
          "How little I care about things I thought would matter"
        ]
      },
      {
        id: 'fs2',
        text: "The subject in school you were surprisingly good at:",
        options: [
          "Something creative — art, music, or writing",
          "Something technical — math, science, or coding",
          "Something social — history, English, or debate",
          "Honestly I was pretty average across the board"
        ]
      },
      {
        id: 'fs3',
        text: "The compliment you get most often that still surprises you:",
        options: [
          "That I'm funny",
          "That I'm reliable or dependable",
          "That I seem confident",
          "That I'm easy to talk to"
        ]
      },
      {
        id: 'fs4',
        text: "When you were a kid, adults would describe you as:",
        options: [
          "The quiet one",
          "The wild one",
          "The responsible one",
          "The funny one"
        ]
      },
      {
        id: 'fs5',
        text: "The type of social situation that drains you most:",
        options: [
          "Parties where I don't know many people",
          "Forced group activities",
          "One-on-ones with someone I don't know well",
          "Anything where I'm expected to perform or present"
        ]
      },
      {
        id: 'fs6',
        text: "Something you got obsessed with at some point and mostly left behind:",
        options: [
          "A hobby or creative pursuit",
          "A specific genre of music or media",
          "A cause or philosophical phase",
          "A fitness or health routine"
        ]
      },
      {
        id: 'fs7',
        text: "Your signature move in an argument as a kid:",
        options: [
          "Crying immediately",
          "Going completely silent",
          "Fighting back with everything I had",
          "Running to someone else for backup"
        ]
      },
      {
        id: 'fs8',
        text: "Making new friends as an adult:",
        options: [
          "I find it pretty natural still",
          "I'm more selective than I used to be",
          "I'm genuinely bad at it now",
          "I rely entirely on circumstance and proximity"
        ]
      }
    ]
  },

  futures: {
    label: 'Big Plans',
    icon: '✨',
    questions: [
      {
        id: 'ff1',
        text: "In 10 years, you'd most like to be known for:",
        options: [
          "Something you created",
          "The relationships you built",
          "A career or professional achievement",
          "Living well entirely on your own terms"
        ]
      },
      {
        id: 'ff2',
        text: "Your ideal work setup if money wasn't a factor:",
        options: [
          "Building something entirely your own",
          "Working with a small, great team on something meaningful",
          "True flexibility — work when and where you want",
          "Honestly, not working much at all"
        ]
      },
      {
        id: 'ff3',
        text: "The place you most want to live that you haven't yet:",
        options: [
          "A big city you haven't fully explored",
          "A quieter, slower place",
          "Another country entirely",
          "I'm actually content where I am"
        ]
      },
      {
        id: 'ff4',
        text: "The thing you want to genuinely get better at in the next year:",
        options: [
          "A skill — something practical or creative",
          "A relationship thing — being more present",
          "A health or physical thing",
          "How I manage my time or mental energy"
        ]
      },
      {
        id: 'ff5',
        text: "Your biggest ambition you rarely say out loud:",
        options: [
          "Making something creative that reaches a lot of people",
          "Building serious financial security",
          "Having a real impact on a specific community",
          "I actually say my ambitions out loud pretty freely"
        ]
      },
      {
        id: 'ff6',
        text: "The version of your future self you're most optimistic about:",
        options: [
          "The one who figured out the work-life balance",
          "The one who built something meaningful",
          "The one with deep, lasting friendships",
          "The one who finally got the health stuff right"
        ]
      },
      {
        id: 'ff7',
        text: "When you imagine slowing down later in life:",
        options: [
          "I want to stay active and keep doing things",
          "I want to slow way down and just enjoy things",
          "I honestly haven't thought about it much",
          "Travel — see everything I've been putting off"
        ]
      },
      {
        id: 'ff8',
        text: "The place you'd most want to visit before anything else:",
        options: [
          "Somewhere in Asia — Japan, Southeast Asia, or beyond",
          "Somewhere in Europe I haven't fully explored",
          "South America — especially somewhere remote",
          "I want to explore my own country/region better first"
        ]
      }
    ]
  },

  selfknow: {
    label: 'Know Yourself',
    icon: '🔍',
    questions: [
      {
        id: 'fk1',
        text: "You are most yourself when:",
        options: [
          "You're with a small group of close people",
          "You're completely alone",
          "You're doing something physical or creative",
          "You're in a new place or unfamiliar situation"
        ]
      },
      {
        id: 'fk2',
        text: "Your default energy in a group:",
        options: [
          "I tend to lead or steer the conversation",
          "I observe more than I speak",
          "I match and amplify whoever's loudest",
          "I'm the one asking questions"
        ]
      },
      {
        id: 'fk3',
        text: "The emotion you find hardest to express:",
        options: [
          "Anger",
          "Sadness or vulnerability",
          "Genuine affection or appreciation",
          "Disappointment in someone"
        ]
      },
      {
        id: 'fk4',
        text: "The feedback you'd hate receiving most:",
        options: [
          "\"You're too intense\"",
          "\"You need to open up more\"",
          "\"You're kind of flaky\"",
          "\"You overthink everything\""
        ]
      },
      {
        id: 'fk5',
        text: "Your superpower in a social setting:",
        options: [
          "Reading the room — I always know the vibe",
          "Making people feel at ease quickly",
          "Remembering details about people",
          "Saying the thing everyone else was thinking"
        ]
      },
      {
        id: 'fk6',
        text: "After a hard or draining stretch, what reliably resets you:",
        options: [
          "Being around specific people who get it",
          "Getting physical — movement, exercise, outside",
          "Creating something or working with your hands",
          "Alone time with no obligations"
        ]
      },
      {
        id: 'fk7',
        text: "Your most irrational fear you mostly keep to yourself:",
        options: [
          "Something physical — a specific animal, place, or sensation",
          "A social fear — being publicly humiliated or exposed",
          "An existential one — time, mortality, or uncertainty",
          "A logistical one — missing something, being unprepared"
        ]
      },
      {
        id: 'fk8',
        text: "How you actually handle conflict:",
        options: [
          "I address it directly as soon as possible",
          "I sit with it first, then bring it up calmly",
          "I avoid it until it becomes unavoidable",
          "I go quiet and hope it resolves itself"
        ]
      }
    ]
  },

  challenge: {
    label: 'Friend Challenge',
    icon: '🌶️',
    questions: [
      {
        id: 'fc1',
        text: "If your friends were being fully honest, your worst habit is:",
        options: [
          "Canceling plans at the last minute",
          "Being on your phone too much in person",
          "Being consistently late to things",
          "Giving unsolicited opinions nobody asked for"
        ]
      },
      {
        id: 'fc2',
        text: "Something you've pretended to like to fit in:",
        options: [
          "A type of music or media",
          "A food or drink",
          "A social activity or sport",
          "A group's specific sense of humor"
        ]
      },
      {
        id: 'fc3',
        text: "The most embarrassing thing that's happened to you in public:",
        options: [
          "Something physical — fell, spilled, or collided spectacularly",
          "Something social — said something weird at the wrong moment",
          "A phone or technology fail at the worst time",
          "Something so bad I've partially suppressed the memory"
        ]
      },
      {
        id: 'fc4',
        text: "When you've been the most dramatic about something minor:",
        options: [
          "A tech issue or device failing",
          "A minor inconvenience while traveling",
          "Something food or restaurant related",
          "Bad weather ruining a plan"
        ]
      },
      {
        id: 'fc5',
        text: "Your most controversial opinion you'll actually defend:",
        options: [
          "A food one — something everyone loves that you genuinely don't",
          "An entertainment one — a beloved show or movie you can't stand",
          "A social norms one — something people do that you think is overrated",
          "I don't really have controversial opinions — I'm basically correct"
        ]
      },
      {
        id: 'fc6',
        text: "The thing you're worst at but rarely admit:",
        options: [
          "Directions and navigation",
          "Keeping in touch with people",
          "Anything requiring real patience",
          "Anything requiring physical coordination"
        ]
      },
      {
        id: 'fc7',
        text: "If someone read your search history right now, they'd find:",
        options: [
          "Evidence I'm anxious about very specific things",
          "A surprisingly obscure hobby or interest",
          "A lot of random late-night rabbit holes",
          "Mostly mundane stuff — work, food, news"
        ]
      },
      {
        id: 'fc8',
        text: "The most childish thing you still do:",
        options: [
          "Avoid certain foods like a picky kid",
          "Get genuinely upset about game or movie outcomes",
          "Need a specific comfort routine to sleep",
          "Hold onto superstitions I can't fully explain"
        ]
      }
    ]
  }
};
