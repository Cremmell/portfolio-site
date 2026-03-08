// /Users/cremmell/Documents/New project/script.js
/*
  EDITABLE LINKS BLOCK
  Update all personal links here in one place.
*/
const LINKS = {
  github_profile: "https://github.com/Cremmell",
  linkedin_profile: "https://www.linkedin.com/in/chris-remmell/",
  uber_repo: "https://github.com/Cremmell/REPLACE-WITH-UBER-REPO",
  nyc_bite_repo: "https://github.com/Cremmell/REPLACE-WITH-NYC-BITE-WEEK-REPO",
  resume_pdf: "assets/Remmell.Chris.3-2026.pdf",
  email: "mailto:REPLACE-WITH-YOUR-EMAIL@example.com"
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
