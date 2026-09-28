# AI Usage

## Tools used
Claude (Anthropic, claude.ai chat) generated the project source, configuration and docs from my written brief and the Stitch/Prozpekt reference images.

## What I used AI for
Scaffolding the React/Vite/Tailwind project, translating the Stitch screen into components, the Anime.js hero timeline, Framer Motion transitions, form validation and mock API, image conversion to WebP, and drafting README.md.

## One useful thing AI helped with
Structuring motion so Anime.js and Framer Motion never touch the same element (Framer on outer wrappers, Anime.js on inner `data-hero`/`data-float` nodes), plus the synchronous in-flight guard against double submits.

## One thing AI got wrong or that I changed
_Fill in honestly after your review._ Known point to check: the Stitch mock contains invented details (opening hours, address, legal entity, SMS notice); these were deliberately removed to follow the brief.

## What I personally reviewed
_Fill in honestly._ Suggested checklist: run `npm install && npm run build`, test every form state at 375/390/430/desktop, keyboard and screen-reader pass, reduced-motion, Lighthouse, and a visual comparison with the Stitch screen.
