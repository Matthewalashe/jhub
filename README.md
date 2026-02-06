# jhub/
  apps/
    web/                 # Astro SEO website (Jobs-first)
      src/
        components/
        layouts/
        pages/
        lib/
      public/
      astro.config.mjs
      package.json

    app/                 # React + Vite (future /app)
      src/
      index.html
      vite.config.ts
      package.json

  backend/
    pocketbase/          # PocketBase binary + pb_data/
      pb_data/           # DB lives here (server-side only)
      pb_migrations/     # (optional later)

  docs/
  .gitignore
  README.md
