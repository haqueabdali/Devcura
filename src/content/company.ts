import type {
  EngagementModel,
  FaqItem,
  FeatureItem,
  JobOpening,
  ProcessStep,
  StatItem,
  TeamMember,
  Technology,
  Testimonial,
} from "@/types/content";

/* ---------------------------------------------------------------- stats  */
export const companyStats: StatItem[] = [
  {
    value: 11,
    suffix: "+",
    label: "Years in operation",
    description: "Delivering software since 2014", // [PLACEHOLDER]
  },
  {
    value: 150,
    suffix: "+",
    label: "Projects delivered",
    description: "Platforms, products and modernisations",
  },
  {
    value: 34,
    suffix: "",
    label: "Active clients",
    description: "Average relationship length 3.4 years",
  },
  {
    value: 12,
    suffix: "",
    label: "Countries served",
    description: "Across Europe and North America",
  },
];

export const trustSignals = [
  { value: "97%", label: "Client retention", note: "Rolling 3-year average" },
  { value: "4.9/5", label: "Client satisfaction", note: "Post-engagement survey" },
  { value: "68", label: "Engineers & designers", note: "Permanent staff" },
  { value: "24/7", label: "Managed support", note: "For platform clients" },
];

/** Client logo placeholders — swap for real SVG marks in /public/images/clients */
export const clientLogos = [
  "Meridian Capital",
  "Atlas Freight",
  "Vela Home",
  "Northwind Health",
  "Helios Utilities",
  "Orbit Industrial",
  "Lumen Retail",
  "Brightpath Education",
]; // [PLACEHOLDER client names]

/* ------------------------------------------------------------ process  */
export const deliveryProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We map the business outcome, the constraints and the existing landscape with the people who will use the system.",
    deliverables: ["Outcome definition", "Current-state map", "Risk register"],
  },
  {
    step: "02",
    title: "Strategy & architecture",
    description:
      "Options are compared and documented as architecture decision records with cost and risk attached to each.",
    deliverables: ["ADRs", "Solution architecture", "Delivery plan"],
  },
  {
    step: "03",
    title: "UX & interface design",
    description:
      "Research-led information architecture, task flows and a coded design system — validated before build.",
    deliverables: ["Journey maps", "Prototype", "Design system"],
  },
  {
    step: "04",
    title: "Engineering",
    description:
      "Two-week increments delivering thin vertical slices to a real environment, reviewed and demoed every sprint.",
    deliverables: ["Sprint releases", "Automated tests", "Sprint reports"],
  },
  {
    step: "05",
    title: "Quality & security",
    description:
      "Automated test suites, load testing, accessibility audits and security review run continuously, not at the end.",
    deliverables: ["Test reports", "Security review", "Accessibility audit"],
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "Infrastructure as code, progressive rollout with health gating and documented rollback for every release.",
    deliverables: ["IaC modules", "CI/CD pipeline", "Runbooks"],
  },
  {
    step: "07",
    title: "Support & optimisation",
    description:
      "SLO-based monitoring, a quarterly improvement cycle, and knowledge transfer so your team can take ownership.",
    deliverables: ["SLO dashboards", "Quarterly review", "Handover docs"],
  },
];

/* ---------------------------------------------------------- why choose  */
export const differentiators: FeatureItem[] = [
  {
    title: "Senior engineers, no bench filling",
    description:
      "Median 9 years of commercial experience. The engineers in the proposal are the engineers on the project.",
  },
  {
    title: "Fixed two-week cadence",
    description:
      "Working software in a real environment every fortnight, with a written report on scope, spend and risk.",
  },
  {
    title: "Architecture you can defend",
    description:
      "Every significant decision is recorded as an ADR with alternatives and trade-offs, so future teams inherit reasoning, not just code.",
  },
  {
    title: "Security reviewed by default",
    description:
      "Threat modelling at design time and automated SAST, SCA and secret scanning in CI on every engagement.",
  },
  {
    title: "Operable from day one",
    description:
      "Logging, tracing, alerting and runbooks are part of the definition of done, not a post-launch project.",
  },
  {
    title: "Planned exit, not lock-in",
    description:
      "Your repositories, your cloud accounts, your data. Handover documentation and training are contractual deliverables.",
  },
  {
    title: "Distributed delivery, one standard",
    description:
      "Teams across three locations working a shared engineering handbook, with four hours of daily overlap guaranteed.",
  },
  {
    title: "Outcome reporting",
    description:
      "We agree the operational metric before kick-off and report against it for the life of the engagement.",
  },
];

