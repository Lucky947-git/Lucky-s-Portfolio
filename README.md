# Lucky Diwakar — Portfolio

A dark, animated developer portfolio built with **vanilla HTML, CSS and JavaScript** —
black + crimson red theme, glassmorphism cards, an animated particle background,
a typewriter effect, scroll reveal animations, a scroll progress bar, and a mouse glow effect.
No frameworks, no build step.

## Structure

```
Portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── icons/
│   └── images/
└── README.md
```

## Customize

1. **Name / role** — edit the hero section text in `index.html`.
2. **Typewriter phrases** — edit the `phrases` array near the top of `script.js`.
3. **Skills** — edit the cards inside `<section id="skills">` in `index.html`.
4. **Projects** — edit `<section id="projects">`; add your real repo links and descriptions.
5. **GitHub stats** — the username `lucky947-git` is already wired into the stats images in
   `<section id="stats">`. If the images don't load, they hide automatically.
6. **Colors** — all colors are CSS variables at the top of `style.css` (`:root { ... }`),
   so you can retheme the whole site by changing a handful of values.
7. **Social links** — update the GitHub, LinkedIn and email links (there are a few places:
   hero, contact section, footer).

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `Portfolio`).
2. Upload these files: `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder.
3. Commit the changes.
4. Go to **Settings → Pages**.
5. Under **Source**, choose **Deploy from a branch**.
6. Set **Branch** to `main` and folder to `/(root)`, then **Save**.
7. Wait 1–3 minutes, then refresh the Pages settings page — your live link will appear at the top,
   something like:
   `https://<your-username>.github.io/Portfolio/`

## Notes

- Everything is self-contained — no external JS libraries are required, so there's nothing that
  can fail to load from a CDN.
- Google Fonts (`Space Grotesk`, `JetBrains Mono`) load from `fonts.googleapis.com`.
- The GitHub stats images come from `github-readme-stats.vercel.app` and will automatically hide
  if that service is unreachable.
- Respects `prefers-reduced-motion` for visitors who've asked their OS to reduce animation.
