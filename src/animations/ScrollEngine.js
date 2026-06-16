import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export class ScrollEngine {
  constructor() {
    this.initHeaderScroll();
    this.initFloatingCTA();
    this.initSectionNavHighlighter();
  }

  // Header background glassmorphism transition
  initHeaderScroll() {
    const header = document.getElementById("header");
    
    ScrollTrigger.create({
      start: "top -50",
      onEnter: () => header.classList.add("scrolled"),
      onLeaveBack: () => header.classList.remove("scrolled")
    });
  }

  // Toggle the bottom floating registration button visibility
  initFloatingCTA() {
    const floatingCTA = document.getElementById("floating-cta-container");
    
    // Show after scrolling past the landing page (approx 70vh)
    ScrollTrigger.create({
      start: "top -70%",
      onEnter: () => floatingCTA.classList.add("visible"),
      onLeaveBack: () => floatingCTA.classList.remove("visible")
    });
  }

  // Highlight active link in header based on currently visible section
  initSectionNavHighlighter() {
    const sections = document.querySelectorAll(".scroll-section");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => this.highlightLink(section.id, navLinks),
        onEnterBack: () => this.highlightLink(section.id, navLinks)
      });
    });
  }

  highlightLink(sectionId, links) {
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${sectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}