/* --------------------------------------------------------- about page  */
export const missionVision = {
  mission:
    "To build software that measurably improves how organisations operate — systems that stay maintainable, observable and owned by the client.",
  vision:
    "To be the engineering partner that technology leaders call when the outcome genuinely matters and the system has to last a decade.",
};

export const companyValues: FeatureItem[] = [
  {
    title: "Evidence over opinion",
    description:
      "Recommendations are backed by measurement. When we do not know, we run a spike and say so.",
  },
  {
    title: "Own the outcome",
    description:
      "We are accountable for whether the system works in production, not for whether tickets were closed.",
  },
  {
    title: "Simple before clever",
    description:
      "The best architecture is the least complex one that satisfies the requirement and its likely evolution.",
  },
  {
    title: "Transparent by default",
    description:
      "Budgets, risks and mistakes are shared early. Clients see the same dashboards we do.",
  },
  {
    title: "Build for the next team",
    description:
      "Documentation, tests and naming are written for the engineer who arrives in three years.",
  },
  {
    title: "Sustainable pace",
    description:
      "Rested engineers produce fewer defects. We plan realistically instead of recovering heroically.",
  },
];

export const companyTimeline = [
  {
    year: "2014",
    title: "Founded in Amsterdam",
    description:
      "Four engineers start building integration software for financial services clients.", // [PLACEHOLDER history]
  },
  {
    year: "2016",
    title: "First enterprise platform",
    description:
      "Delivery of a multi-entity operations platform establishes the long-form engagement model.",
  },
  {
    year: "2018",
    title: "Kraków engineering hub",
    description: "A second delivery centre opens, taking the team past 30 people.",
  },
  {
    year: "2020",
    title: "Cloud & DevOps practice",
    description:
      "A dedicated platform practice formalises infrastructure as code and SRE across all engagements.",
  },
  {
    year: "2022",
    title: "North American presence",
    description: "Austin office opens to support clients across US time zones.",
  },
  {
    year: "2023",
    title: "Applied AI practice",
    description:
      "Evaluation-first AI delivery launched after twelve months of internal research.",
  },
  {
    year: "2025",
    title: "68 specialists, 12 countries",
    description:
      "Managed platform services now cover production operations for 14 client systems.",
  },
];

export const globalPresence = [
  {
    region: "Western Europe",
    detail: "Netherlands, Germany, Belgium, United Kingdom, Ireland",
    clients: 18,
  },
  { region: "Central Europe", detail: "Poland, Czechia, Austria", clients: 7 },
  { region: "Nordics", detail: "Sweden, Denmark, Finland", clients: 4 },
  { region: "North America", detail: "United States, Canada", clients: 5 },
];

