# Jhub

> Build your profile once. Apply to anything, anywhere, in minutes.

**Jhub** is a career & opportunity platform built for African professionals. It solves the gap between finding an opportunity and actually applying to it well — with globally-standard CVs, tailored cover letters, and a curated job board, all in one place.

🌍 **Free for job seekers, always.**

---

## Features

### 🏗️ Build — Master Profile & CV Builder
- Fill in your details **once** — experience, skills, education, certifications
- Generate **pixel-perfect, ATS-friendly CVs** as downloadable PDFs
- **Global Standard** template (EU, American, AU, ECOWAS templates coming soon)
- Profile auto-saved to localStorage — works offline after first load

### 📬 Apply — End-to-End Application Flow
- Browse curated job listings from Nigeria's top companies
- Generate **tailored cover letters** with profile pre-fill + 1,500-character cap
- **One-click apply** via mailto — cover letter auto-copied to clipboard
- WhatsApp share button on every listing

### 🔍 Discover — Opportunities Board
- Scholarships, courses, training programmes, and tech events
- Filterable by category — all in one unified feed
- External apply links to providers

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v3 |
| State | Zustand (persist to localStorage) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Animations | Framer Motion + CSS |
| CV PDF | react-to-print (browser-native print) |
| Fonts | Playfair Display, DM Sans, DM Mono |

### Design Language
**Bauhaus × Brutalist × Glassmorphism** — bold geometric shapes, stark 2px borders with offset shadows, frosted glass effects, and a curated palette of deep forest green + warm amber.

---

## Project Structure

```
apps/web/src/
├── components/
│   ├── layout/          # Navbar, Footer, MobileBottomNav, PageWrapper
│   ├── home/            # Hero, HowItWorks, TemplateShowcase, JobsTeaser
│   ├── jobs/            # JobCard
│   ├── cv-templates/    # GlobalCVTemplate
│   ├── common/          # Badge, ProgressBar, SkeletonCard, Toast
│   └── cover-letter/    # (editor components)
├── pages/               # All route pages
├── store/               # Zustand stores (profile, UI)
├── data/                # Seed data (jobs, scholarships, courses, events)
├── lib/                 # Utilities (mailto, coverLetter, utils)
├── types/               # TypeScript interfaces
└── styles/              # Global CSS + print styles
```

---

## Getting Started

```bash
# Install dependencies
cd apps/web
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

Deployed on **Vercel**. The `vercel.json` at the repo root handles:
- Build command pointing to `apps/web`
- SPA client-side routing rewrites
- Static asset serving from `apps/web/dist`

---

## Roadmap

- [x] **Phase 1 — MVP**: Profile builder, Global CV template, cover letter generator, job board, opportunities, mailto flow
- [ ] **Phase 2 — Expand**: All 5 CV templates, user accounts (Supabase Auth), employer job posting, application history
- [ ] **Phase 3 — Monetise**: Boosted listings, WhatsApp broadcasts, affiliate partnerships
- [ ] **Phase 4 — GROW**: Career services marketplace (CV reviews, coaching, mock interviews)

---

## Philosophy

- **Profile once, apply everywhere** — reduce repetitive effort to zero
- **Simplicity over features** — every addition must serve the core flow
- **Speed as a feature** — every second removed is value delivered
- **Free for job seekers, always** — the people who need help most should never pay
- **Mobile-first, always** — if it doesn't work on a mid-range Android on 4G, it doesn't ship

---

## License

MIT

---

Built with ❤️ in Lagos, Nigeria 🇳🇬
