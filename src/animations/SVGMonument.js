import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class SVGMonumentController {
  constructor() {
    this.monument = document.getElementById("living-monument");
    if (!this.monument) return;

    this.setupInitialAnimation();
    this.setupScrollBoundAnimation();
  }

  // Draw-in effect on page load
  setupInitialAnimation() {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1.5 }
    });

    // Animate grids and coordinates
    tl.fromTo(".grid-layer line, .grid-layer circle", 
      { strokeDashoffset: 100, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, stagger: 0.05 }
    );

    // Animate outer rotating tracks
    tl.fromTo([".ring-ticks", ".ring-track-1", ".ring-track-2"],
      { strokeDashoffset: 500, opacity: 0 },
      { strokeDashoffset: 0, opacity: (i, el) => el.classList.contains("ring-ticks") ? 0.6 : 0.4, stagger: 0.15 },
      "-=1.0"
    );

    // Animate sacred polygons
    tl.fromTo(".geo-poly",
      { scale: 0.3, transformOrigin: "center center", opacity: 0 },
      { scale: 1, opacity: 0.7, stagger: 0.1 },
      "-=0.8"
    );

    // Animate star structures
    tl.fromTo(".geo-path",
      { strokeDashoffset: 1000, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, stagger: 0.2 },
      "-=0.6"
    );

    // Animate glowing core elements
    tl.fromTo([".core-hexagon", ".core-hexagon-inner", ".core-seed"],
      { scale: 0, transformOrigin: "center center", opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Draw energy rays and text annotations
    tl.fromTo(".core-rays line",
      { strokeDashoffset: 200, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.75, stagger: 0.05 },
      "-=0.4"
    );

    tl.fromTo(".text-layer text",
      { opacity: 0, y: "+=10" },
      { opacity: 0.4, y: 0, stagger: 0.05 },
      "-=0.5"
    );
  }

  // Scroll-bound evolution & morphing (Knowledge -> Innovation)
  setupScrollBoundAnimation() {
    // We create a master scroll-bound timeline that runs from 0% scroll to 100% scroll (across the whole page)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Smooth follow-up
      }
    });

    // 1. Rotation dynamics (Parallax rotational speed)
    tl.to(".ring-ticks", { rotation: 360, transformOrigin: "center center" }, 0);
    tl.to(".ring-track-1", { rotation: -180, transformOrigin: "center center" }, 0);
    tl.to(".ring-track-2", { rotation: 90, transformOrigin: "center center" }, 0);
    
    tl.to(".mandala-layer", { rotation: -60, transformOrigin: "center center" }, 0);
    tl.to(".evolution-layer", { rotation: 120, transformOrigin: "center center" }, 0);
    
    tl.to(".core-hexagon", { rotation: -180, transformOrigin: "center center" }, 0);
    tl.to(".core-hexagon-inner", { rotation: 360, transformOrigin: "center center" }, 0);

    // 2. Structural expansion/contraction (Evolving architecture)
    // As the user scrolls, the monument expands, shifts scale, and then converges towards the end contact section
    tl.to(".mandala-layer polygon", {
      scale: 1.25,
      transformOrigin: "center center",
      stroke: "#FFBA42", // Morph colors from sky blue to amber
      opacity: 0.5
    }, 0);

    tl.to(".ring-layer", {
      scale: 1.15,
      transformOrigin: "center center",
      opacity: 0.3
    }, 0);

    // Core shines brighter as you scroll to the Events/Timeline
    tl.to(".core-seed", {
      scale: 1.8,
      fill: "#FFD35B",
      transformOrigin: "center center"
    }, 0);

    tl.to(".core-rays line", {
      scale: 1.3,
      stroke: "#FFBA42",
      transformOrigin: "center center"
    }, 0);

    // Towards the final sections (about 80% scroll), the monument scales down and simplifies, converging back
    const startConvergence = 0.75;
    tl.to("#living-monument", {
      scale: 0.5,
      opacity: 0.25,
      ease: "power2.inOut"
    }, startConvergence);
  }
}
