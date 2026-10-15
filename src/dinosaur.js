// Multi-Species Dinosaur SVG Generator for DinoTyping

export const DINO_SPECIES = [
  { id: 'rex', name: 'Rexy (T-Rex)', icon: '🦖', description: 'The brave king of dinosaurs' },
  { id: 'trike', name: 'Trike (Triceratops)', icon: '🦏', description: 'Three cute horns and a shield frill' },
  { id: 'steg', name: 'Steggy (Stegosaurus)', icon: '✨', description: 'Colorful back plates and spiked tail' },
  { id: 'brachio', name: 'Longneck (Brachio)', icon: '🌿', description: 'Gentle giant with a long friendly neck' },
  { id: 'ptery', name: 'Ptery (Pterosaur)', icon: '🪽', description: 'Soaring friend with cute wings' },
];

export function renderDinosaurSvg({
  species = 'rex',
  word = 'word',
  state = 'neutral', // 'neutral' | 'correct' | 'incorrect'
  correctWord = '',
}) {
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';

  // Calculate dynamic font size for placard word
  const cleanWord = word || '';
  let fontSize = 48;
  if (cleanWord.length > 7) {
    fontSize = Math.max(26, Math.floor(340 / cleanWord.length));
  } else if (cleanWord.length > 5) {
    fontSize = 38;
  }

  // Common Placard & Arms holding it
  const signColor = '#bdebb6';
  const signBorder = '#1a491e';

  // Render Overlay Badges (Checkmark or Cross + Red Banner)
  let overlaySvg = '';
  if (isCorrect) {
    overlaySvg = `
      <!-- Big White Checkmark with Drop Shadow -->
      <g filter="url(#badgeShadow)">
        <path d="M 140 200 L 185 245 L 265 145" 
              fill="none" 
              stroke="#ffffff" 
              stroke-width="32" 
              stroke-linecap="round" 
              stroke-linejoin="round" />
      </g>
    `;
  } else if (isIncorrect) {
    const displayAns = correctWord || cleanWord;
    overlaySvg = `
      <!-- Big White Cross with Drop Shadow -->
      <g filter="url(#badgeShadow)">
        <line x1="160" y1="140" x2="240" y2="220" stroke="#ffffff" stroke-width="30" stroke-linecap="round" />
        <line x1="240" y1="140" x2="160" y2="220" stroke="#ffffff" stroke-width="30" stroke-linecap="round" />
      </g>
      <!-- Red Badge Banner: Correct answer(s): word -->
      <g filter="url(#bannerShadow)">
        <rect x="50" y="270" width="300" height="48" rx="24" fill="#dc2626" />
        <text x="200" y="301" 
              text-anchor="middle" 
              fill="#ffffff" 
              font-family="'Fredoka', 'Nunito', 'Quicksand', system-ui, sans-serif" 
              font-size="19" 
              font-weight="700" 
              letter-spacing="0.3">Correct answer(s): ${displayAns}</text>
      </g>
    `;
  }

  // Get Species Specific SVG Body and Face
  let dinoBodySvg = '';
  switch (species) {
    case 'trike':
      dinoBodySvg = renderTriceratops(state, isCorrect, isIncorrect);
      break;
    case 'steg':
      dinoBodySvg = renderStegosaurus(state, isCorrect, isIncorrect);
      break;
    case 'brachio':
      dinoBodySvg = renderBrachiosaurus(state, isCorrect, isIncorrect);
      break;
    case 'ptery':
      dinoBodySvg = renderPterosaur(state, isCorrect, isIncorrect);
      break;
    case 'rex':
    default:
      dinoBodySvg = renderTRex(state, isCorrect, isIncorrect);
      break;
  }

  return `
    <svg viewBox="0 0 400 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dino-svg dino-${species} dino-${state}">
      <defs>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="rgba(0,0,0,0.22)" />
        </filter>
        <filter id="bannerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="rgba(0,0,0,0.3)" />
        </filter>
      </defs>

      <!-- Dinosaur Anatomy -->
      ${dinoBodySvg}

      <!-- Placard / Word Sign -->
      <g id="placard-group">
        <rect x="75" y="240" width="250" height="110" rx="14" 
              fill="${signColor}" stroke="${signBorder}" stroke-width="6" />
        <rect x="83" y="248" width="234" height="94" rx="8" 
              fill="none" stroke="${signBorder}" stroke-width="1.5" opacity="0.3" />
        <text x="200" y="${295 + (fontSize > 40 ? 6 : 4)}" 
              text-anchor="middle" 
              fill="#111827" 
              font-family="'Fredoka', 'Quicksand', 'Nunito', system-ui, sans-serif" 
              font-size="${fontSize}" 
              font-weight="700" 
              letter-spacing="1">${cleanWord}</text>
      </g>

      <!-- Arms Holding Placard (species-aware claw colors) -->
      ${renderArms(species)}

      <!-- Overlay (Checkmark or Cross) -->
      ${overlaySvg}
    </svg>
  `;
}

