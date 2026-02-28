export interface SoundDrill {
  focus: string;
  description: string;
  words: string[];
  sentences: string[];
  minimalPairs?: string[];
}

export interface DayContent {
  day: number;
  phase: 1 | 2 | 3 | 4;
  phaseName: string;
  soundDrill?: SoundDrill;
  vocabulary?: {
    topic: string;
    words: string[];
  };
  scenario?: {
    theme: string;
    frames: string[];
    output: string;
  };
  fluencySkill?: {
    skill: string;
    topic: string;
    format: string;
  };
  homework: string;
  duration: string;
}

export const curriculum: DayContent[] = [
  // PHASE 1 - FOUNDATION (Days 1-10)
  {
    day: 1,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "V vs W",
      description: "Distinguishing between V and W sounds",
      words: ["vine", "wine", "very", "weary", "van", "wan", "vet", "wet"],
      sentences: ["I want water.", "It's very good.", "We will visit."],
      minimalPairs: ["vine/wine", "very/weary", "van/wan"]
    },
    vocabulary: {
      topic: "Introductions",
      words: ["hello", "hi", "hey", "name", "from", "am", "is", "are", "nice", "meet", "you", "I", "my", "welcome"]
    },
    homework: "Record 5 introduction sentences",
    duration: "45-60 min"
  },
  {
    day: 2,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "TH sounds",
      description: "Tongue placement for TH (thin/then)",
      words: ["thin", "then", "think", "this", "that", "the", "they", "there"],
      sentences: ["This is thin.", "That is then.", "They are there."],
      minimalPairs: ["thin/fin", "then/den", "think/tink"]
    },
    vocabulary: {
      topic: "Greetings",
      words: ["good morning", "good afternoon", "good evening", "goodbye", "bye", "see you", "how are you", "fine", "thanks", "welcome", "hello", "good night"]
    },
    homework: "Record 5 greeting sentences",
    duration: "45-60 min"
  },
  {
    day: 3,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "R sound",
      description: "Light R sound (not rolled)",
      words: ["road", "right", "run", "rain", "red", "read", "ring", "wrong"],
      sentences: ["The road is right.", "I read every day.", "Run in the rain."],
      minimalPairs: ["right/light", "red/led", "rice/lice"]
    },
    vocabulary: {
      topic: "Asking for Help",
      words: ["help", "please", "sorry", "excuse me", "can you", "could you", "thank you", "you're welcome", "no problem", "sure", "of course", "mind", "open", "close"]
    },
    homework: "Record 5 help sentences",
    duration: "45-60 min"
  },
  {
    day: 4,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "Short/Long Vowels",
      description: "Distinguishing short and long vowels",
      words: ["ship", "sheep", "sit", "seat", "bit", "beat", "bad", "bed"],
      sentences: ["I sat on the seat.", "The ship has sheep.", "Bad bed."],
      minimalPairs: ["ship/sheep", "sit/seat", "bit/beat"]
    },
    vocabulary: {
      topic: "Numbers & Time",
      words: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "o'clock", "hour", "minute", "time", "what time"]
    },
    homework: "Record 5 time/number sentences",
    duration: "45-60 min"
  },
  {
    day: 5,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "Word Stress",
      description: "Stress patterns: PREsent vs preSENT",
      words: ["present", "record", "object", "project", "perfect", "address"],
      sentences: ["I PRESent a gift.", "I preSENT the idea.", "REcord the game."],
      minimalPairs: ["present (gift)/present (show)", "record (noun)/record (verb)"]
    },
    vocabulary: {
      topic: "Describing Yourself",
      words: ["tall", "short", "young", "old", "student", "teacher", "doctor", "engineer", "friendly", "quiet", "outgoing", "hobby", "interest", "goal"]
    },
    homework: "Record 5 self-description sentences",
    duration: "45-60 min"
  },
  {
    day: 6,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "Consonant Clusters",
      description: "Blends: st-, pr-, bl-, cl-, cr-",
      words: ["street", "strong", "study", "play", "please", "pretty", "blue", "black", "class", "clean", "cry", "create"],
      sentences: ["The street is strong.", "Please play blue.", "Class clean create."]
    },
    vocabulary: {
      topic: "Your Home",
      words: ["house", "apartment", "room", "bedroom", "kitchen", "bathroom", "living room", "furniture", "door", "window", "floor", "garden", "balcony", "rent"]
    },
    homework: "Record 5 home sentences",
    duration: "45-60 min"
  },
  {
    day: 7,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "-ed Endings",
      description: "Pronouncing -ed: /t/, /d/, /id/",
      words: ["walked", "played", "started", "liked", "wanted", "needed", "decided", "visited"],
      sentences: ["I walked to school.", "She played piano.", "They started early."]
    },
    vocabulary: {
      topic: "Daily Routine",
      words: ["wake up", "brush", "breakfast", "lunch", "dinner", "sleep", "work", "school", "homework", "exercise", "bath", "leave", "return", "schedule"]
    },
    homework: "Record 5 routine sentences",
    duration: "45-60 min"
  },
  {
    day: 8,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "Intonation",
      description: "Rising and falling intonation for questions vs statements",
      words: ["Are you coming?", "Is she there?", "What time?", "Where going?"],
      sentences: ["Are you coming? ↑", "I am coming. ↓", "What time is it? ↑", "It is noon. ↓"]
    },
    vocabulary: {
      topic: "Food Ordering",
      words: ["menu", "order", "bill", "vegetarian", "spicy", "delicious", "table", "waiter", "restaurant", "dish", "drink", "dessert", "recommend", "fresh"]
    },
    homework: "Record 5 ordering sentences",
    duration: "45-60 min"
  },
  {
    day: 9,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "Linking",
      description: "Connected speech: go‿on, pick‿it‿up",
      words: ["go on", "come in", "pick it up", "put it down", "look at it"],
      sentences: ["Go on, don't stop.", "Pick it up please.", "Look at it now."]
    },
    vocabulary: {
      topic: "Directions",
      words: ["left", "right", "straight", "near", "far", "corner", "traffic light", "cross", "turn", "opposite", "beside", "between", "behind", "front"]
    },
    homework: "Record 5 direction sentences",
    duration: "45-60 min"
  },
  {
    day: 10,
    phase: 1,
    phaseName: "Foundation",
    soundDrill: {
      focus: "Review: V/W, TH, R",
      description: "Mixed review of all Phase 1 sounds",
      words: ["very", "weary", "think", "this", "right", "rain", "wrong", "road"],
      sentences: ["The very thin road is right.", "I think you are very wrong.", "When will you visit?"]
    },
    vocabulary: {
      topic: "Shopping Basics",
      words: ["buy", "sell", "price", "cheap", "expensive", "size", "small", "large", "medium", "fit", "bargain", "discount", "receipt", "exchange"]
    },
    homework: "Record 5 shopping sentences",
    duration: "45-60 min"
  },

  // PHASE 2 - CONSTRUCTION (Days 11-25)
  {
    day: 11,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Review + Confidence Reset",
      frames: ["I can ___.", "I want to ___.", "I like ___.", "I need ___.", "I am ___.", "I have ___.", "I was ___.", "I will ___."],
      output: "60-second self talk"
    },
    homework: "60-second self talk recording",
    duration: "60-75 min"
  },
  {
    day: 12,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Workplace: Requests",
      frames: ["Could you ___?", "Can you please ___?", "Would you mind ___?", "Could I ask you to ___?", "Would it be possible to ___?"],
      output: "Ask 5 requests politely"
    },
    homework: "Practice 5 polite requests",
    duration: "60-75 min"
  },
  {
    day: 13,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Workplace: Giving Updates",
      frames: ["I'm working on ___.", "I'll finish by ___.", "I've completed ___.", "The progress is ___.", "I need more time for ___."],
      output: "Stand-up meeting role-play"
    },
    homework: "Record work update (30 seconds)",
    duration: "60-75 min"
  },
  {
    day: 14,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Emails (Spoken First)",
      frames: ["I'm writing to ___.", "Please find ___.", "I would like to ___.", "Thank you for ___.", "Looking forward to ___."],
      output: "Speak email as voice note"
    },
    homework: "Record email as voice note",
    duration: "60-75 min"
  },
  {
    day: 15,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Opinions (Soft & Strong)",
      frames: ["I think ___.", "In my opinion ___.", "I strongly believe ___.", "I agree/disagree because ___.", "From my perspective ___."],
      output: "Mini discussion circles"
    },
    homework: "Share opinion on any topic (30 sec)",
    duration: "60-75 min"
  },
  {
    day: 16,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "School/College",
      frames: ["I missed ___ because ___.", "Can you explain ___?", "What is the homework for ___?", "When is the test on ___?", "Could you repeat ___?"],
      output: "Teacher-student role-play"
    },
    homework: "Record 3 school sentences",
    duration: "60-75 min"
  },
  {
    day: 17,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Phone Calls",
      frames: ["May I speak to ___?", "I'm calling about ___.", "This is ___.", "Could you please hold?", "I'll call back later."],
      output: "2 phone-call simulations"
    },
    homework: "Record phone call practice",
    duration: "60-75 min"
  },
  {
    day: 18,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Small Talk",
      frames: ["How was your ___?", "What do you do?", "That sounds ___.", "Nice weather today.", "Did you see ___?"],
      output: "3-minute mingle"
    },
    homework: "Practice small talk (1 minute)",
    duration: "60-75 min"
  },
  {
    day: 19,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Making Friends",
      frames: ["Do you want to ___?", "Let's ___.", "Would you like to ___?", "How about ___?", "Are you free on ___?"],
      output: "Invite + plan + confirm"
    },
    homework: "Make a plan with a friend",
    duration: "60-75 min"
  },
  {
    day: 20,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Polite Disagreement",
      frames: ["I see your point, but ___.", "Maybe we can ___.", "I understand, however ___.", "That's an interesting view, yet ___.", "I respectfully disagree because ___."],
      output: "Debate-lite (no fighting)"
    },
    homework: "Practice polite disagreement",
    duration: "60-75 min"
  },
  {
    day: 21,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Doctor Visit",
      frames: ["I have ___.", "It started ___.", "It hurts when ___.", "For how long?", "Any allergies?", "Take this medicine ___ times a day."],
      output: "Patient-doctor role-play"
    },
    homework: "Record doctor visit dialogue",
    duration: "60-75 min"
  },
  {
    day: 22,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Bank/Basic Formal",
      frames: ["I need to ___.", "My issue is ___.", "Could you help me with ___?", "What documents do I need?", "Where is the counter for ___?"],
      output: "Formally explain a problem"
    },
    homework: "Practice bank conversation",
    duration: "60-75 min"
  },
  {
    day: 23,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Complaints",
      frames: ["I'm not happy with ___.", "I would like a refund/exchange because ___.", "This is not what I expected.", "Could I speak to the manager?", "I want to file a complaint about ___."],
      output: "Customer complaint role-play"
    },
    homework: "Practice complaint dialogue",
    duration: "60-75 min"
  },
  {
    day: 24,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Emergency Help",
      frames: ["Please help me!", "There is a ___.", "Call ___!", "I need a doctor/police.", "Where is the hospital/police station?"],
      output: "Fast-response speaking drill"
    },
    homework: "Practice emergency sentences",
    duration: "60-75 min"
  },
  {
    day: 25,
    phase: 2,
    phaseName: "Construction",
    scenario: {
      theme: "Phase Test Day",
      frames: ["Mix all frames from Phase 2"],
      output: "4-minute role-play + feedback"
    },
    homework: "Self-assessment recording",
    duration: "60-75 min"
  },

  // PHASE 3 - FLUENCY (Days 26-38)
  {
    day: 26,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "No-translation training",
      topic: "Describe objects without naming",
      format: "Guessing game (teams)"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 27,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Opinion building",
      topic: "Is online education good?",
      format: "60-sec + 2 follow-up Qs"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 28,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Storytelling (past flow)",
      topic: "A problem I solved",
      format: "90-second story (begin/middle/end)"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 29,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Giving advice",
      topic: "If I were you, I would ___.",
      format: "Advice circles"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 30,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Persuasion",
      topic: "You should try ___ because ___.",
      format: "Sell-a-product role-play"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 31,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Debate skills",
      topic: "For/against: social media",
      format: "2-minute structured debate"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 32,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Feedback language",
      topic: "One thing you did well is ___.",
      format: "Peer feedback rounds"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 33,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Presentations",
      topic: "Hook → 3 points → close",
      format: "2-minute presentation"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 34,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Emotional conversations",
      topic: "Apologize, comfort, refuse",
      format: "Role-play cards"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 35,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Humor & Sarcasm (safe)",
      topic: "Tone & context",
      format: "Same sentence, 3 tones drill"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 36,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Fast responses",
      topic: "Answer without pausing",
      format: "30 rapid-fire questions"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 37,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Group leadership",
      topic: "Students run discussion",
      format: "Teacher only observes"
    },
    homework: "English Journal: 2-minute diary",
    duration: "75 min"
  },
  {
    day: 38,
    phase: 3,
    phaseName: "Fluency",
    fluencySkill: {
      skill: "Phase evaluation",
      topic: "Mixed scenarios",
      format: "Recorded speaking test"
    },
    homework: "Self-assessment",
    duration: "75 min"
  },

  // PHASE 4 - ADVANCED POLISH (Days 39-45)
  {
    day: 39,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Student-led warmups",
      topic: "Peer correction",
      format: "3-min talk each"
    },
    homework: "Prepare for presentation",
    duration: "60-75 min"
  },
  {
    day: 40,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Register switching",
      topic: "Same message in 3 styles",
      format: "Casual/Professional/Formal"
    },
    homework: "Practice 3 registers",
    duration: "60-75 min"
  },
  {
    day: 41,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Q&A handling",
      topic: "Presentation + questions",
      format: "Mock Q&A session"
    },
    homework: "Prepare for mock interview",
    duration: "60-75 min"
  },
  {
    day: 42,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Interviews",
      topic: "Mock interview rotations",
      format: "Interview practice"
    },
    homework: "Prepare complaint scenario",
    duration: "60-75 min"
  },
  {
    day: 43,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Complaints & conflict",
      topic: "Bank/store/service role-plays",
      format: "Conflict resolution"
    },
    homework: "Prepare 60-sec speech",
    duration: "60-75 min"
  },
  {
    day: 44,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Public speaking",
      topic: "3-minute speech + audience Qs",
      format: "Full presentation"
    },
    homework: "Prepare for graduation",
    duration: "60-75 min"
  },
  {
    day: 45,
    phase: 4,
    phaseName: "Advanced Polish",
    fluencySkill: {
      skill: "Real-World Simulation",
      topic: "4 Stations: Job Interview, Customer Complaint, Party Conversation, Public Speech",
      format: "Graduation test + celebration"
    },
    homework: "Celebrate!",
    duration: "Full session"
  }
];

export const hotTopics = [
  "A time you felt proud",
  "Best movie and why",
  "Should uniforms be compulsory?",
  "A small problem in your city and one solution",
  "A habit you want to change",
  "Your favorite food and why",
  "A trip you would like to take",
  "What makes a good friend",
  "Your dream job",
  "Technology that changed your life"
];

export const circumlocutionObjects = [
  { hint: "thing you use to cut vegetables", answer: "knife" },
  { hint: "thing you use to write on paper", answer: "pen" },
  { hint: "thing you use to charge phone", answer: "charger" },
  { hint: "thing you use to open door", answer: "key" },
  { hint: "thing you keep money in", answer: "wallet" },
  { hint: "thing you wear on head for safety", answer: "helmet" },
  { hint: "thing you use to cut paper", answer: "scissors" }
];

export const circumlocutionPlaces = [
  { hint: "place where trains stop", answer: "station" },
  { hint: "place where you get medicine", answer: "pharmacy" },
  { hint: "place where you keep money", answer: "bank" },
  { hint: "place to pray", answer: "temple/church/mosque" },
  { hint: "place where doctors work", answer: "hospital" },
  { hint: "place to buy food", answer: "market" }
];
