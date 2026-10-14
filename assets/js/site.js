/* Keelu — shared script */
(function () {
  // ── Social links: fill in a URL to show the button; empty ones stay hidden.
  var SOCIAL = {
    x: "",          // e.g. https://x.com/menon_thedream
    instagram: "",  // e.g. https://www.instagram.com/menon_thedream
    threads: "",    // e.g. https://www.threads.com/@menon_thedream
    discord: ""     // e.g. https://discord.gg/xxxxxxx
  };

  var root = document.documentElement;

  function getLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    try { var s = localStorage.getItem("fm-lang"); if (s === "zh" || s === "en") return s; } catch (e) {}
    var n = (navigator.language || "").toLowerCase();
    return n.indexOf("zh") === 0 ? "zh" : "en";
  }
  function setLang(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l === "zh" ? "zh-Hant" : "en");
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
    var btns = document.querySelectorAll("[data-lang-toggle]");
    for (var i = 0; i < btns.length; i++) btns[i].textContent = l === "zh" ? "English" : "中文";
    try { localStorage.setItem("fm-lang", l); } catch (e) {}
  }
  setLang(getLang());

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-lang-toggle]");
    if (t) { setLang(root.getAttribute("data-lang") === "zh" ? "en" : "zh"); return; }
    var m = e.target.closest(".menu-btn");
    if (m) {
      var nav = document.querySelector(".nav");
      var open = nav.classList.toggle("open");
      m.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    if (e.target.closest(".nav a")) {
      var n2 = document.querySelector(".nav");
      if (n2) n2.classList.remove("open");
    }
  });

  // socials
  var links = document.querySelectorAll("[data-social]");
  for (var i = 0; i < links.length; i++) {
    var k = links[i].getAttribute("data-social");
    if (SOCIAL[k]) { links[i].href = SOCIAL[k]; links[i].hidden = false; }
    else links[i].hidden = true;
  }
  var groups = document.querySelectorAll("[data-social-group]");
  for (var g = 0; g < groups.length; g++) {
    var any = groups[g].querySelector("[data-social]:not([hidden])");
    var fb = groups[g].querySelector("[data-social-fallback]");
    if (fb) fb.hidden = !!any;
  }

  // year
  var y = document.querySelectorAll("[data-year]");
  for (var j = 0; j < y.length; j++) y[j].textContent = new Date().getFullYear();

  // reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
})();
