import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class EventsController {
  constructor(events) {
    this.events = events;
    this.tabsContainer = document.getElementById("events-tabs");
    this.eventsContainer = document.getElementById("events-container");
    this.prevArrow = document.getElementById("events-prev");
    this.nextArrow = document.getElementById("events-next");
    this.currentCategory = "All";

    this.initFilterTabs();
    this.renderEvents();
    this.initArrows();
  }

  initArrows() {
    if (this.prevArrow && this.nextArrow && this.eventsContainer) {
      this.prevArrow.addEventListener("click", () => {
        const scrollAmount = window.innerWidth > 768 ? 400 : 300;
        this.eventsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
      
      this.nextArrow.addEventListener("click", () => {
        const scrollAmount = window.innerWidth > 768 ? 400 : 300;
        this.eventsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }
  }

  // Generate category tabs dynamically based on events
  initFilterTabs() {
    if (!this.tabsContainer) return;

    // Get unique categories and add 'All'
    const categories = ["All", ...new Set(this.events.map(event => event.category))];
    
    this.tabsContainer.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `btn-filter ${cat === this.currentCategory ? "active" : ""}`;
      btn.textContent = cat;
      btn.dataset.category = cat;
      
      btn.addEventListener("click", () => {
        // Toggle active tabs
        const activeTab = this.tabsContainer.querySelector(".btn-filter.active");
        if (activeTab) activeTab.classList.remove("active");
        btn.classList.add("active");
        
        this.currentCategory = cat;
        this.renderEvents();
      });

      this.tabsContainer.appendChild(btn);
    });
  }

  renderEvents() {
    if (!this.eventsContainer) return;

    // Filter events
    const filtered = this.currentCategory === "All" 
      ? this.events 
      : this.events.filter(e => e.category === this.currentCategory);

    this.eventsContainer.innerHTML = "";
    
    if (filtered.length === 0) {
      this.eventsContainer.innerHTML = `<p class="no-events">No events in this category yet.</p>`;
      return;
    }

    // Build event cards
    filtered.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.dataset.id = event.id;

      card.innerHTML = `
        <div class="event-cat-tag">${event.category}</div>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-desc">${event.description}</p>
        <div class="event-meta">
          <div class="event-meta-item">
            <svg class="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>${event.date}</span>
          </div>
          <div class="event-meta-item">
            <svg class="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${event.time}</span>
          </div>
          <div class="event-meta-item">
            <svg class="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${event.venue}</span>
          </div>
        </div>
      `;

      this.eventsContainer.appendChild(card);
    });

    // Staggered fade and slide up animation of the newly rendered cards
    const cards = this.eventsContainer.querySelectorAll(".event-card");
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
  }
}
