# BlueInventory

Inventory management software for teams that need a clear picture of stock, locations, and customer support in one place.

Local development runs on [http://localhost:8080](http://localhost:8080).

## Purpose

BlueInventory helps businesses track inventory without spreadsheets or extra hardware. Operators can record stock, keep documents on file, and answer customer questions from company policy.

The product is a Next.js web application with a public marketing site, a signed-in dashboard, a document library, and a help desk that replies from uploaded handbooks and policies.

## Mission

Give small and growing teams a practical way to:

- keep stock counts, values, and categories in one workspace
- store company documents used for day-to-day support
- answer customer enquiries from those records
- review support volume and choose a plan that matches usage

## Vision

Become the inventory workspace companies trust for operations and customer support: simple enough for a single location, ready to grow across sites, and clear enough that staff do not need a separate knowledge tool.

## What runs locally today

- Public site with a BlueInventory fallback when the CMS is offline
- Dashboard inventory table (local file store)
- Media library and settings profile (local)
- Help Desk, Library, Reports, and Plans
- Server-side support replies from company documents

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Stack

- Next.js 14 (Pages Router) on port 8080
- React 18, TypeScript, Tailwind CSS 3, Sass
- Framer Motion
- Optional: Firebase, Stripe, WordPress GraphQL, Gemini (server only)

## Screenshots

<img src="public/img/screenshots/BlueInventory-Inventory-Management-Software (6).jpg" width="1080px" height="800px">
<img src="public/img/screenshots/BlueInventory-Inventory-Management-Software (8).jpg" width="1080px" height="1080px">
