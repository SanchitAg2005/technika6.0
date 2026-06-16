/* -------------------------------------------------------------
 * IMMERSIVE BACKGROUND SYSTEMS (NEOBRUTALISM REVAMP)
 * Procedural SVG generator for grids, mandalas, and blueprint guide lines.
 * ------------------------------------------------------------- */

export function generateGridSVG() {
  return `
    <svg id="blueprint-grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Fine Dot Grid Pattern (Subtle Dark Dots) -->
        <pattern id="dot-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#000000" fill-opacity="0.08" />
        </pattern>
        
        <!-- Large Architectural Grid Pattern (Dark Outlines) -->
        <pattern id="major-grid" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#000000" stroke-width="0.75" stroke-opacity="0.06" />
          <circle cx="200" cy="0" r="3" fill="#FF3B93" fill-opacity="0.15" />
          <circle cx="0" cy="200" r="3" fill="#D6FD52" fill-opacity="0.2" />
        </pattern>
      </defs>

      <!-- Draw Dot Pattern across entire container -->
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      
      <!-- Draw Major Grid across entire container -->
      <rect width="100%" height="100%" fill="url(#major-grid)" />

      <!-- Concentric Subtle Rings from Viewport Corners for Blueprint Aesthetic -->
      <g stroke="#000000" stroke-width="0.75" stroke-opacity="0.04" fill="none">
        <circle cx="0" cy="0" r="400" />
        <circle cx="0" cy="0" r="600" />
        <circle cx="0" cy="0" r="800" />
        
        <circle cx="100%" cy="100%" r="400" />
        <circle cx="100%" cy="100%" r="600" />
        <circle cx="100%" cy="100%" r="800" />
      </g>
    </svg>
  `;
}

export function generateMandalaBackgroundSVG() {
  return `
    <svg id="ambient-mandala" viewBox="0 0 1000 1000" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Radial fade for the blueprint mandala -->
        <radialGradient id="mandala-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.12" />
          <stop offset="60%" stop-color="#000000" stop-opacity="0.04" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Rotating Mandala Group -->
      <g id="mandala-rotator" transform-origin="500 500" stroke="url(#mandala-fade)" fill="none" stroke-width="1.2">
        
        <!-- Sacred Geometry Concentric Rings -->
        <circle cx="500" cy="500" r="100" stroke-dasharray="2 4" />
        <circle cx="500" cy="500" r="200" />
        <circle cx="500" cy="500" r="300" stroke-dasharray="10 10" />
        <circle cx="500" cy="500" r="400" />
        <circle cx="500" cy="500" r="480" stroke-dasharray="1 8" stroke-width="3" />

        <!-- Twelve Hexagonal/Octagonal Star Guides -->
        <g stroke-opacity="0.25">
          <polygon points="500,200 759,350 759,650 500,800 241,650 241,350" />
          <polygon points="500,200 759,350 759,650 500,800 241,650 241,350" transform="rotate(30 500 500)" />
          <polygon points="500,200 759,350 759,650 500,800 241,650 241,350" transform="rotate(60 500 500)" />
        </g>

        <!-- Curved Wave Lines emanating from center -->
        <g stroke-opacity="0.15">
          <path d="M 500 500 Q 600 400 700 500 T 900 500" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(45 500 500)" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(90 500 500)" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(135 500 500)" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(180 500 500)" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(225 500 500)" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(270 500 500)" />
          <path d="M 500 500 Q 600 400 700 500 T 900 500" transform="rotate(315 500 500)" />
        </g>
      </g>
    </svg>
  `;
}
