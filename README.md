# BoardBid.ai — Programmatic DOOH & Digital Billboard Advertising

BoardBid.ai is a modern Demand-Side Platform (DSP) designed for ambitious startups and growing brands to plan, book, and launch digital billboard campaigns with real-time pricing, AI-powered strategy, and zero agency friction.

> ⚡ Built with React, Vite, and Tailwind CSS  
> 🌐 Deployed via Cloudflare Pages  
> 🎯 Campaign Engine Integration coming soon!

---

## 🚀 Features

- ✨ Smooth one-page scroll experience with sticky header and animations
- 🎯 Hero section with animated CTA and Lottie scroll-down indicator
- 🧩 Modular React components (Hero, How It Works, Dashboard Preview, etc.)
- 📱 Responsive Tailwind styling and Inter font
- 🛠️ Setup for fast API integration (Campaigns, SSP inventory, Uploads)
- 🧪 Optimized for performance and SEO

---

## 🧱 Tech Stack

- **React 18** — Component-based SPA
- **Vite** — Lightning-fast dev server and build tool
- **Tailwind CSS 3** — Utility-first styling
- **React Router** — Route navigation (`/`, `/login`, `/sign-up`, `/account`)
- **Lottie** — Scroll animations
- **Cloudflare Pages** — Free static hosting & CDN

---

## 📦 Project Structure

boardbid-ui/
├── public/ # Favicon, 404, robots.txt
├── src/
│ ├── components/ # All page sections as components
│ ├── pages/ # Home, auth pages, etc.
│ ├── App.jsx # Main routing logic
│ ├── main.jsx # Vite entry point
│ └── index.css # Tailwind CSS directives
├── index.html # Vite template
├── vite.config.js # Vite build config
├── tailwind.config.js # Tailwind customizations
├── postcss.config.js # Required for Tailwind
└── README.md # This file

---

## 🔧 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

---

## 🛠 Maintenance Mode Toggle

The main site now reads a lightweight runtime config from [`public/app-config.json`](public/app-config.json). Update the
`maintenanceMode` boolean in that file to switch between the full application and the maintenance splash screen—no rebuild
required:

- `true` &rarr; Serve the upgrades-in-progress message to all visitors.
- `false` &rarr; Load the full React application as usual.

You can also customise the maintenance copy, headline, and preview metadata in the same JSON file if you need to adjust the
messaging while the site is offline.

## 🔐 Authentication

This project uses [Clerk](https://clerk.com/docs/quickstarts/react) for user management. Provide both development and production publishable keys in your `.env`:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_aW50ZW5zZS1zY29ycGlvbi00Ny5jbGVyay5hY2NvdW50cy5kZXYk
VITE_CLERK_PUBLISHABLE_KEY_PROD=pk_live_Y2xlcmsuYm9hcmRiaWQuYWkk
```

At runtime the app loads the production key only when served from `boardbid.ai` or its subdomains. All other origins, including `localhost` and the GitHub Pages demo, use the development key.

Authenticated users can access dashboards, campaign tools, and manage their profile on `/account`.


