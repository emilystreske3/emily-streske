const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const headshotImage = document.querySelector(".headshot-image");
const headshotFallback = document.querySelector(".headshot-fallback");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "Thank you for reaching out. This demo form is ready for backend integration.";
    contactForm.reset();
  });
}

if (headshotImage && headshotFallback) {
  headshotImage.addEventListener("error", () => {
    headshotImage.hidden = true;
    headshotFallback.hidden = false;
  });
}
