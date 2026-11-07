// All of your content lives here — edit this file to update the site.
// To add a project, push a new object onto PROJECTS. Everything else renders from it.

export const PROFILE = {
  name: "Raj Kumar Gupta",
  firstName: "Raj Kumar",
  lastName: "Gupta",
  role: "Full Stack / MERN Stack Developer",
  tagline: "Building Digital Experiences That Matter.",
  subtitle: "Full Stack Developer | MERN Stack Specialist | Problem Solver.",
  years: 4,
  education: "B.Tech in Information Technology",
  location: "India",
  email: "rajkumargupt84952@gmail.com",
  github: "https://github.com/rajkumargupt84952-maker",
  linkedin: "https://www.linkedin.com/in/rajkumar-gupta-b60447244/",
  /** Put your PDF in /public and set e.g. "/Raj_Kumar_Gupta_Resume.pdf". Empty → button emails a request instead. */
  resume: "",
};

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

export const ROLES = [
  "scalable web applications",
  "fintech platforms",
  "REST APIs that scale",
  "real-time experiences",
  "things that ship",
];

export const STATS: { value?: number; suffix?: string; text?: string; label: string }[] = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "APIs Implemented" },
  { text: "Multiple", label: "Projects Delivered" },
  { text: "MERN", label: "Stack Specialist" },
];

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Fast, accessible interfaces with component-driven architecture.",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Redux", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Secure, well-structured services and real-time channels.",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Authentication", "Socket.IO"],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Schema design, indexing and caching for data-heavy products.",
    items: ["MongoDB", "Redis", "MySQL"],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    blurb: "A dependable toolchain from local dev to production.",
    items: ["Git", "GitHub", "Docker", "Postman", "Nginx", "AWS"],
  },
];

export interface Project {
  id: string;
  name: string;
  domain: string;
  summary: string;
  features: string[];
  stack: string[];
  /** Two colours used to paint the generated thumbnail */
  accent: [string, string];
  live?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "prodigy-pro",
    name: "Prodigy Pro",
    domain: "Fintech · Mutual funds",
    summary:
      "A financial technology platform for mutual fund investing, with complex business logic, third-party API integrations and regulated onboarding workflows.",
    features: [
      "KYC and UCC creation flows",
      "Scheme discovery, investment and portfolio dashboards",
      "Deep integration with external financial APIs",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    accent: ["#2F7BFF", "#8B5CF6"],
    live: "https://app.prodigypro.co.in",
  },
  {
    id: "prodigy-ai",
    name: "ProdigyAI",
    domain: "AI · Fintech assistant",
    summary:
      "An AI assistant for Prodigy Pro. Investors ask in plain language and it recommends the best schemes, helps them pick one and invest, searches schemes, shows their portfolio and reviews it.",
    features: [
      "Conversational scheme search and best-scheme picks",
      "Select-and-invest flow right inside the chat",
      "Portfolio view and AI portfolio review",
    ],
    // TODO: replace "LLM" with the exact model / framework you used (e.g. OpenAI API, LangChain)
    stack: ["React.js", "Node.js", "MongoDB", "LLM"],
    accent: ["#22D3EE", "#8B5CF6"],
  },
  {
    id: "api-tester",
    name: "API Tester",
    domain: "Developer tools",
    summary:
      "A developer-focused app for sending API requests and inspecting responses, with saved requests and per-request descriptions to keep a personal API library organised.",
    features: [
      "Send requests with custom methods, headers and bodies",
      "Inspect status, headers and formatted responses",
      "Save requests and keep descriptions for each one",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    accent: ["#22D3EE", "#2F7BFF"],
  },
  {
    id: "d2home",
    name: "D2Home",
    domain: "Web application",
    summary: "A modern, fully responsive web application with an interactive, polished frontend experience.",
    features: ["Responsive layout across all devices", "Interactive UI with smooth interactions"],
    stack: ["React.js", "Node.js", "MongoDB"],
    accent: ["#8B5CF6", "#EC4899"],
  },
  {
    id: "wms",
    name: "WMS Dashboard",
    domain: "Fintech · Wealth operations",
    summary:
      "A wealth-management back office that turns the data coming in from the RTAs — CAMS and KFintech — into clean records for the operations team.",
    features: [
      "Imports and processes RTA transaction and holding files",
      "Investor-wise and scheme-wise views for daily operations",
    ],
    stack: ["React.js", "Node.js", "MongoDB"],
    accent: ["#2F7BFF", "#22D3EE"],
    live: "https://wmsdashboard.bfccapital.com/",
  },
  {
    id: "bfc-store",
    name: "BFC Publications Store",
    domain: "E-commerce · Books",
    summary:
      "An online bookstore covering the whole buying journey — catalogue, cart, checkout and an order flow connected to the publisher's backend.",
    features: ["Catalogue and product pages", "Cart, checkout and order flow"],
    stack: ["React.js", "Node.js", "MongoDB"],
    accent: ["#F59E0B", "#EC4899"],
    live: "https://store.bfcpublications.com/",
  },
  {
    id: "bhukkads",
    name: "Bhukkads",
    domain: "Food tech · Restaurants",
    summary:
      "Restaurant discovery and ordering in one app: preorder, dine-in or takeaway. Restaurants get a QR code per table so guests order straight from their seat.",
    features: ["Restaurants within 5 km by default", "QR-based table ordering from a live menu"],
    stack: ["React.js", "Node.js", "MongoDB"],
    accent: ["#EF4444", "#F59E0B"],
  },
];

export interface Job {
  role: string;
  company: string;
  period: string;
  points: string[];
}

// TODO: add exact dates / extra achievements — only verified details are listed here.
export const EXPERIENCE: Job[] = [
  {
    role: "MERN Stack Developer",
    company: "BFC Softtech",
    period: "Current role",
    points: [
      "Build and maintain fintech products end to end — Prodigy Pro, ProdigyAI and the WMS dashboard.",
      "Design and implement REST APIs and integrate third-party financial services (KYC, UCC, RTA data).",
      "Deliver e-commerce and food-tech products on the MERN stack, from schema design to deployment.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Mayd Media Pvt. Ltd.",
    period: "Internship",
    points: [
      "Worked across the frontend and backend of production web applications.",
      "Built the foundations in React, Node.js and MongoDB that the current work grew from.",
    ],
  },
];

export const SERVICES = [
  { icon: "layers", title: "Full Stack Web Development", text: "End-to-end products — from interface to database to deployment." },
  { icon: "plug", title: "REST API Development", text: "Clean, versioned, well-documented APIs with solid authentication." },
  { icon: "server", title: "Backend Architecture", text: "Modular, scalable services built to survive real traffic." },
  { icon: "atom", title: "React.js Development", text: "Fast, accessible component-driven frontends." },
  { icon: "database", title: "Database Design", text: "Schemas, indexes and caching that keep queries quick." },
  { icon: "workflow", title: "Third-Party API Integration", text: "Payments, KYC, financial data and more — wired in reliably." },
  { icon: "gauge", title: "Performance Optimization", text: "Faster loads, leaner bundles, smoother interactions." },
] as const;
