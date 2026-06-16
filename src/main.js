import "./style.css";

// SVG Generators
import { generateGridSVG, generateMandalaBackgroundSVG } from "./svg/backgrounds.js";
import { generateSVGMonument } from "./svg/monument.js";

// Controllers
import { NavigationController } from "./components/Navigation.js";
import { RegistrationController } from "./components/Registration.js";
import { CollegeInfoController } from "./components/CollegeInfo.js";
import { EventsController } from "./components/Events.js";
import { SponsorsController } from "./components/Sponsors.js";
import { TimelineController } from "./components/Timeline.js";
import { GalleryController } from "./components/Gallery.js";
import { OrganisersController } from "./components/Organisers.js";
import { ContactController } from "./components/Contact.js";

// Animation & Scroll Engines
import { SVGMonumentController } from "./animations/SVGMonument.js";
import { ScrollEngine } from "./animations/ScrollEngine.js";

// Global App Orchestrator
class AvinyaApp {
  constructor() {
    this.loader = document.getElementById("loader");
    this.progress = this.loader ? this.loader.querySelector(".loader-progress") : null;
    
    this.initStaticSVGs();
    this.startAppLifecycle();
  }

  // Draw background grids and the monumental canvas framework immediately
  initStaticSVGs() {
    const gridContainer = document.getElementById("grid-container");
    const mandalaContainer = document.getElementById("mandala-container");
    const monumentCanvas = document.getElementById("monument-canvas");

    if (gridContainer) gridContainer.innerHTML = generateGridSVG();
    if (mandalaContainer) mandalaContainer.innerHTML = generateMandalaBackgroundSVG();
    if (monumentCanvas) monumentCanvas.innerHTML = generateSVGMonument();
  }

  // Fetch JSON assets and bootstrap all sections dynamically
  async startAppLifecycle() {
    try {
      this.updateLoaderProgress(15);

      // We load all CMS-driven JSON files asynchronously
      const dataFiles = [
        "config.json",
        "events.json",
        "sponsors.json",
        "timeline.json",
        "gallery.json",
        "organisers.json",
        "contact.json"
      ];

      this.updateLoaderProgress(30);

      const fetchPromises = dataFiles.map(file => 
        fetch(`/src/data/${file}`).then(res => {
          if (!res.ok) throw new Error(`Failed to load ${file}`);
          return res.json();
        })
      );

      const [
        config,
        events,
        sponsors,
        timeline,
        gallery,
        organisers,
        contact
      ] = await Promise.all(fetchPromises);

      this.updateLoaderProgress(70);

      // Instantiate controllers sequentially
      new NavigationController(config);
      new RegistrationController(config);
      new CollegeInfoController(config);
      new EventsController(events);
      new SponsorsController(sponsors);
      new TimelineController(timeline);
      new GalleryController(gallery);
      new OrganisersController(organisers);
      new ContactController(contact);

      this.updateLoaderProgress(90);

      // Bootstrap SVG Animations & Master Scroll triggers
      new SVGMonumentController();
      new ScrollEngine();

      this.updateLoaderProgress(100);

      // Terminate loader screen with elegant fade transition
      setTimeout(() => {
        if (this.loader) {
          this.loader.style.opacity = "0";
          this.loader.style.visibility = "hidden";
        }
      }, 500);

    } catch (error) {
      console.error("Critical failure during bootstrap:", error);
      const loaderText = this.loader ? this.loader.querySelector(".loader-text") : null;
      if (loaderText) {
        loaderText.innerHTML = `
          <span style="color: red; font-size: 1.2rem;">BOOTSTRAP FAULT</span>
          <span style="font-size: 0.8rem; color: #FFF;">Check network coordinates</span>
        `;
      }
    }
  }

  updateLoaderProgress(percent) {
    if (this.progress) {
      this.progress.style.width = `${percent}%`;
    }
  }
}

// Instantiate on load
window.addEventListener("DOMContentLoaded", () => {
  new AvinyaApp();
});
