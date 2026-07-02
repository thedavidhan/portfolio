/* ============================================================
   PROJECT.JS — renders project.html?p=<code> from content.js.
   One template, every article. Edit words in content.js only.
   ============================================================ */

(function () {
  "use strict";
  var C = window.CONTENT;

  /* ---------- theme (same behavior as the main page) ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = t === "dark" ? "LIGHT" : "DARK";
    try { localStorage.setItem("dh-theme", t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("dh-theme"); } catch (e) {}
  applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  document.getElementById("theme-toggle").addEventListener("click", function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  /* ---------- find the project ---------- */
  var slug = (new URLSearchParams(location.search).get("p") || "").toLowerCase();
  var article = (C.articles || {})[slug];
  var brand = null;
  C.brands.forEach(function (b) { if (b.code.toLowerCase() === slug) brand = b; });

  if (!article || !brand) {
    document.getElementById("a-marker").textContent = "// 404";
    document.getElementById("a-title").textContent = "No such project";
    var back = el("p", "body-copy");
    var a = el("a", null, "Back to the site");
    a.href = "index.html";
    back.appendChild(a);
    document.getElementById("a-body").appendChild(back);
    return;
  }

  document.title = "David Han · " + article.title;

  /* ---------- header ---------- */
  document.getElementById("a-marker").textContent = "// " + brand.code + " · " + brand.name.toUpperCase();
  document.getElementById("a-title").textContent = article.title;

  var meta = document.getElementById("a-meta");
  [brand.years, brand.role, brand.status, brand.cred].forEach(function (t) {
    if (t) meta.appendChild(el("span", null, t));
  });

  /* ---------- YouTube embed (e.g. the vending origin video) ---------- */
  if (article.youtubeId) {
    var vidWrap = el("div", "video-frame");
    var f2 = document.createElement("iframe");
    f2.src = "https://www.youtube-nocookie.com/embed/" + article.youtubeId;
    f2.title = article.title;
    f2.loading = "lazy";
    f2.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share";
    f2.allowFullscreen = true;
    vidWrap.appendChild(f2);
    var heroSlot = document.getElementById("a-hero");
    heroSlot.appendChild(vidWrap);
    if (article.videoLine) heroSlot.appendChild(el("p", "video-caption mono", article.videoLine));
  } else if (brand.img) {
    /* ---------- hero image (the card photo, big) ---------- */
    var hero = document.getElementById("a-hero");
    var img = el("img");
    img.src = brand.img;
    img.alt = brand.name;
    img.onerror = function () { hero.remove(); };
    hero.appendChild(img);
  }

  /* ---------- brand logo beside the title ---------- */
  if (article.logo) {
    var h1El = document.getElementById("a-title");
    var row = el("div", "a-title-row");
    var lg = el("img", "article-logo");
    lg.src = article.logo;
    lg.alt = brand.name + " logo";
    lg.onerror = function () { lg.remove(); };
    h1El.parentNode.insertBefore(row, h1El);
    row.appendChild(lg);
    row.appendChild(h1El);
  }

  /* ---------- faint watermark behind the page ---------- */
  if (article.watermark) {
    var wm = el("img", "article-watermark");
    wm.src = article.watermark;
    wm.alt = "";
    wm.setAttribute("aria-hidden", "true");
    wm.onerror = function () { wm.remove(); };
    document.body.appendChild(wm);
  }

  /* ---------- metrics strip ---------- */
  if (article.metrics) {
    var ms = el("div", "metric-strip mono");
    article.metrics.forEach(function (t) { ms.appendChild(el("span", null, t)); });
    document.getElementById("a-body").appendChild(ms);
  }

  /* ---------- body ---------- */
  var body = document.getElementById("a-body");
  article.body.forEach(function (p) { body.appendChild(el("p", null, p)); });

  /* ---------- optional links / actions ---------- */
  var linkRow = document.getElementById("a-link");
  var actions = [];
  if (article.link) actions.push(article.link);
  if (article.actions) actions = actions.concat(article.actions);
  actions.forEach(function (ac) {
    var la = el("a", null, ac.label);
    la.href = ac.url;
    if (/^https?:/i.test(ac.url)) { la.target = "_blank"; la.rel = "noopener"; }
    linkRow.appendChild(la);
  });

  /* ---------- gallery (images + playable videos) ---------- */
  var files = [];
  var keys = [];
  if (article.galleryKey) keys.push(article.galleryKey);
  if (article.galleryKeys) keys = keys.concat(article.galleryKeys);
  keys.forEach(function (key) {
    var listed = window.MANIFEST ? window.MANIFEST[key] : null;
    if (Array.isArray(listed)) {
      files = files.concat(listed);
    } else if (listed && typeof listed === "object") {
      Object.keys(listed).forEach(function (k) {
        if (Array.isArray(listed[k])) files = files.concat(listed[k]);
      });
    }
  });
  if (article.images) files = files.concat(article.images);
  // de-dupe + don't repeat the hero image
  var seen = {};
  files = files.filter(function (f) {
    if (seen[f] || f === brand.img || f === article.logo || f === article.watermark) return false;
    seen[f] = 1;
    return true;
  });

  var gal = document.getElementById("a-gallery");
  files.forEach(function (f) {
    if (/\.(mp4|webm)$/i.test(f)) {
      var vw = el("div", "g-item g-video");
      var v = document.createElement("video");
      v.src = f;
      v.controls = true;
      v.preload = "metadata";
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      vw.appendChild(v);
      gal.appendChild(vw);
      return;
    }
    var w = el("button", "g-item");
    w.type = "button";
    var img = el("img");
    img.loading = "lazy";
    img.src = f;
    img.alt = article.title;
    img.onerror = function () { w.remove(); };
    w.appendChild(img);
    w.addEventListener("click", function () { openLightbox(f); });
    gal.appendChild(w);
  });

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxBody = document.getElementById("lightbox-body");
  var lightboxClose = document.getElementById("lightbox-close");
  function openLightbox(src) {
    var img = el("img");
    img.src = src;
    lightboxBody.replaceChildren(img);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxBody.replaceChildren();
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
})();
