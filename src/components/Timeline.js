import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class TimelineController {
  constructor(timelineEvents) {
    this.events = timelineEvents;
    this.currentDay = 1;
    this.container = document.getElementById("timeline-container");
    
    this.initTabs();
    this.renderTimeline();
    this.initPathAnimation();
  }

  initTabs() {
    const tab1 = document.getElementById("tab-day1");
    const tab2 = document.getElementById("tab-day2");

    if (!tab1 || !tab2) return;

    tab1.addEventListener("click", () => {
      tab1.classList.add("active");
      tab2.classList.remove("active");
      this.currentDay = 1;
      this.renderTimeline();
      // Recalculate ScrollTrigger parameters
      ScrollTrigger.refresh();
      // Re-trigger path animation for the active path
      this.initPathAnimation();
    });

    tab2.addEventListener("click", () => {
      tab2.classList.add("active");
      tab1.classList.remove("active");
      this.currentDay = 2;
      this.renderTimeline();
      // Recalculate ScrollTrigger parameters
      ScrollTrigger.refresh();
      // Re-trigger path animation for the active path
      this.initPathAnimation();
    });
  }

  renderTimeline() {
    if (!this.container) return;

    const filtered = this.events.filter(e => e.day === this.currentDay);
    this.container.innerHTML = "";

    filtered.forEach((event, index) => {
      const item = document.createElement("div");
      item.className = `timeline-item ${event.type === "key" ? "key-item" : ""}`;
      
      item.innerHTML = `
        <div class="timeline-item-node"></div>
        <div class="timeline-item-left">
          <div class="timeline-card">
            <div class="timeline-time">${event.time}</div>
            <h4 class="timeline-event-title">${event.title}</h4>
            <p class="timeline-event-desc">${event.description}</p>
          </div>
        </div>
        <div class="timeline-item-right">
          <div class="timeline-card">
            <div class="timeline-time">${event.time}</div>
            <h4 class="timeline-event-title">${event.title}</h4>
            <p class="timeline-event-desc">${event.description}</p>
          </div>
        </div>
      `;

      this.container.appendChild(item);
    });

    // Staggered node activation & card reveal
    const items = this.container.querySelectorAll(".timeline-item");
    items.forEach((item, idx) => {
      gsap.fromTo(item.querySelector(".timeline-card"),
        { x: idx % 2 === 0 ? -40 : 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            onEnter: () => item.classList.add("active"),
            onLeaveBack: () => item.classList.remove("active"),
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  // Draw timeline central line on scroll using scrub
  initPathAnimation() {
    const isMobile = window.innerWidth <= 768;
    const activePath = isMobile
      ? document.querySelector(".timeline-path-active.mobile-only-path")
      : document.querySelector(".timeline-path-active.desktop-only-path");
      
    if (!activePath) return;

    // Set path dasharray and dashoffset to path length
    const pathLength = activePath.getTotalLength();
    activePath.style.strokeDasharray = pathLength;
    activePath.style.strokeDashoffset = pathLength;

    gsap.to(activePath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top 60%",
        end: "bottom 60%",
        scrub: true
      }
    });
  }
}
