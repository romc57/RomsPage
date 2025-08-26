# Rom Cohen – Professional Portfolio

A modern, fast, accessible, fully responsive (mobile / tablet breakpoint at 1024px) portfolio showcasing professional experience, projects, skills and GitHub activity. Light mode is the default experience with a smooth theme toggle for dark mode.

## Live Demo
https://romc57.github.io/RomsPage/


## Tech Stack
- HTML5 semantic structure
- Modular CSS (BEM‑style utility + component layers)
  - `css/base.css` (variables, resets, typography)
  - `css/layout.css` (section layouts & grids)
  - `css/components.css` (cards, buttons, forms, tooltips)
  - `css/navigation.css` (navbar, menu, theme toggle)
  - `css/responsive.css` (breakpoint adjustments @ 1024px)
- Vanilla JavaScript modules
  - `js/app.js` (theme init & persistence)
  - `js/navigation.js` (scroll / active link / mobile menu)
  - `js/github-stats.js` (fetch + render GitHub metrics, adaptive colors)
  - `js/animations.js`, `js/utils.js`, `js/contact.js` (progressive enhancements)
- Optional lightweight Node/CORS helpers (`server.js`, `cors-server.js`) for local API testing

## Key Features
- Default Light Mode with early, no‑flash theme application
- Accessible Theme Toggle (sun / moon icon, ARIA labels, persisted in localStorage)
- Refined Navbar (scroll awareness, smooth color transitions, logical tab order)
- Bold “Rom Cohen” logo with subtle border in light mode for contrast
- GitHub Stats section with emphasized labels & improved green contrast
- Responsive layout (single breakpoint @ 1024px + fluid spacing) optimized for real device widths
- Performance focused: minimal blocking resources, modular CSS, deferred non‑critical JS
- SEO & share‑ready structure (easily extendable with meta / Open Graph tags)
- Clean animations kept subtle to preserve performance & reduce motion fatigue

## Accessibility
- Semantic landmarks: header, nav, main, section, footer
- High‑contrast color pairs checked in both themes
- Focus outlines preserved & visible
- Reduced motion friendly (animations are short & non essential)
- ARIA attributes on interactive custom controls (theme toggle, mobile menu)

## Performance Practices
- Early inline theme script prevents flash of incorrect theme
- Critical CSS split logically; avoid heavy frameworks
- Optimized image usage (recommend WebP / modern formats for production)
- Lazy fetch of GitHub stats

## File / Directory Overview
```
index.html          # Main document
main.css            # (Legacy / global root include if still referenced)
css/                # Modular style layers
js/                 # Feature scripts
profile-photo.jpg   # Hero/profile asset
rom-cohen-profile.jpg
server.js / cors-server.js # Optional local server utilities
theme-test.js       # Theme experimentation (dev only)
```

## Theming System
- CSS Custom Properties defined in `css/base.css`
- Document attribute `[data-theme="dark"]` toggled
- JS: `js/app.js` sets initial theme (prefers stored choice; falls back to light)
- To add a new theme: extend variable set, apply `[data-theme="new"]` selector, update toggle logic

## GitHub Stats
`js/github-stats.js` fetches public data and styles values:
- Emphasized labels & darker green tone in light mode for readability
- Update the GitHub username inside the script to personalize
- Consider caching if hitting rate limits (unauthenticated API has low quota)

## Responsive Strategy
- Single main breakpoint at 1024px controlling navigation layout, grids, spacing & font scaling
- Mobile-first base, enhancements applied above breakpoint

## Getting Started
1. Clone repository:
   ```bash
   git clone https://github.com/your-username/rom-portfolio.git
   cd rom-portfolio
   ```
2. Open `index.html` directly in a browser OR start a simple server:
   ```bash
   # Python
   python -m http.server 8000

   # Node (install serve globally if needed)
   npx serve .
   ```
3. (Optional) If testing APIs that require CORS adjustments, run `node cors-server.js`.

## Deployment
### GitHub Pages
- Push to `main`, enable Pages (Settings → Pages → Deploy from branch, root)
### Netlify / Vercel
- Import repo → buildless static deploy (no build command needed)
### Firebase / Other
- Serve as static hosting; no server-side code required

## Customization Checklist
Update in `index.html` unless noted.
- Hero: name, title, CTA links
- About: bio, stats numbers
- Experience: timeline entries
- Projects: cards (title, description, tech stack, live/GitHub links, images)
- Skills: group & order relevant technologies
- Contact: email address (and phone/location if desired)
- Social links: GitHub, LinkedIn, X, etc.
- GitHub username in `js/github-stats.js`
- Colors: adjust CSS variables in `css/base.css`
- Fonts: swap Google Font link in `<head>` (update font-family stack)
- Images: replace `profile-photo.jpg`, project screenshots

## Contact Form Integration (Production Options)
- Formspree
- Netlify Forms
- EmailJS
- Custom backend (Node/PHP) – connect via fetch and progressive enhancement
(Current placeholder simply shows an alert.)

## SEO & Metadata Quick Wins
Add / configure:
- `<meta name="description" ...>`
- Open Graph & Twitter Card tags
- `sitemap.xml` + `robots.txt`
- Structured data (JSON-LD) for Person / WebSite
- Analytics (e.g. plausible, GA4) loaded defer/async

## Future Enhancements (Optional)
- Project filtering by tech tags
- Light/dark system preference sync (opt-in)
- Service Worker for offline shell
- Skeleton loading for stats
- Reduced motion media query refinement

## License
MIT (add a LICENSE file if not already present).

## Support / Questions
Open an issue or reach out for guidance customizing or extending the portfolio.

---
Crafted with a focus on clarity, performance, and maintainability.