export const teamMembers: TeamMember[] = [
  {
    slug: "e-van-dijk",
    name: "Elin van Dijk", // [PLACEHOLDER]
    role: "Chief Executive Officer",
    bio: "Founded the company in 2014 after a decade building payment infrastructure. Leads client strategy and long-term partnerships.",
    image: "",
    focus: ["Strategy", "Client partnerships"],
  },
  {
    slug: "m-okafor",
    name: "Marcus Okafor", // [PLACEHOLDER]
    role: "Chief Technology Officer",
    bio: "Distributed systems architect. Owns the engineering handbook, technical standards and architecture governance across delivery teams.",
    image: "",
    focus: ["Architecture", "Engineering standards"],
  },
  {
    slug: "s-lindqvist",
    name: "Sofia Lindqvist", // [PLACEHOLDER]
    role: "Director of Product Design",
    bio: "Leads research and design for complex operational interfaces, with a background in clinical and financial software.",
    image: "",
    focus: ["Product design", "User research"],
  },
  {
    slug: "r-mehta",
    name: "Rohan Mehta", // [PLACEHOLDER]
    role: "Head of Platform Engineering",
    bio: "Runs the cloud and DevOps practice, covering infrastructure as code, delivery pipelines and production reliability.",
    image: "",
    focus: ["Cloud", "SRE"],
  },
  {
    slug: "a-nowak",
    name: "Agnieszka Nowak", // [PLACEHOLDER]
    role: "Delivery Director",
    bio: "Accountable for delivery governance, staffing and the two-week reporting cadence across all active engagements.",
    image: "",
    focus: ["Delivery", "Governance"],
  },
  {
    slug: "d-fischer",
    name: "Daniel Fischer", // [PLACEHOLDER]
    role: "Head of Security Engineering",
    bio: "Leads threat modelling, secure SDLC enablement and application security testing for client systems.",
    image: "",
    focus: ["AppSec", "Compliance"],
  },
];

/* ------------------------------------------------------- technologies  */
export const technologies: Technology[] = [
  { name: "React", category: "Frontend", note: "Primary UI library", maturity: "core" },
  { name: "Next.js", category: "Frontend", note: "App Router, RSC, ISR", maturity: "core" },
  { name: "TypeScript", category: "Frontend", note: "Default across the stack", maturity: "core" },
  { name: "Tailwind CSS", category: "Frontend", note: "Design-token driven UI", maturity: "core" },
  { name: "Vue", category: "Frontend", note: "Maintained client systems", maturity: "selective" },

  { name: "Node.js", category: "Backend", note: "Services and APIs", maturity: "core" },
  { name: "Python", category: "Backend", note: "Data and AI workloads", maturity: "core" },
  { name: "Java", category: "Backend", note: "Enterprise and financial systems", maturity: "production" },
  { name: ".NET", category: "Backend", note: "Enterprise integration", maturity: "production" },
  { name: "Go", category: "Backend", note: "High-throughput services", maturity: "selective" },
  { name: "GraphQL", category: "Backend", note: "Client-facing aggregation", maturity: "production" },

  { name: "React Native", category: "Mobile", note: "Cross-platform apps", maturity: "core" },
  { name: "Swift", category: "Mobile", note: "Native iOS", maturity: "production" },
  { name: "Kotlin", category: "Mobile", note: "Native Android", maturity: "production" },

  { name: "PostgreSQL", category: "Database", note: "Default relational store", maturity: "core" },
  { name: "TimescaleDB", category: "Database", note: "Time-series workloads", maturity: "production" },
  { name: "pgvector", category: "Database", note: "Embedding search", maturity: "production" },
  { name: "Redis", category: "Database", note: "Cache and queues", maturity: "core" },
  { name: "MongoDB", category: "Database", note: "Document workloads", maturity: "selective" },
  { name: "Elasticsearch", category: "Database", note: "Search and faceting", maturity: "production" },

  { name: "AWS", category: "Cloud", note: "Primary cloud platform", maturity: "core" },
  { name: "Azure", category: "Cloud", note: "Enterprise and healthcare", maturity: "production" },
  { name: "Google Cloud", category: "Cloud", note: "Data and ML workloads", maturity: "production" },
  { name: "Cloudflare", category: "Cloud", note: "Edge, DNS and WAF", maturity: "production" },

  { name: "Docker", category: "DevOps", note: "Standard packaging", maturity: "core" },
  { name: "Kubernetes", category: "DevOps", note: "Container orchestration", maturity: "core" },
  { name: "Terraform", category: "DevOps", note: "Infrastructure as code", maturity: "core" },
  { name: "GitHub Actions", category: "DevOps", note: "CI/CD pipelines", maturity: "core" },
  { name: "ArgoCD", category: "DevOps", note: "GitOps delivery", maturity: "production" },

  { name: "OpenAI", category: "AI/ML", note: "Hosted model provider", maturity: "production" },
  { name: "LangChain", category: "AI/ML", note: "Orchestration where justified", maturity: "selective" },
  { name: "PyTorch", category: "AI/ML", note: "Custom model work", maturity: "selective" },
  { name: "Hugging Face", category: "AI/ML", note: "Self-hosted models", maturity: "production" },

  { name: "Kafka", category: "Infrastructure", note: "Event streaming", maturity: "production" },
  { name: "RabbitMQ", category: "Infrastructure", note: "Task queues", maturity: "selective" },
  { name: "OpenTelemetry", category: "Infrastructure", note: "Tracing standard", maturity: "core" },
  { name: "Grafana", category: "Infrastructure", note: "Dashboards and alerting", maturity: "core" },

  { name: "Keycloak", category: "Security", note: "Identity and access", maturity: "production" },
  { name: "HashiCorp Vault", category: "Security", note: "Secrets management", maturity: "production" },
  { name: "Semgrep", category: "Security", note: "Static analysis in CI", maturity: "core" },
  { name: "Trivy", category: "Security", note: "Container and SBOM scanning", maturity: "core" },
  { name: "OWASP ASVS", category: "Security", note: "Verification standard", maturity: "core" },
];

