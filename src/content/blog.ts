import type { Author, BlogCategory, BlogPost } from "@/types/content";

export const blogCategories: BlogCategory[] = [
  {
    slug: "technology",
    name: "Technology",
    description: "Engineering practice, tooling and technical decisions.",
  },
  {
    slug: "ai",
    name: "AI",
    description: "Applied machine learning, evaluation and production AI systems.",
  },
  {
    slug: "software-development",
    name: "Software Development",
    description: "Architecture, delivery practice and code quality.",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Application security, threat modelling and secure delivery.",
  },
  {
    slug: "cloud",
    name: "Cloud",
    description: "Infrastructure, platform engineering and cost control.",
  },
  {
    slug: "business",
    name: "Business",
    description: "Technology economics, sourcing and team structure.",
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    description: "Modernisation programmes and organisational change.",
  },
];

export const authors: Author[] = [
  {
    slug: "m-okafor",
    name: "Marcus Okafor", // [PLACEHOLDER]
    role: "Chief Technology Officer",
    avatar: "",
    bio: "Distributed systems architect; writes about architecture governance and delivery practice.",
  },
  {
    slug: "s-lindqvist",
    name: "Sofia Lindqvist", // [PLACEHOLDER]
    role: "Director of Product Design",
    avatar: "",
    bio: "Researches and designs operational interfaces for regulated industries.",
  },
  {
    slug: "r-mehta",
    name: "Rohan Mehta", // [PLACEHOLDER]
    role: "Head of Platform Engineering",
    avatar: "",
    bio: "Platform engineering, infrastructure as code and production reliability.",
  },
  {
    slug: "d-fischer",
    name: "Daniel Fischer", // [PLACEHOLDER]
    role: "Head of Security Engineering",
    avatar: "",
    bio: "Threat modelling, secure SDLC and application security testing.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "evaluation-first-ai-delivery",
    title: "Evaluation-first: how to ship AI features that survive production",
    excerpt:
      "Most AI pilots stall because nobody defined what 'good' means. Here is the evaluation harness we build before writing a single prompt.",
    categorySlug: "ai",
    categoryName: "AI",
    authorSlug: "m-okafor",
    coverImage:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    coverAlt: "Abstract representation of machine learning systems",
    publishedAt: "2026-01-14",
    readingMinutes: 9,
    tags: ["RAG", "Evaluation", "LLMOps"],
    featured: true,
    body: `Most organisations we meet have already built an AI prototype. Far fewer have one in production. The gap is almost never model capability — it is the absence of a definition of "good enough" that everyone agreed on before the work started.

## The prototype trap

A demo is optimised for a handful of curated questions in a room full of supportive colleagues. Production is thousands of uncurated questions from people with real deadlines. The failure mode is predictable: the demo impresses, the pilot underwhelms, and the initiative quietly stops.

An evaluation harness closes that gap. It is unglamorous work, and it is the difference between a feature and a science project.

## What an evaluation harness actually contains

- **A golden dataset.** 300–1,000 representative inputs with expected outcomes, written by the people who do the work today, not by engineers.
- **Scoring functions.** Exact match where possible, structured rubric scoring where not, and human review sampling for the remainder.
- **Thresholds.** A number that must be met before release, agreed with the business owner in writing.
- **Cost and latency budgets.** Quality is meaningless if the answer takes nine seconds or costs more than the human it replaces.

## Run it in CI

Once the harness exists, it belongs in continuous integration. Every prompt change, retrieval tweak and model upgrade runs against the dataset and reports a delta. A change that improves one metric and quietly breaks another becomes visible in the pull request instead of in a customer complaint.

This is the single highest-leverage practice in applied AI, and it is almost always skipped.

## Grounding is an architectural decision

Retrieval-augmented generation is not a library you install. It is a set of trade-offs: chunking strategy, embedding model, hybrid search, reranking, permission filtering and citation. Each one has a measurable effect on accuracy, and each one should be justified by the evaluation numbers rather than by what appeared in a conference talk.

**A useful rule:** if the system cannot cite the source of a claim, it should not make the claim.

## Know when not to use a model

A surprising number of "AI problems" are better served by deterministic software. Structured extraction from consistent forms, routing rules, threshold alerts — all of these are cheaper, faster and auditable without a model. We routinely recommend removing the model from part of a pipeline, and the result is usually better on every metric that matters.

## What to do first

Pick one use case with clear value and available data. Build the evaluation harness before the feature. Measure a baseline. Only then start improving. If the numbers do not clear the bar within a few iterations, you have learned something valuable for a fraction of the cost of a failed rollout.`,
  },
  {
    slug: "strangler-pattern-in-practice",
    title: "The strangler pattern in practice: replatforming without a code freeze",
    excerpt:
      "Route-by-route migration behind an edge proxy let a 90,000-SKU storefront modernise while continuing to ship campaigns weekly.",
    categorySlug: "software-development",
    categoryName: "Software Development",
    authorSlug: "m-okafor",
    coverImage:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    coverAlt: "Developer working on system migration code",
    publishedAt: "2025-12-02",
    readingMinutes: 8,
    tags: ["Migration", "Architecture", "Next.js"],
    featured: false,
    body: `The default replatforming plan is: build the new system for a year, then switch. It fails often enough that it should require a written justification.

## Why big-bang migrations fail

Three reasons, consistently. Business change stops for the duration, so the organisation pays an opportunity cost that nobody puts in the business case. The new system accumulates a year of unvalidated assumptions. And the cutover concentrates all risk into a single evening.

## The alternative

Put a routing layer in front of both systems. Move one URL pattern at a time. Each move is small, measurable and instantly reversible.

- **Week 1:** proxy in place, 100% of traffic still to legacy. Nothing has changed except the ability to change.
- **Week 3:** one low-risk route — a content page — served by the new stack. Measure Core Web Vitals and errors.
- **Week 6 onwards:** progressively higher-value routes, each gated on conversion and performance metrics.

## What makes it work

**Contracts before code.** The new system talks to existing data through a documented, versioned interface. No shared database tables between old and new.

**Instant rollback.** Every route flip is a configuration change, not a deployment. Reverting takes seconds and requires no engineering judgement at 2am.

**Measurement per wave.** Conversion, error rate and field performance are compared per route before the next wave proceeds. This turns migration from an act of faith into an experiment.

## The honest costs

The strangler pattern is not free. You run two systems in parallel, which means two deployment pipelines and duplicate monitoring. Shared session and authentication state need careful design. Some teams find the intermediate state uncomfortable.

In our experience the trade is strongly worth it: the organisation keeps shipping, and the risk of the largest technical change in years is spread across months instead of concentrated in one night.`,
  },
  {
    slug: "threat-modelling-for-product-teams",
    title: "Threat modelling for product teams: one hour, four questions",
    excerpt:
      "Security review does not need a specialist in the room every time. A lightweight, repeatable session removes whole classes of vulnerability at design time.",
    categorySlug: "cybersecurity",
    categoryName: "Cybersecurity",
    authorSlug: "d-fischer",
    coverImage:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    coverAlt: "Abstract security and protection concept",
    publishedAt: "2025-11-08",
    readingMinutes: 7,
    tags: ["Threat modelling", "STRIDE", "Secure SDLC"],
    featured: false,
    body: `Threat modelling has a reputation for being heavyweight. It does not have to be. A focused hour at design time removes findings that would otherwise cost weeks after launch.

## The four questions

Adam Shostack's framing remains the most useful starting point:

- **What are we building?** A diagram on a whiteboard, showing data flows and trust boundaries. Fifteen minutes, no tooling.
- **What can go wrong?** Walk the boundaries with STRIDE prompts: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege.
- **What are we going to do about it?** Each credible threat becomes a backlog item, an accepted risk with a named owner, or an explicit non-goal.
- **Did we do a good job?** Revisit when the architecture changes materially.

## Where the value is concentrated

Trust boundaries. Almost every serious finding we see sits at a boundary: between authenticated and anonymous users, between tenants, between your system and a third party, between the control plane and the data plane. If time is short, walk only the boundaries.

## Common findings, design stage

**Authorisation scattered across handlers.** If permission checks live in twenty controllers, one will be wrong. Centralise the decision.

**Implicit tenant isolation.** Multi-tenant systems that rely on developers remembering a WHERE clause will leak. Enforce isolation at the data layer with row-level security.

**Unbounded operations.** Any endpoint that accepts a list, a page size or a file needs a limit, or it becomes a denial-of-service vector.

## Make it routine

The teams that get value from threat modelling are the ones that do it briefly and often, not thoroughly and rarely. Attach it to the design review that already exists, keep the model in the repository next to the code, and update it when the diagram changes.

**One hour per significant feature.** That is the whole investment.`,
  },
  {
    slug: "cloud-cost-is-an-architecture-problem",
    title: "Cloud cost is an architecture problem, not a procurement problem",
    excerpt:
      "Reserved instances and spot pricing help at the margin. Durable savings come from changing what the system does.",
    categorySlug: "cloud",
    categoryName: "Cloud",
    authorSlug: "r-mehta",
    coverImage:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    coverAlt: "Data centre infrastructure",
    publishedAt: "2025-10-21",
    readingMinutes: 6,
    tags: ["FinOps", "AWS", "Architecture"],
    featured: false,
    body: `When a cloud bill becomes a board topic, the first response is usually commercial: negotiate a commitment, buy reserved capacity, chase idle resources. That work is worth doing and it typically recovers 10–15%. Then the bill resumes growing, because nothing about the system changed.

## Where the money actually goes

In the engagements we audit, three patterns dominate:

- **Data transfer.** Cross-availability-zone and egress charges accumulated by chatty services that were never designed to be co-located.
- **Over-provisioned baseline.** Capacity sized for peak, running at peak twenty-four hours a day, because autoscaling was never trusted.
- **Storage without lifecycle.** Logs, snapshots and intermediate artefacts retained forever because no one owns the retention decision.

None of these are fixed by a pricing negotiation.

## Make cost a first-class metric

Cost per meaningful unit — per order, per tenant, per million events — is the number that matters. Absolute spend rising while unit cost falls is a healthy business. Absolute spend flat while unit cost rises is a problem hiding inside a plateau.

Tag everything, attribute cost to a team, and put unit cost on the same dashboard as latency and error rate.

## Architectural levers that actually move the number

**Move computation to where the data is.** A single query redesign has repeatedly saved us more than a year of instance right-sizing.

**Cache deliberately.** An edge cache with correct invalidation changes both the cost curve and the latency curve.

**Right-size the storage tier.** Time-series data in a general-purpose relational database is expensive twice: in storage and in the compute needed to query it.

**Delete things.** Retention policies are the cheapest optimisation available and the most frequently deferred.

## Governance that lasts

Set a budget alert per service with a named owner. Review unit cost quarterly alongside reliability. Require a cost estimate in architecture decision records. None of this is sophisticated — it just has to be somebody's job.`,
  },
  {
    slug: "designing-information-dense-interfaces",
    title: "Designing for people who use your product eight hours a day",
    excerpt:
      "Consumer design patterns actively harm operational software. What changes when the user is an expert with a queue to clear.",
    categorySlug: "technology",
    categoryName: "Technology",
    authorSlug: "s-lindqvist",
    coverImage:
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    coverAlt: "Operational dashboard interface on multiple screens",
    publishedAt: "2025-09-30",
    readingMinutes: 7,
    tags: ["UX", "Design systems", "Enterprise"],
    featured: false,
    body: `A consumer app optimises for a first-time user who must succeed within thirty seconds. Operational software optimises for an expert who will perform the same task four hundred times this week. Applying the first set of patterns to the second context is the most common design failure we are asked to fix.

## What expert users need

- **Density.** Whitespace that feels generous on a marketing page means scrolling for someone comparing forty records. Show more, structured well.
- **Keyboard paths.** If a task is repeated hourly, it needs a keyboard route. Mouse-only workflows have a measurable throughput cost.
- **Visible system state.** Saving, queued, synced, failed, stale. Ambiguity forces users to verify manually, which is where trust erodes.
- **Stable layout.** Elements that move between records break muscle memory. Predictability beats elegance.

## Progressive disclosure, not hidden complexity

Experts need the complex controls. The mistake is hiding them behind ambiguous icons. Group by task frequency: the daily actions are immediately visible, the weekly ones are one interaction away, the rare ones live in a clearly labelled place. Nothing is removed — it is ordered.

## Measure the right thing

Task completion time and error rate, on real data volumes, with real users. Satisfaction surveys will not surface the fact that your table renders forty rows when the user works in batches of two hundred.

**A practical benchmark:** if a trained user cannot complete the core task without reaching for the mouse or re-reading a label, the design is not finished.

## Systems, not screens

Operational products grow to hundreds of views. Without tokens and a shared component library, each new view is a small negotiation about spacing, states and semantics. With a system, the twentieth view costs a fraction of the first — and accessibility work is done once, correctly, in the primitives.`,
  },
  {
    slug: "build-vs-buy-decision-framework",
    title: "Build versus buy: a decision framework that survives scrutiny",
    excerpt:
      "Both defaults are wrong. A structured comparison across five dimensions produces a decision you can defend to a board.",
    categorySlug: "business",
    categoryName: "Business",
    authorSlug: "m-okafor",
    coverImage:
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    coverAlt: "Business and technology leaders in a planning session",
    publishedAt: "2025-09-04",
    readingMinutes: 6,
    tags: ["Strategy", "Due diligence", "Architecture"],
    featured: false,
    body: `"Never build what you can buy" and "own your core" are both defensible slogans and both useless without context. A structured comparison takes an afternoon and produces a decision that holds up under questioning.

## Five dimensions

**1. Differentiation.** Does this capability affect how customers choose you? Building commodity functionality is a tax; buying differentiating functionality caps your ceiling.

**2. Fit.** Score the vendor against your genuine requirements, separating must-have from preference. A 70% fit usually means expensive customisation or process change — price both.

**3. Total cost over five years.** Licence plus implementation plus integration plus internal administration plus the cost of exit, against build plus maintenance plus opportunity cost. Five years, not one.

**4. Change velocity.** How often will this need to change, and who controls the queue? A vendor roadmap that does not include your requirement is a multi-year constraint.

**5. Exit cost.** What does it take to leave? Data export format, contractual terms, integration coupling. Never sign without knowing.

## The frequently missed option

Buy the commodity, build the differentiator, and invest properly in the integration layer between them. Most systems that we see fail were architected as an all-or-nothing choice, when the durable answer was a clean boundary and an anti-corruption layer.

## Write it down

Whatever you decide, record it as an architecture decision record: the options, the scoring, the assumptions and the trigger conditions that would cause a review. In three years, when someone asks why, the reasoning will be there — and the trigger conditions will tell you whether the decision is still valid.`,
  },
];

export const getBlogSlugs = () => blogPosts.map((p) => p.slug);
