import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class SponsorsController {
  constructor(sponsors) {
    this.sponsors = sponsors;
    this.container = document.getElementById("sponsors-container");

    this.renderSponsors();
    this.initScrollAnimations();
  }

  renderSponsors() {
    if (!this.container) return;

    // Group sponsors by their defined tiers
    const grouped = this.sponsors.reduce((acc, sponsor) => {
      const tier = sponsor.tier || "Partners";
      if (!acc[tier]) acc[tier] = [];
      acc[tier].push(sponsor);
      return acc;
    }, {});

    // Ordered list of tiers for display hierarchy
    const tierOrder = ["Diamond Sponsor", "Gold Sponsor", "Silver Sponsor"];
    
    // Sort keys based on order preference
    const sortedTiers = Object.keys(grouped).sort((a, b) => {
      let idxA = tierOrder.indexOf(a);
      let idxB = tierOrder.indexOf(b);
      if (idxA === -1) idxA = 99;
      if (idxB === -1) idxB = 99;
      return idxA - idxB;
    });

    this.container.innerHTML = "";
    
    sortedTiers.forEach(tier => {
      const tierSponsors = grouped[tier];
      const section = document.createElement("div");
      section.className = "sponsor-tier-section";

      // Build layouts
      let cardsHtml = "";
      tierSponsors.forEach(sponsor => {
        const customColor = sponsor.accentColor || "#A8E8F9";
        cardsHtml += `
          <div class="sponsor-card" data-accent="${customColor}" style="--glow-color: ${customColor}" onclick="if('${sponsor.url}' !== '#') window.open('${sponsor.url}', '_blank', 'noopener,noreferrer')">
            <div class="sponsor-logo-fallback">${sponsor.name}</div>
          </div>
        `;
      });

      section.innerHTML = `
        <h3 class="sponsor-tier-title">${tier}</h3>
        <div class="sponsors-layout">
          ${cardsHtml}
        </div>
      `;

      this.container.appendChild(section);
    });
  }

  initScrollAnimations() {
    const cards = this.container.querySelectorAll(".sponsor-card");
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { scale: 0.9, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#sponsors",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}