export const technologyCategories = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "Cloud",
  "DevOps",
  "AI/ML",
  "Infrastructure",
  "Security",
] as const;

/* -------------------------------------------------------- testimonials */
export const testimonials: Testimonial[] = [
  {
    id: "meridian-cfo",
    name: "Katrien Bosman", // [PLACEHOLDER]
    position: "Chief Financial Officer",
    company: "Meridian Capital Partners",
    avatar: "",
    rating: 5,
    quote:
      "They understood our control requirements better than the consultancies that specialise in them. The parallel-run period was their idea, and it is the reason the cutover was uneventful.",
    projectSlug: "meridian-treasury-platform",
  },
  {
    id: "atlas-ops",
    name: "Tomás Herrera", // [PLACEHOLDER]
    position: "Director of Operations",
    company: "Atlas Freight Group",
    avatar: "",
    rating: 5,
    quote:
      "Two of their engineers spent a week in the cabs with our drivers before writing any code. That decision shaped the whole product, and adoption was never a fight.",
    projectSlug: "atlas-logistics-control",
  },
  {
    id: "vela-ecom",
    name: "Priya Raman", // [PLACEHOLDER]
    position: "E-commerce Director",
    company: "Vela Home",
    avatar: "",
    rating: 5,
    quote:
      "We had been told a replatform meant a year of frozen roadmap. They migrated us route by route and we kept shipping campaigns throughout.",
    projectSlug: "vela-commerce-replatform",
  },
  {
    id: "northwind-cmio",
    name: "Dr. Alan Whitfield", // [PLACEHOLDER]
    position: "Chief Medical Information Officer",
    company: "Northwind Health Network",
    avatar: "",
    rating: 5,
    quote:
      "They were the only supplier who proposed an evaluation harness before proposing a feature. Our clinical safety committee approved the design with very few changes.",
    projectSlug: "northwind-health-companion",
  },
  {
    id: "helios-cto",
    name: "Ingrid Hallberg", // [PLACEHOLDER]
    position: "Chief Technology Officer",
    company: "Helios Utilities",
    avatar: "",
    rating: 5,
    quote:
      "The dual-run reconciliation reports gave our regulator exactly the evidence they needed. Migration risk stopped being a board-level discussion.",
    projectSlug: "helios-energy-portal",
  },
  {
    id: "orbit-director",
    name: "Michael Brennan", // [PLACEHOLDER]
    position: "Service Delivery Director",
    company: "Orbit Industrial Services",
    avatar: "",
    rating: 4,
    quote:
      "Running the scheduler in shadow mode for six weeks meant our planners trusted it before it made a single real decision. First-time fix has not looked back.",
    projectSlug: "orbit-field-service",
  },
];

