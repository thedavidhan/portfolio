# davidhan.site — how this works

One-page portfolio. Plain HTML/CSS/JS — no build step, no dependencies to install.

## Preview it right now
Double-click `index.html`. That's it. (The map + fonts need internet.)

## Add photos/videos (the folder system)
1. Drop files into the auto-scanned folders — `assets/cars/`, `assets/vending/`,
   `assets/climbing/`, `assets/buildings/`, `assets/lighting/`, `assets/travel/<place>/`
2. Double-click **`SYNC-ASSETS.bat`**
3. Refresh the page (Ctrl+Shift+R)

Full folder guide + the named one-off slots (hero photo, car reel, BUC volumes):
`assets/README.md`. After deploying, re-drag the folder to Vercel (or git push) to
put new files live.

## Edit anything
- **All copy, numbers, links, places, books** → `content.js` (labeled by section)
- You should never need to touch `index.html`, `styles.css`, or `main.js`

Quick switches in `content.js`:
- `heroElement: "clock"` — change to `"counter"` or `"cursor"` to swap the hero's one interactive element
- `formspreeId: ""` — see below
- Social URLs marked `TODO`

## Deploy to Vercel (5 minutes)
**Easiest:** go to [vercel.com/new](https://vercel.com/new) → drag the `site` folder onto the page → done, you get a live URL.

**Better (version history):** push this folder to a GitHub repo → "Import Project" in Vercel → every git push auto-deploys. When you buy a domain (davidhan.com?), add it in Vercel → Settings → Domains.

## Wire the travel-map form (2 minutes)
1. Create a free account at [formspree.io](https://formspree.io) → New form → it gives you an ID like `xabcdefg`
2. Paste it into `content.js` → `formspreeId`
3. Submissions now land in hanzbest7@gmail.com. Until then, the form falls back to opening an email — nothing is broken either way.
Spam protection: a honeypot field is already in place; turn on reCAPTCHA in Formspree settings if junk gets through.

## Calendly (later, as planned)
`index.html` has a marked `<div id="calendly-slot" hidden>` in the Connect section.
When ready: remove `hidden`, paste Calendly's inline embed snippet inside it. Nothing else changes.

## Dark mode
Toggle in the nav. Defaults to light; remembers the visitor's choice.

## Porting to Astro later (optional)
The structure maps 1:1: each section becomes a component, `content.js` becomes
content collections. Nothing here locks you out of that.