// 1. T-REX RENDERER
function renderTRex(state, isCorrect, isIncorrect) {
  const skin = '#3da742';
  const shadow = '#2f8833';
  const outline = '#154019';
  const belly = '#cbed93';

  const eyesMouth = getFaceExpressions(state, outline, isCorrect, isIncorrect, true);

  return `
    <!-- Tail on Left -->
    <path d="M 120 310 Q 50 310 40 260 Q 90 280 130 295 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <polygon points="55,275 62,258 75,270" fill="${shadow}" stroke="${outline}" stroke-width="3" />
    <polygon points="80,282 88,266 98,278" fill="${shadow}" stroke="${outline}" stroke-width="3" />

    <!-- Feet -->
    ${renderGenericFeet(skin, outline)}

    <!-- Chubby Body -->
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Head -->
    <path d="M 120 170 C 105 140, 115 70, 200 70 C 285 70, 295 140, 280 170 C 305 185, 305 220, 265 235 C 240 245, 160 245, 135 235 C 95 220, 95 185, 120 170 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 140 185 Q 200 172 260 185 Q 265 220 200 225 Q 135 220 140 185 Z" fill="${shadow}" opacity="0.25" />

    <!-- Nostrils -->
    <ellipse cx="184" cy="188" rx="3.5" ry="5" fill="${outline}" />
    <ellipse cx="216" cy="188" rx="3.5" ry="5" fill="${outline}" />

    ${eyesMouth}
  `;
}

// 2. TRICERATOPS RENDERER
function renderTriceratops(state, isCorrect, isIncorrect) {
  const skin = '#38bdf8'; // Soft sky blue
  const shadow = '#0284c7';
  const outline = '#0c4a6e';
  const belly = '#bae6fd';
  const hornColor = '#ffffff';

  const eyesMouth = getFaceExpressions(state, outline, isCorrect, isIncorrect, false);

  return `
    <!-- Tail on Left -->
    <path d="M 125 315 Q 60 325 50 280 Q 95 290 135 300 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />

    <!-- Feet -->
    ${renderGenericFeet(skin, outline)}

    <!-- Chubby Body -->
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Large Frill Shield behind head -->
    <path d="M 100 160 C 80 100, 110 45, 200 45 C 290 45, 320 100, 300 160 Z" 
          fill="${shadow}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <!-- Frill decorative dots -->
    <circle cx="140" cy="80" r="12" fill="${belly}" opacity="0.8" />
    <circle cx="200" cy="65" r="14" fill="${belly}" opacity="0.8" />
    <circle cx="260" cy="80" r="12" fill="${belly}" opacity="0.8" />

    <!-- Head -->
    <ellipse cx="200" cy="170" rx="72" ry="60" fill="${skin}" stroke="${outline}" stroke-width="7" />

    <!-- Left Brow Horn -->
    <path d="M 140 120 Q 115 75 125 65 Q 145 80 155 120 Z" fill="${hornColor}" stroke="${outline}" stroke-width="4" />
    <!-- Right Brow Horn -->
    <path d="M 260 120 Q 285 75 275 65 Q 255 80 245 120 Z" fill="${hornColor}" stroke="${outline}" stroke-width="4" />
    <!-- Center Snout Horn -->
    <path d="M 194 180 Q 200 145 200 145 Q 206 145 206 180 Z" fill="${hornColor}" stroke="${outline}" stroke-width="4" />

    ${eyesMouth}
  `;
}

