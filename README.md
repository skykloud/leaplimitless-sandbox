# Leap Limitless (leaplimitless.com)

Executive, Career, and Life Coaching practice website for **Gagan Sharma, ICF-ACC**.

Built with modern semantic HTML5, Vanilla CSS, and lightweight JavaScript. Hosted via GitHub Pages with custom domain mapping (`leaplimitless.com`).

---

## Live Environments & URLs

- **Live Staging / Sandbox Preview:** [https://leaplimitless.com/sandbox/](https://leaplimitless.com/sandbox/)
  - Always accessible online on desktop, tablet, and mobile.
  - Automatically synced when changes are staged.
- **Dedicated Subdomain Option:** [https://sandbox.leaplimitless.com](https://sandbox.leaplimitless.com)
  - Pre-configured on GitHub Pages (`skykloud/leaplimitless-sandbox`).
  - Active once a CNAME DNS record is added in Cloudflare: `sandbox` -> `skykloud.github.io`.
- **Production Live Website:** [https://leaplimitless.com](https://leaplimitless.com)
  - Current status: Ready for promotion whenever you decide to publish.
- **Local Development Server:** `http://localhost:8080/`
  - Start command: `python3 -m http.server 8080`

---

## Branching & Release Workflow

This repository uses a two-branch workflow to separate daily development/sandbox work from the live production site:

```
[ sandbox branch ]  ---> Daily development, draft copy, experiments & staging
        |
        |  (promote when ready via ./promote.sh)
        v
[  main branch   ]  ---> Production / Published site (auto-deploys to leaplimitless.com)
```

### 1. Daily Development in `sandbox`
Always work on the `sandbox` branch.
```bash
# Check current branch
git branch

# Switch to sandbox (if not already there)
git checkout sandbox

# Stage and commit your changes
git add .
git commit -m "Describe your updates"

# Push to GitHub (automatically syncs both repositories)
git push origin sandbox
```

### 2. Local & Staging Preview
- **Local Preview:** `http://localhost:8080/`
- **Online Sandbox Preview:** `https://leaplimitless.com/sandbox/`

### 3. Promoting Changes to the Live Website
When your changes in `sandbox` are verified and ready to be published to `leaplimitless.com`:

**Option A (Automated 1-command promotion):**
```bash
./promote.sh
```

**Option B (Manual git commands):**
```bash
# 1. Ensure sandbox changes are committed and pushed
git checkout sandbox
git push origin sandbox

# 2. Switch to main and merge sandbox
git checkout main
git pull origin main
git merge sandbox -m "Promote: Release sandbox updates to live site"

# 3. Publish to live site
git push origin main

# 4. Return to sandbox for ongoing work
git checkout sandbox
```

---

## Project Structure

```
├── CNAME                   # Custom domain configuration (leaplimitless.com)
├── .gitignore              # Ignored files (archives, system caches, logs)
├── index.html              # Homepage with Hero, Focus Areas, Enterprise & Diagnostic
├── about.html              # About Gagan Sharma with ICF-ACC Credly verification
├── programs.html           # 6 Individual Journeys & 3 Enterprise Advisory Tracks
├── immigrant-playbook.html # Playbook for navigating Western corporate power dynamics
├── case-studies.html       # Verified client outcomes & transformation profiles
├── diagnostic.html         # Interactive 6-pillar leadership self-assessment
├── apply.html              # Confidential intake & calendar strategy consultation
├── promote.sh              # One-command promotion script from sandbox to main
├── assets/
│   └── images/             # Optimized portraits, ICF-ACC Credly badge, crest, hero assets
├── css/
│   ├── style.css           # Core typography, tokens, grid system & resets
│   ├── components.css      # Buttons, badges, cards, navigation, headers
│   └── pages.css           # Page-specific responsive layouts & interactive elements
└── js/
    ├── main.js             # Navigation drawers, scroll tracking, micro-interactions
    ├── diagnostic.js       # Scoring logic, archetype computation & dynamic results
    ├── booking.js          # Interactive calendar picker & confidential intake modal
    └── calculator.js       # Interactive career ROI & compensation estimator
```
