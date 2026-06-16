import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class CollegeInfoController {
  constructor(config) {
    this.config = config;
    
    this.dateEl = document.getElementById("info-date");
    this.venueEl = document.getElementById("info-venue");
    this.durationEl = document.getElementById("info-duration");

    this.populateInfo();
    this.initScrollAnimations();
  }

  populateInfo() {
    if (this.dateEl && this.config.eventDate) {
      this.dateEl.textContent = this.config.eventDate;
    }
    if (this.venueEl && this.config.venue) {
      this.venueEl.textContent = this.config.venue;
    }
    if (this.durationEl && this.config.duration) {
      this.durationEl.textContent = this.config.duration;
    }
  }

  initScrollAnimations() {
    const cards = document.querySelectorAll(".info-card");
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#college-info",
          start: "top 75%", // Triggers when the section top reaches 75% of viewport height
          toggleActions: "play none none none"
        }
      }
    );
  }
}