// 3. STEGOSAURUS RENDERER
function renderStegosaurus(state, isCorrect, isIncorrect) {
  const skin = '#a855f7'; // Purple
  const shadow = '#7e22ce';
  const outline = '#3b0764';
  const belly = '#f3e8ff';
  const plateColor = '#fb923c'; // Vibrant warm orange plates
  const plateBorder = '#c2410c';

  const eyesMouth = getFaceExpressions(state, outline, isCorrect, isIncorrect, false);

  return `
    <!-- Back Plates (Orange Hexagonal Plates) -->
    <polygon points="120,80 145,35 170,80 155,110" fill="${plateColor}" stroke="${plateBorder}" stroke-width="5" />
    <polygon points="175,70 200,25 225,70 210,105" fill="${plateColor}" stroke="${plateBorder}" stroke-width="5" />
    <polygon points="230,80 255,35 280,80 265,110" fill="${plateColor}" stroke="${plateBorder}" stroke-width="5" />

    <!-- Spiky Tail (Thagomizer!) -->
    <path d="M 125 315 Q 60 325 50 280 Q 95 290 135 300 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <line x1="60" y1="280" x2="35" y2="265" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
    <line x1="55" y1="295" x2="30" y2="295" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />

    <!-- Feet -->
    ${renderGenericFeet(skin, outline)}

    <!-- Chubby Body -->
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Head -->
    <ellipse cx="200" cy="165" rx="65" ry="55" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <!-- Cheeks -->
    <ellipse cx="200" cy="180" rx="72" ry="35" fill="${shadow}" opacity="0.25" />

    ${eyesMouth}
  `;
}

// 4. BRACHIOSAURUS RENDERER (Longneck)
function renderBrachiosaurus(state, isCorrect, isIncorrect) {
  const skin = '#f59e0b'; // Warm Amber/Golden
  const shadow = '#d97706';
  const outline = '#78350f';
  const belly = '#fef3c7';

  const eyesMouth = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, -15);

  return `
    <!-- Longneck curved tail -->
    <path d="M 125 320 Q 55 330 45 285 Q 90 295 135 305 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />

    <!-- Feet -->
    ${renderGenericFeet(skin, outline)}

    <!-- Body -->
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Long Tall Neck reaching up -->
    <path d="M 170 240 C 160 160, 165 110, 185 85 C 215 85, 240 160, 230 240 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 185 240 Q 185 150 195 100 Q 215 150 215 240 Z" fill="${belly}" opacity="0.8" />

    <!-- Friendly Head with Crest -->
    <ellipse cx="200" cy="145" rx="60" ry="50" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <!-- Crest dome -->
    <ellipse cx="200" cy="115" rx="35" ry="20" fill="${shadow}" stroke="${outline}" stroke-width="5" />

    ${eyesMouth}
  `;
}

// 5. PTEROSAUR RENDERER
function renderPterosaur(state, isCorrect, isIncorrect) {
  const skin = '#fb7185'; // Rose/Coral pink
  const shadow = '#e11d48';
  const outline = '#881337';
  const belly = '#ffe4e6';

  const eyesMouth = getFaceExpressions(state, outline, isCorrect, isIncorrect, false);

  return `
    <!-- Little Tail -->
    <polygon points="185,360 200,385 215,360" fill="${skin}" stroke="${outline}" stroke-width="5" />

    <!-- Feet -->
    ${renderGenericFeet(skin, outline)}

    <!-- Body -->
    <path d="M 140 230 Q 120 320 150 360 Q 200 375 250 360 Q 280 320 260 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <path d="M 165 250 Q 155 320 175 350 Q 200 360 225 350 Q 245 320 235 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Wing Flaps peeking from back -->
    <path d="M 130 230 Q 50 190 35 150 Q 75 190 125 245 Z" fill="${shadow}" stroke="${outline}" stroke-width="6" />
    <path d="M 270 230 Q 350 190 365 150 Q 325 190 275 245 Z" fill="${shadow}" stroke="${outline}" stroke-width="6" />

    <!-- Head with Long Backward Crest -->
    <path d="M 145 160 C 135 125, 160 65, 245 45 C 235 85, 260 145, 255 165 C 255 200, 145 200, 145 160 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />

    <!-- Beak / Snout -->
    <path d="M 160 180 Q 200 215 240 180 Z" fill="${shadow}" stroke="${outline}" stroke-width="4" />

    ${eyesMouth}
  `;
}

