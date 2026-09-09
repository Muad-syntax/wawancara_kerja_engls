export const starPresets = {
  'Computer Network Engineer (TKJ)': {
    situation: "During my internship at PT Solusi Network, our office LAN experienced intermittent signal drops affecting 30 staff members.",
    task: "I was assigned by the network engineer supervisor to identify the root cause and restore network stability.",
    action: "I performed IP route tracking, identified an unmanaged loop in the switch port, and reconfigured Mikrotik VLAN bandwidth queues.",
    result: "Network uptime was restored to 99.8%, latency dropped from 120ms to 8ms, and my supervisor praised my systematic approach."
  },
  'Software Developer / Programmer (RPL)': {
    situation: "Our student project web portal suffered from slow query response times when displaying large database tables.",
    task: "I was responsible for optimizing the backend database queries and responsive interface.",
    action: "I indexed key database columns, refactored raw SQL queries into parameterized calls, and added client-side pagination with Vue.js.",
    result: "Page load speed decreased from 4.2 seconds to 350 milliseconds, making the application smooth and production-ready."
  },
  'Graphic & Multimedia Designer': {
    situation: "A client requested a complete brand identity revamp for a new local coffee business within a tight 5-day deadline.",
    task: "My task was to produce a brand logo, color palette guide, and 3 social media promotional templates.",
    action: "I created 3 distinct mood boards, drafted vector designs in Illustrator, and incorporated client feedback within 24 hours.",
    result: "The client approved the primary logo concept on the first draft and launched their marketing campaign on schedule."
  },
  'Office Administration Staff': {
    situation: "During my practical office training, physical document archives were disorganized, making file retrieval very slow.",
    task: "I was entrusted with digitizing and reorganizing the past 2 years of departmental correspondence.",
    action: "I created a standardized cloud folder hierarchy, scanned paper files with clear indexing metadata, and built a search index spreadsheet.",
    result: "Average document retrieval time was cut from 15 minutes down to less than 30 seconds."
  },
  'Customer Service & Sales Representative': {
    situation: "An upset customer visited our service center complaining about a delayed product delivery.",
    task: "My goal was to de-escalate the situation calmly, solve the issue, and ensure a positive customer experience.",
    action: "I listened actively without interrupting, apologized sincerely, checked the logistics portal, and expedited courier delivery.",
    result: "The customer felt valued, left a 5-star review for our customer service, and remained a loyal client."
  }
}

export const defaultQuizQuestions = [
  {
    question: "How many times should you gently knock on the door before entering an interview room?",
    options: ["1 time", "3 times gently and politely", "No need to knock, just walk in", "5 times loudly"],
    correct: 1,
    userSelected: null,
    explanation: "Knocking 3 times gently is the standard professional etiquette across global corporate cultures."
  },
  {
    question: "Which non-verbal cue demonstrates active listening during an interview?",
    options: ["Crossing your arms tightly", "Checking your phone or watch", "Sitting upright, leaning slightly forward, and nodding politely", "Slouching back in your chair"],
    correct: 2,
    userSelected: null,
    explanation: "Leaning slightly forward and nodding shows attentiveness, engagement, and genuine interest."
  },
  {
    question: "What is the recommended professional dress code for a formal job interview?",
    options: ["Casual t-shirt and ripped jeans", "Button-up formal shirt, dark dress pants/skirt, and clean formal shoes", "Bright sportswear", "Casual beachwear"],
    correct: 1,
    userSelected: null,
    explanation: "Formal button-up shirts and dark dress trousers/skirts convey professionalism and career readiness."
  },
  {
    question: "When should you ask questions about the company or job role?",
    options: ["Never, it shows lack of knowledge", "At the beginning before the interviewer starts", "When invited by the interviewer towards the end of the session", "Interrupt the interviewer whenever you want"],
    correct: 2,
    userSelected: null,
    explanation: "Asking thoughtful questions at the end demonstrates enthusiasm, preparation, and initiative."
  }
]
