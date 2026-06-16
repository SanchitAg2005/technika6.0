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

// Static Data Imports
import config from "./data/config.json";
import events from "./data/events.json";
import sponsors from "./data/sponsors.json";
import timeline from "./data/timeline.json";
import gallery from "./data/gallery.json";
import organisers from "./data/organisers.json";
import contact from "./data/contact.json";

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

  // Bootstrap all sections using statically imported data
  startAppLifecycle() {
    try {
      this.updateLoaderProgress(15);

      // Simulate step-by-step loading for user experience
      setTimeout(() => {
        this.updateLoaderProgress(45);

        setTimeout(() => {
          this.updateLoaderProgress(75);

          // Instantiate controllers with the static data
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

        }, 100);
      }, 100);

    } catch (error) {
      console.error("Critical failure during bootstrap:", error);
      const loaderText = this.loader ? this.loader.querySelector(".loader-text") : null;
      if (loaderText) {
        loaderText.innerHTML = `
          <span style="color: red; font-size: 1.2rem;">BOOTSTRAP FAULT</span>
          <span style="font-size: 0.8rem; color: #FFF;">Check console for details</span>
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