/* ---------------------------------------------------- engagement models */
export const engagementModels: EngagementModel[] = [
  {
    slug: "fixed-scope",
    name: "Fixed scope",
    bestFor: "Clearly defined deliverables",
    description:
      "A defined outcome, an agreed price and a fixed date. Suited to discovery phases, audits, integrations and well-understood builds.",
    billing: "Fixed fee, milestone-based invoicing",
    minimumEngagement: "From 4 weeks",
    includes: [
      "Written scope and acceptance criteria",
      "Named delivery team",
      "Milestone demos and sign-off",
      "Documentation and handover",
      "30 days post-delivery warranty",
    ],
    idealWhen: [
      "Requirements are stable and documented",
      "A firm budget approval is required",
      "The outcome can be objectively verified",
    ],
    highlighted: false,
  },
  {
    slug: "dedicated-team",
    name: "Dedicated team",
    bestFor: "Long-term product development",
    description:
      "A cross-functional squad working solely on your product, integrated with your processes and reporting into your roadmap.",
    billing: "Monthly per allocated role",
    minimumEngagement: "3 months, 30 days notice",
    includes: [
      "Named, dedicated engineers and designers",
      "Delivery lead and two-week reporting",
      "Your tools, repositories and ceremonies",
      "Quarterly capability review",
      "Knowledge transfer built into the plan",
    ],
    idealWhen: [
      "The roadmap extends beyond two quarters",
      "You need capacity plus senior capability",
      "Team continuity matters more than flexibility",
    ],
    highlighted: true,
  },
  {
    slug: "time-and-materials",
    name: "Time & materials",
    bestFor: "Evolving requirements",
    description:
      "Flexible capacity billed against actual effort, with a monthly cap agreed in advance so spend never surprises you.",
    billing: "Hourly rate, monthly cap",
    minimumEngagement: "From 80 hours per month",
    includes: [
      "Flexible scope and re-prioritisation",
      "Transparent time reporting",
      "Agreed monthly spend ceiling",
      "Scale up or down each month",
      "Same engineering standards as fixed teams",
    ],
    idealWhen: [
      "Priorities shift frequently",
      "Work is exploratory or research-led",
      "You need to start before scope is settled",
    ],
    highlighted: false,
  },
  {
    slug: "enterprise",
    name: "Enterprise programme",
    bestFor: "Multi-team, regulated delivery",
    description:
      "Multiple coordinated squads with architecture governance, security assurance and managed production operations under one agreement.",
    billing: "Custom — programme-level agreement",
    minimumEngagement: "12 months",
    includes: [
      "Multiple coordinated delivery squads",
      "Architecture and security governance",
      "Managed operations with SLAs",
      "Executive reporting cadence",
      "Compliance evidence support",
    ],
    idealWhen: [
      "Several systems change in parallel",
      "Regulatory evidence is required",
      "Production operations are in scope",
    ],
    highlighted: false,
  },
];

export const pricingFaqs: FaqItem[] = [
  {
    question: "Why are there no prices listed?",
    answer:
      "Rates depend on team composition, seniority mix, location and commitment length. We publish a full rate card and an indicative budget range in the proposal, usually within five working days of the first call.",
  },
  {
    question: "How do you estimate a project?",
    answer:
      "For fixed-scope work we run a short paid discovery, then estimate at the level of vertical slices with explicit assumptions and a risk contingency. Estimates are ranges, and we show what drives the spread.",
  },
  {
    question: "What happens if scope changes?",
    answer:
      "In dedicated-team and time-and-materials models, scope is re-prioritised at no contractual cost. In fixed-scope work, changes go through a written change request with a clear cost and schedule impact.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. Managed support covers monitoring, incident response against agreed SLAs, dependency patching and a quarterly improvement allocation. It is priced separately from delivery.",
  },
  {
    question: "Who owns the intellectual property?",
    answer:
      "You own all deliverables, source code and documentation created for your engagement. This is stated in the master services agreement, and code is committed to your repositories wherever possible.",
  },
];

