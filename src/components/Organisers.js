export class OrganisersController {
  constructor(organisers) {
    this.members = organisers;
    
    this.tabsContainer = document.getElementById("organisers-categories-tabs");
    this.track = document.getElementById("organisers-container");
    
    this.prevBtn = document.getElementById("organiser-prev");
    this.nextBtn = document.getElementById("organiser-next");
    this.dotsContainer = document.getElementById("organiser-dots");

    this.categories = ["Convenors", "Faculty Coordinators", "Core Team", "Technical Coordinators"];
    this.currentIndex = 0;

    this.initTabs();
    this.renderChambers();
    this.initDots();
    this.initButtons();
    this.updateSlider();
    
    window.addEventListener("resize", () => this.updateSlider());
  }

  initTabs() {
    if (!this.tabsContainer) return;
    this.tabsContainer.innerHTML = "";

    this.categories.forEach((cat, idx) => {
      const btn = document.createElement("button");
      btn.className = `btn-organiser-cat ${idx === this.currentIndex ? "active" : ""}`;
      btn.textContent = cat;
      btn.dataset.index = idx;

      btn.addEventListener("click", () => {
        this.currentIndex = idx;
        this.updateSlider();
      });

      this.tabsContainer.appendChild(btn);
    });
  }

  renderChambers() {
    if (!this.track) return;
    this.track.innerHTML = "";

    this.categories.forEach(cat => {
      const chamber = document.createElement("div");
      chamber.className = "organiser-chamber";

      const filtered = this.members.filter(m => m.category === cat);
      let membersHtml = "";

      filtered.forEach(member => {
        const initials = member.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
        const contactInfo = member.email 
          ? `<a href="mailto:${member.email}" class="organiser-member-contact">${member.email}</a>`
          : (member.phone ? `<a href="tel:${member.phone}" class="organiser-member-contact">${member.phone}</a>` : "");

        membersHtml += `
          <div class="organiser-member-card">
            <div class="organiser-avatar-placeholder">${initials}</div>
            <h4 class="organiser-member-name">${member.name}</h4>
            <div class="organiser-member-role">${member.role}</div>
            ${contactInfo}
          </div>
        `;
      });

      chamber.innerHTML = membersHtml || `<p class="no-organisers">No members registered in this category.</p>`;
      this.track.appendChild(chamber);
    });
  }

  initDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = "";

    this.categories.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = `organiser-dot ${idx === this.currentIndex ? "active" : ""}`;
      
      dot.addEventListener("click", () => {
        this.currentIndex = idx;
        this.updateSlider();
      });

      this.dotsContainer.appendChild(dot);
    });
  }

  initButtons() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.updateSlider();
        }
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        if (this.currentIndex < this.categories.length - 1) {
          this.currentIndex++;
          this.updateSlider();
        }
      });
    }
  }

  updateSlider() {
    const isMobile = window.innerWidth <= 768;
    const chambers = this.track ? this.track.querySelectorAll(".organiser-chamber") : [];
    
    if (this.track) {
      if (isMobile) {
        // Reset translateX on mobile so it doesn't shift the viewport
        this.track.style.transform = "";
        
        // Show only the active chamber
        chambers.forEach((chamber, idx) => {
          if (idx === this.currentIndex) {
            chamber.style.display = "flex";
          } else {
            chamber.style.display = "none";
          }
        });
      } else {
        // Desktop uses standard sliding track transition
        chambers.forEach(chamber => {
          chamber.style.display = ""; // Reset inline display
        });
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }
    }

    // Update active tab buttons and scroll active tab into view
    if (this.tabsContainer) {
      const tabs = this.tabsContainer.querySelectorAll(".btn-organiser-cat");
      tabs.forEach((tab, idx) => {
        if (idx === this.currentIndex) {
          tab.classList.add("active");
          // Smooth scroll the active tab to center on mobile viewports
          tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        } else {
          tab.classList.remove("active");
        }
      });
    }

    // Update navigation dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll(".organiser-dot");
      dots.forEach((dot, idx) => {
        if (idx === this.currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // Disable buttons at boundaries
    if (this.prevBtn) {
      this.prevBtn.style.opacity = this.currentIndex === 0 ? "0.3" : "1";
      this.prevBtn.style.pointerEvents = this.currentIndex === 0 ? "none" : "auto";
    }
    if (this.nextBtn) {
      this.nextBtn.style.opacity = this.currentIndex === this.categories.length - 1 ? "0.3" : "1";
      this.nextBtn.style.pointerEvents = this.currentIndex === this.categories.length - 1 ? "none" : "auto";
    }
  }
}
