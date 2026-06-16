export class NavigationController {
  constructor(config) {
    this.config = config;
    this.header = document.getElementById("header");
    this.logo = document.getElementById("nav-logo-trigger");
    this.hamburger = document.getElementById("hamburger-toggle");
    this.mobileMenu = document.getElementById("mobile-menu");
    
    this.initBrochureLinks();
    this.initHamburger();
    this.initSmoothScroll();
  }

  // Populate brochure download URLs dynamically from CMS config
  initBrochureLinks() {
    const desktopBrochure = document.getElementById("nav-brochure-link");
    const mobileBrochure = document.getElementById("mobile-brochure-link");

    if (desktopBrochure && this.config.brochureLink) {
      desktopBrochure.setAttribute("href", this.config.brochureLink);
    }
    if (mobileBrochure && this.config.brochureLink) {
      mobileBrochure.setAttribute("href", this.config.brochureLink);
    }
  }

  // Handle mobile menu interaction
  initHamburger() {
    if (!this.hamburger || !this.mobileMenu) return;

    this.hamburger.addEventListener("click", () => {
      const isActive = this.hamburger.classList.contains("active");
      
      if (isActive) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });

    // Close menu when clicking mobile links
    const mobileLinks = this.mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => this.closeMenu());
    });
  }

  openMenu() {
    this.hamburger.classList.add("active");
    this.mobileMenu.classList.add("active");
    this.hamburger.setAttribute("aria-expanded", "true");
    this.mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent scrolling behind overlay
  }

  closeMenu() {
    this.hamburger.classList.remove("active");
    this.mobileMenu.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Smooth scroll logic for in-page anchors
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Logo scroll to top
    if (this.logo) {
      this.logo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    links.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId === "#") return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offset = 70; // account for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }
}
