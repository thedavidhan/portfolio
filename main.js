/* ============================================================
   MAIN.JS — rendering + behavior. You shouldn't need to edit
   this file; everything editable lives in content.js.
   ============================================================ */

(function () {
  "use strict";
  var C = window.CONTENT;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny helpers ---------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function ph(label, extraCls) {
    var d = el("div", "ph" + (extraCls ? " " + extraCls : ""));
    d.textContent = label || "ASSET GOES HERE";
    return d;
  }

  // <img> that swaps itself for an honest labeled placeholder if missing
  function imgOrPh(src, alt, phLabel) {
    var wrap = el("div", "media-wrap");
    wrap.style.width = "100%";
    wrap.style.height = "100%";
    var img = el("img");
    img.loading = "lazy";
    img.alt = alt || "";
    img.onerror = function () { wrap.replaceChildren(ph(phLabel)); wrap.dataset.missing = "1"; };
    img.src = src;
    img.style.width = "100%"; img.style.height = "100%"; img.style.objectFit = "cover";
    wrap.appendChild(img);
    return wrap;
  }

  function videoOrPh(src, phLabel, poster) {
    var wrap = el("div", "media-wrap");
    wrap.style.width = "100%"; wrap.style.height = "100%";
    var v = document.createElement("video");
    v.muted = true; v.loop = true; v.autoplay = !reducedMotion; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    if (poster) v.poster = poster;
    v.onerror = function () { wrap.replaceChildren(ph(phLabel)); wrap.dataset.missing = "1"; };
    var s = document.createElement("source");
    s.src = src; s.type = "video/mp4";
    s.onerror = function () { wrap.replaceChildren(ph(phLabel)); wrap.dataset.missing = "1"; };
    v.appendChild(s);
    wrap.appendChild(v);
    return wrap;
  }

  function yt(id, title) {
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id;
    f.title = title || "YouTube video";
    f.loading = "lazy";
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true;
    return f;
  }

  // ---- drop-in folder system (assets/manifest.js, written by SYNC-ASSETS) ----
  // If the manifest lists files for a section, they replace that section's
  // placeholder entries. Filenames become captions: "03_gr86-fog.jpg" → "gr86 fog".
  function mList(key) {
    var M = window.MANIFEST;
    return (M && Array.isArray(M[key]) && M[key].length) ? M[key] : null;
  }
  function capFromPath(p) {
    var n = p.split("/").pop().replace(/\.[^.]+$/, "");
    return n.replace(/^[\d\s._-]+/, "").replace(/[-_]+/g, " ").trim();
  }
  function isVideoFile(p) {
    return /\.(mp4|webm)$/i.test(p);
  }

  // small COPY button that puts text on the visitor's clipboard
  function copyBtn(text) {
    var b = el("button", "copy-btn", "COPY");
    b.type = "button";
    b.setAttribute("aria-label", "Copy email address");
    b.addEventListener("click", function (e) {
      e.preventDefault();
      function done() {
        b.textContent = "COPIED ✓"; b.classList.add("did");
        setTimeout(function () { b.textContent = "COPY"; b.classList.remove("did"); }, 1600);
      }
      function fallback() {
        var t = document.createElement("textarea");
        t.value = text; t.style.position = "fixed"; t.style.left = "-9999px";
        document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); done(); } catch (err) {}
        document.body.removeChild(t);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
    });
    return b;
  }
  function natureMediaEl(src, alt, capText) {
    var m = isVideoFile(src) ? videoOrPh(src, "") : imgOrPh(src, alt, "");
    if (!isVideoFile(src)) {
      m.style.cursor = "zoom-in";
      m.addEventListener("click", function () { if (!m.dataset.missing) openLightbox(src, capText || ""); });
    }
    return m;
  }

  /* ---------- theme ---------- */

  var mapTiles = null;
  function tileUrl(dark) {
    return "https://{s}.basemaps.cartocdn.com/" + (dark ? "dark_all" : "light_all") + "/{z}/{x}/{y}{r}.png";
  }

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = t === "dark" ? "LIGHT" : "DARK";
    try { localStorage.setItem("dh-theme", t); } catch (e) {}
    if (mapTiles) mapTiles.setUrl(tileUrl(t === "dark"));
  }

  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("dh-theme"); } catch (e) {}
    var t = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(t);
    document.getElementById("theme-toggle").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur === "dark" ? "light" : "dark");
    });
  })();

  /* ---------- hero ---------- */

  document.getElementById("hero-name").textContent = C.hero.name;
  document.getElementById("hero-line1").textContent = C.hero.line1;
  document.getElementById("hero-line2").textContent = C.hero.line2;
  // assets/hero/ folder: first image (by filename) = hero, second = portrait in Connect
  var heroFiles = mList("hero");
  document.getElementById("hero-media").appendChild(
    imgOrPh(heroFiles ? heroFiles[0] : C.hero.heroImage.src, C.hero.heroImage.alt, C.hero.heroImage.ph)
  );

  (function heroMeta() {
    var strip = document.getElementById("hero-meta");
    strip.appendChild(el("span", null, C.hero.meta.location));

    var live = el("span", "hot");
    strip.appendChild(live);

    if (C.hero.meta.school) strip.appendChild(el("span", null, C.hero.meta.school));
    strip.appendChild(el("span", null, C.hero.meta.focus));

    var mailWrap = el("span", "email-wrap");
    var mail = el("a", "email-link", "SAY HI → " + C.site.email.toUpperCase());
    mail.href = "mailto:" + C.site.email;
    mailWrap.appendChild(mail);
    mailWrap.appendChild(copyBtn(C.site.email));
    strip.appendChild(mailWrap);

    var linked = (C.site.socials || []).filter(function (s) { return s.label === "LinkedIn" && s.url; })[0];
    if (linked) {
      var la = el("a", "meta-link", "LINKEDIN ↗");
      la.href = linked.url; la.target = "_blank"; la.rel = "noopener";
      strip.appendChild(la);
    }

    var mode = C.site.heroElement;

    if (mode === "clock") {
      function tick() {
        var now = new Date();
        var hm = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York" });
        var hour = parseInt(now.toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "America/New_York" }), 10);
        var word = hour < 5 ? "at night" : hour < 12 ? "in the morning" : hour < 17 ? "in the afternoon" : hour < 21 ? "in the evening" : "at night";
        var s = "It is currently " + hm + " " + word + " for me";
        live.textContent = s;
        var f = document.getElementById("footer-clock");
        if (f) f.textContent = s;
      }
      tick();
      setInterval(tick, 1000);
    } else if (mode === "counter") {
      var c = C.hero.meta.counter;
      live.textContent = c.prefix + "0 " + c.label;
      if (reducedMotion) {
        live.textContent = c.prefix + c.value.toLocaleString() + c.suffix + " " + c.label;
      } else {
        var t0 = null, dur = 1800;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
          live.textContent = c.prefix + Math.round(c.value * e).toLocaleString() + (p === 1 ? c.suffix : "") + " " + c.label;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    } else if (mode === "cursor") {
      live.textContent = "CUR 0000 × 0000";
      if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", function (e) {
          live.textContent = "CUR " +
            String(Math.round(e.clientX)).padStart(4, "0") + " × " +
            String(Math.round(e.clientY)).padStart(4, "0");
        });
      }
    }
    if (mode !== "clock") {
      var f = document.getElementById("footer-clock");
      if (f) f.textContent = "EST. 2022, STILL BUILDING";
    }
  })();

  /* ---------- 00 origin story ---------- */

  (function origin() {
    var wrap = document.getElementById("origin-paras");
    C.origin.paras.forEach(function (p) {
      wrap.appendChild(el("p", "rv", p));
    });
  })();

  /* ---------- 01 brands ---------- */

  (function brands() {
    var grid = document.getElementById("brand-grid");
    C.brands.forEach(function (b) {
      var card = el("article", "card rv");
      var top = el("div", "card-top");
      top.appendChild(el("span", "card-code", b.code));
      top.appendChild(el("span", "card-years", b.years));
      card.appendChild(top);
      if (b.img) {
        var media = el("div", "card-media");
        media.appendChild(imgOrPh(b.img, b.name, "PHOTO · " + b.name.toUpperCase()));
        card.appendChild(media);
      }
      card.appendChild(el("h3", null, b.name));
      card.appendChild(el("p", "card-role", b.role));
      card.appendChild(el("p", "card-desc", b.desc));
      var bot = el("div", "card-bottom");
      bot.appendChild(el("span", "status" + (b.status === "ACTIVE" ? " s-active" : ""), b.status));
      if (b.cred) bot.appendChild(el("span", "card-cred", b.cred));
      card.appendChild(bot);
      grid.appendChild(card);
    });
  })();

  /* ---------- 02 clothing ---------- */

  (function clothing() {
    document.getElementById("buc-intro").textContent = C.clothing.bucIntro;

    var m = document.getElementById("buc-metrics");
    C.clothing.bucMetrics.forEach(function (t) { m.appendChild(el("span", null, t)); });

    var vs = document.getElementById("buc-volumes");
    var volFiles = mList("buc-volumes");
    if (volFiles) {
      volFiles.forEach(function (f) {
        var card = el("div", "volume rv");
        var m = imgOrPh(f, "BUC " + capFromPath(f), "");
        m.classList.add("volume-img");
        var im = m.querySelector("img");
        if (im) im.style.objectFit = "contain";
        m.style.cursor = "zoom-in";
        m.addEventListener("click", function () { if (!m.dataset.missing) openLightbox(f, capFromPath(f)); });
        card.appendChild(m);
        var lab = el("div", "volume-label");
        lab.appendChild(el("span", null, capFromPath(f)));
        card.appendChild(lab);
        vs.appendChild(card);
      });
    } else {
      C.clothing.volumes.forEach(function (v) {
        var card = el("div", "volume rv");
        var m = el("div", "volume-img");
        m.appendChild(ph("IMAGE · " + v.name + " · front+back in one wide image · assets/buc/volumes/"));
        card.appendChild(m);
        var lab = el("div", "volume-label");
        lab.appendChild(el("span", null, v.name));
        lab.appendChild(el("span", null, v.note));
        card.appendChild(lab);
        vs.appendChild(card);
      });
    }

    var pr = document.getElementById("buc-process");
    C.clothing.process.forEach(function (p) {
      var item = el("div", "process-item rv");
      item.appendChild(imgOrPh(p.src, p.label, p.ph));
      item.appendChild(el("p", "process-label", p.label));
      pr.appendChild(item);
    });

    var bg = document.getElementById("buc-gallery");
    var bucExtra = mList("buc");
    if (bucExtra) {
      bucExtra.forEach(function (f) {
        var w = el("div", "rv");
        var m = imgOrPh(f, "BUC: " + capFromPath(f), "");
        m.style.cursor = "zoom-in";
        m.addEventListener("click", function () { if (!m.dataset.missing) openLightbox(f, capFromPath(f)); });
        w.appendChild(m);
        bg.appendChild(w);
      });
    }

    document.getElementById("floral-intro").textContent = C.clothing.floral.intro;
    document.getElementById("floral-note").textContent = C.clothing.floral.note;
    var fi = document.getElementById("floral-images");
    C.clothing.floral.images.forEach(function (im) {
      var w = el("div", "rv");
      w.appendChild(imgOrPh(im.src, "Floral Streetwear", im.ph));
      fi.appendChild(w);
    });

    if (C.clothing.floral.banner) {
      var fb = document.getElementById("floral-banner");
      var bw = imgOrPh(C.clothing.floral.banner.src, "Floral rose design", C.clothing.floral.banner.ph);
      var bi = bw.querySelector("img");
      if (bi) { bi.style.height = "auto"; bi.style.objectFit = "unset"; }
      fb.appendChild(bw);
    }

    document.getElementById("matcha-note").textContent = C.clothing.matchaVans;
  })();

  /* ---------- 03 vending ---------- */

  (function vending() {
    if (C.vending.logo) {
      var vl = document.getElementById("vending-logo");
      var logoImg = el("img");
      logoImg.src = C.vending.logo;
      logoImg.alt = "Han Vending logo";
      logoImg.onerror = function () { vl.remove(); };
      vl.appendChild(logoImg);
    }

    var frame = document.getElementById("vending-video");
    if (C.vending.youtubeId) {
      frame.appendChild(yt(C.vending.youtubeId, "The Vending Machine Guy"));
    } else {
      frame.appendChild(ph("VIDEO · paste the Babson application video ID in content.js"));
    }
    document.getElementById("vending-video-line").textContent = C.vending.videoLine;
    document.getElementById("vending-body").textContent = C.vending.body;

    var m = document.getElementById("vending-metrics");
    C.vending.metrics.forEach(function (t) { m.appendChild(el("span", null, t)); });

    var row = document.getElementById("vending-photos");
    var photos = C.vending.photos;
    var mf = mList("vending");
    if (mf) {
      photos = mf.filter(function (f) { return f !== C.vending.logo; })
                 .map(function (f) { return { src: f, ph: "" }; });
    }
    photos.forEach(function (p) {
      var w = el("div", "rv");
      w.appendChild(imgOrPh(p.src, "Vending machine photo", p.ph));
      row.appendChild(w);
    });
  })();

  /* ---------- 04 cars: reel + gallery ---------- */

  (function reel() {
    var reelWrap = document.getElementById("reel");
    var media = document.getElementById("reel-media");
    var linesWrap = document.getElementById("reel-lines");

    // assets/car-reel/ folder: first video = the reel, optional image = poster frame
    var reelFiles = mList("car-reel") || [];
    var reelVideo = reelFiles.filter(isVideoFile)[0] || C.cars.reel.video;
    var reelPoster = reelFiles.filter(function (f) { return !isVideoFile(f); })[0] || C.cars.reel.poster;
    media.appendChild(videoOrPh(reelVideo, C.cars.reel.ph, reelPoster));

    var lines = C.cars.reel.lines.map(function (t) {
      var l = el("p", "reel-line", t);
      linesWrap.appendChild(l);
      return l;
    });

    if (reducedMotion) {
      reelWrap.classList.add("reel-static");
      lines.forEach(function (l) { l.classList.add("live"); });
      return;
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var rect = reelWrap.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height - vh;
        var progress = Math.min(Math.max(-rect.top / total, 0), 1);
        var idx = Math.min(Math.floor(progress * lines.length), lines.length - 1);
        lines.forEach(function (l, i) { l.classList.toggle("live", i === idx); });
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  (function gallery() {
    var g = document.getElementById("car-gallery");
    var items = C.cars.gallery;
    var mf = mList("cars");
    if (mf) items = mf.map(function (f) { return { src: f, cap: capFromPath(f) }; });
    items.forEach(function (item, i) {
      var b = el("button", "m-item");
      b.type = "button";
      b.setAttribute("aria-label", "Open photo " + (i + 1));
      var w = imgOrPh(item.src, item.cap || "Car photo " + (i + 1), "PHOTO · CAR " + String(i + 1).padStart(2, "0"));
      b.appendChild(w);
      if (item.cap) b.appendChild(el("p", "m-cap", item.cap));
      b.addEventListener("click", function () {
        if (w.dataset.missing) return;
        openLightbox(item.src, item.cap || "");
      });
      g.appendChild(b);
    });
  })();

  /* ---------- 05 leadership ---------- */

  (function leadership() {
    document.getElementById("leadership-intro").textContent = C.leadership.intro;

    var cg = document.getElementById("clubs-grid");
    var CL = (window.MANIFEST && window.MANIFEST.clubs) || {};
    C.leadership.clubs.forEach(function (c) {
      var tile = el("div", "club-tile rv");
      tile.appendChild(el("p", "club-name", c.name));
      if (c.role) tile.appendChild(el("p", "club-role", c.role));
      if (c.line) tile.appendChild(el("p", "club-line", c.line));
      var files = Array.isArray(CL[c.key]) ? CL[c.key] : [];
      var stack = el("div", "club-photos");
      if (files.length) {
        files.forEach(function (f) {
          var m = natureMediaEl(f, c.name, c.name);
          var im = m.querySelector("img");
          if (im) { im.style.height = "auto"; im.style.objectFit = "unset"; }
          stack.appendChild(m);
        });
      } else {
        stack.appendChild(ph("PHOTO · drop into assets/clubs/" + c.key + "/"));
      }
      tile.appendChild(stack);
      cg.appendChild(tile);
    });

    document.getElementById("mcfe-line").textContent = C.leadership.mcfe.line;
    var ms = document.getElementById("mcfe-slides");
    var slides = mList("mcfe");
    if (slides) {
      slides.forEach(function (f, i) {
        var item = el("div", "s-item rv");
        var m = imgOrPh(f, "MCFE slide " + (i + 1), "");
        m.style.cursor = "zoom-in";
        m.addEventListener("click", function () { if (!m.dataset.missing) openLightbox(f, "MCFE · Koko FitClub"); });
        item.appendChild(m);
        ms.appendChild(item);
      });
    } else {
      ["SLIDE · export deck pages as PNG", "SLIDE · into assets/mcfe/", "SLIDE · then run SYNC-ASSETS.bat"].forEach(function (t) {
        var item = el("div", "s-item");
        item.appendChild(ph(t));
        ms.appendChild(item);
      });
    }
    var grid = document.getElementById("leadership-videos");

    // YouTube-linked videos from content.js (paste IDs there)
    var linkedVids = C.leadership.videos.filter(function (v) { return v.youtubeId; });
    linkedVids.forEach(function (v) {
      var item = el("div", "vg-item rv");
      var mediaBox = el("div", "vg-media");
      mediaBox.appendChild(yt(v.youtubeId, v.title));
      item.appendChild(mediaBox);
      item.appendChild(el("p", "vg-title", v.title));
      grid.appendChild(item);
    });

    // mp4s dropped into assets/campus-videos/ (reels, tower tour, car club edits)
    var localVids = mList("campus-videos");
    if (localVids) {
      localVids.forEach(function (f) {
        var item = el("div", "vg-item rv");
        var mediaBox = el("div", "vg-media vg-video");
        var vv = document.createElement("video");
        vv.src = f;
        vv.controls = true;
        vv.preload = "metadata";
        vv.playsInline = true;
        vv.setAttribute("playsinline", "");
        mediaBox.appendChild(vv);
        item.appendChild(mediaBox);
        item.appendChild(el("p", "vg-title", capFromPath(f)));
        grid.appendChild(item);
      });
    }

    // placeholders only when there's nothing at all
    if (!linkedVids.length && !localVids) {
      C.leadership.videos.forEach(function (v) {
        var item = el("div", "vg-item rv");
        var mediaBox = el("div", "vg-media");
        mediaBox.appendChild(ph(v.ph));
        item.appendChild(mediaBox);
        item.appendChild(el("p", "vg-title", v.title));
        grid.appendChild(item);
      });
    }

    var pg = document.getElementById("poster-grid");
    var posters = mList("posters");
    if (posters) {
      posters.forEach(function (f) {
        var item = el("div", "p-item rv");
        var m = imgOrPh(f, "Poster: " + capFromPath(f), "");
        m.style.cursor = "zoom-in";
        m.addEventListener("click", function () { if (!m.dataset.missing) openLightbox(f, capFromPath(f)); });
        item.appendChild(m);
        item.appendChild(el("p", "m-cap", capFromPath(f)));
        pg.appendChild(item);
      });
    } else {
      ["POSTER · drop files into assets/posters/", "POSTER · filename becomes the caption", "POSTER · then run SYNC-ASSETS.bat", "POSTER · car club, ONE, BUC, anything"].forEach(function (t) {
        var item = el("div", "p-item");
        item.appendChild(ph(t));
        pg.appendChild(item);
      });
    }
  })();

  /* ---------- 06 podcast ---------- */

  (function podcast() {
    document.getElementById("podcast-premise").textContent = C.podcast.premise;
    document.getElementById("podcast-status").textContent = C.podcast.statusLine;

    var grid = document.getElementById("podcast-episodes");
    C.podcast.episodes.forEach(function (e) {
      var item = el("div", "vg-item rv");
      var mediaBox = el("div", "vg-media");
      if (e.youtubeId) mediaBox.appendChild(yt(e.youtubeId, e.title));
      else mediaBox.appendChild(ph(e.ph));
      item.appendChild(mediaBox);
      item.appendChild(el("p", "vg-title", e.title));
      item.appendChild(el("p", "vg-sub", e.guest));
      grid.appendChild(item);
    });

    var sub = document.getElementById("podcast-subscribe");
    C.podcast.subscribe.forEach(function (s) {
      if (s.url) {
        var a = el("a", null, s.label + " ↗");
        a.href = s.url; a.target = "_blank"; a.rel = "noopener";
        sub.appendChild(a);
      } else {
        sub.appendChild(el("span", "dead", s.label + " · SOON"));
      }
    });

    document.getElementById("broco-line").textContent = C.podcast.broCo.line;
    var bp = document.getElementById("broco-photos");
    var broFiles = mList("bro-and-co");
    if (broFiles) {
      broFiles.forEach(function (f) {
        var w = el("div", "rv");
        w.appendChild(natureMediaEl(f, "Bro & Co production", capFromPath(f)));
        bp.appendChild(w);
      });
    } else {
      ["PHOTO · production build-out", "PHOTO · the setup", "PHOTO · drop files in assets/bro-and-co/"].forEach(function (t) {
        var w = el("div");
        w.appendChild(ph(t));
        bp.appendChild(w);
      });
    }

    var guest = document.getElementById("podcast-guest");
    var g1 = el("a", null, "BE A GUEST →");
    g1.href = "mailto:" + C.site.email + "?subject=" + encodeURIComponent("Paradigm: I'd like to be a guest");
    var g2 = el("a", null, "SUGGEST A GUEST →");
    g2.href = "mailto:" + C.site.email + "?subject=" + encodeURIComponent("Paradigm: guest suggestion");
    guest.appendChild(g1); guest.appendChild(g2);
  })();

  /* ---------- 07 travel map ---------- */

  (function travelMap() {
    var mapDiv = document.getElementById("travel-map");
    if (typeof L === "undefined") {
      mapDiv.replaceChildren(ph("MAP · needs an internet connection to load tiles"));
      return;
    }

    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var map = L.map(mapDiv, { scrollWheelZoom: false, worldCopyJump: true });
    mapTiles = L.tileLayer(tileUrl(isDark), {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 12
    }).addTo(map);

    var panel = document.getElementById("map-panel");
    var bounds = [];

    C.places.forEach(function (p) {
      bounds.push(p.coords);
      var icon = L.divIcon({
        className: "",
        html: '<div class="pin-' + p.status + '"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      var marker = L.marker(p.coords, { icon: icon, title: p.name, keyboard: true }).addTo(map);
      marker.on("click", function () { showPlace(p); });
    });

    if (bounds.length) map.fitBounds(bounds, { padding: [40, 40] });

    function showPlace(p) {
      panel.replaceChildren();
      var h = el("h3", null, p.name);
      if (p.sample) {
        var tag = el("span", "sample-tag", "SAMPLE · EDIT IN CONTENT.JS");
        h.appendChild(tag);
      }
      panel.appendChild(h);
      panel.appendChild(el("p", "panel-status", p.status === "been" ? "● BEEN" : "○ PLANNED"));
      if (p.rec) panel.appendChild(el("p", "panel-rec", p.rec));
      var photos = p.photos || [];
      var M = window.MANIFEST;
      if (M && M.travel && p.folder && M.travel[p.folder] && M.travel[p.folder].length) {
        photos = M.travel[p.folder].map(function (f) { return { src: f, ph: "" }; });
      }
      if (photos.length) {
        var pp = el("div", "panel-photos");
        photos.forEach(function (photo) {
          var w = imgOrPh(photo.src, p.name, photo.ph);
          w.style.cursor = "zoom-in";
          w.addEventListener("click", function () {
            if (!w.dataset.missing) openLightbox(photo.src, p.name);
          });
          pp.appendChild(w);
        });
        panel.appendChild(pp);
      }
      var natureList = (M && M.nature && p.folder && Array.isArray(M.nature[p.folder])) ? M.nature[p.folder] : [];
      if (natureList.length) {
        panel.appendChild(el("p", "panel-nature-label mono", "// NATURE"));
        var np = el("div", "panel-photos");
        natureList.forEach(function (f) {
          np.appendChild(natureMediaEl(f, p.name + " nature", p.name));
        });
        panel.appendChild(np);
      }
      if (window.innerWidth < 900) panel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
    }
  })();

  /* ---------- suggestion form ---------- */

  (function suggestForm() {
    var form = document.getElementById("suggest-form");
    var msg = document.getElementById("form-msg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      if (data.get("_gotcha")) return; // honeypot

      var place = (data.get("place") || "").trim();
      var sug = (data.get("suggestion") || "").trim();
      if (!place || !sug) { msg.textContent = "// BOTH FIELDS, PLEASE"; return; }

      if (!C.site.formspreeId) {
        // Not wired to Formspree yet — fall back to email, honestly.
        var body = "Place: " + place + "\nSuggestion: " + sug + "\nFrom: " + (data.get("from") || "anonymous");
        window.location.href = "mailto:" + C.site.email +
          "?subject=" + encodeURIComponent("Travel map suggestion: " + place) +
          "&body=" + encodeURIComponent(body);
        msg.textContent = "// FORM NOT WIRED YET. OPENING EMAIL INSTEAD";
        return;
      }

      msg.textContent = "// SENDING…";
      fetch("https://formspree.io/f/" + C.site.formspreeId, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      }).then(function (r) {
        if (r.ok) { msg.textContent = "// SENT. I READ ALL OF THESE. THANKS."; form.reset(); }
        else { msg.textContent = "// SOMETHING BROKE. EMAIL ME INSTEAD: " + C.site.email.toUpperCase(); }
      }).catch(function () {
        msg.textContent = "// NETWORK ERROR. EMAIL ME INSTEAD: " + C.site.email.toUpperCase();
      });
    });
  })();

  /* ---------- 08 climbing ---------- */

  (function climbing() {
    document.getElementById("climb-intro").textContent = C.climbing.intro;

    var tl = document.getElementById("climb-timeline");
    C.climbing.timeline.forEach(function (t) {
      var li = el("li");
      li.appendChild(el("span", "tl-tag", t.tag));
      li.appendChild(el("span", null, t.event));
      tl.appendChild(li);
    });

    var prd = document.getElementById("climb-prd");
    prd.classList.add("rv");
    prd.appendChild(el("p", "prd-title", "// " + C.climbing.prd.title));
    prd.appendChild(el("p", "prd-body", C.climbing.prd.body));
    prd.appendChild(el("p", "prd-status", C.climbing.prd.status));

    var row = document.getElementById("climb-photos");
    var photos = C.climbing.photos;
    var mf = mList("climbing");
    if (mf) photos = mf.map(function (f) { return { src: f, ph: "" }; });
    photos.forEach(function (p) {
      var w = el("div", "rv");
      var m = imgOrPh(p.src, "Climbing photo", p.ph);
      m.style.cursor = "zoom-in";
      m.addEventListener("click", function () { if (!m.dataset.missing) openLightbox(p.src, ""); });
      w.appendChild(m);
      row.appendChild(w);
    });
  })();

  /* ---------- 09 interests ---------- */

  (function interests() {
    // Concert lighting + Buildings blocks are removed from the page for now.
    // Their render code is kept behind these guards; re-add the HTML blocks
    // in index.html and they come back to life.
    var lightingIntro = document.getElementById("lighting-intro");
    if (lightingIntro) {
      lightingIntro.textContent = C.interests.lighting.intro;
      var clips = document.getElementById("lighting-clips");
      var clipData = C.interests.lighting.clips;
      var lFiles = mList("lighting");
      if (lFiles) clipData = lFiles.map(function (f) { return { src: f, why: capFromPath(f) || "study", ph: "" }; });
      clipData.forEach(function (c) {
        var item = el("div", "clip-item rv");
        item.appendChild(videoOrPh(c.src, c.ph));
        item.appendChild(el("p", "clip-why", c.why));
        clips.appendChild(item);
      });
    }

    var stack = document.getElementById("building-stack");
    if (stack) {
      var bFiles = mList("buildings");
      var buildings = bFiles ? bFiles.map(function (f) { return { src: f, cap: capFromPath(f), ph: "" }; }) : C.interests.buildings;
      buildings.forEach(function (b) {
        var w = el("div", "rv");
        w.appendChild(videoOrPh(b.src, b.ph));
        if (b.cap) w.appendChild(el("p", "m-cap", b.cap));
        stack.appendChild(w);
      });
    }

    var ng = document.getElementById("nature-grid");
    var N = (window.MANIFEST && window.MANIFEST.nature) || {};
    var natureFiles = [];
    Object.keys(N).forEach(function (k) {
      (Array.isArray(N[k]) ? N[k] : []).forEach(function (f) { natureFiles.push({ src: f, place: k }); });
    });
    if (natureFiles.length) {
      natureFiles.forEach(function (n) {
        var item = el("div", "n-item rv");
        item.appendChild(natureMediaEl(n.src, "Nature, " + n.place, n.place));
        item.appendChild(el("p", "m-cap", n.place));
        ng.appendChild(item);
      });
    } else {
      ["PHOTO/CLIP · drop files into assets/nature/<place>/", "PHOTO/CLIP · folder name links it to that map pin", "PHOTO/CLIP · then run SYNC-ASSETS.bat"].forEach(function (t) {
        var item = el("div", "n-item");
        item.appendChild(ph(t));
        ng.appendChild(item);
      });
    }

    var tech = document.getElementById("tech-list");
    C.interests.tech.forEach(function (t) {
      var li = el("li", "rv");
      li.appendChild(el("p", "t-name", t.name));
      li.appendChild(el("p", "t-line", t.line));
      tech.appendChild(li);
    });

    var sw = document.getElementById("software-list");
    C.interests.software.forEach(function (t) {
      var li = el("li", "rv");
      li.appendChild(el("p", "t-name", t.name));
      li.appendChild(el("p", "t-line", t.line));
      sw.appendChild(li);
    });

    var books = document.getElementById("book-list");
    C.interests.books.forEach(function (b) {
      var li = el("li");
      li.appendChild(el("span", "b-year", b.year));
      li.appendChild(el("span", null, b.title));
      books.appendChild(li);
    });
  })();

  /* ---------- 10 connect ---------- */

  (function connect() {
    document.getElementById("connect-line").textContent = C.connect.line;
    var sub = document.getElementById("connect-sub");
    if (sub && C.connect.sub) sub.textContent = C.connect.sub;

    var links = document.getElementById("connect-links");
    var mailRow = el("div", "link-row");
    mailRow.appendChild(el("span", null, "EMAIL"));
    var right = el("span", "email-right");
    var addr = el("a", "email-link", C.site.email.toUpperCase());
    addr.href = "mailto:" + C.site.email;
    right.appendChild(addr);
    right.appendChild(copyBtn(C.site.email));
    mailRow.appendChild(right);
    links.appendChild(mailRow);

    C.site.socials.forEach(function (s) {
      var a = el("a", s.url ? null : "dead");
      if (s.url) { a.href = s.url; a.target = "_blank"; a.rel = "noopener"; }
      a.appendChild(el("span", null, s.label.toUpperCase()));
      a.appendChild(el("span", null, s.url ? "↗" : "SOON"));
      links.appendChild(a);
    });

    var pod = el("a");
    pod.href = "#podcast";
    pod.appendChild(el("span", null, "PARADIGM PODCAST"));
    pod.appendChild(el("span", null, C.connect.podcastHandle.toUpperCase()));
    links.appendChild(pod);

    document.getElementById("portrait").appendChild(
      imgOrPh((heroFiles && heroFiles[1]) ? heroFiles[1] : C.hero.portrait.src, C.hero.portrait.alt, C.hero.portrait.ph)
    );
  })();

  /* ---------- lightbox ---------- */

  var lightbox = document.getElementById("lightbox");
  var lightboxBody = document.getElementById("lightbox-body");
  var lightboxCap = document.getElementById("lightbox-cap");
  var lightboxClose = document.getElementById("lightbox-close");
  var lastFocus = null;

  function openLightbox(src, cap) {
    lastFocus = document.activeElement;
    var img = el("img");
    img.src = src; img.alt = cap || "";
    lightboxBody.replaceChildren(img);
    lightboxCap.textContent = cap || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxBody.replaceChildren();
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

  /* ---------- scroll reveals ---------- */

  if (!reducedMotion && "IntersectionObserver" in window) {
    document.querySelectorAll(".sec-head, .metric-strip, .video-frame").forEach(function (n) { n.classList.add("rv"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach(function (n) { io.observe(n); });
  } else {
    document.querySelectorAll(".rv").forEach(function (n) { n.classList.add("on"); });
  }

})();
