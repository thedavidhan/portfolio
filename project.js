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

  /* ---------- hero image (the card photo, big) ---------- */
  if (brand.img) {
    var hero = document.getElementById("a-hero");
    var img = el("img");
    img.src = brand.img;
    img.alt = brand.name;
    img.onerror = function () { hero.remove(); };
    hero.appendChild(img);
  }

  /* ---------- body ---------- */
  var body = document.getElementById("a-body");
  article.body.forEach(function (p) { body.appendChild(el("p", null, p)); });

  /* ---------- optional external link (e.g. the UGC instagram) ---------- */
  if (article.link) {
    var la = el("a", null, article.link.label);
    la.href = article.link.url; la.target = "_blank"; la.rel = "noopener";
    document.getElementById("a-link").appendChild(la);
  }

  /* ---------- gallery ---------- */
  var files = [];
  if (article.galleryKey && window.MANIFEST) {
    var listed = window.MANIFEST[article.galleryKey];
    if (Array.isArray(listed)) files = listed.slice();
  }
  if (article.images) files = files.concat(article.images);
  // don't repeat the hero image
  files = files.filter(function (f) { return f !== brand.img && !/\.(mp4|webm)$/i.test(f); });

  var gal = document.getElementById("a-gallery");
  files.forEach(function (f) {
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
