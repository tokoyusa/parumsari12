import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// High-fidelity 3D metallic gold letter 'P' logo on vibrant lime-green radial gradient
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Radial Gradient (Spotlight from top-left) -->
    <radialGradient id="bg-grad" cx="25%" cy="25%" r="75%">
      <stop offset="0%" stop-color="#e3fc07" />
      <stop offset="40%" stop-color="#bce802" />
      <stop offset="100%" stop-color="#7ca400" />
    </radialGradient>

    <!-- Metallic Gold Gradient 1 (Vertical & Primary reflection) -->
    <linearGradient id="gold-primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff6cc" />
      <stop offset="15%" stop-color="#ffd54f" />
      <stop offset="30%" stop-color="#e5a910" />
      <stop offset="45%" stop-color="#b07a05" />
      <stop offset="60%" stop-color="#ffd54f" />
      <stop offset="75%" stop-color="#fff1b0" />
      <stop offset="90%" stop-color="#b07a05" />
      <stop offset="100%" stop-color="#8c5e00" />
    </linearGradient>

    <!-- Metallic Gold Gradient 2 (Horizontal tracks) -->
    <linearGradient id="gold-horiz" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b07a05" />
      <stop offset="20%" stop-color="#ffd54f" />
      <stop offset="40%" stop-color="#fff6cc" />
      <stop offset="60%" stop-color="#e5a910" />
      <stop offset="80%" stop-color="#ffd54f" />
      <stop offset="100%" stop-color="#8c5e00" />
    </linearGradient>

    <!-- Metallic Gold Gradient 3 (Sweeping Swoosh Ribbon) -->
    <linearGradient id="gold-swoosh" x1="0%" y1="50%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8c5e00" />
      <stop offset="25%" stop-color="#ffd54f" />
      <stop offset="50%" stop-color="#fffbde" />
      <stop offset="75%" stop-color="#e5a910" />
      <stop offset="100%" stop-color="#b07a05" />
    </linearGradient>

    <!-- Highlight stroke gradient for 3D edges -->
    <linearGradient id="gold-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#fff6cc" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#ffd54f" stop-opacity="0.0" />
    </linearGradient>

    <!-- Shadow filter for the entire golden group to cast onto lime green background -->
    <filter id="drop-shadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="8" dy="22" stdDeviation="16" flood-color="#3d4e00" flood-opacity="0.55" />
      <feDropShadow dx="2" dy="6" stdDeviation="6" flood-color="#232e00" flood-opacity="0.35" />
    </filter>

    <!-- Drop shadow for sub-tracks inside to create internal depth -->
    <filter id="inner-depth" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#000000" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Lime-Green Background -->
  <rect width="512" height="512" fill="url(#bg-grad)" />

  <!-- Subtle Sunburst overlay from top-left -->
  <path d="M 0,0 L 512,120 L 512,0 Z" fill="#ffffff" opacity="0.08" />
  <path d="M 0,0 L 512,280 L 512,180 Z" fill="#ffffff" opacity="0.06" />
  <path d="M 0,0 L 280,512 L 180,512 Z" fill="#ffffff" opacity="0.06" />

  <!-- Main Golden Letter P Group with realistic soft drop shadow -->
  <g filter="url(#drop-shadow)">
    
    <!-- TRACK 1: LEFT OUTER VERTICAL STEM & OUTER TOP-RIGHT LOOP (Unified Frame) -->
    <!-- Base Layer (Dark shadow/border for 3D extrusion) -->
    <path d="M 128,245 L 128,85 L 280,85 C 362,85 418,141 418,223 C 418,305 362,361 280,361" 
          fill="none" stroke="#664600" stroke-width="32" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Metallic Fill Layer -->
    <path d="M 128,245 L 128,85 L 280,85 C 362,85 418,141 418,223 C 418,305 362,361 280,361" 
          fill="none" stroke="url(#gold-primary)" stroke-width="26" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- 3D Bevel/Highlight Inner Line -->
    <path d="M 129,243 L 129,86 L 280,86 C 358,86 413,141 413,223 C 413,301 358,356 280,356" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter" opacity="0.8" />


    <!-- TRACK 2: INNER PARALLEL TOP LOOP -->
    <!-- Base Layer -->
    <path d="M 210,125 L 278,125 C 326,125 358,157 358,223 C 358,289 326,321 278,321" 
          fill="none" stroke="#664600" stroke-width="24" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Metallic Fill Layer -->
    <path d="M 210,125 L 278,125 C 326,125 358,157 358,223 C 358,289 326,321 278,321" 
          fill="none" stroke="url(#gold-horiz)" stroke-width="18" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Highlight Inner Line -->
    <path d="M 210,126 L 278,126 C 322,126 354,157 354,223" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="3" stroke-linecap="square" opacity="0.6" />


    <!-- TRACK 3: CENTER INNER VERTICAL BAR (NESTED IN THE LOOP) -->
    <!-- Base Layer -->
    <path d="M 178,118 L 178,210" 
          fill="none" stroke="#664600" stroke-width="24" stroke-linecap="square" />
    <!-- Metallic Fill Layer -->
    <path d="M 178,118 L 178,210" 
          fill="none" stroke="url(#gold-primary)" stroke-width="18" stroke-linecap="square" />
    <!-- Highlight -->
    <path d="M 176,120 L 176,208" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="3" stroke-linecap="square" opacity="0.7" />


    <!-- TRACK 4: BOTTOM LEFT VERTICAL STEM -->
    <!-- Base Layer -->
    <path d="M 128,300 L 128,460 L 154,460" 
          fill="none" stroke="#664600" stroke-width="32" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Metallic Fill Layer -->
    <path d="M 128,300 L 128,460 L 154,460" 
          fill="none" stroke="url(#gold-primary)" stroke-width="26" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Highlight -->
    <path d="M 129,302 L 129,459 L 153,459" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter" opacity="0.8" />


    <!-- TRACK 5: BOTTOM INNER VERTICAL STEM -->
    <!-- Base Layer -->
    <path d="M 178,300 L 178,418" 
          fill="none" stroke="#664600" stroke-width="24" stroke-linecap="square" />
    <!-- Metallic Fill Layer -->
    <path d="M 178,300 L 178,418" 
          fill="none" stroke="url(#gold-primary)" stroke-width="18" stroke-linecap="square" />
    <!-- Highlight -->
    <path d="M 176,302 L 176,416" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="3" stroke-linecap="square" opacity="0.7" />


    <!-- TRACK 6: LOWER RIGHT CORNER ANCHOR (L-SHAPE TRACK) -->
    <!-- Base Layer -->
    <path d="M 220,318 L 220,442 L 244,442" 
          fill="none" stroke="#664600" stroke-width="24" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Metallic Fill Layer -->
    <path d="M 220,318 L 220,442 L 244,442" 
          fill="none" stroke="url(#gold-primary)" stroke-width="18" stroke-linecap="square" stroke-linejoin="miter" />
    <!-- Highlight -->
    <path d="M 218,320 L 218,440 L 242,440" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter" opacity="0.7" />


    <!-- TRACK 7: ELEGANT CENTER SWEEPING SWOOSH RIBBON -->
    <!-- This dynamic swoosh starts at a sharp tip on the left, swoops down under, and sweeps up gracefully -->
    <!-- Base Drop shadow/Bevel Layer -->
    <path d="M 100,345 C 105,278 185,225 315,225 C 240,255 175,325 142,345 C 122,357 108,355 100,345 Z" 
          fill="#593b00" filter="url(#inner-depth)" />
    <!-- Main Metallic fill with Swoosh Gradient -->
    <path d="M 100,345 C 105,278 185,225 315,225 C 240,255 175,325 142,345 C 122,357 108,355 100,345 Z" 
          fill="url(#gold-swoosh)" stroke="#664600" stroke-width="2" />
    <!-- Dynamic Bevel Line highlight -->
    <path d="M 104,342 C 109,280 185,228 312,228" 
          fill="none" stroke="url(#gold-highlight)" stroke-width="4" stroke-linecap="round" opacity="0.9" />
    <!-- Inner bottom shadow to give 3D overlap appearance -->
    <path d="M 240,255 C 175,325 142,345 142,345" 
          fill="none" stroke="#4a3100" stroke-width="3" opacity="0.6" />

  </g>
</svg>
`;

async function generate() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Save original SVG
  const svgPath = path.join(publicDir, 'icon.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log('Saved icon.svg successfully.');

  // 2. Generate 192x192 PNG
  const png192Path = path.join(publicDir, 'icon-192.png');
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(png192Path);
  console.log('Generated icon-192.png successfully.');

  // 3. Generate 512x512 PNG
  const png512Path = path.join(publicDir, 'icon-512.png');
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(png512Path);
  console.log('Generated icon-512.png successfully.');
  
  // 4. Generate standard favicon.png
  const faviconPath = path.join(publicDir, 'favicon.png');
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .png()
    .toFile(faviconPath);
  console.log('Generated favicon.png successfully.');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
