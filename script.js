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
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.focus();
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const smoothScrollToHash = (hash) => {
  if (!hash || hash === "#") return;

  const target = document.querySelector(hash);
  if (!target) return;

  const header = document.querySelector(".site-header");
  const headerOffset = header ? header.offsetHeight + 12 : 0;
  const targetTop =
    target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    smoothScrollToHash(href);
    history.replaceState(null, "", href);
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "Thank you for your message. Emily will be in touch soon.";
    formStatus.setAttribute("tabindex", "-1");
    contactForm.reset();
    formStatus.focus();
  });
}

if (headshotImage && headshotFallback) {
  headshotImage.addEventListener("error", () => {
    headshotImage.hidden = true;
    headshotFallback.hidden = false;
  });
}

if (document.body.classList.contains("home-page") && navLinks) {
  const sectionLinkMap = {
    "#home": document.getElementById("home"),
    "#shield-technologies": document.getElementById("shield-technologies"),
    "#contact": document.getElementById("contact"),
  };

  const samePageLinks = Array.from(
    navLinks.querySelectorAll('a[href^="#"]')
  ).filter((link) => sectionLinkMap[link.getAttribute("href")]);

  const setActiveSectionLink = (targetHref) => {
    samePageLinks.forEach((link) => {
      if (link.getAttribute("href") === targetHref) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const syncFromHash = () => {
    const currentHash = window.location.hash || "#home";
    if (sectionLinkMap[currentHash]) {
      setActiveSectionLink(currentHash);
    }
  };

  if ("IntersectionObserver" in window) {
    const sectionOrder = ["#home", "#shield-technologies", "#contact"];
    const visibilityMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = `#${entry.target.id}`;
          visibilityMap.set(sectionId, entry.intersectionRatio);
        });

        const mostVisible = sectionOrder.reduce(
          (best, id) => {
            const ratio = visibilityMap.get(id) || 0;
            if (ratio > best.ratio) {
              return { id, ratio };
            }
            return best;
          },
          { id: "#home", ratio: 0 }
        );

        setActiveSectionLink(mostVisible.id);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.05, 0.2, 0.4, 0.6],
      }
    );

    Object.values(sectionLinkMap).forEach((section) => {
      if (section) observer.observe(section);
    });
  } else {
    syncFromHash();
  }

  window.addEventListener("hashchange", syncFromHash);
  syncFromHash();
}
