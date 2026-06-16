import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { renderProceduralArtwork } from "../svg/galleryArtwork";

gsap.registerPlugin(ScrollTrigger);

export class GalleryController {
  constructor(galleryItems) {
    this.items = galleryItems;
    this.container = document.getElementById("gallery-container");
    
    // Lightbox modal elements
    this.lightbox = document.getElementById("gallery-lightbox");
    this.lightboxImg = document.getElementById("lightbox-image");
    this.lightboxCaption = document.getElementById("lightbox-caption");
    this.lightboxClose = this.lightbox ? this.lightbox.querySelector(".lightbox-close") : null;

    this.renderGallery();
    this.initLightbox();
    this.initScrollAnimations();
  }

  renderGallery() {
    if (!this.container) return;

    this.container.innerHTML = "";

    this.items.forEach(item => {
      const el = document.createElement("div");
      el.className = "gallery-item";
      el.dataset.id = item.id;
      
      // We append a raw svg container that we will draw onto procedurally
      el.innerHTML = `
        <svg class="gallery-canvas-artwork" id="svg-art-${item.id}"></svg>
        <div class="gallery-mask-overlay">
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-desc">${item.description}</p>
        </div>
      `;

      this.container.appendChild(el);

      // Now render procedural geometric artwork
      const svgContainer = document.getElementById(`svg-art-${item.id}`);
      if (svgContainer) {
        renderProceduralArtwork(svgContainer, item.artworkType);
      }

      // Add click behavior for lightbox
      el.addEventListener("click", () => this.openLightbox(item));
    });
  }

  initLightbox() {
    if (!this.lightbox || !this.lightboxClose) return;

    this.lightboxClose.addEventListener("click", () => this.closeLightbox());
    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    // Close on escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.lightbox.classList.contains("active")) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(item) {
    if (!this.lightbox) return;

    // Remove existing image or canvas inside content
    const existingMedia = this.lightbox.querySelector(".lightbox-content svg, .lightbox-content img");
    if (existingMedia) existingMedia.remove();

    // Re-render the procedural artwork directly inside lightbox at larger scale
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.style.width = "100%";
    svgEl.style.height = "auto";
    
    renderProceduralArtwork(svgEl, item.artworkType);
    this.lightbox.querySelector(".lightbox-content").prepend(svgEl);

    this.lightboxCaption.textContent = `${item.title} — ${item.description}`;
    
    this.lightbox.classList.add("active");
    this.lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // disable scrolling
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove("active");
    this.lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // enable scrolling
  }

  initScrollAnimations() {
    const items = this.container.querySelectorAll(".gallery-item");
    if (items.length === 0) return;

    gsap.fromTo(items,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#gallery",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}
