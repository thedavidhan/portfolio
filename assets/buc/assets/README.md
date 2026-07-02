# Assets — how to add your files

## The easy way (galleries): drop files → sync → refresh

These folders are **auto-scanned**. Put any number of files in, no renaming required:

| Folder | What goes in | Shows up in |
|---|---|---|
| `cars/` | jpg/png/webp | Car photo gallery |
| `vending/` | jpg/png/webp | Vending photo row |
| `climbing/` | jpg/png/webp | Climbing photo row |
| `buildings/` | mp4/webm | Buildings clips (Interests) |
| `lighting/` | mp4/webm | Concert lighting studies |
| `travel/boston/`, `travel/colorado/`, … | jpg/png/webp | That place's map panel |
| `nature/boston/`, `nature/colorado/`, … | jpg/png/webp + mp4/webm | That place's map pin (under "// NATURE") + the Nature grid in Interests |
| `posters/` | jpg/png/webp | Poster grid in Video / Leadership |
| `bro-and-co/` | jpg/png/webp + mp4/webm | Bro & Co block in Podcasts |
| `buc/gallery/` | jpg/png/webp | Extra BUC gallery row (under the process images) |

Then **double-click `SYNC-ASSETS.bat`** (in the site folder) and refresh the page
(Ctrl+Shift+R). That's the whole workflow.

Tips:
- Filenames become captions where captions show: `01 gr86 fog.jpg` → "gr86 fog"
- Number filenames (`01…`, `02…`) to control order
- New travel place: create `travel/<name>/`, add photos, and add the place in
  `content.js` with `folder: "<name>"`
- The sync tool warns you about oversized files and formats browsers can't play (.mov, .heic)

## The named files (one-off spots)

These are single, specific slots — use these exact names:

| File | What it is | Target |
|---|---|---|
| `hero-under-car.jpg` | You working under a car (hero) | ~2400×1600 |
| `portrait-smiling.jpg` | You standing/smiling (Connect) | ~1200×1500 |
| `car-reel.mp4` + `car-reel-poster.jpg` | Horizontal car reel | 1080p, <10MB |
| `projects/hv-22.jpg` etc. | One photo per project card (names listed in `projects/ONE-PHOTO-PER-PROJECT.txt`) | ~16:10 |
| `buc/vol1-front.jpg`/`-back.jpg` … `vol4-…` | BUC volumes | |
| `buc/org-chart.jpg`, `buc/iterations.jpg`, `buc/booth.jpg` | BUC process row | |
| `floral/sneaker-1.jpg`, `floral/sneaker-2.jpg` | Floral Streetwear | |

## Size guide
Images <500KB (export ~2000px wide, quality 80, or squoosh.app).
Videos <10MB (HandBrake → Web preset, 1080p).
