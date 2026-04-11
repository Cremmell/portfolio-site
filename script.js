/* ============================================================
   CHRIS REMMELL — PORTFOLIO SCRIPT
   Preserves all original link configuration.
   ============================================================ */

/* ── EDITABLE LINKS — update here only ── */
const LINKS = {
  github_profile:   "https://github.com/Cremmell",
  linkedin_profile: "https://www.linkedin.com/in/chris-remmell/",
  uber_repo:        "https://github.com/Cremmell/uber-case-study",
  nyc_bite_repo:    "https://github.com/Cremmell/nyc-bite-week-marketing-analytics",
  instagram_repo:   "https://github.com/Cremmell/instagram-engagement-analysis",
  resume_pdf:       "assets/Remmell.Chris.4-2026.pdf",
  email:            "mailto:chrispremmell@gmail.com"
};

/* adjust asset path on project sub-pages */
const onProjectPage = window.location.pathname.includes("/projects/");
if (onProjectPage) {
  LINKS.resume_pdf = "../assets/Remmell.Chris.3-2026.pdf";
}

/* inject all data-link hrefs */
Object.entries(LINKS).forEach(([key, value]) => {
  document.querySelectorAll(`[data-link="${key}"]`).forEach(el => {
    el.setAttribute("href", value);
  });
});

/* ── FOOTER YEAR ── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── NAV: raise on scroll ── */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("raised", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── NAV: mobile toggle ── */
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");
if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(open));
  });
  /* close on outside click */
  document.addEventListener("click", e => {
    if (!e.target.closest(".nav") && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ── LIGHTBOX GALLERY ── */
(function () {
  const grids = document.querySelectorAll(".case-img-grid");
  if (!grids.length) return;

  /* build DOM once */
  const lb       = document.createElement("div");
  lb.className   = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Image lightbox");
  lb.innerHTML = `
    <button class="lightbox-nav prev" aria-label="Previous image">&#8592;</button>
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <img class="lightbox-img" src="" alt="" />
      <p class="lightbox-caption"></p>
      <p class="lightbox-counter"></p>
    </div>
    <button class="lightbox-nav next" aria-label="Next image">&#8594;</button>
  `;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector(".lightbox-img");
  const lbCaption = lb.querySelector(".lightbox-caption");
  const lbCounter = lb.querySelector(".lightbox-counter");
  const lbClose   = lb.querySelector(".lightbox-close");
  const lbPrev    = lb.querySelector(".lightbox-nav.prev");
  const lbNext    = lb.querySelector(".lightbox-nav.next");

  let images = [];
  let current = 0;

  function show(idx) {
    current = idx;
    const fig = images[idx].closest("figure");
    lbImg.src = images[idx].src;
    lbImg.alt = images[idx].alt;
    lbCaption.textContent = fig ? (fig.querySelector("figcaption") || {}).textContent || "" : "";
    lbCounter.textContent = `${idx + 1} / ${images.length}`;
    lbPrev.disabled = idx === 0;
    lbNext.disabled = idx === images.length - 1;
  }

  function open(imgs, idx) {
    images = Array.from(imgs);
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    show(idx);
    lbClose.focus();
  }

  function close() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  grids.forEach(grid => {
    const imgs = grid.querySelectorAll("img");
    imgs.forEach((img, idx) => {
      img.addEventListener("click", () => open(imgs, idx));
    });
  });

  lbClose.addEventListener("click", close);
  lbPrev.addEventListener("click", () => show(current - 1));
  lbNext.addEventListener("click", () => show(current + 1));

  /* close on backdrop click */
  lb.addEventListener("click", e => {
    if (e.target === lb) close();
  });

  /* keyboard */
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape")      close();
    if (e.key === "ArrowLeft"  && current > 0)              show(current - 1);
    if (e.key === "ArrowRight" && current < images.length - 1) show(current + 1);
  });
})();

/* ── SCROLL REVEAL ── */
const revealTargets = document.querySelectorAll(
  ".hero, .project-card, .project-card-soon, .edu-card, .exp-block, .certs-wrap, .about-grid, .contact-card, .reveal, .case-section"
);

if ("IntersectionObserver" in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 30, 200)}ms`;
    revealObserver.observe(el);
  });
}

/* ── ACTIVE NAV LINK on scroll ── */
const sectionIds = ["projects", "skills", "education", "about", "contact"];
const sections   = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const anchors    = Array.from(document.querySelectorAll(".nav-links a"));

if ("IntersectionObserver" in window && sections.length && anchors.length) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id   = entry.target.getAttribute("id");
        const link = anchors.find(a => a.getAttribute("href") === `#${id}`);
        if (!link) return;
        anchors.forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );
  sections.forEach(s => navObserver.observe(s));
}