// SHARED FEET
function renderGenericFeet(skin, outline) {
  return `
    <g>
      <ellipse cx="140" cy="385" rx="30" ry="18" fill="${skin}" stroke="${outline}" stroke-width="6" />
      <circle cx="120" cy="392" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <circle cx="138" cy="396" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <circle cx="156" cy="392" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    </g>
    <g>
      <ellipse cx="260" cy="385" rx="30" ry="18" fill="${skin}" stroke="${outline}" stroke-width="6" />
      <circle cx="244" cy="392" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <circle cx="262" cy="396" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <circle cx="280" cy="392" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    </g>
  `;
}

// SHARED ARMS HOLDING PLACARD
function renderArms(species) {
  let skinColor = '#3da742';
  let outlineColor = '#154019';

  if (species === 'trike') {
    skinColor = '#38bdf8';
    outlineColor = '#0c4a6e';
  } else if (species === 'steg') {
    skinColor = '#a855f7';
    outlineColor = '#3b0764';
  } else if (species === 'brachio') {
    skinColor = '#f59e0b';
    outlineColor = '#78350f';
  } else if (species === 'ptery') {
    skinColor = '#fb7185';
    outlineColor = '#881337';
  }

  return `
    <!-- Left Arm & Claws -->
    <g>
      <path d="M 122 250 Q 85 270 75 285" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round" />
      <path d="M 122 250 Q 85 270 75 285" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="76" cy="272" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="72" cy="285" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="76" cy="298" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
    </g>

    <!-- Right Arm & Claws -->
    <g>
      <path d="M 278 250 Q 315 270 325 285" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round" />
      <path d="M 278 250 Q 315 270 325 285" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="324" cy="272" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="328" cy="285" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="324" cy="298" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
    </g>
  `;
}

