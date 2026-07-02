/* ============================================================
   CONTENT.JS — every word and number on the site lives here.
   Edit this file, refresh the page. You never need to touch
   index.html, styles.css, or main.js to change copy or media.
   ============================================================ */

window.CONTENT = {

  // ---- SITE-WIDE ------------------------------------------------
  site: {
    title: "David Han",
    // The one interactive hero element. Options: "clock" | "counter" | "cursor"
    heroElement: "clock",
    // Formspree form ID for the travel-map suggestion form.
    // Create a free form at formspree.io, then paste the ID here (looks like "xabcdefg").
    // Leave "" and the form politely falls back to email.
    formspreeId: "",
    email: "hanzbest7@gmail.com",
    socials: [
      { label: "YouTube", url: "https://www.youtube.com/@Hanzbest" },
      { label: "Instagram", url: "" },          // TODO: paste IG URL
      { label: "LinkedIn", url: "https://www.linkedin.com/in/thedavidhan/" }
    ]
  },

  // ---- HERO -----------------------------------------------------
  hero: {
    name: "David Han.",
    line1: "I build brands, design clothes, and tell stories with a camera.",
    line2: "I notice how things look, and I build the things I want to see exist.",
    meta: {
      location: "WYCKOFF, NJ",
      focus: "PM INTERN @ WITHCHAPTER",
      // used only when heroElement is "counter"
      counter: { value: 25000, prefix: "$", suffix: "+", label: "Y1 VENDING REV" }
    },
    heroImage: { src: "assets/hero-under-car.jpg", alt: "David working under a car", ph: "PHOTO · YOU UNDER A CAR · WIDE/ATMOSPHERIC · ~2400×1600 · <500KB" },
    portrait:  { src: "assets/portrait-smiling.jpg", alt: "David, standing", ph: "PHOTO · YOU STANDING/SMILING · ~1200×1500" }
  },

  // ---- 00 ORIGIN STORY --------------------------------------------
  origin: {
    paras: [
      "Middle school: I sold candy out of my backpack between classes. The school made me stop, but by then a few lower-school teachers were requesting visits because their students kept bringing money for 'the candy man.'",
      "Years later I wanted to build something of my own, but I also wanted to keep the creative side alive, so I had a hard time choosing a business. Then it clicked: business is just solving people's problems, and I had already found one. The snack, candy, and drink offerings in vending machines were outdated and lacking.",
      "So I fixed it. Stocked machines with the snacks I actually love, watched what sold, and managed inventory on performance. That became Han Vending. The rest of this page is what happened after."
    ]
  },

  // ---- 01 BRANDS & PROJECTS --------------------------------------
  // img: drop a photo at that exact path (assets/projects/) and it fills the card.
  brands: [
    { code: "HV-22",  name: "Han Vending LLC", years: "2022–2024", role: "Founder",
      desc: "Vending business started sophomore year of high school. Ran everything: purchasing, stocking, maintenance, books, taxes.",
      status: "SOLD", cred: "$25K+ first-year revenue · sold for $30K+", img: "assets/projects/hv-22.jpg" },
    { code: "BUC-24", name: "Babson Urban Collective", years: "2024–2025", role: "Co-founder · Co-creative director",
      desc: "Babson-heritage streetwear built through FME. 3 founders grew to a 12-person team. Look DAM Good.",
      status: "ARCHIVED", cred: "$5,954 revenue · 36.8% margin", img: "assets/projects/buc-24.jpg" },
    { code: "FLR-HS", name: "Floral Streetwear", years: "High school", role: "Designer",
      desc: "Custom sneakers, Korean concept. Designed and actually manufactured. The lineage that led to BUC.",
      status: "ARCHIVED", cred: "A real pair exists", img: "assets/projects/flr-hs.png" },
    { code: "PDM-26", name: "Paradigm Podcast", years: "2026–", role: "Co-founder · Host",
      desc: "Babson students interviewing entrepreneurs who broke the usual rules and became outliers.",
      status: "ACTIVE", cred: "New, growing", img: "assets/projects/pdm-26.jpg" },
    { code: "BRO-26", name: "Bro & Co", years: "2026–", role: "Co-founder · Production",
      desc: "A podcast with my friends. I run production: cameras, sound, and the edit.",
      status: "IN PRODUCTION", cred: "", img: "assets/projects/bro-26.jpg" },
    { code: "VID-23", name: "Videography", years: "Ongoing", role: "Shooter · Editor",
      desc: "Car reels, campus organizations, event coverage. Sony ZV-E10 II + DJI RS4 Mini.",
      status: "ACTIVE", cred: "", img: "assets/projects/vid-23.jpg" },
    { code: "ONE-24", name: "O.N.E. @ Babson", years: "2024–", role: "VP / Co-president, Marketing",
      desc: "Origins of Necessary Equality. Marketing leadership, video production for the ONE Tower series.",
      status: "ACTIVE", cred: "", img: "assets/projects/one-24.jpg" }
  ],

  // ---- 02 CLOTHING ------------------------------------------------
  clothing: {
    bucMetrics: ["$5,954 REVENUE", "36.8% MARGIN", "21,562 IG REACH / MO", "31 ITERATIONS", "4 VOLUMES", "12-PERSON TEAM"],
    bucIntro: "Babson-heritage streetwear. Forest green, cream, golden tan. Hand-drawn heritage illustrations: the ship seal, Tomasso Hall, Roger and Gymie. Proceeds partly donated to cancer research. Dissolved on the FME calendar, as designed.",
    volumes: [
      { name: "Vol. 1", front: "assets/buc/vol1-front.jpg", back: "assets/buc/vol1-back.jpg", note: "Hoodie · heritage seal" },
      { name: "Vol. 2", front: "assets/buc/vol2-front.jpg", back: "assets/buc/vol2-back.jpg", note: "Hoodie · Tomasso Hall" },
      { name: "Vol. 3", front: "assets/buc/vol3-front.jpg", back: "assets/buc/vol3-back.jpg", note: "Hoodie · Roger + Gymie" },
      { name: "Vol. 4", front: "assets/buc/vol4-front.jpg", back: "assets/buc/vol4-back.jpg", note: "Hoodie · Babson statue" }
    ],
    process: [
      { src: "assets/buc/org-chart.jpg", label: "ORG CHART · 3 FOUNDERS → 12 PEOPLE", ph: "IMAGE · team org chart slide" },
      { src: "assets/buc/iterations.jpg", label: "31 DESIGN ITERATIONS", ph: "IMAGE · the 31-iterations slide" },
      { src: "assets/buc/booth.jpg", label: "SELLING, IN PERSON", ph: "PHOTO · team at the booth" }
    ],
    floral: {
      intro: "Before BUC there were the sneakers. A Korean concept I designed as a freshman and got manufactured. A real pair, not a render.",
      note: "Admissions liked the vending story enough that the school paid for a second pair as a thank-you.",
      images: [
        { src: "assets/floral/sneaker-1.png", ph: "PHOTO · Floral sneaker, hero angle" },
        { src: "assets/floral/sneaker-2.png", ph: "PHOTO · sneaker detail / shoebox" }
      ]
    },
    matchaVans: "Matcha Vans: started. Didn't finish. The mood board still lives on a hard drive somewhere."
  },

  // ---- 03 VENDING ---------------------------------------------------
  vending: {
    youtubeId: "iJfiYkeGxVg",
    videoLine: "The video that got me into Babson, and the story of how the vending business started.",
    body: "Started sophomore year of high school. Sourced machines on Facebook Marketplace, flew to Colorado to get trained, and pitched the school until they said yes. Then negotiated the required revenue share 30% below policy with a survey of 50+ students and a three-scenario margin model. Ran it for two years: purchasing, stocking, maintenance, bookkeeping, the K-1. Sold it senior year.",
    metrics: ["$25K+ Y1 REVENUE", "~5× NATIONAL AVG", "2 YEARS OPERATED", "$30K+ EXIT", "2022–2024 · EXITED"],
    photos: [
      { src: "assets/vending/machine-1.jpg", ph: "PHOTO · the machine, in place" },
      { src: "assets/vending/machine-2.jpg", ph: "PHOTO · restocking / behind the scenes" },
      { src: "assets/vending/colorado.jpg", ph: "PHOTO · Colorado training trip (optional)" }
    ]
  },

  // ---- 04 CARS ------------------------------------------------------
  cars: {
    reel: {
      video: "assets/car-reel.mp4",
      poster: "assets/car-reel-poster.jpg",
      ph: "VIDEO · horizontal car reel · 1920×1080 · <10MB · goes at assets/car-reel.mp4",
      lines: ["This is the car.", "Shot it myself, single take.", "No edits except color.", "Manual, obviously."]
    },
    gallery: [
      { src: "assets/cars/car-01.jpg", cap: "" },
      { src: "assets/cars/car-02.jpg", cap: "" },
      { src: "assets/cars/car-03.jpg", cap: "" },
      { src: "assets/cars/car-04.jpg", cap: "" },
      { src: "assets/cars/car-05.jpg", cap: "" },
      { src: "assets/cars/car-06.jpg", cap: "" },
      { src: "assets/cars/car-07.jpg", cap: "" },
      { src: "assets/cars/car-08.jpg", cap: "" }
    ]
  },

  // ---- 05 VIDEO / LEADERSHIP -----------------------------------------
  leadership: {
    intro: "President of Marketing, Babson Car Club. VP / Co-president of Marketing, O.N.E. The videos carry it from here.",
    videos: [
      { title: "ONE Tower · Episode 1", youtubeId: "", ph: "VIDEO · paste YouTube ID in content.js" },
      { title: "ONE Tower · Episode 2", youtubeId: "", ph: "VIDEO · paste YouTube ID in content.js" },
      { title: "Car Club · event recap", youtubeId: "", ph: "VIDEO · paste YouTube ID in content.js" }
    ]
  },

  // ---- 06 PODCAST -------------------------------------------------------
  podcast: {
    premise: "Paradigm: Babson students interviewing entrepreneurs who broke the usual rules and became outliers, to learn how they did it.",
    statusLine: "Student-run and early. New, growing, episodes filming now.",
    episodes: [
      { title: "Episode 01", guest: "Guest name, coming soon", youtubeId: "", ph: "EPISODE · paste YouTube ID + guest in content.js" },
      { title: "Episode 02", guest: "Guest name, coming soon", youtubeId: "", ph: "EPISODE · paste YouTube ID + guest" },
      { title: "Episode 03", guest: "Guest name, coming soon", youtubeId: "", ph: "EPISODE · paste YouTube ID + guest" }
    ],
    subscribe: [
      { label: "YouTube", url: "" },   // TODO: podcast channel URL
      { label: "Spotify", url: "" },   // TODO
      { label: "Apple", url: "" }      // TODO
    ],
    broCo: {
      line: "Bro & Co: a second podcast, this one with my friends. I run production, so the cameras, sound, and the edit are on me."
    }
  },

  // ---- 07 TRAVEL MAP ------------------------------------------------------
  // status: "been" | "planned".  sample:true renders a small SAMPLE tag —
  // delete these and add your real places.
  // "folder": drop photos into assets/travel/<folder>/ and run SYNC-ASSETS —
  // they appear on that place's panel automatically.
  places: [
    { name: "Wyckoff, NJ", coords: [41.0093, -74.166], status: "been", folder: "new jersey",
      rec: "Home. Where the candy man got his start.",
      photos: [] },
    { name: "California", coords: [34.0522, -118.2437], status: "been", folder: "california",
      rec: "", // TODO: your one-line rec + adjust name/coords to the actual spot
      photos: [] },
    { name: "Boston / Wellesley, MA", coords: [42.3601, -71.0589], status: "been", folder: "boston",
      rec: "School home base. Walk the Esplanade at golden hour; skip the duck tour.",
      photos: [{ src: "assets/travel/boston-1.jpg", ph: "PHOTO · Boston" }] },
    { name: "Colorado", coords: [39.7392, -104.9903], status: "been", folder: "colorado",
      rec: "Flew out to get trained on vending machines. Yes, really. The mountains were a bonus.",
      photos: [{ src: "assets/travel/colorado-1.jpg", ph: "PHOTO · Colorado" }] },
    { name: "Tokyo, Japan", coords: [35.6762, 139.6503], status: "planned", sample: true,
      rec: "", photos: [] },
    { name: "Seoul, South Korea", coords: [37.5665, 126.978], status: "planned", sample: true,
      rec: "", photos: [] }
  ],

  // ---- 08 CLIMBING -----------------------------------------------------------
  climbing: {
    intro: "Climbing since middle school, before it was a COVID hobby. Competed through high school, then crossed the desk and taught it. Working at the gym, I kept seeing the same operational gaps. So I wrote a PRD.",
    timeline: [
      { tag: "PRE-COVID", event: "Started climbing, middle school." },
      { tag: "COMPS", event: "Competed, advanced bracket." },
      { tag: "STAFF", event: "Instructor at the gym. Taught the sport I grew up on." },
      { tag: "2025", event: "Turned the desk-shift pain points into a product spec during my Reef Labs internship." }
    ],
    prd: {
      title: "THE PRD THAT DIDN'T SHIP (YET)",
      body: "A software fix for the gym's day-to-day operations, written while at Reef Labs. Met with the managers to develop it and gather feedback. They were interested. They were also busy opening new locations.",
      status: "STATUS: VALIDATED · PARKED"
    },
    photos: [
      { src: "assets/climbing/climb-1.jpg", ph: "PHOTO · on the wall" },
      { src: "assets/climbing/climb-2.jpg", ph: "PHOTO · comp or gym era" },
      { src: "assets/climbing/climb-3.jpg", ph: "PHOTO · teaching / staff" }
    ]
  },

  // ---- 09 INTERESTS -----------------------------------------------------------
  interests: {
    lighting: {
      intro: "I watch concerts for the lighting design. These are studies: short clips and why the look works.",
      clips: [
        { src: "assets/lighting/clip-1.mp4", why: "WHY IT WORKS · your note goes here (content.js)", ph: "CLIP · concert lighting study 01" },
        { src: "assets/lighting/clip-2.mp4", why: "WHY IT WORKS · your note goes here", ph: "CLIP · concert lighting study 02" }
      ]
    },
    buildings: [
      { src: "assets/buildings/building-1.mp4", cap: "", ph: "CLIP · looping building still-video 01" },
      { src: "assets/buildings/building-2.mp4", cap: "", ph: "CLIP · looping building still-video 02" },
      { src: "assets/buildings/building-3.mp4", cap: "", ph: "CLIP · looping building still-video 03" }
    ],
    tech: [
      { name: "Sony ZV-E10 II", line: "Small enough to always be in the bag. Shoots everything on this site." },
      { name: "DJI RS4 Mini", line: "The reason the car footage doesn't shake." },
      { name: "Xreal glasses", line: "A monitor that fits in a jacket pocket. Mostly used on planes." }
    ],
    software: [
      { name: "Notion", line: "Where every project on this page was planned first." },
      { name: "Claude", line: "Helped plan and build this site. Obviously." },
      { name: "Adobe Creative Suite", line: "Photoshop, Illustrator, After Effects, Premiere Pro, Lightroom. Still learning all five, comfortable enough to ship." },
      { name: "Alarmy", line: "The App Store one. It gets me up. That's the whole review." },
      { name: "TouchDesigner + lighting design tools", line: "On the learn list. Watching a great lighting designer work a room is half the reason I go to shows. I want that skill." }
    ],
    books: [
      { year: "2025", title: "(your list goes here: content.js → interests.books)" },
      { year: "2024", title: "(year + title, one line each)" },
      { year: "2024", title: "(dryness is the joke. keep it honest)" }
    ]
  },

  // ---- 10 CONNECT -----------------------------------------------------------
  connect: {
    line: "Reach out if you've got something interesting.",
    sub: "Rising junior at Babson College. I love the process of bringing a vision to life.",
    podcastHandle: "@paradigmpodcast" // TODO: confirm handle
  }
};
