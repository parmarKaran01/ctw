# CTW | Video Editor Portfolio

A modern, high-performance portfolio website for a professional video editor. Built with **Next.js 14** (App Router) and **Sanity CMS**, featuring a draggable video showcase, filterable gallery, pricing tiers, and seamless content management.

## Tech Stack

| | |
|---|---|
**Framework** | [Next.js 14](https://nextjs.org/) (App Router, RSC, ISR)
**CMS** | [Sanity](https://www.sanity.io/) (headless, with hosted Studio)
**Styling** | Tailwind CSS + CSS Modules
**Animation** | Framer Motion
**Fonts** | DM Serif Display / DM Sans via `next/font`
**Deployment** | Vercel (recommended)

## Features

- **Draggable video card stack** — swipe through featured work with pointer-driven physics
- **Filterable masonry gallery** — tag-based filtering + infinite-scroll lazy loading
- **Video lightbox** — full-screen YouTube/Vimeo embeds with keyboard dismissal
- **Tabbed pricing panel** — multi-tier pricing with dual CTAs (subscribe / book a call)
- **Scrolling testimonials marquee** — pause-on-hover quote carousel
- **Trusted-by brand strip** — client logo showcase with hover colorization
- **Cinematic hero background** — layered radial gradients + foreground grass image
- **On-demand ISR** — instant content updates via Sanity webhook + cache tag revalidation
- **Responsive** — mobile-first breakpoints at 768px

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_REVALIDATE_SECRET=your_secret
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layout
│   ├── page.tsx            # Home page (/)
│   ├── gallery/page.tsx    # Archive gallery (/gallery)
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── globals.css         # CSS variables, animations, resets
│   └── api/revalidate/     # ISR webhook endpoint
├── components/             # React components
│   ├── Nav.tsx             # Top navigation
│   ├── CardStack.tsx       # Draggable featured video cards
│   ├── MosaicGallery.tsx   # Filterable masonry archive gallery
│   ├── VideoLightbox.tsx   # Full-screen video embed overlay
│   ├── PricingPanel.tsx    # Tabbed pricing tiers
│   ├── HeroBackground.tsx  # Decorative hero backdrop
│   ├── TrustedBy.tsx       # Client brand logo strip
│   └── *.module.css        # Scoped component styles
├── sanity/                 # Sanity CMS integration
│   ├── client.ts           # Sanity client + typed fetch helper
│   ├── queries.ts          # GROQ queries + image URL builder
│   └── schemas/            # Document type definitions
│       ├── video.ts
│       ├── pricingTier.ts
│       ├── testimonial.ts
│       └── siteSettings.ts
└── types/
    └── sanity.ts           # TypeScript interfaces

studio/                     # Standalone Sanity Studio
├── package.json
├── sanity.config.ts
└── dist/                   # Built studio assets
```

## Sanity CMS

Content is managed through Sanity Studio (`studio/`). The CMS includes four document types:

- **Video** — title, subtitle, duration, tag, embed URL, thumbnail, featured flag
- **Pricing Tier** — label, name, price, turnaround, features, CTA label
- **Testimonial** — quote, avatar image
- **Site Settings** — singleton with brand name, tagline, hero text, trusted brands, Calendly link

### Content Updates

After updating content in Sanity Studio, changes go live instantly via the on-demand ISR webhook. Configure a Sanity webhook pointing to `https://yourdomain.com/api/revalidate` with your `SANITY_REVALIDATE_SECRET`.

## Deployment

Deploy to [Vercel](https://vercel.com/) with zero configuration:

```bash
npx vercel
```

Set the four environment variables in your Vercel project dashboard. Deploy the Sanity Studio separately via `npx sanity deploy` from the `studio/` directory.
