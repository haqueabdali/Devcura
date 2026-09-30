# Northbridge Systems — corporate IT company website

A production-grade, fully dynamic marketing and content platform for a software
engineering company: 17 public routes, a database-backed content layer, a
secured admin dashboard, server-side validated lead capture and full SEO
plumbing.

> **Brand placeholders.** Company name, logo, colours, contact details, client
> names, case-study figures and legal copy are clearly marked placeholders
> (`[PLACEHOLDER]`) and live entirely in `src/config/site.ts` and
> `src/content/*`. No copy is hard-coded in UI components.

---

## 1. Project overview

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| UI | React 19, Tailwind CSS v4, Framer Motion, Lucide icons |
| Database | PostgreSQL |
| ORM | **Drizzle ORM** (see note below) |
| Validation | Zod, server-side on every mutation |
| Auth | `jose` JWT in an httpOnly cookie + bcrypt hashes + CSRF token |
| SEO | Metadata API, canonical URLs, OG/Twitter, sitemap, robots, JSON-LD |

### Why Drizzle instead of Prisma

The original brief specified Prisma. This project targets a managed runtime
that bootstraps and migrates the database through Drizzle Kit; Prisma's binary
engine download breaks that build pipeline. Drizzle provides the same
type-safe, relational, migration-driven workflow. The repository layer in
`src/services/` isolates all ORM usage, so swapping ORMs (or moving to a
headless CMS) touches a handful of files and no UI code.

### Site map

```
/                       Home
/about                  Company, values, story, leadership, methodology
/services               Service catalogue
/services/[slug]        Dynamic service detail (8 services)
/industries             Industry index
/industries/[slug]      Dynamic industry detail (10 industries)
/projects               Case-study listing with live filtering
/projects/[slug]        Full case study (6 projects)
/technologies           Technology ecosystem with honest maturity ratings
/pricing                Engagement models + commercial FAQ
/insights               Blog with search + category filter
/insights/[slug]        Article with TOC, author, related posts
/careers                Open roles
/contact                Lead capture form
/privacy-policy /terms /cookie-policy
404 / error / loading   Handled globally

/admin                  Sign in
/admin/dashboard        Enquiry stats + content source overview
/admin/inquiries        Lead inbox (read + status updates)  ← fully functional
/admin/services|projects|industries|blog|testimonials|team   read-only listings
```

### Folder structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── (site)/           Public routes (shared nav/footer/CTA layout)
│   │   ├── admin/            Login + (panel) authenticated group
│   │   ├── api/              health · contact · admin/login · admin/logout · admin/inquiries
│   │   ├── layout.tsx  error.tsx  not-found.tsx  sitemap.ts  robots.ts  globals.css
│   ├── components/
│   │   ├── ui/               Primitives: button, section, motion, accordion, counter…
│   │   ├── layout/           Navbar, footer, logo, page header, CTA band
│   │   ├── sections/         Reusable page sections (services grid, timeline, carousel…)
│   │   ├── home/ projects/ blog/ contact/ legal/ admin/
│   ├── config/               site.ts (company data) · navigation.ts
│   ├── content/              Typed seed content: services, industries, projects, blog, company, legal
│   ├── db/                   index.ts (pool) · schema.ts (tables) · seed.ts
│   ├── lib/                  auth · validation · rate-limit · seo · markdown · mailer · utils
│   ├── services/             Repository layer (content · inquiries · admin)
│   └── types/                Shared content contracts
├── public/images/            og-default.jpg + replace-me asset locations
├── .env.example
└── drizzle.config.json
```

---

## 2. Requirements

- Node.js **20.x or newer** (22 LTS recommended)
- npm 10+
- PostgreSQL **14 or newer**
- Git

Check your versions:

```bash
node --version
npm --version
psql --version
```

---

## 3. Installation

Run every command below **from the project root**.

```bash
git clone <your-repository-url> northbridge-site
cd northbridge-site
npm install
```

---

## 4. Environment configuration

```bash
cp .env.example .env
```

Generate a strong auth secret (**project root**):

```bash
openssl rand -base64 48
```

Paste the result into `AUTH_SECRET`. Required variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `AUTH_SECRET` | yes (prod) | Signs admin session JWTs, min. 32 chars |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, OG tags, sitemap |
| `NEXT_PUBLIC_SITE_NAME` | no | Overrides the displayed company name |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | seed only | First administrator account |
| `CONTACT_EMAIL`, `SMTP_*` | no | Reserved for email delivery (not yet implemented) |

Never commit `.env`. It is ignored by Git.

---

## 5. Database setup

Create the database (**project root**, any shell with `psql` on PATH):

```bash
createdb app_db
# or:
psql -U postgres -c "CREATE DATABASE app_db;"
```

Verify connectivity:

```bash
psql "$DATABASE_URL" -c "select version();"
```

---

## 6. Schema migration

This project uses Drizzle Kit. From the **project root**:

```bash
# Push the schema in src/db/schema.ts straight to the database (fast, dev-friendly)
npx drizzle-kit push
```

For versioned migrations in a team or production setting:

```bash
npx drizzle-kit generate   # writes SQL migration files
npx drizzle-kit migrate    # applies pending migrations
```

Import the seed content and create the first administrator:

```bash
npx tsx src/db/seed.ts
```

The seed is **idempotent** — safe to re-run. Until it is run, every page still
renders from the typed seed content in `src/content/` (the repository layer
falls back automatically), but nothing is editable through the dashboard.

---

## 7. Development server

```bash
npm run dev
```

Open <http://localhost:3000>. Admin sign-in: <http://localhost:3000/admin>.

Useful checks while developing (**project root**):

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

---

## 8. Production build

```bash
npm run build
npm run start       # serves the production build on :3000
```

The build pre-renders every static route and ISR-caches the dynamic content
routes (`revalidate = 1800`–`3600`).

---

## 9. Production deployment (VPS / cloud server)

Tested shape: Ubuntu 22.04 + Node 22 + PostgreSQL 16 + nginx + PM2.

```bash
# 1. Provision
sudo apt update && sudo apt install -y nginx postgresql
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 2. Deploy the code
git clone <your-repository-url> /var/www/northbridge
cd /var/www/northbridge
npm ci
cp .env.example .env && nano .env          # fill in real values

