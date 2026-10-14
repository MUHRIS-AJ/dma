export interface Course {
  slug: string; title: string; shortTitle: string; category: string; description: string; outcome: string; modules: string[]; faq: {question: string; answer: string}[]; number: string; duration: string; icon: string;
}

export const courses: Course[] = [
  {
    "slug": "ui-ux",
    "title": "UI / UX Design",
    "shortTitle": "UI / UX Design",
    "category": "Design",
    "description": "Turn user needs into intuitive websites. Learn research, wireframes, visual systems and interactive prototypes, then build a portfolio-ready experience.",
    "outcome": "An interactive website prototype",
    "modules": [
      "User research & problem framing",
      "Information architecture & user flows",
      "Wireframing & accessible visual design",
      "Figma prototyping & usability testing"
    ],
    "faq": [
      {
        "question": "What will I learn in UI / UX Design?",
        "answer": "UI/UX design combines understanding people with designing clear, usable interfaces. At Digital MOD Academy, the proposed pathway takes you from research and wireframes to an interactive website prototype. You practise explaining design decisions, testing usability and improving the experience, creating work you can discuss in a portfolio."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed UI / UX Design pathway is organized around a practical deliverable: an interactive website prototype. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "01",
    "duration": "Intake details on enquiry",
    "icon": "design"
  },
  {
    "slug": "seo",
    "title": "Search Engine Optimization",
    "shortTitle": "SEO",
    "category": "Search",
    "description": "Connect useful content with the people searching for it. Build a practical foundation in search intent, keyword research and on-page optimization.",
    "outcome": "A search strategy & content brief",
    "modules": [
      "Search intent & audience research",
      "Keyword mapping & content planning",
      "On-page SEO & internal linking",
      "Search Console & performance reporting"
    ],
    "faq": [
      {
        "question": "What will I learn in SEO?",
        "answer": "Search engine optimization helps people discover useful website content through organic search. Digital MOD Academy’s proposed SEO pathway covers search intent, keyword research, content structure and measurement. You develop a practical search strategy and learn to assess progress without relying on ranking guarantees or shortcuts that undermine content quality."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed SEO pathway is organized around a practical deliverable: a search strategy & content brief. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "02",
    "duration": "Intake details on enquiry",
    "icon": "search"
  },
  {
    "slug": "technical-seo",
    "title": "Technical SEO",
    "shortTitle": "Technical SEO",
    "category": "Search",
    "description": "Understand how search engines crawl, render and index a website. Find technical issues and turn them into a prioritized improvement plan.",
    "outcome": "A prioritized technical website audit",
    "modules": [
      "Crawling, rendering & indexing",
      "Sitemaps, robots & canonical signals",
      "Structured data & site architecture",
      "Core Web Vitals & audit prioritization"
    ],
    "faq": [
      {
        "question": "What will I learn in Technical SEO?",
        "answer": "Technical SEO improves the foundations that help search engines access and understand a website. Digital MOD Academy’s proposed pathway explores crawling, indexing, website architecture and performance. You practise identifying issues, explaining their impact and prioritizing an audit, while distinguishing technical improvements from promises about rankings or traffic growth."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed Technical SEO pathway is organized around a practical deliverable: a prioritized technical website audit. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "03",
    "duration": "Intake details on enquiry",
    "icon": "code"
  },
  {
    "slug": "aeo-geo",
    "title": "AEO & GEO",
    "shortTitle": "AEO & GEO",
    "category": "Search",
    "description": "Create clear, credible content for search and AI-assisted discovery. Explore answer-first writing, entities, structured information and visibility measurement.",
    "outcome": "An answer-first content framework",
    "modules": [
      "Answer engines & generative discovery",
      "Entity consistency & source credibility",
      "Answer-first writing & structured data",
      "Visibility evaluation & limitations"
    ],
    "faq": [
      {
        "question": "What will I learn in AEO & GEO?",
        "answer": "AEO and GEO focus on making information clear and useful for answer engines and generative search experiences. Digital MOD Academy’s proposed pathway explores direct answers, consistent entities, credible sourcing and structured content. You learn to evaluate visibility carefully, recognizing that no method guarantees inclusion or citation in AI answers."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed AEO & GEO pathway is organized around a practical deliverable: an answer-first content framework. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "04",
    "duration": "Intake details on enquiry",
    "icon": "spark"
  },
  {
    "slug": "google-analytics",
    "title": "Google Analytics",
    "shortTitle": "Google Analytics",
    "category": "Growth",
    "description": "Go beyond page views. Learn GA4 measurement planning, event tracking, acquisition analysis and reports that inform better decisions.",
    "outcome": "A measurement plan & reporting dashboard",
    "modules": [
      "GA4 properties & measurement planning",
      "Events, key events & tag validation",
      "Acquisition, engagement & explorations",
      "Privacy-aware reporting & insights"
    ],
    "faq": [
      {
        "question": "What will I learn in Google Analytics?",
        "answer": "Google Analytics helps you understand how people discover and use a website. Digital MOD Academy’s proposed pathway introduces GA4 measurement plans, event tracking and useful reporting. You practise turning observations into questions and recommendations, while accounting for consent, incomplete data and the difference between correlation and evidence of causation."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed Google Analytics pathway is organized around a practical deliverable: a measurement plan & reporting dashboard. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "05",
    "duration": "Intake details on enquiry",
    "icon": "chart"
  },
  {
    "slug": "cro",
    "title": "Conversion Rate Optimization",
    "shortTitle": "CRO",
    "category": "Growth",
    "description": "Find friction, frame better hypotheses and design meaningful experiments. Connect user research and analytics to clearer conversion journeys.",
    "outcome": "A conversion audit & experiment plan",
    "modules": [
      "Conversion journeys & friction research",
      "Landing-page messaging & trust",
      "Experiment hypotheses & A/B test design",
      "Interpreting results & iteration"
    ],
    "faq": [
      {
        "question": "What will I learn in CRO?",
        "answer": "Conversion rate optimization improves the path between a visitor’s intent and a useful action. Digital MOD Academy’s proposed pathway combines research, analytics and experimentation. You learn to identify friction, write testable hypotheses and evaluate outcomes, building an experiment plan that values reliable evidence rather than assuming every design change works."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed CRO pathway is organized around a practical deliverable: a conversion audit & experiment plan. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "06",
    "duration": "Intake details on enquiry",
    "icon": "target"
  },
  {
    "slug": "sem-smm",
    "title": "SEM & Social Media Marketing",
    "shortTitle": "SEM & SMM",
    "category": "Growth",
    "description": "Connect paid search and social content to a clear objective. Develop audience strategy, compelling creative and a measurable campaign plan.",
    "outcome": "A campaign strategy & content calendar",
    "modules": [
      "Audience research & campaign objectives",
      "Paid search structure & keyword intent",
      "Social strategy, creative & content planning",
      "Budgets, UTMs & campaign evaluation"
    ],
    "faq": [
      {
        "question": "What will I learn in SEM & SMM?",
        "answer": "SEM and social media marketing help brands reach relevant audiences through paid search, social content and advertising. Digital MOD Academy’s proposed pathway connects audience research with creative planning and measurement. You build a campaign proposal, choose meaningful metrics and learn how budgets and attribution affect interpretation of campaign results."
      },
      {
        "question": "Will I build something practical?",
        "answer": "The proposed SEM & SMM pathway is organized around a practical deliverable: a campaign strategy & content calendar. You connect the modules to that project, explain your decisions and use feedback to improve your work. Ask Digital MOD Academy about the current teaching format, assessment criteria and available mentor support before enrolling."
      },
      {
        "question": "How do I join this learning pathway?",
        "answer": "Start by sharing your name, email and preferred pathway with Digital MOD Academy. The team can confirm the current intake, timetable, fees, prerequisites and learning format before you decide. Submitting an enquiry does not reserve a seat or take payment; it starts a conversation about the right next step."
      }
    ],
    "number": "07",
    "duration": "Intake details on enquiry",
    "icon": "megaphone"
  }
];
