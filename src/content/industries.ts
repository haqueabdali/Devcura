import type { Industry } from "@/types/content";

export const industries: Industry[] = [
  {
    slug: "fintech",
    name: "FinTech & Financial Services",
    icon: "Landmark",
    summary:
      "Payment flows, treasury tooling and regulated data handling engineered for auditability and uptime.",
    overview: [
      "Financial software carries a different failure cost. Reconciliation must be exact, every state change must be traceable, and regulators expect evidence rather than assurances.",
      "We build ledger-accurate systems with idempotent processing, immutable audit trails and controls designed with your compliance function from the start.",
    ],
    challenges: [
      {
        title: "Reconciliation gaps",
        description:
          "Distributed payment flows drift out of balance without idempotency keys and a double-entry ledger model.",
      },
      {
        title: "Audit and reporting burden",
        description:
          "Manual evidence gathering consumes finance teams every quarter-end.",
      },
      {
        title: "Legacy core integration",
        description:
          "Modern products must interoperate with batch-oriented core banking systems.",
      },
    ],
    solutions: [
      {
        title: "Event-sourced ledgers",
        description:
          "Append-only transaction records with deterministic replay and exact reconciliation.",
      },
      {
        title: "Automated evidence",
        description:
          "Controls emit audit artefacts continuously instead of at reporting time.",
      },
      {
        title: "Anti-corruption layers",
        description:
          "Isolate legacy cores behind typed contracts so product teams can move independently.",
      },
    ],
    technologies: ["Java", "TypeScript", "PostgreSQL", "Kafka", "Kubernetes", "AWS"],
    compliance: ["PSD2", "PCI-DSS aligned", "SOC 2 readiness", "GDPR"],
    relatedProjects: ["meridian-treasury-platform"],
    order: 1,
  },
  {
    slug: "ecommerce",
    name: "E-commerce & D2C",
    icon: "ShoppingBag",
    summary:
      "Composable commerce platforms tuned for peak traffic, catalogue scale and conversion performance.",
    overview: [
      "Commerce performance is revenue. A 500ms regression on category pages is measurable in the same week.",
      "We replatform monolithic storefronts into composable architectures where catalogue, checkout and content scale and deploy independently.",
    ],
    challenges: [
      {
        title: "Peak-season fragility",
        description: "Traffic spikes expose synchronous dependencies and unbounded queries.",
      },
      {
        title: "Slow catalogue pages",
        description: "Large catalogues with faceted search degrade without a dedicated search tier.",
      },
      {
        title: "Merchandising bottlenecks",
        description: "Every campaign change requires an engineering deployment.",
      },
    ],
    solutions: [
      {
        title: "Composable architecture",
        description: "Decoupled storefront, commerce engine, search and CMS with clear contracts.",
      },
      {
        title: "Edge caching strategy",
        description: "Incremental regeneration and edge caching with precise invalidation.",
      },
      {
        title: "Merchandiser autonomy",
        description: "Content and campaign tooling that publishes without a release.",
      },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Elasticsearch", "Redis", "Cloudflare"],
    compliance: ["PCI-DSS aligned", "GDPR", "WCAG 2.2 AA"],
    relatedProjects: ["vela-commerce-replatform"],
    order: 2,
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: "HeartPulse",
    summary:
      "Patient-facing and clinical software with privacy-by-design, interoperability and clinical safety review.",
    overview: [
      "Healthcare software must be safe, interoperable and private before it is convenient. We work within clinical governance rather than around it.",
      "Our teams build to HL7 FHIR interoperability standards with documented clinical risk management and strict data minimisation.",
    ],
    challenges: [
      {
        title: "Fragmented patient data",
        description: "Records spread across systems that do not share a common model.",
      },
      {
        title: "Strict privacy obligations",
        description: "Special-category data demands minimisation, encryption and access auditing.",
      },
      {
        title: "Clinical adoption",
        description: "Tools that add clicks to a clinician's day are abandoned quickly.",
      },
    ],
    solutions: [
      {
        title: "FHIR-based integration",
        description: "Standards-based interoperability with existing EHR and lab systems.",
      },
      {
        title: "Privacy by design",
        description: "Field-level encryption, role-based access and complete access audit logs.",
      },
      {
        title: "Clinician-led design",
        description: "Workflow research with practitioners to remove clicks rather than add them.",
      },
    ],
    technologies: ["TypeScript", "Python", "PostgreSQL", "HL7 FHIR", "Azure", "Kubernetes"],
    compliance: ["GDPR", "HIPAA aligned", "ISO 13485 awareness", "DCB0129 awareness"],
    relatedProjects: ["northwind-health-companion"],
    order: 3,
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    icon: "Truck",
    summary:
      "Real-time visibility, route optimisation and offline-capable field applications for distributed operations.",
    overview: [
      "Logistics runs on timely, accurate data from environments with poor connectivity and constant exceptions.",
      "We build control-tower platforms and driver applications that keep working offline and reconcile cleanly when connectivity returns.",
    ],
    challenges: [
      {
        title: "No single source of truth",
        description: "Telematics, WMS and carrier data never agree on shipment state.",
      },
      {
        title: "Connectivity gaps",
        description: "Depots and routes lose signal, breaking online-only tools.",
      },
      {
        title: "Manual exception handling",
        description: "Dispatchers rely on phone calls and spreadsheets to resolve issues.",
      },
    ],
    solutions: [
      {
        title: "Event-driven control tower",
        description: "A unified shipment timeline built from normalised carrier and device events.",
      },
      {
        title: "Offline-first field apps",
        description: "Local persistence with conflict-aware synchronisation for drivers and depots.",
      },
      {
        title: "Exception automation",
        description: "Rule-based triage that escalates only genuine outliers to humans.",
      },
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "Kafka", "Redis", "AWS"],
    compliance: ["GDPR", "Customs data handling", "ISO 27001 readiness"],
    relatedProjects: ["atlas-logistics-control"],
    order: 4,
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    icon: "Factory",
    summary:
      "OT/IT integration, production visibility and predictive maintenance on top of existing plant equipment.",
    overview: [
      "Plants rarely need new machinery to gain visibility — they need the data the machinery already produces, collected reliably and interpreted correctly.",
      "We integrate with existing PLC, SCADA and MES layers, respecting the separation between operational and corporate networks.",
    ],
    challenges: [
      {
        title: "Data trapped on the shop floor",
        description: "Machine data never reaches the systems where decisions are made.",
      },
      {
        title: "Unplanned downtime",
        description: "Reactive maintenance costs far more than condition-based intervention.",
      },
      {
        title: "OT/IT security boundaries",
        description: "Connectivity must never compromise operational network isolation.",
      },
    ],
    solutions: [
      {
        title: "Edge collection",
        description: "Edge gateways normalising OPC-UA and Modbus data with store-and-forward buffering.",
      },
      {
        title: "Condition monitoring",
        description: "Anomaly detection on sensor streams with maintenance workflow integration.",
      },
      {
        title: "Segmented architecture",
        description: "One-way data diodes and strict segmentation between OT and IT zones.",
      },
    ],
    technologies: ["Python", "TypeScript", "TimescaleDB", "MQTT", "Docker", "Azure IoT"],
    compliance: ["IEC 62443 awareness", "ISO 27001 readiness", "GDPR"],
    relatedProjects: ["atlas-logistics-control"],
    order: 5,
  },
  {
    slug: "education",
    name: "Education & EdTech",
    icon: "GraduationCap",
    summary:
      "Learning platforms with accessibility, assessment integrity and scale for cohort-based demand peaks.",
    overview: [
      "Education platforms face extreme load concentration — an entire cohort arrives at the same minute — and strict accessibility obligations.",
      "We build learning and assessment systems that stay available under cohort load and work for every learner.",
    ],
    challenges: [
      {
        title: "Concentrated load",
        description: "Enrolment and exam windows create order-of-magnitude traffic spikes.",
      },
      {
        title: "Accessibility obligations",
        description: "Public-sector education requires demonstrable WCAG conformance.",
      },
      {
        title: "Assessment integrity",
        description: "Online assessment needs credible controls without hostile surveillance.",
      },
    ],
    solutions: [
      {
        title: "Elastic delivery",
        description: "Queue-based enrolment and autoscaling with graceful degradation paths.",
      },
      {
        title: "Accessible by default",
        description: "WCAG 2.2 AA components with keyboard and screen-reader test coverage.",
      },
      {
        title: "Proportionate integrity controls",
        description: "Item banking, randomisation and analytics-based anomaly review.",
      },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "LTI 1.3"],
    compliance: ["WCAG 2.2 AA", "GDPR", "FERPA awareness"],
    relatedProjects: ["helios-energy-portal"],
    order: 6,
  },
  {
    slug: "real-estate",
    name: "Real Estate & PropTech",
    icon: "Building2",
    summary:
      "Portfolio, listing and tenant platforms that unify property data and automate document-heavy workflows.",
    overview: [
      "Property businesses run on documents, valuations and long-lived relationships — all of which fragment across systems over time.",
      "We consolidate property, lease and tenant data into one governed model and automate the document workflows around it.",
    ],
    challenges: [
      {
        title: "Fragmented portfolio data",
        description: "Valuations, leases and maintenance records live in separate silos.",
      },
      {
        title: "Manual document handling",
        description: "Lease abstraction and compliance checks consume analyst time.",
      },
      {
        title: "Slow tenant service",
        description: "Requests arrive by email with no tracking or SLA visibility.",
      },
    ],
    solutions: [
      {
        title: "Unified property model",
        description: "A single canonical model for assets, units, leases and counterparties.",
      },
      {
        title: "Document intelligence",
        description: "Automated lease extraction with confidence scoring and human review.",
      },
      {
        title: "Tenant portals",
        description: "Self-service request tracking with SLA reporting for asset managers.",
      },
    ],
    technologies: ["Next.js", "Python", "PostgreSQL", "pgvector", "Azure", "Docker"],
    compliance: ["GDPR", "AML awareness", "eIDAS e-signature"],
    relatedProjects: ["vela-commerce-replatform"],
    order: 7,
  },
  {
    slug: "retail",
    name: "Retail & Hospitality",
    icon: "Store",
    summary:
      "Unified commerce across store and digital channels, with resilient point-of-sale and loyalty systems.",
    overview: [
      "Customers expect stock, pricing and loyalty to behave identically in store and online — while store systems must keep trading when the network fails.",
      "We build the integration layer that unifies channels and the offline resilience that keeps tills running.",
    ],
    challenges: [
      {
        title: "Channel inconsistency",
        description: "Inventory and pricing differ between store, web and marketplace.",
      },
      {
        title: "Store connectivity",
        description: "Point-of-sale must keep trading through network outages.",
      },
      {
        title: "Fragmented customer view",
        description: "Loyalty, orders and service history are not connected.",
      },
    ],
    solutions: [
      {
        title: "Unified inventory service",
        description: "Near-real-time availability across channels with reservation logic.",
      },
      {
        title: "Resilient store systems",
        description: "Local-first transactions with guaranteed later synchronisation.",
      },
      {
        title: "Single customer record",
        description: "Identity resolution across channels feeding loyalty and service.",
      },
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "Kafka", "Redis", "Google Cloud"],
    compliance: ["PCI-DSS aligned", "GDPR", "Consumer rights directives"],
    relatedProjects: ["vela-commerce-replatform"],
    order: 8,
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    icon: "Zap",
    summary:
      "Metering data platforms, customer portals and grid-adjacent tooling for regulated utility operators.",
    overview: [
      "Utilities manage high-volume time-series data under regulatory scrutiny, with customer expectations set by consumer apps.",
      "We build metering data pipelines and self-service portals that reconcile accurately and remain auditable.",
    ],
    challenges: [
      {
        title: "High-volume time series",
        description: "Interval meter data overwhelms general-purpose databases.",
      },
      {
        title: "Billing disputes",
        description: "Opaque consumption data drives avoidable contact-centre volume.",
      },
      {
        title: "Regulatory reporting",
        description: "Market data submissions require strict validation and traceability.",
      },
    ],
    solutions: [
      {
        title: "Time-series architecture",
        description: "Purpose-built storage with downsampling and retention policies.",
      },
      {
        title: "Transparent customer portals",
        description: "Self-service consumption insight that reduces inbound contact.",
      },
      {
        title: "Validated submissions",
        description: "Rule-based validation with reconciliation reporting before submission.",
      },
    ],
    technologies: ["Python", "TypeScript", "TimescaleDB", "Kafka", "AWS", "Grafana"],
    compliance: ["GDPR", "Market data codes", "ISO 27001 readiness"],
    relatedProjects: ["helios-energy-portal"],
    order: 9,
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "Briefcase",
    summary:
      "Practice management, knowledge retrieval and client portals for consultancies, legal and accounting firms.",
    overview: [
      "Professional firms sell expert time, so utilisation, knowledge reuse and client responsiveness determine margin.",
      "We build the internal platforms that make institutional knowledge findable and client interaction measurable.",
    ],
    challenges: [
      {
        title: "Knowledge is not reusable",
        description: "Prior work is locked in file shares and individual inboxes.",
      },
      {
        title: "Manual time and billing",
        description: "Poor capture erodes recoverable hours every month.",
      },
      {
        title: "Inconsistent client experience",
        description: "Each team communicates through different ad-hoc channels.",
      },
    ],
    solutions: [
      {
        title: "Grounded knowledge search",
        description: "Permission-aware retrieval across documents with citation of sources.",
      },
      {
        title: "Frictionless time capture",
        description: "Activity-assisted timesheets integrated with billing.",
      },
      {
        title: "Branded client portals",
        description: "One place for deliverables, approvals and status across engagements.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Azure", "OpenAI"],
    compliance: ["GDPR", "Legal professional privilege", "ISO 27001 readiness"],
    relatedProjects: ["meridian-treasury-platform"],
    order: 10,
  },
];

export const getIndustrySlugs = () => industries.map((i) => i.slug);
