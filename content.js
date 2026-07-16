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
    email: "davidhan100@gmail.com",
    socials: [
      { label: "YouTube", url: "https://www.youtube.com/@Hanzbest", display: "@hanzbest" },
      { label: "Instagram", url: "https://www.instagram.com/davidgeneratedcontent", display: "davidgeneratedcontent" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/thedavidhan/", display: "linkedin.com/in/thedavidhan" }
    ]
  },

  // ---- HERO -----------------------------------------------------
  hero: {
    name: "David Han.",
    line1: "Product in training, creator by instinct.",
    line2: "Both are the same job: figure out what people actually want, build it, and make them care.",
    meta: {
      location: "NEW YORK / NEW JERSEY / BOSTON",
      school: "STUDENT @ BABSON COLLEGE",
      focus: "PM INTERN @ WITHCHAPTER",
      // used only when heroElement is "counter"
      counter: { value: 25000, prefix: "$", suffix: "+", label: "Y1 VENDING REV" }
    },
    heroImage: { src: "", alt: "David working under a car", ph: "PHOTO · HERO · drop into assets/hero/" },
    portrait:  { src: "assets/portrait-smiling.jpg", alt: "David, standing", ph: "PHOTO · YOU STANDING/SMILING · ~1200×1500" }
  },

  // ---- 00 RECENTLY -------------------------------------------------
  // The "most recently" strip above the project grid. Newest first.
  // Each item: { date, text, href (optional link), tag (optional chip, e.g. "NEW") }
  recent: [
    { date: "JUL 2026", text: "Adobe Student Ambassador at Babson College.", href: "project.html?p=ugc-26", tag: "NEW" },
    { date: "SUMMER 2026", text: "Product management intern at Chapter.", href: "project.html?p=chp-26" },
    { date: "2026", text: "Paradigm Podcast: first episodes filmed and edited — now in post-production, with Instagram content on the way.", href: "project.html?p=pdm-26" },
    { date: "SPRING 2026", text: "Delivered a modernization roadmap to Koko FitClub — Babson MCFE, team of five.", href: "project.html?p=koko-26" }
  ],

  // ---- ORIGIN STORY (retired from the homepage) --------------------
  // "The Candy Guy" now lives inside the Han Vending page (articles["hv-22"]).
  // Kept here only so nothing that still references C.origin breaks.
  origin: {
    cutout: { src: "assets/vending/vending machine cutout.png", alt: "Han Vending machine", link: "#hv-22" },
    paras: []
  },

  // ---- 01 BRANDS & PROJECTS --------------------------------------
  // img: drop a photo at that exact path (assets/projects/) and it fills the card.
  brands: [
    // -- shelf 1: active work, career priority first --
    { code: "CHP-26", name: "Chapter", years: "2026–present", role: "Product management intern",
      desc: "Chapter is an AI-native startup building the CRM for independent educational consultants, K-12 through college. I develop the student user interface and experience.",
      status: "ACTIVE", cred: "My day job", img: "assets/projects/chapter.png" },
    { code: "UGC-26", name: "UGC", years: "2026–present", role: "On camera and behind it",
      desc: "Cars, tech, and making things. First videos are in the edit right now.",
      status: "UNDER CONSTRUCTION", cred: "@davidgeneratedcontent", img: "assets/projects/adobe.jfif" },
    { code: "PDM-26", name: "Paradigm Podcast", years: "2026–present", role: "By Bro & Co · I run production",
      desc: "Babson students interviewing entrepreneurs who broke the usual rules and became outliers. Made by Bro & Co, my friends and me. Cameras, sound, and the edit are on me.",
      status: "ACTIVE", cred: "New, growing", img: "assets/bro-and-co/Screenshot 2026-07-01 193359.png" },
    { code: "KOKO-26", name: "MCFE · Koko FitClub", years: "Spring 2026", role: "Student consultant",
      desc: "Babson's consulting field experience. Client work: 300+ member surveys turned into a modernization roadmap for a smart-gym company.",
      status: "DELIVERED", cred: "Team of five", img: "assets/mcfe/2.jpg" },
    { code: "GFX-HS", name: "Graphic design", years: "High school–present", role: "Designer",
      desc: "Posters and creative projects I make on my own. In love with digital media since Photoshop, freshman year of high school.",
      status: "ACTIVE", cred: "Adobe Student Ambassador", img: "assets/posters/Porheseedit.jpg" },
    { code: "VID-23", name: "Car photography", years: "Ongoing", role: "Photographer",
      desc: "Car meets, car events, and the cars themselves. Shot, not stock.",
      status: "ACTIVE", cred: "", img: "assets/cars/03 moon out.JPG" },
    { code: "CAM-24", name: "Campus presence", years: "2024–present", role: "O.N.E. · Car Club · KSA · BAPSA",
      desc: "VP / co-president of marketing at O.N.E., president of marketing at Babson Car Club, KSA + BAPSA member. Posters, videos, events, retreats.",
      status: "", cred: "", img: "assets/clubs/car-club/IMG_0241.jpeg" },
    { code: "TLS-26", name: "Tools built with Claude", years: "2026–present", role: "Builder · Claude as copilot",
      desc: "Small software I build with Claude when a problem annoys me enough. First one: a settings guide for my camera and gimbal rig. Live on this site, free to use.",
      status: "ACTIVE", cred: "1 tool live", img: "assets/projects/tools-card.svg" },
    { code: "CLB-19", name: "Climbing", years: "Pre-COVID–present", role: "Competed · Instructor",
      desc: "On walls since middle school. Student turned instructor. Then wrote the gym a PRD.",
      status: "ACTIVE", cred: "The PRD is parked, not dead", imgKey: "climbing", img: "assets/climbing/climb-1.jpg" },
    // -- shelf 2: finished work, newest first --
    { code: "BUC-24", name: "Babson Urban Collective", years: "2024–2025", role: "Co-founder · Co-creative director",
      desc: "Babson-heritage streetwear built through FME. 3 founders grew to a 12-person team. Look DAM Good.",
      status: "ARCHIVED", cred: "$5,954 revenue · 36.8% margin", img: "assets/buc/gallery/BUC Report to community - 17.jpg" },
    { code: "HV-22",  name: "Han Vending LLC", years: "2022–2024", role: "Founder",
      desc: "Vending business started sophomore year of high school. Ran everything: purchasing, stocking, maintenance, books, taxes.",
      status: "SOLD", cred: "$25K+ first-year revenue · sold for $30K+", img: "assets/vending/IMG_8470 2.png" },
    { code: "FLR-HS", name: "Floral Streetwear", years: "High school", role: "Designer",
      desc: "Korean-inspired custom sneakers on the Air Jordan 1 high-top template. Designed and actually manufactured. The lineage that led to BUC.",
      status: "ARCHIVED", cred: "", img: "assets/posters/DavidSneakerAdDRAFTfinal.png" }
  ],

  // ---- ARTICLE PAGES (project.html?p=<code>) --------------------------
  // Each card links to its own page. Body = array of paragraphs.
  // galleryKey pulls photos from that manifest folder; images = explicit list.
  articles: {
    "chp-26": {
      title: "Chapter",
      body: [
        "My product management internship. Chapter is a B2B AI-native software startup building the CRM for independent educational consultants, K-12 through college — the tool that carries a family from first call to final placement.",
        "At Chapter I'm developing the student user interface and experience — the side of the product students actually touch: how they get in, what they see, and how it feels to use.",
        "It's also where I get to practice the job for real: specs, user flows, and shipping with an engineering team."
      ],
      actions: [
        { label: "WITHCHAPTER ↗", url: "https://withchapter.com/" }
      ]
    },
    "hv-22": {
      title: "The vending machine business",
      body: [
        "First, the origin story. In middle school I sold candy out of my backpack between classes. After school I'd go to the dollar store and reinvest the earnings into more candy for the next day. Buy for $1, sell for $2. Simple. The school admin made me stop, but by then a few teachers were requesting visits because their students kept bringing money for 'the candy guy.'",
        "The demand didn't go anywhere, and neither did the itch. Years later I wanted to build something of my own, and it clicked: business is just solving people's problems, and I had already found one. The snack, candy, and drink offerings in vending machines were outdated and lacking.",
        "Sophomore year of high school I went legitimate. Sourced machines on Facebook Marketplace, flew to Colorado to get trained on them, and pitched my school until they said yes.",
        "The school wanted the standard revenue share. I surveyed 50+ students, built a three-scenario margin model in Excel, and negotiated the share 30% below policy.",
        "Then I ran it, for two years. Purchasing, stocking, maintenance, bookkeeping, the K-1 at tax time. The goal from the start was a system that could run without me: routines, restock rules based on what actually sold, and records that didn't live in my head.",
        "First-year revenue passed $25K, about five times the national average for a single-machine high school operation. Senior year I sold the business for $30K+."
      ],
      youtubeId: "iJfiYkeGxVg",
      videoLine: "The video that got me into Babson, and the story of how the vending business started.",
      logo: "assets/vending/Finallogoforhv copy.png",
      watermark: "assets/vending/logo with markings.png",
      metrics: ["$25K+ Y1 REVENUE", "~5× NATIONAL AVG", "2 YEARS OPERATED", "$30K+ EXIT"],
      galleryKey: "vending"
    },
    "buc-24": {
      title: "Babson Urban Collective",
      body: [
        "Streetwear built inside FME, Babson's program where first-years start and run a real business. Three of us founded it. The team grew to twelve.",
        "I was co-founder and co-creative director. The look: forest green, cream, and golden tan, a Didone serif, and hand-drawn heritage illustrations of the ship seal, Tomasso Hall, and Roger and Gracie.",
        "31 design iterations before anything got printed. Four volumes of hoodies, plus tees, pants, and a tote.",
        "$5,954 in revenue at a 36.8% gross margin. 21,562 Instagram accounts reached in one month. Every drop sold out but one, and all proceeds went to cancer research.",
        "The one that didn't sell out taught the biggest lesson. In the final stretch we rebranded to Boston Urban Collective to chase a bigger market, and there was no time left for a real launch campaign. Positioning without go-to-market is just a new name.",
        "BUC dissolved on the FME calendar, as designed."
      ],
      metrics: ["$5,954 REVENUE", "36.8% MARGIN", "21,562 IG REACH / MO", "31 ITERATIONS", "4 VOLUMES", "12-PERSON TEAM"],
      galleryKeys: ["buc-volumes", "buc"],
      images: [
        "assets/buc/BUC organizational structure.jpg",
        "assets/buc/31 iterations.jpg",
        "assets/buc/brand identity.jpg"
      ]
    },
    "flr-hs": {
      title: "Floral Streetwear",
      body: [
        "Freshman year of high school I wanted a shoe that didn't exist, so I drew it. A Korean-inspired concept on the template of the iconic high-top Air Jordan 1, designed in Adobe Illustrator.",
        "Our teacher pulled off a partnership with Shoezero, a manufacturer in China, and they printed the designs into a real pair.",
        "Admissions liked the vending story enough that the school paid for a second pair as a thank-you.",
        "Floral is where the making-things thread starts. It's the lineage that led to BUC."
      ],
      images: [
        "assets/projects/Shoe/real-pair.png",
        "assets/projects/Shoe/Screen Shot 2022-04-19 at 2.20.49 PM.png",
        "assets/projects/Shoe/Screen Shot 2022-05-03 at 2.40.53 PM.png",
        "assets/projects/Shoe/Shoe-box.png"
      ]
    },
    "pdm-26": {
      title: "Paradigm Podcast",
      body: [
        "Paradigm is Babson students interviewing entrepreneurs who broke the usual rules and became outliers, to learn how they did it.",
        "It's made by Bro & Co: my friends and me. I run production, so the cameras, sound, and the edit are on me.",
        "The first few episodes are filmed and edited, and they're in post-production now. Next up: putting out content on Instagram. Episodes land here as they publish."
      ],
      galleryKeys: ["bro-and-co", "podcast-episodes"],
      actions: [
        { label: "BE A GUEST →", url: "mailto:davidhan100@gmail.com?subject=Paradigm: I'd like to be a guest" },
        { label: "SUGGEST A GUEST →", url: "mailto:davidhan100@gmail.com?subject=Paradigm: guest suggestion" }
      ]
    },
    "koko-26": {
      title: "MCFE · Koko FitClub",
      body: [
        "Babson's Management Consulting Field Experience, Spring 2026. Real client, real deliverable. Ours was Koko FitClub.",
        "Five of us dug into the member experience, 300+ survey responses deep. The core finding: premium pricing sitting next to a 51% member tech-failure rate, with an NPS of 81 in spite of it. People loved the product. The machines kept letting them down.",
        "We delivered a modernization roadmap: Smart Trainer hardware fixes, a rebuilt scheduling flow, and member app recommendations. Slides below."
      ],
      galleryKey: "mcfe"
    },
    "vid-23": {
      title: "Car photography",
      body: [],
      galleryKey: "cars"
    },
    "cam-24": {
      title: "Campus presence",
      body: [
        "Three clubs and an association carry my campus life: O.N.E., the Babson Car Club, KSA, and BAPSA.",
        "O.N.E. is Origins of Necessary Equality. I've been VP and co-president of marketing — and my first semester, co-VP of finance: producing budgets for our club events, maintaining the financial records, and helping organize fundraising events. The marketing job is making events impossible to ignore: posters, Instagram Reels, and event videos. The main one I directed is a vertical tour of the ONE Tower living space, built for Reels.",
        "Babson Car Club: president of marketing. We hold car meets and rallies — driving as a group to a scenic spot or a car museum, like the Porsche Museum trip above. We design hoodies and merch (I worked on the designs), usually sponsored by the school so we can give them out free; they run out fast every time. We run sim racing events on campus, where anyone can jump in the simulator and compete in time-attack races for the fastest lap on that day's track. And when there's a big race on — F1 or any other motorsport we're into — we hold watch parties. The Moonlight Meet poster in the gallery is mine.",
        "KSA: member. I don't speak Korean, but I love the Korean brothers and sisters I've become close to through it. The retreat photo says more than a title would.",
        "BAPSA is the Babson Asian Pacific Student Association. They organize families — upperclassmen picking up underclassmen — and I'm really grateful for mine. They helped me get acquainted with college life and discover career pathways, which led me to where I am right now: product management.",
        "Most recent: Adobe Student Ambassador at Babson College. I'll be hosting an Adobe-sponsored event on campus next semester."
      ],
      galleryKeys: ["clubs", "campus-videos"],
      images: [
        "assets/posters/Babsoncarclubpresents copy.png",
        "assets/posters/Black and White Playful Korean Food Instagram Post.png",
        "assets/posters/ONE (1).png",
        "assets/posters/White Green Planting Tree Poster (1).png"
      ]
    },
    "clb-19": {
      title: "Climbing",
      body: [
        "Climbing since middle school, before it was a COVID hobby. Competed through high school in the advanced bracket, then crossed the desk: student turned instructor.",
        "The split is even between top rope and bouldering, but top rope has my heart: the adrenaline, and the endurance race of a long route. Mostly 5.11s and V4s these days.",
        "Working at the gym, I kept seeing the same operational gaps. As a discovery intern at Reef Labs — a Babson student-founded software development startup — I identified the biggest one: the weekly staff schedule was built by hand, four hours at a time. I wrote the PRD to fix it.",
        "The PRD that didn't ship (yet): a software fix for the gym's day-to-day operations. I met with the managers to develop it and gather feedback. They were interested. They were also busy opening new locations.",
        "Status: validated, parked. Climbing status: ongoing."
      ],
      galleryKey: "climbing"
    },
    "gfx-hs": {
      title: "Graphic design",
      body: [
        "I just love graphic design. Ever since I learned Photoshop freshman year of high school, I've loved being able to express myself through digital media — and I love learning new ways to do it.",
        "These are posters and creative projects I make on my own: for the cars I shoot, for ideas that won't leave me alone, for the fun of it. Posters I've made for campus clubs and events live on the Campus presence page.",
        "And now: Adobe Student Ambassador at Babson College. I'm looking forward to hosting an Adobe-sponsored event on campus next semester."
      ],
      images: [
        "assets/posters/Respectthelocals.jpg",
        "assets/posters/tlxposterfinal.jpg",
        "assets/posters/WRXSTIRAYPOSTERdraft copy.png",
        "assets/posters/miataaaa.png",
        "assets/posters/Orange and White Modern Minimalist Music Fest Instagram Post.png",
        "assets/posters/Black and White Vintage Newspaper Tokyo Travel Poster.png",
        "assets/posters/Blue and White Illustrated Minimalist Retro Coffee Shop Square Sticker.png",
        "assets/posters/1.png"
      ]
    },
    "tls-26": {
      title: "Tools built with Claude",
      body: [
        "I work with AI every day, at the internship and after it. The fastest way I've found to learn something is to build a small tool for it.",
        "These are pieces of software I've made with Claude to solve my own problems. No app store, no login. They live on this site so you can actually try them.",
        "First one: the RS4 Mini settings guide. I shoot cars on a Sony ZV-E10 II with a DJI RS4 Mini gimbal, and I kept re-looking-up the same settings for every kind of shot. Shutter for rolling shots, gimbal mode for orbits, what to do when the footage comes out jelly. So Claude and I turned the answers into a tool: pick the shot you're going for, get the gimbal mode, camera settings, movement technique, and the post note in one screen.",
        "If you run the same rig, it should save you the twenty minutes it used to cost me. More tools land here as I build them."
      ],
      actions: [
        { label: "TRY THE RS4 MINI GUIDE →", url: "tools/rs4-mini.html" }
      ]
    },
    "ugc-26": {
      title: "UGC",
      body: [
        "Under construction. The account exists, the bio doesn't, and nothing is posted yet. I want a few good videos in the bag first.",
        "The pitch: I'm a 20-year-old American-born Korean who loves cars, working on them, and learning how they work. I drive a 2017 WRX STI. Right now I'm editing a video where I install mufflers on it. If you're an aftermarket performance parts company, I want to collab.",
        "I also live in tech. Computers, AI, product. My day job is a product management internship at a B2B AI-native software startup building the future CRM for independent educational consultants.",
        "And I make things: 3D printing, digital media design and production, the Adobe suite. Software companies that help people bring ideas to life, I want to work with you too.",
        "The first one's already in motion: Adobe Student Ambassador at Babson College — creating for Adobe's community.",
        "@davidgeneratedcontent on Instagram. Coming soon, for real."
      ],
      link: { label: "@DAVIDGENERATEDCONTENT ↗", url: "https://www.instagram.com/davidgeneratedcontent" }
    }
  },

  // ---- 02 CLOTHING ------------------------------------------------
  clothing: {
    bucMetrics: ["$5,954 REVENUE", "36.8% MARGIN", "21,562 IG REACH / MO", "31 ITERATIONS", "4 VOLUMES", "12-PERSON TEAM"],
    bucIntro: "Babson-heritage streetwear. Forest green, cream, golden tan. Hand-drawn heritage illustrations: the ship seal, Tomasso Hall, Roger and Gracie. All proceeds donated to cancer research. Every drop sold out but one: in the final stretch we rebranded to Boston Urban Collective to chase a bigger market, and without time for a real launch campaign, that drop sat. Lesson logged. Dissolved on the FME calendar, as designed.",
    // Volume images: drop ONE wide image per volume (front+back together) into
    // assets/buc/volumes/ and run SYNC-ASSETS. Filename becomes the caption:
    // "vol 1 heritage seal.jpg". The list below is only used for placeholders.
    volumes: [
      { name: "Vol. 1", note: "Heritage seal" },
      { name: "Vol. 2", note: "Tomasso Hall" },
      { name: "Vol. 3", note: "Roger + Gracie" },
      { name: "Vol. 4", note: "Babson statue" }
    ],
    process: [
      { src: "assets/buc/BUC organizational structure.jpg", label: "ORG CHART · 3 FOUNDERS → 12 PEOPLE", ph: "IMAGE · org chart" },
      { src: "assets/buc/31 iterations.jpg", label: "31 DESIGN ITERATIONS", ph: "IMAGE · the 31-iterations slide" },
      { src: "assets/buc/brand identity.jpg", label: "BRAND IDENTITY", ph: "IMAGE · brand identity slide" }
    ],
    floral: {
      intro: "Before BUC there were the sneakers. A Korean-inspired concept I designed as a freshman, built on the template of the iconic high-top Air Jordan 1. Our teacher pulled off a partnership with Shoezero, a manufacturer in China, and they printed the designs we drew in Adobe Illustrator. A real pair, not a render.",
      note: "Admissions liked the vending story enough that the school paid for a second pair as a thank-you.",
      images: [
        { src: "assets/projects/Shoe/real-pair.png", ph: "PHOTO · the real pair · save it as real-pair.png in assets/projects/Shoe" },
        { src: "assets/projects/Shoe/Screen Shot 2022-04-19 at 2.20.49 PM.png", ph: "IMAGE · the rough draft mockup" }
      ],
      banner: { src: "assets/projects/Shoe/Screen Shot 2022-05-03 at 2.40.53 PM.png", ph: "IMAGE · the rose design, full width" }
    },
    matchaVans: "Matcha Vans: started. Didn't finish. The mood board still lives on a hard drive somewhere."
  },

  // ---- 03 VENDING ---------------------------------------------------
  vending: {
    logo: "assets/vending/Finallogoforhv copy.png",
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
    mcfe: {
      line: "Babson's Management Consulting Field Experience, Spring 2026. Client: Koko FitClub. Five of us dug into the member experience, 300+ survey responses deep, and delivered a modernization roadmap for the Smart Trainer and the member app."
    },
    // Club photos: drop into assets/clubs/<key>/ and run SYNC-ASSETS.
    // Vertical or horizontal both work; they display at natural proportions.
    clubs: [
      { key: "one", name: "O.N.E. @ Babson", role: "VP / CO-PRESIDENT, MARKETING", line: "Origins of Necessary Equality." },
      { key: "ksa", name: "Korean Student Association", role: "MEMBER", line: "The retreat photo carries this one." },
      { key: "car-club", name: "Babson Car Club", role: "PRESIDENT OF MARKETING", line: "Videography, posters, the Instagram." }
    ],
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
      line: "Made by Bro & Co: my friends and me. I run production, so the cameras, sound, and the edit are on me."
    }
  },

  // ---- 07 TRAVEL MAP ------------------------------------------------------
  // status: "been" | "planned".  sample:true renders a small SAMPLE tag —
  // delete these and add your real places.
  // "folder": drop photos into assets/travel/<folder>/ and run SYNC-ASSETS —
  // they appear on that place's panel automatically.
  places: [
    { name: "North Jersey", coords: [40.9263, -74.077], status: "been", folder: "new jersey",
      rec: "Home. Where the candy guy got his start.", photos: [] },
    { name: "Boston / Wellesley, MA", coords: [42.3601, -71.0589], status: "been", folder: "boston",
      rec: "School home base. Walk the Esplanade at golden hour; skip the duck tour.", photos: [] },
    { name: "Colorado", coords: [39.7392, -104.9903], status: "been", folder: "colorado",
      rec: "Flew out to get trained on vending machines. Yes, really. The mountains were a bonus.", photos: [] },
    { name: "Los Angeles, CA", coords: [34.0522, -118.2437], status: "been", folder: "california",
      rec: "", photos: [] },
    { name: "Miami, FL", coords: [25.7617, -80.1918], status: "been", folder: "miami",
      rec: "", photos: [] },
    { name: "Montreal, Canada", coords: [45.5017, -73.5673], status: "been", folder: "montreal",
      rec: "", photos: [] },
    { name: "Alaska", coords: [61.2181, -149.9003], status: "been", folder: "alaska",
      rec: "", photos: [] },
    { name: "Germany", coords: [52.52, 13.405], status: "been", folder: "germany",
      rec: "", photos: [] },
    { name: "Seoul, South Korea", coords: [37.5665, 126.978], status: "been", folder: "seoul",
      rec: "", photos: [] },
    { name: "Tokyo, Japan", coords: [35.6762, 139.6503], status: "been", folder: "tokyo",
      rec: "", photos: [] },
    { name: "Hokkaido, Japan", coords: [43.0618, 141.3545], status: "been", folder: "hokkaido",
      rec: "", photos: [] },
    { name: "Iceland", coords: [64.1466, -21.9426], status: "been", folder: "iceland",
      rec: "", photos: [] },
    { name: "San Francisco, CA", coords: [37.7749, -122.4194], status: "been", folder: "san francisco",
      rec: "", photos: [] },
    { name: "Austria", coords: [48.2082, 16.3738], status: "been", folder: "austria",
      rec: "", photos: [] },
    { name: "Prague, Czechia", coords: [50.0755, 14.4378], status: "been", folder: "prague",
      rec: "", photos: [] },
    { name: "Amsterdam, Netherlands", coords: [52.3676, 4.9041], status: "been", folder: "amsterdam",
      rec: "", photos: [] },
    { name: "Maine", coords: [43.6591, -70.2568], status: "been", folder: "maine",
      rec: "", photos: [] },
    { name: "Vermont", coords: [44.4759, -73.2121], status: "been", folder: "vermont",
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
      { name: "Sony ZV-E10 II", line: "Small enough to always be in the bag. My go-to video camera." },
      { name: "Fujifilm X-T2", line: "The stills camera. The DSCF photos scattered across this site came out of it." },
      { name: "DJI RS4 Mini", line: "The reason the car footage doesn't shake." },
      { name: "Xreal glasses", line: "A monitor that fits in a jacket pocket. Mostly used on planes." }
    ],
    creators: [
      { name: "lifeofriza", platform: "YouTube", url: "https://www.youtube.com/@lifeofriza",
        line: "Her shots look that good on purpose. Beautiful light, real storytelling." }
    ],
    // Spotify future idea: top 3 playlists right now, favorite artists,
    // underappreciated artists. Revisit when ready to link the account.
    software: [
      { name: "Notion", line: "Where every project on this page was planned first." },
      { name: "Claude", line: "Helped plan and build this site. Obviously." },
      { name: "GitHub", line: "Where this site lives. Learned it in one long night and now we're friends." },
      { name: "Otter.ai", line: "Records, transcribes, and summarizes anything I say, and it connects to Claude. Started before I'd heard of Granola. It hasn't let me down." },
      { name: "Adobe Creative Suite", line: "Photoshop, Illustrator, After Effects, Premiere Pro, Lightroom. Still learning all five, comfortable enough to ship." },
      { name: "Spotify", line: "New music daily. I love getting inspiration from album covers — I'd love to design one someday. And I dig for underappreciated artists like it's a job." },
      { name: "Alarmy", line: "I am a notoriously heavy sleeper and WILL sleep through the basic iPhone alarms. Alarmy gets me up every morning." },
      { name: "Opal + RoutineFlow", line: "The App Store discipline stack: screen time and routines. They keep me locked in and on task." },
      { name: "Velocidrone", line: "FPV drone simulator. Stick time is cheap and crashed quads aren't. The dream: chase-filming Formula Drift cars." },
      { name: "TouchDesigner + lighting design tools", line: "I don't know these yet, but I want to learn them. I'm constantly fascinated and inspired by what people create with them." }
    ],
    books: [
      { year: "", title: "Never Split the Difference · Chris Voss" },
      { year: "", title: "Atomic Habits · James Clear" },
      { year: "", title: "Start With Why · Simon Sinek" }
    ]
  },

  // ---- 10 CONNECT -----------------------------------------------------------
  connect: {
    line: "Reach out to collaborate.",
    sub: "Rising junior at Babson College. I love the process of bringing a vision to life.",
    exploring: "Commercial drone services for real-estate development project management. Early idea, serious interest. If that's your industry, I want to talk to you.",
    podcastHandle: "@paradigmpodcast" // TODO: confirm handle
  }
};