# 3. Database
npx drizzle-kit migrate
npx tsx src/db/seed.ts

# 4. Build and run
npm run build
pm2 start npm --name northbridge -- run start
pm2 save && pm2 startup
```

Minimal nginx reverse proxy (`/etc/nginx/sites-available/northbridge`):

```nginx
server {
  server_name example.com www.example.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_cache_bypass $http_upgrade;
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/northbridge /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d example.com -d www.example.com   # TLS
```

`X-Forwarded-For` **must** be forwarded — the rate limiter uses it.

> **Scaling note.** The rate limiter in `src/lib/rate-limit.ts` is in-memory and
> therefore correct for a single Node process. Behind a load balancer, swap the
> `Map` for Redis; the function signature does not change.

---

## 10. Admin setup

1. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD` (min. 12 characters) and `ADMIN_NAME` in `.env`.
2. Run `npx tsx src/db/seed.ts` from the project root.
3. Sign in at `/admin`.

Security model:

- Passwords hashed with bcrypt (cost 12); plaintext is never stored or logged.
- Session = HS256 JWT in an `httpOnly`, `SameSite=Lax`, `Secure` (prod) cookie, 8-hour TTL.
- CSRF double-submit token on sign-in.
- Login rate-limited to 8 attempts per IP per 15 minutes; identical error text for unknown user and bad password (no account enumeration).
- Role hierarchy `admin > editor > viewer`, enforced in `hasRole()` and on the inquiry mutation endpoint.
- `/admin` and `/api` are disallowed in `robots.txt` and marked `noindex`.

### What is and is not implemented

| Feature | Status |
| --- | --- |
| Contact form → validation → PostgreSQL → admin inbox | ✅ working end to end |
| Enquiry status workflow (new/contacted/qualified/archived) | ✅ working |
| Admin authentication, sessions, roles, CSRF, rate limiting | ✅ working |
| Content served from DB with automatic seed fallback | ✅ working |
| Content **editing** forms in the dashboard | ⛔ not built — schema + repository layer are ready; listings are explicitly read-only |
| Email notification of new enquiries | ⛔ not implemented — `src/lib/mailer.ts` logs and returns `delivered: false`; wire up nodemailer + SMTP credentials |
| Analytics / cookie consent | ⛔ none configured (documented in the cookie policy) |
| Careers applications | ⛔ mailto links; connect an ATS or add an upload form |

Nothing above pretends to work. Placeholders are labelled in the UI itself.

---

## 11. Troubleshooting

**`DATABASE_URL is required` at startup**
`.env` is missing or not loaded. Confirm the file exists in the project root and restart the dev server.

**Pages render but the admin dashboard shows "seed content"**
The tables are empty. Run `npx drizzle-kit push` then `npx tsx src/db/seed.ts`.

**`AUTH_SECRET must be set…` when signing in**
Set a value of at least 32 characters in `.env` and restart. Development falls back to an insecure default only when `NODE_ENV !== "production"`.

**`ECONNREFUSED 127.0.0.1:5432`**
PostgreSQL is not running: `sudo systemctl start postgresql`.

**Contact form returns 503**
The database is unreachable. The API deliberately reports this rather than silently discarding the lead. Check `DATABASE_URL` and `GET /api/health`.

**429 on the contact form**
Rate limit reached (5 submissions per IP per 10 minutes). Wait, or raise the limit in `src/app/api/contact/route.ts`.

**Remote images fail to load**
Add the host to `images.remotePatterns` in `next.config.ts`.

**Type errors after editing content**
Content is fully typed by `src/types/content.ts`. Run `npm run typecheck` — the error points at the exact field.

---

## 12. Replacing the placeholders

| What | Where |
| --- | --- |
| Company name, addresses, phone, email, social | `src/config/site.ts` |
| Logo mark | `src/components/layout/logo.tsx` (+ `/public/images/logo.svg`) |
| Accent colour and type scale | `@theme` block in `src/app/globals.css` |
| Services, industries, projects, blog, team, testimonials | `src/content/*.ts` |
| Legal documents | `src/content/legal.ts` (**needs legal review**) |
| Case-study imagery | `Project.heroImage` / `screenshots` → `/public/images/projects/*.webp` |
| Default OG image | `/public/images/og-default.jpg` |

### Moving to a headless CMS

Re-implement the functions in `src/services/content.ts` against Sanity, Payload,
Strapi or WordPress. They already return the interfaces in
`src/types/content.ts`, and no component imports content directly, so the UI
requires no changes.
