// /Users/cremmell/Documents/New project/script.js
/*
  EDITABLE LINKS BLOCK
  Update all personal links here in one place.
*/
const LINKS = {
  github_profile: "https://github.com/Cremmell",
  linkedin_profile: "https://www.linkedin.com/in/chris-remmell/",
  uber_repo: "https://github.com/Cremmell/uber-case-study",
  nyc_bite_repo: "https://github.com/Cremmell/nyc-bite-week-marketing-analytics",
  resume_pdf: "assets/Remmell.Chris.3-2026.pdf",
  email: "chrispremmell@gmail.com"
};

const onProjectPage = window.location.pathname.includes("/projects/");
if (onProjectPage) {
  LINKS.resume_pdf = "../assets/Remmell.Chris.3-2026.pdf";
}

Object.entries(LINKS).forEach(([key, value]) => {
  document.querySelectorAll(`[data-link="${key}"]`).forEach((element) => {
    element.setAttribute("href", value);
  });
});

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const toggleButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (toggleButton && navLinks) {
  toggleButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealTargets = document.querySelectorAll(".section, .hero, .project-card, .timeline-card, .about-grid .card, .contact-card");
if ("IntersectionObserver" in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.14 }
  );

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    revealObserver.observe(target);
  });
}

const sectionIds = ["projects", "skills", "education", "about", "contact"];
const sectionElements = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));

if ("IntersectionObserver" in window && sectionElements.length && navAnchors.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute("id");
        if (!sectionId) return;
        const link = navAnchors.find((anchor) => anchor.getAttribute("href") === `#${sectionId}`);
        if (!link) return;

        if (entry.isIntersecting) {
          navAnchors.forEach((anchor) => anchor.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01
    }
  );

  sectionElements.forEach((section) => navObserver.observe(section));
}
