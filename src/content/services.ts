import type { Service } from "@/types/content";

/**
 * Service catalogue. Every service detail page is generated from this data —
 * there is one page component, not eight. Replace/extend freely, or move to a
 * CMS by re-implementing `src/services/content.ts`.
 */
export const services: Service[] = [
  {
    slug: "software-development",
    title: "Custom Software Development",
    shortTitle: "Software Development",
    icon: "Code2",
    summary:
      "Enterprise applications and internal platforms built around how your business actually operates — not around a template.",
    heroHeadline: "Software built for the way your business really works",
    heroSubline:
      "We replace spreadsheet sprawl and ageing internal tools with maintainable systems your teams trust, with a clear path from discovery to production.",
    overview: [
      "Most companies do not need more software — they need the right software, built on assumptions that survive contact with reality. We start with the operational workflow, the data model and the constraints, then design a system that fits.",
      "Our delivery teams are small, senior and accountable end to end: domain modelling, architecture, implementation, automated testing and production operations. You get working software in production early and a codebase your own engineers can own later.",
    ],
    keyFeatures: [
      "Domain-driven architecture",
      "Automated test coverage from day one",
      "Incremental legacy replacement",
      "Documented handover",
    ],
    problems: [
      {
        title: "Critical processes live in spreadsheets",
        description:
          "Business-critical logic sits in files nobody owns, with no audit trail and no validation. We move it into a governed system without stopping operations.",
      },
      {
        title: "Legacy systems block change",
        description:
          "A monolith nobody dares to touch turns every request into a quarter-long project. We introduce seams, tests and strangler patterns so change becomes routine.",
      },
      {
        title: "Integration debt",
        description:
          "Point-to-point integrations multiply until nothing can be changed safely. We consolidate onto documented, versioned contracts.",
      },
    ],
    approach: [
      {
        title: "Model the domain first",
        description:
          "Event storming and workflow mapping with the people who do the work, before a line of code is written.",
      },
      {
        title: "Thin vertical slices",
        description:
          "Every sprint ships one complete path through the system — UI, API, data, tests — so value and risk are visible early.",
      },
      {
        title: "Operability as a requirement",
        description:
          "Logging, metrics, tracing, alerting and runbooks are part of the definition of done, never an afterthought.",
      },
    ],
    benefits: [
      {
        title: "Lower cost of change",
        description:
          "Clear boundaries and test coverage mean new features cost roughly the same in year three as in year one.",
      },
      {
        title: "No vendor lock-in",
        description:
          "Standard languages, open source, your cloud account, your repositories. We document the exit on day one.",
      },
      {
        title: "Measurable operational gain",
        description:
          "We agree the operational metric — cycle time, error rate, manual hours — and report against it every sprint.",
      },
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Python",
      "Java",
      ".NET",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
    process: [
      {
        step: "01",
        title: "Discovery & domain mapping",
        description:
          "Workshops with operators and stakeholders to map the current workflow, data and constraints.",
        deliverables: ["Domain map", "Risk register", "Delivery plan"],
      },
      {
        step: "02",
        title: "Architecture & prototype",
        description:
          "A validated architecture decision record plus a walking skeleton deployed to a real environment.",
        deliverables: ["ADRs", "Walking skeleton", "Environment setup"],
      },
      {
        step: "03",
        title: "Iterative delivery",
        description:
          "Two-week increments, demoed and deployed, with continuous stakeholder feedback.",
        deliverables: ["Sprint releases", "Test suite", "Sprint reports"],
      },
      {
        step: "04",
        title: "Hardening & handover",
        description:
          "Load testing, security review, documentation and knowledge transfer to your team.",
        deliverables: ["Runbooks", "Architecture docs", "Training sessions"],
      },
    ],
    faqs: [
      {
        question: "Can you work alongside our in-house engineers?",
        answer:
          "Yes. Roughly half of our engagements are blended teams. We use your repositories, your review process and your ceremonies, and we explicitly plan for knowledge transfer.",
      },
      {
        question: "How do you handle requirements that change mid-project?",
        answer:
          "We plan in two-week increments against outcomes rather than a fixed feature list. Scope changes are re-prioritised against the backlog with a transparent impact assessment on cost and date.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do, unconditionally, from the first commit. Code lives in your version control from day one where possible.",
      },
    ],
    relatedProjects: ["meridian-treasury-platform", "atlas-logistics-control"],
    order: 1,
  },
  {
    slug: "web-development",
    title: "Web Platform Engineering",
    shortTitle: "Web Development",
    icon: "Globe",
    summary:
      "High-performance websites, portals and web applications engineered for Core Web Vitals, accessibility and search.",
    heroHeadline: "Web platforms that stay fast as they grow",
    heroSubline:
      "From marketing sites to complex customer portals — rendered server-side, measured continuously and built to keep performance budgets under control.",
    overview: [
      "A web platform is rarely one thing: it is a marketing surface, an authenticated portal, a content workflow and a set of integrations. We design the rendering strategy per surface so each one gets the right trade-off between freshness, speed and cost.",
      "Everything is measured. Performance budgets, accessibility checks and visual regression tests run in CI, so a regression is caught in a pull request instead of in a quarterly audit.",
    ],
    keyFeatures: [
      "Server-first rendering strategy",
      "Performance budgets enforced in CI",
      "WCAG 2.2 AA accessibility",
      "Headless CMS integration",
    ],
    problems: [
      {
        title: "The site slows down with every release",
        description:
          "Without budgets in CI, JavaScript weight grows monotonically. We instrument the pipeline and fail builds that exceed agreed thresholds.",
      },
      {
        title: "Marketing is blocked by engineering",
        description:
          "Every copy change becomes a ticket. We model content properly and connect a headless CMS so non-technical teams publish safely.",
      },
      {
        title: "Accessibility risk",
        description:
          "Inaccessible interfaces are both a legal exposure and lost revenue. We build to WCAG 2.2 AA and test with keyboard and screen readers.",
      },
    ],
    approach: [
      {
        title: "Rendering strategy per route",
        description:
          "Static, incremental, streamed or client-rendered — chosen deliberately for each surface rather than applied globally.",
      },
      {
        title: "Design system first",
        description:
          "A documented component library with tokens so the twentieth page costs a fraction of the first.",
      },
      {
        title: "Content modelling",
        description:
          "Structured, typed content that can move between CMS vendors without touching the frontend.",
      },
    ],
    benefits: [
      {
        title: "Better commercial performance",
        description:
          "Faster pages and cleaner information architecture consistently improve conversion and organic reach.",
      },
      {
        title: "Publishing autonomy",
        description:
          "Content teams ship without engineering time, which frees the roadmap for product work.",
      },
      {
        title: "Predictable maintenance",
        description:
          "A shared design system and typed content contracts keep long-term maintenance cost flat.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Vercel",
      "Cloudflare",
    ],
    process: [
      {
        step: "01",
        title: "Audit & information architecture",
        description:
          "Baseline performance, accessibility and SEO audit, plus a new content and URL structure.",
        deliverables: ["Audit report", "IA & URL map", "Performance budget"],
      },
      {
        step: "02",
        title: "Design system",
        description:
          "Tokens, components and page templates documented and reviewed against real content.",
        deliverables: ["Component library", "Design tokens", "Templates"],
      },
      {
        step: "03",
        title: "Build & integrate",
        description:
          "Implementation with CMS, analytics, search and third-party integrations wired in.",
        deliverables: ["Production build", "CMS schema", "CI pipeline"],
      },
      {
        step: "04",
        title: "Launch & optimise",
        description:
          "Redirect mapping, staged rollout and post-launch monitoring of field metrics.",
        deliverables: ["Redirect map", "Launch checklist", "RUM dashboard"],
      },
    ],
    faqs: [
      {
        question: "Which CMS do you recommend?",
        answer:
          "It depends on your editorial workflow. We regularly integrate Sanity, Payload and Strapi, and we keep the frontend decoupled so the CMS can be replaced without a rewrite.",
      },
      {
        question: "Can you improve an existing site instead of rebuilding it?",
        answer:
          "Often, yes. We start with an audit; if the architecture is sound, a targeted optimisation programme is usually cheaper and faster than a rebuild.",
      },
      {
        question: "Do you handle SEO migration?",
        answer:
          "Yes — redirect mapping, structured data, canonical strategy and post-launch index monitoring are part of every replatforming project.",
      },
    ],
    relatedProjects: ["vela-commerce-replatform", "helios-energy-portal"],
    order: 2,
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Application Development",
    shortTitle: "Mobile Apps",
    icon: "Smartphone",
    summary:
      "Native and cross-platform iOS and Android apps with offline-first data, secure storage and dependable release pipelines.",
    heroHeadline: "Mobile products people actually keep installed",
    heroSubline:
      "Offline-first architecture, biometric security and automated release pipelines for apps used in the field, on the floor and on the move.",
    overview: [
      "Mobile is unforgiving: intermittent connectivity, strict store review, device fragmentation and users who abandon after one crash. We design for those constraints from the start rather than patching them later.",
      "We choose native or cross-platform based on the product, not on preference — and we automate the release path so shipping an update is a routine, low-risk event.",
    ],
    keyFeatures: [
      "Offline-first synchronisation",
      "Biometric & secure storage",
      "Automated store releases",
      "Crash & performance monitoring",
    ],
    problems: [
      {
        title: "The app is useless without signal",
        description:
          "Field teams lose work when connectivity drops. We implement local persistence with conflict-aware sync.",
      },
      {
        title: "Releases are slow and risky",
        description:
          "Manual builds and store submissions delay fixes for weeks. We automate signing, builds and phased rollout.",
      },
      {
        title: "Two divergent codebases",
        description:
          "iOS and Android drift apart in behaviour. We unify the domain layer and keep platform code where it genuinely belongs.",
      },
    ],
    approach: [
      {
        title: "Platform decision, documented",
        description:
          "A short technical spike compares native and cross-platform against your real requirements and team composition.",
      },
      {
        title: "Offline-first data layer",
        description:
          "Local source of truth with queued mutations, deterministic conflict resolution and clear sync states in the UI.",
      },
      {
        title: "Release engineering",
        description:
          "CI-built signed artefacts, internal test tracks, feature flags and staged rollouts with automatic rollback.",
      },
    ],
    benefits: [
      {
        title: "Higher retention",
        description:
          "Stability and responsiveness matter more to retention than feature count. We optimise for both explicitly.",
      },
      {
        title: "Faster fixes",
        description: "Automated pipelines cut hotfix turnaround from weeks to days.",
      },
      {
        title: "Compliance-ready",
        description:
          "Secure enclave storage, certificate pinning and privacy manifests configured to store requirements.",
      },
    ],
    technologies: [
      "React Native",
      "Swift",
      "Kotlin",
      "TypeScript",
      "GraphQL",
      "Firebase",
      "Fastlane",
    ],
    process: [
      {
        step: "01",
        title: "Product & platform definition",
        description:
          "Use-case mapping, device matrix and platform decision with a documented rationale.",
        deliverables: ["Platform decision record", "Device matrix", "Backlog"],
      },
      {
        step: "02",
        title: "Prototype on device",
        description:
          "An installable build in testers' hands within weeks to validate core flows.",
        deliverables: ["TestFlight / internal build", "Flow validation report"],
      },
      {
        step: "03",
        title: "Build & harden",
        description: "Feature delivery with automated UI tests and crash monitoring.",
        deliverables: ["Release candidates", "Automated test suite"],
      },
      {
        step: "04",
        title: "Store launch & iterate",
        description:
          "Store assets, review handling, phased rollout and post-launch analytics.",
        deliverables: ["Store listings", "Rollout plan", "Analytics dashboard"],
      },
    ],
    faqs: [
      {
        question: "React Native or fully native?",
        answer:
          "React Native suits most business applications with heavy shared logic. We recommend native when the product depends on advanced camera, sensor, background or graphics capability. We make that call with you during a short spike.",
      },
      {
        question: "Do you manage the App Store and Play Store accounts?",
        answer:
          "We can operate them under your organisation accounts, including review responses, but ownership always stays with you.",
      },
      {
        question: "Can you take over an existing app?",
        answer:
          "Yes. We begin with a code and release audit, then stabilise the pipeline before adding features.",
      },
    ],
    relatedProjects: ["atlas-logistics-control", "northwind-health-companion"],
    order: 3,
  },
  {
    slug: "ui-ux-design",
    title: "Product & UX Design",
    shortTitle: "UI/UX Design",
    icon: "PenTool",
    summary:
      "Research-led interface design for complex products — information-dense, accessible and built as a reusable system.",
    heroHeadline: "Design that makes complex products feel obvious",
    heroSubline:
      "We design the dense, high-stakes interfaces that operational teams use for hours a day — grounded in research, delivered as a coded design system.",
    overview: [
      "Enterprise interfaces fail for predictable reasons: unclear hierarchy, hidden system state, and workflows designed around database tables instead of tasks. We fix those at the structural level before styling anything.",
      "Design output is not a static file. Every engagement ends with tokens and components implemented in code, documented and version-controlled alongside the product.",
    ],
    keyFeatures: [
      "Contextual user research",
      "Design system in code",
      "WCAG 2.2 AA by default",
      "Prototype-driven validation",
    ],
    problems: [
      {
        title: "Users need training to complete routine tasks",
        description:
          "High training cost is a design symptom. We restructure navigation and task flows around real jobs to be done.",
      },
      {
        title: "Inconsistent interface across teams",
        description:
          "Every squad reinvents the same components. A governed design system removes the duplication.",
      },
      {
        title: "Design hand-offs get lost in translation",
        description:
          "We deliver implemented components, not annotated pictures, so intent survives into production.",
      },
    ],
    approach: [
      {
        title: "Research in context",
        description:
          "We observe people doing the actual work, capture friction and quantify time cost per task.",
      },
      {
        title: "Structure before surface",
        description:
          "Information architecture, task flows and state models are agreed before visual design begins.",
      },
      {
        title: "System, not screens",
        description:
          "Tokens, primitives and patterns delivered in code with usage documentation and accessibility notes.",
      },
    ],
    benefits: [
      {
        title: "Lower onboarding cost",
        description:
          "Clear task flows shorten training time and reduce support tickets measurably.",
      },
      {
        title: "Faster feature delivery",
        description:
          "Teams assemble from a shared library instead of designing and building from scratch.",
      },
      {
        title: "Accessibility compliance",
        description:
          "Contrast, focus order, semantics and keyboard paths are validated as part of the system.",
      },
    ],
    technologies: [
      "Figma",
      "Storybook",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Radix Primitives",
    ],
    process: [
      {
        step: "01",
        title: "Research & audit",
        description:
          "Interviews, contextual observation and a heuristic audit of the current experience.",
        deliverables: ["Research findings", "Journey maps", "UX audit"],
      },
      {
        step: "02",
        title: "Structure",
        description: "Information architecture, task flows and low-fidelity wireframes.",
        deliverables: ["IA", "Flows", "Wireframes"],
      },
      {
        step: "03",
        title: "Interface design",
        description: "Visual language, key screens and interactive prototype for testing.",
        deliverables: ["UI design", "Prototype", "Usability test report"],
      },
      {
        step: "04",
        title: "Design system delivery",
        description: "Tokens and components implemented, documented and handed over.",
        deliverables: ["Coded components", "Storybook", "Usage guidelines"],
      },
    ],
    faqs: [
      {
        question: "Do you only design, or also implement?",
        answer:
          "Both. Most clients ask us to implement the design system in code so the handover gap disappears. Design-only engagements are possible.",
      },
      {
        question: "How much user research is realistic?",
        answer:
          "Five to eight contextual interviews with real users usually surface the majority of structural problems. We scale research to the risk of the decision.",
      },
      {
        question: "Can you work with our existing brand?",
        answer:
          "Yes. We treat brand guidelines as constraints and extend them into a product-grade token system.",
      },
    ],
    relatedProjects: ["meridian-treasury-platform", "northwind-health-companion"],
    order: 4,
  },
  {
    slug: "cloud-and-devops",
    title: "Cloud & DevOps Engineering",
    shortTitle: "Cloud & DevOps",
    icon: "Cloud",
    summary:
      "Infrastructure as code, CI/CD, observability and cost governance on AWS, Azure and Google Cloud.",
    heroHeadline: "Infrastructure that is boring, reproducible and cheap to run",
    heroSubline:
      "We codify environments, automate delivery and instrument production so deployments stop being events and cloud spend stops being a surprise.",
    overview: [
      "Cloud problems are rarely about the cloud provider. They are about untracked manual changes, missing observability and pipelines nobody trusts. We address the operating model together with the infrastructure.",
      "Every environment we build is described in code, reproducible from an empty account, and covered by monitoring with meaningful alerts and documented runbooks.",
    ],
    keyFeatures: [
      "Infrastructure as code",
      "Zero-downtime deployment",
      "Observability & SLOs",
      "Cloud cost governance",
    ],
    problems: [
      {
        title: "Nobody can rebuild production",
        description:
          "Years of console clicks leave an environment that cannot be recreated. We codify it incrementally and safely.",
      },
      {
        title: "Deployments require a maintenance window",
        description:
          "We introduce blue/green or canary deployment with automated rollback and health gating.",
      },
      {
        title: "Cloud bills grow without explanation",
        description:
          "Tagging, right-sizing, lifecycle policies and budget alerts typically recover 20–40% of spend.",
      },
    ],
    approach: [
      {
        title: "Codify what exists",
        description:
          "Import current infrastructure into Terraform before changing it, so improvements are reviewable.",
      },
      {
        title: "Paved-road pipelines",
        description:
          "A standard delivery pipeline template that teams adopt instead of writing their own.",
      },
      {
        title: "SLOs and meaningful alerts",
        description:
          "Alerts tied to user-visible objectives, not raw CPU — fewer pages, faster response.",
      },
    ],
    benefits: [
      {
        title: "Shorter lead time",
        description:
          "Teams typically move from fortnightly releases to on-demand deployment within a quarter.",
      },
      {
        title: "Lower incident impact",
        description:
          "Automated rollback plus tracing reduces mean time to recovery substantially.",
      },
      {
        title: "Controlled spend",
        description: "Per-service cost visibility with budget alerting and ownership.",
      },
    ],
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Terraform",
      "Kubernetes",
      "Docker",
      "GitHub Actions",
      "Grafana",
      "OpenTelemetry",
    ],
    process: [
      {
        step: "01",
        title: "Assessment",
        description:
          "Review of infrastructure, delivery pipeline, observability and cost baseline.",
        deliverables: ["Assessment report", "Cost baseline", "Prioritised roadmap"],
      },
      {
        step: "02",
        title: "Foundation",
        description:
          "Accounts, networking, identity and IaC modules established as a paved road.",
        deliverables: ["Terraform modules", "Landing zone", "Access model"],
      },
      {
        step: "03",
        title: "Delivery automation",
        description: "Pipelines, environments, secrets management and deployment strategy.",
        deliverables: ["CI/CD pipelines", "Environment parity", "Secrets policy"],
      },
      {
        step: "04",
        title: "Operate & optimise",
        description: "SLOs, dashboards, on-call runbooks and continuous cost review.",
        deliverables: ["SLO dashboards", "Runbooks", "Optimisation report"],
      },
    ],
    faqs: [
      {
        question: "Do we have to migrate to Kubernetes?",
        answer:
          "No. Kubernetes is appropriate for some workloads and overkill for many. We frequently recommend managed container services or serverless when they reduce operational burden.",
      },
      {
        question: "Can you support us after the project?",
        answer:
          "Yes, through a managed service agreement with agreed response times, or by training your team to operate the platform themselves.",
      },
      {
        question: "Which cloud do you prefer?",
        answer:
          "We are provider-neutral and work across AWS, Azure and Google Cloud. The decision should follow your existing commitments, compliance needs and team skills.",
      },
    ],
    relatedProjects: ["helios-energy-portal", "vela-commerce-replatform"],
    order: 5,
  },
  {
    slug: "ai-and-automation",
    title: "AI & Intelligent Automation",
    shortTitle: "AI & Automation",
    icon: "Sparkles",
    summary:
      "Retrieval-augmented assistants, document intelligence and workflow automation with evaluation and human oversight built in.",
    heroHeadline: "AI features that survive contact with production",
    heroSubline:
      "We build evaluated, observable AI systems with grounded retrieval, guardrails and a human in the loop wherever the cost of being wrong is high.",
    overview: [
      "The difficulty with applied AI is not calling a model — it is grounding, evaluation, cost control and knowing when not to use one. We treat an AI feature like any other production system: measurable, monitored and reversible.",
      "Every engagement starts with a narrow, high-value use case and an evaluation set. If the measured quality does not clear the bar, we will tell you before you invest further.",
    ],
    keyFeatures: [
      "Retrieval-augmented generation",
      "Automated evaluation suites",
      "Human-in-the-loop review",
      "Token & cost observability",
    ],
    problems: [
      {
        title: "Pilots that never reach production",
        description:
          "Demos ignore evaluation, latency and cost. We define production criteria up front and build to them.",
      },
      {
        title: "Hallucinated answers",
        description:
          "We ground responses in your own content with citations, and refuse confidently when evidence is missing.",
      },
      {
        title: "Manual document processing",
        description:
          "Extraction pipelines with confidence thresholds route only uncertain cases to human reviewers.",
      },
    ],
    approach: [
      {
        title: "Use-case triage",
        description:
          "We score candidate use cases by value, data readiness and risk, then start with one.",
      },
      {
        title: "Evaluation-driven development",
        description:
          "A golden dataset and automated scoring run in CI so quality regressions are caught before release.",
      },
      {
        title: "Guardrails and fallbacks",
        description:
          "Input validation, output schemas, rate limiting, PII handling and deterministic fallbacks.",
      },
    ],
    benefits: [
      {
        title: "Measured quality",
        description:
          "You see accuracy, latency and cost per interaction before anything reaches customers.",
      },
      {
        title: "Model portability",
        description:
          "An abstraction layer keeps you free to switch providers or self-host as economics change.",
      },
      {
        title: "Real time savings",
        description:
          "Automation targets the specific manual steps that consume the most hours, and we measure the difference.",
      },
    ],
    technologies: [
      "Python",
      "TypeScript",
      "OpenAI",
      "LangChain",
      "pgvector",
      "PostgreSQL",
      "Kubernetes",
      "OpenTelemetry",
    ],
    process: [
      {
        step: "01",
        title: "Opportunity assessment",
        description: "Use-case scoring, data readiness review and risk classification.",
        deliverables: ["Use-case scorecard", "Data assessment", "Risk note"],
      },
      {
        step: "02",
        title: "Evaluation harness",
        description:
          "Golden dataset, scoring metrics and a baseline measurement before feature work.",
        deliverables: ["Golden dataset", "Eval pipeline", "Baseline report"],
      },
      {
        step: "03",
        title: "Build & ground",
        description:
          "Retrieval, prompt orchestration, guardrails and the human review interface.",
        deliverables: ["Production feature", "Guardrail policy", "Review UI"],
      },
      {
        step: "04",
        title: "Operate",
        description: "Monitoring of quality, cost and drift, with a scheduled review cycle.",
        deliverables: ["Quality dashboard", "Cost report", "Improvement backlog"],
      },
    ],
    faqs: [
      {
        question: "Can our data stay inside our own infrastructure?",
        answer:
          "Yes. We deploy self-hosted or regionally-scoped models and vector stores when data residency requires it, and design the retrieval layer to be provider-agnostic.",
      },
      {
        question: "How do you prevent incorrect AI output reaching customers?",
        answer:
          "Grounded retrieval with citations, schema-validated outputs, confidence thresholds and human review for high-impact actions. Where risk is unacceptable, we recommend deterministic software instead.",
      },
      {
        question: "What does an AI feature cost to run?",
        answer:
          "We instrument cost per request from the first prototype and report projected monthly spend at expected volume before launch.",
      },
    ],
    relatedProjects: ["northwind-health-companion", "meridian-treasury-platform"],
    order: 6,
  },
  {
    slug: "cybersecurity",
    title: "Application Security",
    shortTitle: "Cybersecurity",
    icon: "ShieldCheck",
    summary:
      "Threat modelling, secure architecture review, penetration testing and remediation support for software teams.",
    heroHeadline: "Security engineered into the product, not audited afterwards",
    heroSubline:
      "Threat modelling, secure SDLC, automated scanning and hands-on remediation — delivered by engineers who also build production software.",
    overview: [
      "Security findings are cheap to fix at design time and expensive after launch. We embed threat modelling and automated checks into the delivery process so problems surface in pull requests.",
      "We do not hand over a PDF and leave. Our engineers pair with your team on remediation and verify the fixes.",
    ],
    keyFeatures: [
      "STRIDE threat modelling",
      "Secure SDLC enablement",
      "Automated SAST/DAST/SCA",
      "Remediation pairing",
    ],
    problems: [
      {
        title: "Findings repeat every audit",
        description:
          "Point-in-time testing without process change produces the same report annually. We fix the pipeline, not only the bug.",
      },
      {
        title: "Unclear authorisation model",
        description:
          "Ad-hoc permission checks cause data exposure. We define and centrally enforce an explicit access model.",
      },
      {
        title: "Dependency risk",
        description:
          "Unmonitored third-party packages are the most common entry point. We add SBOM generation and policy gates.",
      },
    ],
    approach: [
      {
        title: "Model the threats",
        description:
          "Structured STRIDE analysis of trust boundaries, data flows and abuse cases per system.",
      },
      {
        title: "Shift checks left",
        description:
          "Secret scanning, dependency policy, SAST and IaC scanning enforced in CI with sensible severity gates.",
      },
      {
        title: "Verify by testing",
        description:
          "Authenticated application penetration testing with reproducible evidence and retest after fixes.",
      },
    ],
    benefits: [
      {
        title: "Fewer critical findings",
        description:
          "Design-stage review consistently removes whole classes of vulnerability before code exists.",
      },
      {
        title: "Audit readiness",
        description:
          "Documented controls, evidence and traceability that map to SOC 2, ISO 27001 and GDPR expectations.",
      },
      {
        title: "Faster remediation",
        description:
          "Fixes are paired and verified, so findings close in days rather than quarters.",
      },
    ],
    technologies: [
      "OWASP ASVS",
      "Burp Suite",
      "Semgrep",
      "Trivy",
      "HashiCorp Vault",
      "Terraform",
      "Keycloak",
    ],
    process: [
      {
        step: "01",
        title: "Scope & threat model",
        description: "Asset inventory, trust boundaries and prioritised threat scenarios.",
        deliverables: ["Threat model", "Asset inventory", "Test scope"],
      },
      {
        step: "02",
        title: "Assessment",
        description:
          "Architecture review, code review and authenticated penetration testing.",
        deliverables: ["Findings report", "Evidence pack", "Risk ratings"],
      },
      {
        step: "03",
        title: "Remediation",
        description: "Paired fixes with your engineers and CI control implementation.",
        deliverables: ["Fix pull requests", "CI security gates", "SBOM"],
      },
      {
        step: "04",
        title: "Retest & enable",
        description: "Verification of fixes plus secure-coding enablement for the team.",
        deliverables: ["Retest report", "Secure SDLC playbook", "Training"],
      },
    ],
    faqs: [
      {
        question: "Do you issue compliance certifications?",
        answer:
          "No — certification requires an accredited auditor. We prepare the technical controls and evidence that make those audits straightforward, and we work alongside your auditor.",
      },
      {
        question: "How disruptive is penetration testing?",
        answer:
          "Testing normally runs against a staging environment with production-like data. Where production testing is required, we agree rate limits and a rollback plan in advance.",
      },
      {
        question: "Can you review a system you did not build?",
        answer:
          "Yes, that is the majority of this work. We only need architecture documentation, repository access and a test environment.",
      },
    ],
    relatedProjects: ["meridian-treasury-platform", "helios-energy-portal"],
    order: 7,
  },
  {
    slug: "it-consulting",
    title: "Technology Consulting",
    shortTitle: "IT Consulting",
    icon: "Compass",
    summary:
      "Architecture review, technology due diligence and modernisation roadmaps with costed, sequenced recommendations.",
    heroHeadline: "Clear technology decisions, with the evidence behind them",
    heroSubline:
      "Independent assessment of your architecture, delivery capability and technology spend — delivered as a sequenced, costed plan rather than a slide deck.",
    overview: [
      "Leadership teams usually know something is wrong: delivery is slow, costs climb, incidents repeat. What is missing is an independent, technically credible diagnosis and a plan that survives budget scrutiny.",
      "Our consultants are practising engineers. Recommendations come with effort estimates, sequencing and the trade-offs of not acting.",
    ],
    keyFeatures: [
      "Architecture assessment",
      "Technical due diligence",
      "Modernisation roadmap",
      "Build-vs-buy analysis",
    ],
    problems: [
      {
        title: "Delivery keeps slowing down",
        description:
          "We measure lead time, change failure rate and coupling to locate the actual bottleneck instead of guessing.",
      },
      {
        title: "Modernisation with no plan",
        description:
          "We sequence the work into increments that deliver value continuously, not a multi-year big bang.",
      },
      {
        title: "Investment decisions without technical evidence",
        description:
          "Due diligence covering code quality, architecture, security, team and key-person risk.",
      },
    ],
    approach: [
      {
        title: "Evidence over opinion",
        description:
          "Repository analytics, incident history, architecture review and structured interviews.",
      },
      {
        title: "Costed options",
        description:
          "Two or three viable paths with effort, risk and business impact stated for each.",
      },
      {
        title: "Support through execution",
        description:
          "Optional embedded architect to keep delivery aligned with the agreed plan.",
      },
    ],
    benefits: [
      {
        title: "Defensible decisions",
        description: "Recommendations that stand up in front of a board or investment committee.",
      },
      {
        title: "Reduced risk",
        description: "Key-person dependencies, licensing and compliance exposure identified early.",
      },
      {
        title: "Faster execution",
        description: "A sequenced backlog that teams can start on immediately.",
      },
    ],
    technologies: [
      "Architecture Decision Records",
      "DORA metrics",
      "C4 model",
      "Terraform",
      "PostgreSQL",
      "Kubernetes",
    ],
    process: [
      {
        step: "01",
        title: "Framing",
        description: "Agree the decision to be made, the constraints and the success criteria.",
        deliverables: ["Engagement brief", "Stakeholder map"],
      },
      {
        step: "02",
        title: "Assessment",
        description: "Technical analysis, interviews and metric collection across systems and teams.",
        deliverables: ["Findings pack", "DORA baseline", "Risk register"],
      },
      {
        step: "03",
        title: "Options & roadmap",
        description: "Costed options with a recommended sequence and investment profile.",
        deliverables: ["Options analysis", "Roadmap", "Business case"],
      },
      {
        step: "04",
        title: "Execution support",
        description: "Optional embedded architecture support during delivery.",
        deliverables: ["ADRs", "Governance cadence", "Quarterly review"],
      },
    ],
    faqs: [
      {
        question: "How long does an assessment take?",
        answer:
          "A focused architecture assessment typically runs three to four weeks. Full technical due diligence for a transaction is usually two weeks with prioritised access.",
      },
      {
        question: "Will you recommend your own delivery services?",
        answer:
          "Assessment fees are independent of any delivery work. Where we are a candidate supplier we state it explicitly, and many clients execute the roadmap with their own teams.",
      },
      {
        question: "Do you work with private equity and investors?",
        answer:
          "Yes. We deliver pre-deal technical due diligence and post-acquisition 100-day technology plans.",
      },
    ],
    relatedProjects: ["atlas-logistics-control", "vela-commerce-replatform"],
    order: 8,
  },
];

export const getServiceSlugs = () => services.map((s) => s.slug);
