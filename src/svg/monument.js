/* -------------------------------------------------------------
 * LIVING SVG MONUMENT GENERATOR (NEOBRUTALISM REVAMP)
 * Returns a high-fidelity, layered geometric centerpiece
 * that is animated dynamically by GSAP on scroll.
 * ------------------------------------------------------------- */

export function generateSVGMonument() {
  return `
    <svg id="living-monument" viewBox="0 0 800 800" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
      <defs>
        <!-- No gradients or glow filters needed for Neobrutalism. Flat rules! -->
      </defs>

      <!-- LAYER 1: Ambient Backdrop (Subtle architectural dashed circle) -->
      <g class="m-layer glow-layer">
        <circle cx="400" cy="400" r="340" fill="#FFFFFF" fill-opacity="0.1" stroke="#000000" stroke-width="3" stroke-dasharray="10 10" opacity="0.3" />
      </g>

      <!-- LAYER 2: Architectural Grids & Guide Circles (Blueprint Base) -->
      <g class="m-layer grid-layer" stroke="#000000" stroke-opacity="0.12" fill="none" stroke-width="1">
        <!-- Golden Ratio Concentric Circles -->
        <circle cx="400" cy="400" r="380" stroke-dasharray="4 8" />
        <circle cx="400" cy="400" r="300" />
        <circle cx="400" cy="400" r="235" stroke-dasharray="2 4" />
        <circle cx="400" cy="400" r="145" />
        <circle cx="400" cy="400" r="90" />
        
        <!-- Axis Crosshairs -->
        <line x1="400" y1="20" x2="400" y2="780" stroke-dasharray="5 5" />
        <line x1="20" y1="400" x2="780" y2="400" stroke-dasharray="5 5" />
        
        <!-- Diagonal Lines -->
        <line x1="130" y1="130" x2="670" y2="670" stroke-dasharray="2 8" />
        <line x1="130" y1="670" x2="670" y2="130" stroke-dasharray="2 8" />
      </g>

      <!-- LAYER 3: Outer Rotating Rings & Ticks (High-contrast wireframes) -->
      <g class="m-layer ring-layer" stroke="#000000" fill="none" stroke-width="2">
        <!-- Ring 1 (Tick-Mark Ring) -->
        <circle class="ring-ticks" cx="400" cy="400" r="340" stroke-dasharray="4 14" stroke-width="5" opacity="0.75" />
        <!-- Ring 2 (Dashed Track) -->
        <circle class="ring-track-1" cx="400" cy="400" r="320" stroke-dasharray="160 40 80 40" opacity="0.6" />
        <!-- Ring 3 (Outer Solid Guide) -->
        <circle class="ring-track-2" cx="400" cy="400" r="280" stroke-dasharray="300 200" stroke-width="2.5" opacity="0.9" />
      </g>

      <!-- LAYER 4: Sacred Geometry / Mandala Nodes (Vibrant Cyan Accents) -->
      <g class="m-layer mandala-layer" stroke="#000000" fill="none" stroke-width="2">
        <!-- Concentric Octagons (Geometric Proportions) -->
        <polygon class="geo-poly octagon-1" points="
          400,165 566,234 635,400 566,566
          400,635 234,566 165,400 234,234" fill="rgba(60, 230, 252, 0.08)" />
        
        <polygon class="geo-poly octagon-2" points="
          400,220 527,273 580,400 527,527
          400,580 273,527 220,400 273,273" opacity="0.8" stroke-width="1.5" />

        <!-- Sacred Geometry Intersection Nodes (Hot Pink node blocks) -->
        <g class="mandala-nodes" fill="#FF3B93" stroke="#000000" stroke-width="1.5" opacity="0.9">
          <circle cx="400" cy="165" r="5" />
          <circle cx="566" cy="234" r="5" />
          <circle cx="635" cy="400" r="5" />
          <circle cx="566" cy="566" r="5" />
          <circle cx="400" cy="635" r="5" />
          <circle cx="234" cy="566" r="5" />
          <circle cx="165" cy="400" r="5" />
          <circle cx="234" cy="234" r="5" />
        </g>
      </g>

      <!-- LAYER 5: Evolving Hexagons & Triangles (Solid Neon Yellow Octagram) -->
      <g class="m-layer evolution-layer" stroke="#000000" fill="none" stroke-width="3">
        <!-- Evolving Star Octagram -->
        <path class="geo-path star-poly" d="M 400 220 L 580 400 L 400 580 L 220 400 Z" fill="#D6FD52" fill-opacity="0.85" stroke-dasharray="1000" stroke-dashoffset="0" />
        <path class="geo-path star-poly-alt" d="M 527 273 L 527 527 L 273 527 L 273 273 Z" stroke-dasharray="1000" stroke-dashoffset="0" stroke-width="2" opacity="0.8" />
        
        <!-- Connecting Inner Vectors -->
        <g stroke="#000000" stroke-opacity="0.2" stroke-width="1.5">
          <line x1="400" y1="220" x2="400" y2="580" />
          <line x1="220" y1="400" x2="580" y2="400" />
          <line x1="273" y1="273" x2="527" y2="527" />
          <line x1="273" y1="527" x2="527" y2="273" />
        </g>
      </g>

      <!-- LAYER 6: Core Energy and Mathematical Annotations (Vibrant Centerpiece) -->
      <g class="m-layer core-layer">
        <!-- Floating core hexagons -->
        <polygon class="core-hexagon" points="400,345 448,373 448,427 400,455 352,427 352,373" stroke="#000000" fill="#3CE6FC" stroke-width="3" />
        <polygon class="core-hexagon-inner" points="400,360 435,380 435,420 400,440 365,420 365,380" stroke="#000000" fill="#FFFFFF" stroke-width="1.5" />
        
        <!-- Center Node (Hot Pink) -->
        <circle class="core-seed" cx="400" cy="400" r="14" fill="#FF3B93" stroke="#000000" stroke-width="2" />
        <circle cx="400" cy="400" r="6" fill="#000000" />

        <!-- Radial Energy Rays -->
        <g stroke="#000000" stroke-width="2" opacity="0.8" class="core-rays">
          <line x1="400" y1="400" x2="400" y2="310" />
          <line x1="400" y1="400" x2="400" y2="490" />
          <line x1="400" y1="400" x2="310" y2="400" />
          <line x1="400" y1="400" x2="490" y2="400" />
          <line x1="400" y1="400" x2="336" y2="336" />
          <line x1="400" y1="400" x2="464" y2="464" />
          <line x1="400" y1="400" x2="336" y2="464" />
          <line x1="400" y1="400" x2="464" y2="336" />
        </g>
        
        <!-- Energy Dots (Lime Green Dots) -->
        <g fill="#D6FD52" stroke="#000000" stroke-width="1.5" class="core-dots">
          <circle cx="400" cy="310" r="5" />
          <circle cx="400" cy="490" r="5" />
          <circle cx="310" cy="400" r="5" />
          <circle cx="490" cy="400" r="5" />
          <circle cx="336" cy="336" r="5" />
          <circle cx="464" cy="464" r="5" />
          <circle cx="336" cy="464" r="5" />
          <circle cx="464" cy="336" r="5" />
        </g>
      </g>

      <!-- LAYER 7: Geometric Annotation/Blueprint Texts -->
      <g class="m-layer text-layer" fill="#000000" font-family="Space Mono, Courier New, monospace" font-size="9" letter-spacing="0.05em" opacity="0.85" font-weight="700">
        <text x="415" y="160">R = 235px</text>
        <text x="580" y="230">Φ = 1.618</text>
        <text x="645" y="395">θ = 45°</text>
        <text x="415" y="645">SYS: AVINYĀ</text>
        <text x="210" y="230">T = 6.0</text>
        <text x="120" y="395">INIT: TRUE</text>
        
        <!-- Concentric Coordinate lines -->
        <path d="M 400 370 A 30 30 0 0 1 430 400" stroke="#000000" stroke-width="1.5" fill="none" />
        <text x="438" y="385" font-size="7">30 rad</text>
      </g>
    </svg>
  `;
}
