# Photo picks — what to keep, rename, and move out

I reviewed your shots. Do this checklist top to bottom (15 min), then run
SYNC-ASSETS.bat and re-upload to GitHub. You'll land around 60 files, under
GitHub's 100-file drag limit.

## Step 0: make an archive folder (nothing gets deleted)
Create a folder OUTSIDE the site folder, e.g. `portfolio website building/photo archive/`.
"Cut" below means MOVE the file there, not delete.

## CARS — keep 11 of ~90, rename for order + captions

The keepers (rename exactly like this, captions come from the names):

| Keep | Rename to | Why |
|---|---|---|
| DSC00010.JPG | `01 wrx at the harbor.jpg` | Wide dusk establishing shot, Boston across the water |
| DSC00022.JPG | `02 the crew.jpg` | Your STI + friends + skyline. People make it a story |
| DSC00034.JPG | `03 moon out.jpg` | Best single frame of the set: figure, moon, sailboat |
| DSC00041.JPG | `04 front three quarter.jpg` | Clean low front 3/4 of your car |
| IMG_7880.JPG | `05 winter tires going on.jpg` | Wheel off, jack, impact driver. Proof you wrench |
| DSC07615.JPG | `06 fall run overlook.jpg` | Touge overlook, line of cars, mountains |
| DSCF6160.JPG | `07 widebody sti.jpg` | Engine-out widebody, filmic grade |
| DSCF6229.JPG | `08 formula drift pits.jpg` | Paddock scene, drift 86 |
| IMG_6178.JPG | `09 liberty walk gtr.jpg` | Sharp lime GT-R detail at the show |
| IMG_7322.JPG | `10 mx5 golden hour.jpg` | Golden-hour meet mood |
| IMG_9791.JPG | `11 christmas lights meet.jpg` | The light-wrapped car + GT4. Fun, different |

Cut (move to archive): everything else in `cars/`, including
- All IMG_42xx (rotated, weak subject)
- IMG_6099/6100 (bike + go-kart; charming but off-topic for a car gallery)
- greenm4.JPG (too dark for the grid)
- The rest of the DSC000xx / DSCF61-62xx / IMG_61xx / IMG_73-74xx bursts (the picks above are their best frames)
- IMG_2226.heic (browsers can't show HEIC; convert to jpg first if you love it)
- IMG_7878/7879 (7880 is the better driveway frame)

If you disagree anywhere, keep your favorite instead — but stay at 12 or fewer.

## VENDING — needs format fixes, not curation
- The 9 `.HEIC` photos and `IMG_5807.MOV` won't display in any browser. Convert:
  on your iPhone, select them in Photos → share → they convert on export; or
  upload to squoosh.app. Save as .jpg / .mp4, keep the 2-3 best machine shots.
- 3 copies of the HV logo: keep `Finallogoforhv copy.png`, archive the other two.
- The two PNG screenshots (IMG_2753/2759): if they're sales/app numbers, keep —
  that's honest proof for the metrics strip area.
- Also grab a machine shot for the card photo: `assets/projects/hv-22.jpg`.

## CLIMBING — 2 .MOV files won't play
Convert `IMG_6047~video.MOV` and `IMG_6048~video.MOV` to .mp4 (HandBrake, free,
"Web" preset) or re-export from Photos. Until then the placeholders stay.

## NATURE — files are in the wrong spot
`IMG_5372.JPG`, `IMG_5675.JPG`, `DSCF3542.jpg` sit loose in `nature/`.
The map links by subfolder: move each into `nature/<place>/` (e.g. `nature/boston/`).
Loose files in the nature root are ignored.

## SHOE (Floral Streetwear) — move + rename, I already wired the paths
From `projects/Shoe/`:
- Best design screenshot → rename to `assets/projects/flr-hs.png` (fills the brand card)
- Other screenshot → `assets/floral/sneaker-1.png`
- Shoebox mockup → `assets/floral/sneaker-2.png`
Then archive the empty Shoe folder.

## POSTERS — keep all 9
They're your design work and the grid handles it. Nothing to do.

## COMPRESS before uploading (one batch, 2 min)
Camera files are 5-8MB each; the site wants <0.5MB. Install Microsoft PowerToys
(free) → select all kept photos in Explorer → right-click → "Resize pictures" →
2048px, replace. Or run each through squoosh.app. Then SYNC-ASSETS.bat will
confirm nothing is oversized.

## GitHub after the trim
Total lands ~60 files: select everything inside `site/` → drag into the repo
upload page → commit. If you ever exceed 100 files again, install GitHub Desktop
(no file limit) — worth it once the site grows.
