# Morrow Café — ₹150 QR Campaign

A focused QR-code campaign microsite for Morrow Café (Sector 104, Noida): scan → understand the offer → see the atmosphere → claim ₹150 off → receive a claim code.

## 1. What was built
One page: masthead, art-directed hero, "Good Coffee. Slow Moments." editorial section, a ₹150 offer climax, and a claim form with loading, error and success states (copy-to-clipboard included). No menu, accounts, reviews or CMS.

## 2. Product objective
A visitor should know within seconds what the offer is (₹150 off next visit), and complete the claim in two fields.

## 3. Design direction
"Editorial café luxury meets natural minimalism." Warm off-white base (#F5F1E8), coffee (#6B4A35), near-black (#171512), muted olive (#59634A, foliage and success accents only). Typography carries the page; photography supports it. No dot grids or repeating textures. Fonts: Coolvetica (display: ₹150, OFF, headlines, claim code) + Poppins (400/500/600 for all supporting copy and UI).

> **Font note:** Coolvetica is licensed, so it is not bundled. Place `Coolvetica.woff2` in `public/fonts/`. Until then the display stack falls back to Helvetica Neue / Arial.

## 4. Stack
React 18 · JavaScript/JSX · Vite 5 · Tailwind CSS 3 · Anime.js 3 · Framer Motion 11 · `@fontsource/poppins` (self-hosted, weights 400/500/600 only).

## 5. Why React + JS + Vite + Tailwind
React gives clean state handling for the form's states; Vite gives instant dev and small production bundles; Tailwind keeps tokens (colours, fonts) in one config and ships only used CSS. Plain JS keeps the code easy to walk through.

## 6. Why Anime.js
Owns the hero timeline: entrance choreography, leaf sway, coffee bob, rising steam. It handles timelines and stagger well and is small.

## 7. Why Framer Motion
Owns declarative UI motion: viewport reveals, scroll-linked parallax (hero layers, offer section), and the form ↔ error ↔ success transition (`AnimatePresence`).

**Rule:** the two never write to the same element. Framer animates outer wrapper `div`s; Anime.js animates the inner `data-hero` / `data-float` nodes.

## 8. API / mock approach
`src/services/claimApi.js` implements the `POST /api/claim` contract and mocks it (1.4 s latency, code like `MORROW-7F2K` from an unambiguous alphabet). Add `?claim=error` to the URL to force the error state. Set `VITE_USE_MOCK_API=false` to call a real `/api/claim`; the UI does not change.

## 9. Key technical decisions
- Form state machine: `idle → loading → success | error`; retry keeps the entered values.
- A `useRef` in-flight guard plus a disabled button prevents duplicate submits (state updates are async, double-taps are not).
- Phone input normalises pasted `+91…`/`0…` numbers, then validates `^[6-9]\d{9}$` and rejects repeated digits.
- Foliage is inline SVG generated from a small component: no image requests, consistent palette.
- Content limited to what the brief supplied. Hours, address, legal entity and SMS claims that appear in the Stitch mock were left out.
- The hero uses the interior photo (per the Stitch screen) with a round crop of the coffee photo as a foreground object; the editorial section uses the coffee photo at a different crop.

## 10. Responsive strategy
Mobile-first (375/390/430). Mobile order is copy → CTA → visual, so the offer and CTA sit in the first viewport. From `lg`, a 12-column asymmetric layout places type and photo in distinct planes; the editorial photo is offset lower for rhythm. Foliage offsets stay within page padding, and sections use `overflow-x-clip`.

## 11. Accessibility
Semantic landmarks and one `h1`; real `<label>`s; `aria-invalid` + `aria-describedby` errors and focus on the first invalid field; focus moves to the heading on error/success; `role="status"` for loading, success and copy feedback; skip link; visible focus ring; `tel` + `inputMode`, `autocomplete="name"`/`"tel"`; zoom not disabled; `prefers-reduced-motion` disables Anime.js and parallax and reduces reveals.

## 12. Performance
Only two runtime animation libraries; images converted to WebP (hero `fetchpriority="high"`, below-fold `loading="lazy"`, explicit width/height); transform/opacity-only animation; ambient loops pause when the hero is off-screen; self-hosted font; no Tailwind CDN.

## 13. Lighthouse observations
**Not yet run.** Run `npm run build && npm run preview`, then Lighthouse (mobile) and record: scores found, what was fixed, what was left alone.
Things to check first: source photos are ~510 px wide, so large desktop crops may look soft (swap in higher-res originals); the Coolvetica font file if added.

## 14. Cut for scope
Real backend, analytics, higher-resolution/responsive `srcset` images, automated tests.

## 15. Production improvements
Real API with server-side validation, higher-res image set with `srcset`, self-hosted Coolvetica, e2e tests (Playwright), analytics on claim funnel.

## 16. Product Thinking — Decision 1: Above the fold
On a 390×844 phone the first viewport shows the masthead, the eyebrow line, a very large ₹150 with OFF / YOUR NEXT VISIT, a one-line explanation and the full-width "Claim ₹150 off" button; the photo starts just below. The offer and the action come first because a QR visitor is standing in or near the café and needs to grasp the deal in a glance; the photograph builds desire but must not compete with it.

## 17. Product Thinking — Decision 2: Beyond the happy path
- **Duplicate claims / abuse:** the server should be the source of truth: one active code per verified phone number (unique index), plus rate limiting per IP/device and a bot check (invisible CAPTCHA/Turnstile) on `/api/claim`. Verifying the phone with an OTP would stop fake numbers, at some conversion cost.
- **API failures / retries:** the client already shows a recoverable error and keeps input; in production add an idempotency key so a retry after a timeout returns the same code instead of issuing a second one, and exponential backoff for transient 5xx.
- **Campaign expiry / code invalidation:** store `expiresAt` and `redeemedAt` with each code; the café staff check codes server-side, and the site shows a "campaign ended" state once the flag flips, with no redeploy.
- **Monitoring:** track claim success/failure rate and latency, with alerts when the error rate spikes.

## 18. Time spent
Approx 1.5 - 2.5 Hours 
## 19. Deployment
```bash
npm install
npm run dev       # local
npm run build     # production build -> dist/
npm run preview
```
Vercel: import the repo (framework preset "Vite"); no environment variables are needed for the mock API.
