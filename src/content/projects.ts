import type { Project } from "@/types/content";

/**
 * Case study data. Images are licensed stock placeholders — replace with real
 * client screenshots at /public/images/projects/*.webp once available.
 */
const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${Math.round(
    (w * 2) / 3,
  )}&w=${w}`;

export const projects: Project[] = [
  {
    slug: "meridian-treasury-platform",
    name: "Treasury & liquidity platform",
    client: "Meridian Capital Partners", // [PLACEHOLDER client]
    industrySlug: "fintech",
    industryLabel: "FinTech",
    categories: ["enterprise", "saas", "web"],
    projectType: "Enterprise platform · 14 months",
    summary:
      "Replaced a spreadsheet-driven treasury process with an event-sourced liquidity platform covering 40+ bank accounts across nine currencies.",
    heroImage: px(6804068),
    imageAlt: "Engineering team collaborating on a financial platform in an office",
    year: 2024,
    duration: "14 months",
    teamSize: "7 engineers, 1 designer, 1 delivery lead",
    services: ["software-development", "ui-ux-design", "cybersecurity"],
    technologies: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Kafka",
      "React",
      "Kubernetes",
      "AWS",
      "Terraform",
    ],
    challenge: [
      "The treasury team managed a nine-figure cash position across 40+ accounts using linked spreadsheets and manual bank statement downloads. Position reporting was a full day behind, and every month-end required three analysts for reconciliation.",
      "An internal audit flagged the absence of an audit trail and segregation of duties as a material control weakness that had to be remediated within the financial year.",
    ],
    solution: [
      "We modelled the treasury domain with the client's finance team and implemented an append-only, event-sourced ledger. Every position is derived from immutable events, so any historical state can be reconstructed exactly.",
      "Bank connectivity was consolidated behind a single ingestion service with idempotent processing and automated exception queues. A four-eyes approval workflow with hardware-key authentication satisfied the segregation-of-duties finding.",
    ],
    architecture: [
      {
        title: "Event-sourced core",
        description:
          "Append-only event store in PostgreSQL with projections rebuilt on demand for reporting and reconciliation.",
      },
      {
        title: "Ingestion boundary",
        description:
          "Bank and market feeds normalised behind an anti-corruption layer with idempotency keys and a replayable dead-letter queue.",
      },
      {
        title: "Zero-trust access",
        description:
          "OIDC with hardware-key step-up authentication for payment approval, and per-entity authorisation enforced centrally.",
      },
      {
        title: "Observability",
        description:
          "OpenTelemetry tracing end to end, with SLOs on ingestion latency and reconciliation completeness.",
      },
    ],
    keyFeatures: [
      "Real-time consolidated cash position across nine currencies",
      "Automated bank statement ingestion and matching",
      "Four-eyes payment approval with hardware-key step-up",
      "Cash-flow forecasting with scenario comparison",
      "Immutable audit trail exportable for auditors",
      "Role-based entity-level access control",
    ],
    processNotes: [
      {
        title: "Discovery",
        description:
          "Three weeks of event storming with treasury, finance and internal audit to agree the domain model and control requirements.",
      },
      {
        title: "Parallel running",
        description:
          "The platform ran alongside the spreadsheet process for two months, with automated daily variance reports until variance reached zero.",
      },
      {
        title: "Controlled cutover",
        description:
          "Entity-by-entity migration over six weeks, each with an agreed rollback point and sign-off from the finance controller.",
      },
    ],
    screenshots: [
      {
        src: px(6805152, 1200),
        alt: "Developer working on the treasury platform interface",
        caption: "Consolidated position dashboard with currency breakdown",
      },
      {
        src: px(6804076, 1200),
        alt: "Team reviewing reconciliation screens",
        caption: "Reconciliation workspace with automated exception queues",
      },
    ],
    results: [
      "Daily position reporting moved from T+1 to near real time",
      "Month-end reconciliation reduced from three analysts for four days to one analyst for half a day",
      "Internal audit control finding formally closed within the financial year",
      "Zero reconciliation breaks in the first two quarters after cutover",
    ],
    metrics: [
      { label: "Reporting latency", value: "T+1 → live", note: "Consolidated cash position" },
      { label: "Reconciliation effort", value: "−88%", note: "Analyst hours at month-end" },
      { label: "Audit findings closed", value: "3 of 3", note: "Including one material weakness" },
      { label: "Platform availability", value: "99.98%", note: "Rolling 12 months" },
    ],
    testimonialId: "meridian-cfo",
    featured: true,
    order: 1,
  },
  {
    slug: "atlas-logistics-control",
    name: "Logistics control tower & driver app",
    client: "Atlas Freight Group", // [PLACEHOLDER client]
    industrySlug: "logistics",
    industryLabel: "Logistics",
    categories: ["mobile", "enterprise", "web"],
    projectType: "Platform + mobile · 11 months",
    summary:
      "A unified shipment timeline across four carrier integrations plus an offline-first driver application used across 600 vehicles.",
    heroImage: px(6805152),
    imageAlt: "Operations team monitoring logistics data on screens",
    year: 2025,
    duration: "11 months",
    teamSize: "6 engineers, 1 designer, 1 product lead",
    services: ["software-development", "mobile-app-development", "cloud-and-devops"],
    technologies: [
      "React Native",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Kafka",
      "Redis",
      "AWS",
      "Terraform",
    ],
    challenge: [
      "Dispatchers reconciled shipment status across four carrier portals, a telematics system and a warehouse management system. Nothing agreed, so customer service answered 'where is my order' by telephone.",
      "The existing driver app required constant connectivity. Drivers in rural areas lost proof-of-delivery data, creating billing disputes that cost roughly six figures annually.",
    ],
    solution: [
      "We built an event-driven control tower that normalises every carrier and device event into a single shipment timeline with a defined state machine and confidence indicators for each update.",
      "The driver application was rebuilt offline-first: a local database is the source of truth, mutations queue and synchronise automatically, and proof-of-delivery photographs upload opportunistically with guaranteed eventual delivery.",
    ],
    architecture: [
      {
        title: "Event normalisation",
        description:
          "Carrier webhooks and telematics streams mapped to a canonical event schema with per-source reliability scoring.",
      },
      {
        title: "Shipment state machine",
        description:
          "Explicit, testable state transitions replacing implicit status strings across systems.",
      },
      {
        title: "Offline-first mobile",
        description:
          "SQLite local store with an outbox queue, deterministic conflict resolution and background upload.",
      },
      {
        title: "Exception routing",
        description:
          "Rules engine that escalates only genuine outliers into the dispatcher work queue.",
      },
    ],
    keyFeatures: [
      "Single shipment timeline across all carriers",
      "Offline proof of delivery with photo capture and signature",
      "Automated exception triage for dispatchers",
      "Customer-facing tracking with accurate ETAs",
      "Driver route sequencing with live re-optimisation",
      "Operational SLA dashboards per depot",
    ],
    processNotes: [
      {
        title: "Field research",
        description:
          "Two engineers spent a week riding with drivers to map real connectivity and workflow conditions before design started.",
      },
      {
        title: "Depot pilot",
        description:
          "A single depot ran the new app for eight weeks with a measured comparison against the previous tooling.",
      },
      {
        title: "Phased rollout",
        description:
          "Fleet-wide rollout in five waves with feature flags and per-wave stability gates.",
      },
    ],
    screenshots: [
      {
        src: px(7988082, 1200),
        alt: "Dispatch team using the control tower application",
        caption: "Control tower with live shipment timeline and exception queue",
      },
      {
        src: px(6803533, 1200),
        alt: "Driver using a mobile application",
        caption: "Driver application operating in offline mode",
      },
    ],
    results: [
      "Proof-of-delivery loss effectively eliminated across the fleet",
      "'Where is my order' contact volume reduced by 61%",
      "Dispatcher exception handling time reduced by 43%",
      "App crash-free session rate improved from 96.1% to 99.7%",
    ],
    metrics: [
      { label: "POD data loss", value: "→ 0", note: "Previously 4.2% of deliveries" },
      { label: "Support contacts", value: "−61%", note: "Tracking-related enquiries" },
      { label: "Vehicles live", value: "600+", note: "Across 14 depots" },
      { label: "Crash-free sessions", value: "99.7%", note: "Rolling 30 days" },
    ],
    testimonialId: "atlas-ops",
    featured: true,
    order: 2,
  },
  {
    slug: "vela-commerce-replatform",
    name: "Composable commerce replatform",
    client: "Vela Home", // [PLACEHOLDER client]
    industrySlug: "ecommerce",
    industryLabel: "E-commerce",
    categories: ["ecommerce", "web", "saas"],
    projectType: "Replatform · 9 months",
    summary:
      "Migrated a monolithic storefront with 90,000 SKUs to a composable architecture, cutting page load time by 62% before peak season.",
    heroImage: px(1181461),
    imageAlt: "Team working on an e-commerce platform redesign",
    year: 2024,
    duration: "9 months",
    teamSize: "5 engineers, 2 designers",
    services: ["web-development", "cloud-and-devops", "ui-ux-design"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Elasticsearch",
      "Redis",
      "Cloudflare",
      "GitHub Actions",
    ],
    challenge: [
      "A ten-year-old monolithic platform took 4.8 seconds to render category pages on mobile. Every previous peak season required a code freeze from October, blocking all commercial change for a quarter.",
      "Merchandising depended on engineering for every campaign, and the catalogue of 90,000 SKUs made faceted search unusably slow.",
    ],
    solution: [
      "We migrated route by route behind an edge proxy, so traffic moved to the new storefront incrementally with instant rollback. The commerce engine, search tier and content layer were separated behind versioned contracts.",
      "Search moved to a dedicated Elasticsearch cluster with denormalised documents, and merchandisers received campaign tooling that publishes without a deployment.",
    ],
    architecture: [
      {
        title: "Strangler migration",
        description:
          "Edge routing split traffic per URL pattern between legacy and new storefront with instant rollback.",
      },
      {
        title: "Composable services",
        description:
          "Storefront, commerce engine, search and CMS deployed independently behind typed contracts.",
      },
      {
        title: "Caching strategy",
        description:
          "Incremental static regeneration with tag-based invalidation triggered by catalogue events.",
      },
      {
        title: "Performance gating",
        description:
          "Lighthouse and bundle budgets enforced per pull request; regressions block merge.",
      },
    ],
    keyFeatures: [
      "Sub-second category pages at 90,000 SKUs",
      "Faceted search with typo tolerance and synonyms",
      "Merchandiser campaign scheduling without deployment",
      "Headless CMS for editorial and landing pages",
      "Accessible checkout meeting WCAG 2.2 AA",
      "Full SEO migration with redirect mapping",
    ],
    processNotes: [
      {
        title: "Audit first",
        description:
          "A four-week audit established the performance baseline, revenue impact model and migration sequence.",
      },
      {
        title: "Route-by-route cutover",
        description:
          "Twelve migration waves, each measured against conversion and Core Web Vitals before proceeding.",
      },
      {
        title: "Peak readiness",
        description:
          "Load testing at three times forecast peak, with documented degradation modes and an on-call rota.",
      },
    ],
    screenshots: [
      {
        src: px(6804084, 1200),
        alt: "Designers reviewing commerce interface layouts",
        caption: "Category page with faceted search and merchandising slots",
      },
      {
        src: px(6805161, 1200),
        alt: "Team reviewing analytics dashboards",
        caption: "Merchandising campaign scheduler",
      },
    ],
    results: [
      "Largest Contentful Paint improved from 4.8s to 1.8s on mobile",
      "Mobile conversion rate increased 18% year on year",
      "First peak season in five years without a code freeze",
      "Organic sessions up 24% within two quarters of migration",
    ],
    metrics: [
      { label: "Mobile LCP", value: "−62%", note: "4.8s → 1.8s (field data)" },
      { label: "Mobile conversion", value: "+18%", note: "Year on year, like for like" },
      { label: "Peak throughput", value: "3× forecast", note: "Verified by load test" },
      { label: "Organic sessions", value: "+24%", note: "Two quarters post-migration" },
    ],
    testimonialId: "vela-ecom",
    featured: true,
    order: 3,
  },
  {
    slug: "northwind-health-companion",
    name: "Patient companion & care assistant",
    client: "Northwind Health Network", // [PLACEHOLDER client]
    industrySlug: "healthcare",
    industryLabel: "Healthcare",
    categories: ["mobile", "ai", "saas"],
    projectType: "Product build · 12 months",
    summary:
      "A FHIR-integrated patient application with a grounded AI assistant that answers care-plan questions with citations and clinician oversight.",
    heroImage: px(7988082),
    imageAlt: "Healthcare technology team working on patient software",
    year: 2025,
    duration: "12 months",
    teamSize: "6 engineers, 1 designer, 1 clinical safety officer",
    services: ["mobile-app-development", "ai-and-automation", "ui-ux-design"],
    technologies: [
      "React Native",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "pgvector",
      "HL7 FHIR",
      "Azure",
      "OpenAI",
    ],
    challenge: [
      "Patients discharged after cardiac procedures received a printed care plan. The network's nurse line handled a high volume of repetitive questions, and non-adherence drove avoidable readmissions.",
      "Any digital assistant had to be clinically safe: no invented guidance, complete traceability of every answer, and an unambiguous escalation path to a human clinician.",
    ],
    solution: [
      "We built a patient application integrated with the EHR over HL7 FHIR, delivering the personalised care plan, medication schedule and appointment timeline on the patient's own device.",
      "The assistant answers only from the network's approved clinical content library using retrieval-augmented generation with mandatory citations. Out-of-scope or risk-flagged questions are refused and routed to the nurse line. Every interaction is logged for clinical review.",
    ],
    architecture: [
      {
        title: "FHIR integration layer",
        description:
          "Standards-based EHR integration with strict field-level data minimisation.",
      },
      {
        title: "Grounded retrieval",
        description:
          "pgvector index over the approved clinical content library, with answers required to cite source documents.",
      },
      {
        title: "Safety guardrails",
        description:
          "Risk classifier, refusal policy and immediate escalation routing for red-flag symptoms.",
      },
      {
        title: "Clinical audit",
        description:
          "Every question, retrieved source and generated answer retained for clinician sampling and review.",
      },
    ],
    keyFeatures: [
      "Personalised care plan synchronised from the EHR",
      "Medication reminders with adherence tracking",
      "Cited answers from approved clinical content only",
      "Red-flag symptom detection with nurse-line escalation",
      "Accessible design validated with older patient cohorts",
      "Clinician dashboard for review and content updates",
    ],
    processNotes: [
      {
        title: "Clinical safety case",
        description:
          "A hazard log and clinical risk management file were maintained from week one alongside development.",
      },
      {
        title: "Evaluation harness",
        description:
          "A 900-question golden dataset scored on every build; releases blocked below the agreed accuracy threshold.",
      },
      {
        title: "Supervised pilot",
        description:
          "Twelve-week pilot with 400 patients and 100% clinician review of assistant answers before wider release.",
      },
    ],
    screenshots: [
      {
        src: px(6803554, 1200),
        alt: "Clinicians reviewing patient application content",
        caption: "Clinician review console for assistant interactions",
      },
      {
        src: px(6804068, 1200),
        alt: "Team testing the patient mobile application",
        caption: "Patient care-plan timeline and medication schedule",
      },
    ],
    results: [
      "Nurse-line calls for routine care-plan questions reduced by 34% during the pilot",
      "Assistant answered 71% of questions within scope; all others escalated cleanly",
      "Zero clinically unsafe answers identified in 100% clinician review of pilot interactions",
      "Medication adherence self-reporting improved by 22 percentage points",
    ],
    metrics: [
      { label: "Routine call volume", value: "−34%", note: "Pilot cohort vs control" },
      { label: "In-scope answer rate", value: "71%", note: "Remainder escalated to clinicians" },
      { label: "Unsafe answers", value: "0", note: "Full clinician review, 12-week pilot" },
      { label: "Pilot participants", value: "400", note: "Cardiac discharge cohort" },
    ],
    testimonialId: "northwind-cmio",
    featured: true,
    order: 4,
  },
  {
    slug: "helios-energy-portal",
    name: "Metering data platform & customer portal",
    client: "Helios Utilities", // [PLACEHOLDER client]
    industrySlug: "energy-utilities",
    industryLabel: "Energy & Utilities",
    categories: ["web", "enterprise", "saas"],
    projectType: "Data platform + portal · 10 months",
    summary:
      "A time-series platform ingesting 1.2 billion meter readings per month, with a self-service portal that cut billing-dispute contacts by a third.",
    heroImage: px(6803554),
    imageAlt: "Engineers reviewing data pipelines on monitors",
    year: 2024,
    duration: "10 months",
    teamSize: "5 engineers, 1 data engineer, 1 designer",
    services: ["cloud-and-devops", "web-development", "software-development"],
    technologies: [
      "Python",
      "TypeScript",
      "Next.js",
      "TimescaleDB",
      "Kafka",
      "AWS",
      "Terraform",
      "Grafana",
    ],
    challenge: [
      "Interval meter data was loaded nightly into a relational database that had outgrown its design. Validation failures were discovered days later, and regulatory submissions were regularly resubmitted.",
      "Customers could not see their own consumption, so every billing question became a contact-centre call.",
    ],
    solution: [
      "We rebuilt ingestion as a streaming pipeline with validation at the edge of the system, so rejected readings surface within minutes and enter an operator resolution queue rather than a nightly failure report.",
      "Storage moved to TimescaleDB with continuous aggregates and retention policies, which made both regulatory reporting and a responsive customer-facing consumption portal practical on the same dataset.",
    ],
    architecture: [
      {
        title: "Streaming ingestion",
        description:
          "Kafka-based pipeline with schema validation, quarantine topics and replay capability.",
      },
      {
        title: "Time-series store",
        description:
          "TimescaleDB hypertables with continuous aggregates powering sub-second portal queries.",
      },
      {
        title: "Reconciliation service",
        description:
          "Automated market-submission validation with variance reporting before dispatch.",
      },
      {
        title: "Portal edge caching",
        description:
          "Authenticated consumption views cached per customer with event-driven invalidation.",
      },
    ],
    keyFeatures: [
      "1.2 billion readings ingested per month",
      "Minute-level validation with operator resolution queue",
      "Customer consumption portal with tariff comparison",
      "Automated regulatory submission validation",
      "Per-pipeline SLO dashboards and alerting",
      "Complete infrastructure defined in Terraform",
    ],
    processNotes: [
      {
        title: "Dual-run ingestion",
        description:
          "New and legacy pipelines ran in parallel for three months with automated daily variance reconciliation.",
      },
      {
        title: "Regulatory sign-off",
        description:
          "Submission logic validated against twelve months of historical data before switchover.",
      },
      {
        title: "Portal beta",
        description:
          "Opt-in beta with 20,000 customers and measured contact-volume comparison.",
      },
    ],
    screenshots: [
      {
        src: px(6803525, 1200),
        alt: "Operations team reviewing ingestion dashboards",
        caption: "Ingestion monitoring with validation queue",
      },
      {
        src: px(1181461, 1200),
        alt: "Designer reviewing the customer portal interface",
        caption: "Customer consumption portal with tariff comparison",
      },
    ],
    results: [
      "Data validation feedback moved from overnight batch to under two minutes",
      "Regulatory resubmissions reduced from monthly to none in twelve months",
      "Billing-dispute contacts down 33% among portal users",
      "Infrastructure cost per million readings reduced by 41%",
    ],
    metrics: [
      { label: "Readings / month", value: "1.2B", note: "Interval meter data" },
      { label: "Validation latency", value: "< 2 min", note: "Previously overnight" },
      { label: "Dispute contacts", value: "−33%", note: "Portal users vs control" },
      { label: "Unit infra cost", value: "−41%", note: "Per million readings" },
    ],
    testimonialId: "helios-cto",
    featured: false,
    order: 5,
  },
  {
    slug: "orbit-field-service",
    name: "Field service scheduling & knowledge assistant",
    client: "Orbit Industrial Services", // [PLACEHOLDER client]
    industrySlug: "manufacturing",
    industryLabel: "Manufacturing",
    categories: ["saas", "ai", "mobile"],
    projectType: "Product build · 8 months",
    summary:
      "Constraint-based scheduling for 180 field engineers, plus a retrieval assistant that surfaces the right maintenance procedure on site.",
    heroImage: px(6804076),
    imageAlt: "Industrial technology team planning field operations",
    year: 2025,
    duration: "8 months",
    teamSize: "4 engineers, 1 designer",
    services: ["software-development", "ai-and-automation", "mobile-app-development"],
    technologies: [
      "TypeScript",
      "Python",
      "PostgreSQL",
      "pgvector",
      "React Native",
      "Docker",
      "Azure",
    ],
    challenge: [
      "Scheduling 180 engineers across skills, certifications, parts availability and travel was done manually by six planners. First-time fix rate sat at 68%, so a third of visits required a return.",
      "Maintenance documentation spanned 12,000 PDFs across three legacy systems, and engineers routinely worked from memory.",
    ],
    solution: [
      "We implemented constraint-based scheduling that proposes assignments against skills, certification validity, parts and travel, while leaving planners in control of the final decision.",
      "A permission-aware retrieval assistant indexes the full documentation corpus and returns the exact procedure section with a citation and document version, available offline for recently viewed assets.",
    ],
    architecture: [
      {
        title: "Constraint solver",
        description:
          "Scheduling engine producing ranked assignment proposals with explainable constraint reasoning.",
      },
      {
        title: "Document index",
        description:
          "Chunked and embedded documentation in pgvector with version and permission metadata.",
      },
      {
        title: "Offline cache",
        description:
          "Recently accessed procedures cached on device for sites without connectivity.",
      },
      {
        title: "Feedback loop",
        description:
          "Engineer ratings on retrieved procedures feed a weekly retrieval-quality review.",
      },
    ],
    keyFeatures: [
      "Explainable schedule proposals with planner override",
      "Certification and compliance validation before dispatch",
      "Cited procedure retrieval across 12,000 documents",
      "Offline access to recent procedures and job packs",
      "Parts availability integrated into scheduling",
      "First-time-fix analytics per engineer and asset class",
    ],
    processNotes: [
      {
        title: "Shadow scheduling",
        description:
          "The solver ran in shadow mode for six weeks; proposals were compared against planner decisions before go-live.",
      },
      {
        title: "Retrieval evaluation",
        description:
          "A 500-query evaluation set built with senior engineers gated every release of the assistant.",
      },
      {
        title: "Regional rollout",
        description: "Three regions onboarded sequentially with per-region success criteria.",
      },
    ],
    screenshots: [
      {
        src: px(6805161, 1200),
        alt: "Planners reviewing scheduling proposals",
        caption: "Planner console with explainable schedule proposals",
      },
      {
        src: px(6803533, 1200),
        alt: "Field engineer consulting documentation on a mobile device",
        caption: "On-site procedure retrieval with source citation",
      },
    ],
    results: [
      "First-time fix rate improved from 68% to 84%",
      "Planner time per schedule cycle reduced by 55%",
      "Average procedure lookup time reduced from 9 minutes to under 1",
      "Travel distance per completed job reduced 12%",
    ],
    metrics: [
      { label: "First-time fix", value: "68% → 84%", note: "Six months post-rollout" },
      { label: "Planning effort", value: "−55%", note: "Planner hours per cycle" },
      { label: "Procedure lookup", value: "9 min → <1", note: "Median on-site lookup" },
      { label: "Travel per job", value: "−12%", note: "Distance, like for like" },
    ],
    testimonialId: "orbit-director",
    featured: false,
    order: 6,
  },
];

export const projectCategories = [
  { value: "all", label: "All work" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "saas", label: "SaaS" },
  { value: "enterprise", label: "Enterprise" },
  { value: "ai", label: "AI" },
  { value: "ecommerce", label: "E-commerce" },
] as const;

export const getProjectSlugs = () => projects.map((p) => p.slug);
