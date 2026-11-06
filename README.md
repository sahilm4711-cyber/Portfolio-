# Professor — Portfolio

A premium static portfolio for **Professor, Aspiring Red Team Professional**,
built from the `universal_portfolio_prompt.md` master prompt in Google Drive.

Design language inspired by touquirakhtar.com (look/feel only — no copied
source code or content). Colours: near-black `#090909`, off-white `#f2efeb`,
red accent `#e32b3c`. Fonts: Anton (display), Manrope (body), Caveat (accent).

## What was built

- React 19 + Vite, JavaScript/JSX, Framer Motion 12, Lucide icons, vanilla CSS
- Sticky navigation with scroll-progress bar and a Motion On/Off toggle
- Hero with name, profession, tagline, availability and location
- Selected Work with category filter + live search (5 projects)
- Skills / About — skills shown honestly as Learning / Building, not expert
- Learning Journey timeline — a learning timeline, **not** a work history
- Contact — GitHub only
- Footer
- Hero profile visual is now the user's own picture
  (`public/hero.jpg`) — anime face, half shattering with a glowing
  orange eye. The user said "First one is I am". It replaces the
  generic mask illustration as the hero picture.
- A second user picture (`public/one-target.jpg`) — eye with a red
  target crosshair, "ONE TARGET" — is shown in a "One target" Focus
  banner between Skills/About and Learning Journey, captioned
  "One target — learn red team, one honest step at a time."
  No hackathon/job/award text was invented for it.
- The old mask illustration (`public/mask.svg`) is still in the
  folder but is no longer referenced by the site.
- Hackathons: shown only as **Hackathon Participant ×2** (hero stats +
  About). No hackathon names, dates, places or results are listed —
  they are not known, do not invent them.
- Responsive 320px–1920px+, reduced-motion support

## Content rules (do not break these)

- No real name anywhere. Display name is **Professor** only.
- No education details, no email, no phone, no LinkedIn, no WhatsApp.
- No invented employers, jobs, clients, awards, testimonials or certificates.
- Contact is GitHub only: https://github.com/sahilm4711-cyber
- Only 3 projects link to GitHub (Roadmap, RedTeam-Project, Recon-app).
  SafeWeb Lab Scanner and TaskFlow are shown as **In progress with no link**,
  because they are not on GitHub yet. Do not add a fake URL for them.

## File layout

```
portfolio/
├── index.html          # title, meta, Google Fonts
├── package.json        # react 19, framer-motion 12, lucide-react
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx        # React entry
    ├── App.jsx         # nav, hero, work, skills, journey, contact, footer
    ├── config.js       # *** EDIT CONTENT HERE ***
    ├── index.css       # all styling, colours, responsive rules
    └── assets/         # unused Vite template images
```

## Run locally

```bash
cd portfolio
npm install
npm run dev      # open http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

Node v24 / npm 10 were used for the first build.

## How to change things

All content lives in **`src/config.js`** — edit that one file, no code needed:

| Change | Where in `src/config.js` |
| --- | --- |
| Name, tagline, intro, location, availability | `profile` |
| GitHub link | `profile.github` |
| Add / edit a project | `projects` — set `link: null` for in-progress work with no URL |
| Skills | `skills` — keep `level` honest: Learning / Building |
| Timeline | `journey` — learning milestones only, no fake jobs |

Colours: edit the variables at the top of `src/index.css`
(`--bg`, `--text`, `--red`). Fonts: edit the Google Fonts link in `index.html`.

## GitHub push — NOT done yet

This build is local only, in Spark's workspace. Nothing was pushed,
no repo was created, nothing was deployed.

Before any push, the user must separately approve:
1. The exact repo name (suggested: `Portfolio`, or
   `sahilm4711-cyber.github.io` for a live GitHub Pages site).
2. Public vs private.

After approval, the push package is this folder (excluding `node_modules/`
and `dist/` — see `.gitignore`).

### ⚠️ Binary-image limitation — read before pushing

`public/hero.jpg` (67K) and `public/one-target.jpg` (31K) are binary
JPG files. The GitHub `push_files` route used for earlier pushes
accepts UTF-8 text only, so those two images **cannot be pushed that
way**. Do not try to push them via that route — it will fail or corrupt
them. To get them onto GitHub, use a normal git push from a local
checkout, the GitHub website upload, or another binary-capable route.
Until the images are uploaded that way, the live site would show a
broken hero / Focus image even if the text files push fine. The
originals are untouched at `~/workspace/user/files/659_0_m9b8.jpg`
(hero) and `~/workspace/user/files/660_1_uceb.jpg` (One Target).
