/* -------------------------------------------------------------
 * GALLERY PROCEDURAL ARTWORK RENDERER (NEOBRUTALISM REVAMP)
 * Creates beautiful mathematical vector drawings dynamically
 * for the gallery experience using clean Neobrutalist styling.
 * ------------------------------------------------------------- */

export function renderProceduralArtwork(svgContainer, type) {
  svgContainer.setAttribute("viewBox", "0 0 400 300");
  svgContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgContainer.style.background = "#FFFFFF";

  const width = 400;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;

  // Set default container styling
  svgContainer.style.border = "none";

  let svgContent = `
    <defs>
      <!-- Solid Neon Fills & Stroke Colors for Brutalist look -->
      <linearGradient id="art-lime" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D6FD52" />
        <stop offset="100%" stop-color="#C5ED41" />
      </linearGradient>
      <linearGradient id="art-cyan" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3CE6FC" />
        <stop offset="100%" stop-color="#2CD6EC" />
      </linearGradient>
    </defs>
    
    <!-- Background grid blocks (Retro paper blueprint vibe) -->
    <rect x="0" y="0" width="${width}" height="${height}" fill="#FFFFFF" />
  `;

  // Draw Grid Guide System for all artworks (Charcoal lines)
  svgContent += `
    <g stroke="#000000" stroke-opacity="0.1" stroke-width="1" fill="none">
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" stroke-width="2" />
      <line x1="20" y1="${cy}" x2="${width - 20}" y2="${cy}" />
      <line x1="${cx}" y1="20" x2="${cx}" y2="${height - 20}" />
      <circle cx="${cx}" cy="${cy}" r="120" />
      <circle cx="${cx}" cy="${cy}" r="60" stroke-dasharray="3 5" />
    </g>
  `;

  switch (type) {
    case "crystal":
      // Draw intersecting geometric crystal-like facets with black strokes and neon fills
      svgContent += `
        <g stroke="#000000" stroke-width="2" fill="none" opacity="0.95">
          <!-- Outer vertices -->
          <polygon points="${cx},50 ${cx + 100},100 ${cx + 120},${cy} ${cx + 70},220 ${cx},250 ${cx - 70},220 ${cx - 120},${cy} ${cx - 100},100" fill="rgba(60, 230, 252, 0.2)" />
          
          <!-- Inner connections -->
          <line x1="${cx}" y1="50" x2="${cx}" y2="250" />
          <line x1="${cx - 120}" y1="${cy}" x2="${cx + 120}" y2="${cy}" />
          <polygon points="${cx},90 ${cx + 70},130 ${cx + 80},${cy} ${cx + 50},190 ${cx},210 ${cx - 50},190 ${cx - 80},${cy} ${cx - 70},130" fill="rgba(214, 253, 82, 0.4)" stroke-width="1.5" />
          
          <!-- Crystal nodes -->
          <g fill="#FF3B93" stroke="#000000" stroke-width="1.5">
            <circle cx="${cx}" cy="50" r="5" />
            <circle cx="${cx + 100}" cy="100" r="5" />
            <circle cx="${cx + 120}" cy="${cy}" r="5" />
            <circle cx="${cx + 70}" cy="220" r="5" />
            <circle cx="${cx}" cy="250" r="5" />
            <circle cx="${cx - 70}" cy="220" r="5" />
            <circle cx="${cx - 120}" cy="${cy}" r="5" />
            <circle cx="${cx - 100}" cy="100" r="5" />
          </g>
        </g>
      `;
      break;

    case "spiral":
      // Fibonacci spiral abstraction using black strokes
      svgContent += `
        <g stroke="#000000" stroke-width="2" fill="none" opacity="0.95">
          <!-- Spiral Path -->
          <path d="M 200 150 
                   A 10 10 0 0 1 200 160 
                   A 20 20 0 0 1 180 150 
                   A 40 40 0 0 1 200 110 
                   A 80 80 0 0 1 280 150 
                   A 160 160 0 0 1 200 310" stroke="#FF3B93" stroke-width="3.5" />
          
          <!-- Intersecting Golden Section Lines -->
          <g stroke="#000000" stroke-width="1" stroke-opacity="0.5">
            <line x1="200" y1="20" x2="200" y2="280" />
            <line x1="40" y1="150" x2="360" y2="150" />
            <rect x="180" y="110" width="100" height="200" fill="rgba(214, 253, 82, 0.1)" />
            <rect x="180" y="110" width="80" height="80" fill="rgba(60, 230, 252, 0.15)" />
          </g>
          <circle cx="280" cy="150" r="6" fill="#3CE6FC" stroke="#000000" stroke-width="1.5" />
          <circle cx="200" cy="110" r="6" fill="#D6FD52" stroke="#000000" stroke-width="1.5" />
        </g>
      `;
      break;

    case "grid":
      // Complex perspective coordinates grid
      svgContent += `
        <g stroke="#000000" stroke-width="1.5" fill="none" opacity="0.95">
          <!-- Horizon Line -->
          <line x1="30" y1="180" x2="370" y2="180" stroke="#FF3B93" stroke-width="3" />
          
          <!-- Vanishing point perspective lines -->
          <line x1="${cx}" y1="80" x2="20" y2="280" />
          <line x1="${cx}" y1="80" x2="100" y2="280" />
          <line x1="${cx}" y1="80" x2="180" y2="280" />
          <line x1="${cx}" y1="80" x2="${cx}" y2="280" stroke-dasharray="2 2" />
          <line x1="${cx}" y1="80" x2="220" y2="280" />
          <line x1="${cx}" y1="80" x2="300" y2="280" />
          <line x1="${cx}" y1="80" x2="380" y2="280" />
          
          <!-- Transversal grid lines -->
          <line x1="160" y1="120" x2="240" y2="120" />
          <line x1="120" y1="150" x2="280" y2="150" />
          <line x1="70" y1="200" x2="330" y2="200" />
          <line x1="30" y1="250" x2="370" y2="250" stroke-width="2" />
          
          <!-- Floating Vector Nodes -->
          <polygon points="170,100 230,100 200,60" fill="#D6FD52" stroke="#000000" stroke-width="2" />
          <circle cx="200" cy="60" r="5" fill="#3CE6FC" stroke="#000000" stroke-width="1.5" />
        </g>
      `;
      break;

    case "fractal":
      // Concentric circles intersecting with architectural triangles
      svgContent += `
        <g stroke="#000000" stroke-width="2" fill="none" opacity="0.95">
          <polygon points="${cx},60 ${cx + 90},210 ${cx - 90},210" fill="rgba(60, 230, 252, 0.25)" />
          <polygon points="${cx},220 ${cx + 90},70 ${cx - 90},70" fill="rgba(214, 253, 82, 0.2)" />
          <circle cx="${cx}" cy="${cy}" r="75" />
          <circle cx="${cx}" cy="${cy}" r="35" stroke-dasharray="4 4" stroke-width="1.5" />
          
          <!-- Ticks around central circle -->
          <g stroke="#000000" stroke-width="2">
            <line x1="${cx}" y1="110" x2="${cx}" y2="115" />
            <line x1="${cx}" y1="185" x2="${cx}" y2="190" />
            <line x1="165" y1="${cy}" x2="170" y2="${cy}" />
            <line x1="230" y1="${cy}" x2="235" y2="${cy}" />
          </g>
          <circle cx="${cx}" cy="${cy}" r="8" fill="#FF3B93" stroke="#000000" stroke-width="1.5" />
        </g>
      `;
      break;

    case "mandala":
      // Concentric twelve-fold symmetry
      svgContent += `
        <g transform-origin="${cx} ${cy}" stroke="#000000" stroke-width="1.25" fill="none" opacity="0.95">
          <circle cx="${cx}" cy="${cy}" r="90" fill="rgba(60, 230, 252, 0.08)" />
          <circle cx="${cx}" cy="${cy}" r="80" stroke-dasharray="2 3" />
          
          <!-- Repeat geometry using rotations -->
          <g stroke="#000000" fill="rgba(214, 253, 82, 0.15)">
            <polygon points="${cx},70 ${cx + 40},${cy} ${cx},230 ${cx - 40},${cy}" />
            <polygon points="${cx},70 ${cx + 40},${cy} ${cx},230 ${cx - 40},${cy}" transform="rotate(30 ${cx} ${cy})" />
            <polygon points="${cx},70 ${cx + 40},${cy} ${cx},230 ${cx - 40},${cy}" transform="rotate(60 ${cx} ${cy})" />
            <polygon points="${cx},70 ${cx + 40},${cy} ${cx},230 ${cx - 40},${cy}" transform="rotate(90 ${cx} ${cy})" />
            <polygon points="${cx},70 ${cx + 40},${cy} ${cx},230 ${cx - 40},${cy}" transform="rotate(120 ${cx} ${cy})" />
            <polygon points="${cx},70 ${cx + 40},${cy} ${cx},230 ${cx - 40},${cy}" transform="rotate(150 ${cx} ${cy})" />
          </g>
          
          <circle cx="${cx}" cy="${cy}" r="22" fill="#FF3B93" stroke="#000000" stroke-width="2" />
          <circle cx="${cx}" cy="${cy}" r="8" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
        </g>
      `;
      break;

    case "wave":
    default:
      // Sine wave geometric waves intersecting with linear vectors
      svgContent += `
        <g stroke="#000000" stroke-width="2" fill="none" opacity="0.95">
          <!-- Wave 1 (Neon Cyan) -->
          <path d="M 40 150 Q 120 70 200 150 T 360 150" stroke="#3CE6FC" stroke-width="3.5" />
          <!-- Wave 2 (Neon Pink) -->
          <path d="M 40 150 Q 120 230 200 150 T 360 150" stroke="#FF3B93" stroke-width="3" />
          <!-- Wave 3 (Black) -->
          <path d="M 40 150 C 100 90, 140 210, 200 150 C 260 90, 300 210, 360 150" stroke="#000000" stroke-width="1.5" />
          
          <!-- Vector Guides -->
          <g stroke="#000000" stroke-width="1" stroke-opacity="0.3">
            <line x1="80" y1="40" x2="80" y2="260" />
            <line x1="160" y1="40" x2="160" y2="260" />
            <line x1="240" y1="40" x2="240" y2="260" />
            <line x1="320" y1="40" x2="320" y2="260" />
          </g>
          <circle cx="200" cy="150" r="7" fill="#D6FD52" stroke="#000000" stroke-width="2" />
        </g>
      `;
      break;
  }

  // End of drawing
  svgContainer.innerHTML = svgContent;
}
