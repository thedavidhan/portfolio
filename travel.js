/* ============================================================
   TRAVEL.JS — the travel page: map, pins, panel, suggestion
   form, nature grid. Places live in content.js > places.
   ============================================================ */

(function () {
  "use strict";
  var C = window.CONTENT;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mapTiles = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function ph(label) {
    var d = el("div", "ph");
    d.textContent = label || "ASSET GOES HERE";
    return d;
  }
  function isVideoFile(p) { return /\.(mp4|webm)$/i.test(p); }
  function tileUrl(dark) {
    return "https://{s}.basemaps.cartocdn.com/" + (dark ? "dark_all" : "light_all") + "/{z}/{x}/{y}{r}.png";
  }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = t === "dark" ? "LIGHT" : "DARK";
    try { localStorage.setItem("dh-theme", t); } catch (e) {}
    if (mapTiles) mapTiles.setUrl(tileUrl(t === "dark"));
  }
  var saved = null;
  try { saved = localStorage.getItem("dh-theme"); } catch (e) {}
  applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  document.getElementById("theme-toggle").addEventListener("click", function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---------- media helper (image w/ hide-on-404, video w/ loop) ---------- */
  function mediaEl(src, alt, capText) {
    var wrap = el("div", "media-wrap");
    wrap.style.width = "100%"; wrap.style.height = "100%";
    if (isVideoFile(src)) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.autoplay = !reducedMotion; v.playsInline = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.onerror = function () { wrap.style.display = "none"; };
      v.src = src;
      v.style.width = "100%"; v.style.height = "100%"; v.style.objectFit = "cover";
      wrap.appendChild(v);
      return wrap;
    }
    var img = el("img");
    img.loading = "lazy";
    img.alt = alt || "";
    img.onerror = function () { wrap.style.display = "none"; };
    img.src = src;
    img.style.width = "100%"; img.style.height = "100%"; img.style.objectFit = "cover";
    wrap.appendChild(img);
    img.style.cursor = "zoom-in";
    img.addEventListener("click", function () { openLightbox(src, capText || ""); });
    return wrap;
  }

  /* ---------- map ---------- */
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
      panel.appendChild(el("h3", null, p.name));
      panel.appendChild(el("p", "panel-status", p.status === "been" ? "● BEEN" : "○ PLANNED"));
      if (p.rec) panel.appendChild(el("p", "panel-rec", p.rec));

      var M = window.MANIFEST || {};
      var photos = [];
      if (M.travel && p.folder && Array.isArray(M.travel[p.folder])) photos = photos.concat(M.travel[p.folder]);
      if (photos.length) {
        var pp = el("div", "panel-photos");
        photos.forEach(function (f) { pp.appendChild(mediaEl(f, p.name, p.name)); });
        panel.appendChild(pp);
      }
      var natureList = (M.nature && p.folder && Array.isArray(M.nature[p.folder])) ? M.nature[p.folder] : [];
      if (natureList.length) {
        panel.appendChild(el("p", "panel-nature-label mono", "// NATURE"));
        var np = el("div", "panel-photos");
        natureList.forEach(function (f) { np.appendChild(mediaEl(f, p.name + " nature", p.name)); });
        panel.appendChild(np);
      }
      if (!photos.length && !natureList.length) {
        panel.appendChild(el("p", "panel-rec", "Photos coming."));
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
      if (data.get("_gotcha")) return;
      var place = (data.get("place") || "").trim();
      var sug = (data.get("suggestion") || "").trim();
      if (!place || !sug) { msg.textContent = "// BOTH FIELDS, PLEASE"; return; }
      if (!C.site.formspreeId) {
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

  /* ---------- nature grid ---------- */
  (function nature() {
    var ng = document.getElementById("nature-grid");
    var N = (window.MANIFEST && window.MANIFEST.nature) || {};
    var natureFiles = [];
    Object.keys(N).forEach(function (k) {
      (Array.isArray(N[k]) ? N[k] : []).forEach(function (f) { natureFiles.push({ src: f, place: k }); });
    });
    if (natureFiles.length) {
      natureFiles.forEach(function (n) {
        var item = el("div", "n-item");
        item.appendChild(mediaEl(n.src, "Nature, " + n.place, n.place));
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
  })();

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxBody = document.getElementById("lightbox-body");
  var lightboxCap = document.getElementById("lightbox-cap");
  var lightboxClose = document.getElementById("lightbox-close");
  function openLightbox(src, cap) {
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
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
})();