// SHARED FACE EXPRESSIONS
function getFaceExpressions(state, outlineColor, isCorrect, isIncorrect, hasTeeth = true, yOffset = 0) {
  let eyesSvg = '';
  let mouthSvg = '';
  let extrasSvg = '';

  const y = yOffset;

  if (isCorrect) {
    // Cheerful / Cherished: Big joy, closed curved eyes, blushing cheeks, open mouth!
    eyesSvg = `
      <path d="M 125 ${155 + y} Q 145 ${130 + y} 165 ${155 + y}" fill="none" stroke="${outlineColor}" stroke-width="9" stroke-linecap="round" />
      <path d="M 235 ${155 + y} Q 255 ${130 + y} 275 ${155 + y}" fill="none" stroke="${outlineColor}" stroke-width="9" stroke-linecap="round" />
    `;

    mouthSvg = `
      <path d="M 160 ${215 + y} Q 200 ${280 + y} 240 ${215 + y} Z" fill="#991b1b" stroke="${outlineColor}" stroke-width="6" stroke-linejoin="round" />
      <path d="M 175 ${240 + y} Q 200 ${275 + y} 225 ${240 + y} Q 200 ${235 + y} 175 ${240 + y} Z" fill="#f472b6" />
      ${hasTeeth ? `
        <polygon points="175,${216 + y} 182,${228 + y} 189,${216 + y}" fill="#ffffff" />
        <polygon points="211,${216 + y} 218,${228 + y} 225,${216 + y}" fill="#ffffff" />
      ` : ''}
    `;

    extrasSvg = `
      <ellipse cx="120" cy="${195 + y}" rx="20" ry="12" fill="#ff758f" opacity="0.85" />
      <ellipse cx="280" cy="${195 + y}" rx="20" ry="12" fill="#ff758f" opacity="0.85" />
      <path d="M 85 90 L 92 105 L 107 107 L 95 118 L 99 133 L 85 124 L 71 133 L 75 118 L 63 107 L 78 105 Z" fill="#fef08a" />
      <path d="M 315 90 L 322 105 L 337 107 L 325 118 L 329 133 L 315 124 L 301 133 L 305 118 L 293 107 L 308 105 Z" fill="#fef08a" />
    `;
  } else if (isIncorrect) {
    // Sad: Droopy sad puppy eyes, downturned pout, tear drop!
    eyesSvg = `
      <ellipse cx="145" cy="${155 + y}" rx="22" ry="26" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <ellipse cx="150" cy="${162 + y}" rx="14" ry="17" fill="#1f2937" />
      <circle cx="152" cy="${148 + y}" r="6" fill="#ffffff" />
      <circle cx="142" cy="${166 + y}" r="3" fill="#ffffff" />
      <path d="M 125 ${130 + y} Q 145 ${138 + y} 165 ${126 + y}" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />

      <ellipse cx="255" cy="${155 + y}" rx="22" ry="26" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <ellipse cx="250" cy="${162 + y}" rx="14" ry="17" fill="#1f2937" />
      <circle cx="248" cy="${148 + y}" r="6" fill="#ffffff" />
      <circle cx="258" cy="${166 + y}" r="3" fill="#ffffff" />
      <path d="M 235 ${126 + y} Q 255 ${138 + y} 275 ${130 + y}" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
    `;

    mouthSvg = `
      <path d="M 175 ${235 + y} Q 200 ${215 + y} 225 ${235 + y}" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
    `;

    extrasSvg = `
      <path d="M 122 ${185 + y} C 122 ${178 + y} 132 ${170 + y} 132 ${170 + y} C 132 ${170 + y} 142 ${178 + y} 142 ${185 + y} C 142 ${192 + y} 137 ${197 + y} 132 ${197 + y} C 127 ${197 + y} 122 ${192 + y} 122 ${185 + y} Z" fill="#60a5fa" opacity="0.95" />
    `;
  } else {
    // Neutral: Friendly sparkling cartoon eyes, sweet smile!
    eyesSvg = `
      <ellipse cx="145" cy="${150 + y}" rx="23" ry="28" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <circle cx="152" cy="${140 + y}" r="9" fill="#ffffff" />
      <circle cx="138" cy="${162 + y}" r="4.5" fill="#ffffff" />

      <ellipse cx="255" cy="${150 + y}" rx="23" ry="28" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <circle cx="262" cy="${140 + y}" r="9" fill="#ffffff" />
      <circle cx="248" cy="${162 + y}" r="4.5" fill="#ffffff" />

      <path d="M 128 ${120 + y} Q 145 ${113 + y} 162 ${120 + y}" fill="none" stroke="${outlineColor}" stroke-width="5" stroke-linecap="round" />
      <path d="M 238 ${120 + y} Q 255 ${113 + y} 272 ${120 + y}" fill="none" stroke="${outlineColor}" stroke-width="5" stroke-linecap="round" />
    `;

    mouthSvg = `
      <path d="M 170 ${218 + y} Q 200 ${248 + y} 230 ${218 + y}" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
      ${hasTeeth ? `
        <polygon points="182,${228 + y} 188,${217 + y} 194,${228 + y}" fill="#ffffff" stroke="${outlineColor}" stroke-width="2" />
        <polygon points="206,${228 + y} 212,${217 + y} 218,${228 + y}" fill="#ffffff" stroke="${outlineColor}" stroke-width="2" />
      ` : ''}
    `;

    extrasSvg = `
      <ellipse cx="118" cy="${190 + y}" rx="14" ry="8" fill="#f472b6" opacity="0.4" />
      <ellipse cx="282" cy="${190 + y}" rx="14" ry="8" fill="#f472b6" opacity="0.4" />
    `;
  }

  return `
    ${eyesSvg}
    ${mouthSvg}
    ${extrasSvg}
  `;
}
