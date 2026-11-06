// Portfolio config — ONLY verified facts.
// No real name, no education details, no email/phone/LinkedIn/WhatsApp.
// No invented employers, jobs, clients, awards, testimonials or certificates.
// GitHub is the only contact channel, and the only place the public
// GitHub account name appears is inside that link.

export const profile = {
  displayName: "Professor",
  profession: "Aspiring Red Team Professional",
  tagline: "Learning security by building labs — one honest step at a time.",
  location: "India",
  availability: "Learning & building labs",
  github: "https://github.com/sahilm4711-cyber",
  // Hackathons: participated in 2. Names, dates, places and results are
  // NOT known — do not invent them. Shown only as a count until provided.
  hackathons: 2,
  photoNote:
    "Hero picture — artwork chosen by Professor (\"I am\").",
  focus: {
    image: "/one-target.jpg",
    alt: "A close-up eye with a red target crosshair and the words ONE TARGET",
    title: "One target",
    caption: "One target — learn red team, one honest step at a time.",
  },
  intro:
    "I am learning red-team security from zero, in public, by building small lab projects I can explain myself. No shortcuts, no fake experience — just Linux, networking, Python and web security, practised in my own lab.",
  about:
    "I learn by doing. Each project below started as one small, checked step: a password checker, a system audit, a visual roadmap, a passive recon tool. I keep the scope lab-only — my own machine, or targets I have permission to test — and I write down what worked, what failed, and what I still need to learn.",
};

export const projects = [
  {
    id: "roadmap",
    title: "Cybersecurity Red Team Roadmap",
    category: "Learning",
    status: "Live on GitHub",
    link: "https://github.com/sahilm4711-cyber/Cybersecurity-RedTeam-Roadmap",
    description:
      "A visual red-team roadmap, beginner to advanced — Linux, networks, web, OWASP, tools and practice, in short visual notes.",
    stack: ["Linux", "Networking", "OWASP", "Visual notes"],
  },
  {
    id: "redteam-project",
    title: "RedTeam-Project",
    category: "Security",
    status: "Live on GitHub",
    link: "https://github.com/sahilm4711-cyber/RedTeam-Project",
    description:
      "Password Lab + System Audit in Python. Test passwords only, local lab only — checking strength and basic system health.",
    stack: ["Python", "Linux", "Lab only"],
  },
  {
    id: "recon-app",
    title: "Recon-app (ReconX)",
    category: "Security",
    status: "Live on GitHub",
    link: "https://github.com/sahilm4711-cyber/Recon-app",
    description:
      "Passive recon only: scope check, passive DNS lookup, and subdomains from certificate logs. No active scanning, no other people's data.",
    stack: ["Python", "DNS", "Passive recon"],
  },
  {
    id: "safeweb",
    title: "SafeWeb Lab Scanner",
    category: "Security",
    status: "In progress",
    link: null,
    description:
      "A lab-only web scanner with a strict scope guard — localhost only. Checks security headers, cookies and forms on a lab site.",
    stack: ["Python", "Web security", "Lab only"],
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    category: "Web App",
    status: "In progress",
    link: null,
    description:
      "A team task manager with login, roles, projects and tasks. Built to learn backend, auth and databases properly.",
    stack: ["Flask", "SQLite", "REST API"],
  },
];

export const skills = [
  { name: "HTML", level: "Building", note: "Page structure" },
  { name: "CSS", level: "Building", note: "Styling and layout" },
  { name: "JavaScript", level: "Building", note: "Frontend, no framework yet" },
  { name: "Python", level: "Learning", note: "Scripts and small lab tools" },
  { name: "AI", level: "Learning", note: "AI basics, learning how to use AI tools" },
  { name: "Linux", level: "Building", note: "Commands, filesystem, permissions" },
  { name: "Computer Networking", level: "Building", note: "DNS, VPN, network basics" },
  { name: "Git & GitHub", level: "Building", note: "Commits, repos, README" },
  { name: "Web security basics", level: "Learning", note: "Headers, cookies, forms — lab only" },
  { name: "OWASP Top 10", level: "Learning", note: "Reading and practising in labs" },
];

export const journey = [
  {
    date: "Oct 2026",
    title: "Foundations",
    text: "Removed Windows, learned Linux commands, networking including DNS and VPN, and frontend HTML, CSS and JavaScript.",
  },
  {
    date: "30 Oct 2026",
    title: "First project — Password Lab",
    text: "Built a password checker and a system audit script in Python, and ran them in my own lab.",
  },
  {
    date: "31 Oct 2026",
    title: "Red Team Roadmap",
    text: "Published a visual red-team roadmap on GitHub, beginner to advanced, in big structured commits.",
  },
  {
    date: "1 Nov 2026",
    title: "ReconX — passive steps",
    text: "Started passive recon in small steps: scope check, passive DNS, and subdomains from certificate logs.",
  },
  {
    date: "5 Nov 2026",
    title: "SafeWeb + TaskFlow",
    text: "Built a lab-only web scanner and a team task manager — one security project, one software project.",
  },
];
