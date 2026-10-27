# web/

ADR-0016 Next.js/React rebuild foundation. File-based content, no database.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS 3.4 + Radix primitives (shadcn pattern)
- KaTeX for live math rendering (never image equations)
- IBM Plex Sans via next/font/google
- js-yaml for items.yaml parsing

## Content

Notions live at `content/<subject>/<slug>/` (sibling of this directory).
The app reads them from the filesystem at build/render time via server
components. Nothing fetches from Supabase.

URL shape: `/notions/<subject>/<slug>`

## Running locally

```
npm install
npm run dev
```

Build for production verification (not deployment — deployment is human-gated per ADR-0016):

```
npm run build
```