export const generalFaqs: FaqItem[] = [
  {
    question: "How quickly can a team start?",
    answer:
      "Discovery engagements typically begin within two to three weeks. Full delivery squads usually require four to six weeks of lead time, depending on the seniority mix required.",
    category: "Engagement",
  },
  {
    question: "Do you work with in-house engineering teams?",
    answer:
      "Frequently. Blended teams are roughly half our work. We adopt your repositories, review process and ceremonies rather than imposing ours.",
    category: "Engagement",
  },
  {
    question: "Where are your engineers based?",
    answer:
      "Amsterdam, Kraków and Austin. Every engagement guarantees at least four hours of working-day overlap with your core team.",
    category: "Company",
  },
  {
    question: "How do you handle confidentiality?",
    answer:
      "Mutual NDAs are signed before technical discovery. All engineers work under confidentiality obligations, access is least-privilege, and client data never leaves approved environments.",
    category: "Security",
  },
  {
    question: "What does handover look like?",
    answer:
      "Architecture documentation, ADRs, runbooks, a recorded walkthrough and live pairing sessions with your engineers. Handover is a contractual deliverable, not a favour.",
    category: "Delivery",
  },
];

/* ------------------------------------------------------------- careers */
export const jobOpenings: JobOpening[] = [
  {
    slug: "senior-fullstack-engineer",
    title: "Senior Full-stack Engineer",
    department: "Engineering",
    location: "Amsterdam / Kraków / Remote (EU)",
    type: "Full-time",
    level: "Senior",
    description:
      "Lead delivery on client platforms across TypeScript, Node.js and PostgreSQL, from domain modelling to production operation.",
    requirements: [
      "6+ years building production web applications",
      "Strong TypeScript and relational data modelling",
      "Comfortable owning a service in production",
      "Experience mentoring mid-level engineers",
    ],
  },
  {
    slug: "platform-engineer",
    title: "Platform / DevOps Engineer",
    department: "Platform",
    location: "Kraków / Remote (EU)",
    type: "Full-time",
    level: "Mid–Senior",
    description:
      "Build the paved road: Terraform modules, delivery pipelines and observability used across all client engagements.",
    requirements: [
      "Strong Terraform and Kubernetes experience",
      "CI/CD pipeline design on GitHub Actions or similar",
      "Observability with OpenTelemetry and Grafana",
      "Security-minded approach to cloud access",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Amsterdam / Remote (EU)",
    type: "Full-time",
    level: "Mid–Senior",
    description:
      "Research and design information-dense operational interfaces, and help evolve our coded design systems.",
    requirements: [
      "Portfolio of complex B2B or enterprise products",
      "Comfortable running contextual research",
      "Working knowledge of design tokens and component systems",
      "Accessibility literacy (WCAG 2.2)",
    ],
  },
  {
    slug: "ai-engineer",
    title: "Applied AI Engineer",
    department: "Engineering",
    location: "Remote (EU) / Austin",
    type: "Full-time",
    level: "Senior",
    description:
      "Build retrieval and evaluation systems for production AI features where accuracy, cost and safety are measured.",
    requirements: [
      "Production experience with RAG systems",
      "Strong Python plus solid software engineering practice",
      "Experience designing evaluation datasets and metrics",
      "Pragmatic view of when not to use a model",
    ],
  },
];

export const careerBenefits: FeatureItem[] = [
  {
    title: "Learning budget",
    description:
      "An annual budget per person for conferences, certifications and courses, plus dedicated learning time each month.", // [PLACEHOLDER amount]
  },
  {
    title: "Four-hour overlap, not four time zones",
    description:
      "Remote-friendly with guaranteed overlap windows instead of always-on availability.",
  },
  {
    title: "Real engineering standards",
    description:
      "A published engineering handbook, code review on everything and time allocated for refactoring.",
  },
  {
    title: "Sustainable delivery",
    description:
      "No routine overtime. On-call is compensated, rotated and genuinely optional for non-platform roles.",
  },
];
