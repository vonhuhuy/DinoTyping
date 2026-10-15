// Multi-Species Dinosaur SVG Generator for DinoTyping

export const DINO_SPECIES = [
  { id: 'rex', name: 'Rexy (T-Rex)', icon: '🦖', description: 'Brave king of dinosaurs' },
  { id: 'trike', name: 'Trike (Triceratops)', icon: '🦏', description: 'Three horns and a shield frill' },
  { id: 'steg', name: 'Steggy (Stegosaurus)', icon: '🛡️', description: 'Huge kite plates and 4 spiked tail' },
  { id: 'brachio', name: 'Longneck (Brachio)', icon: '🦕', description: 'Ultra-tall gentle sauropod neck' },
  { id: 'cory', name: 'Cory (Corythosaurus)', icon: '👑', description: 'Round Corinthian helmet crest' },
  { id: 'lambeo', name: 'Lambeo (Lambeosaurus)', icon: '🪓', description: 'Axe/hatchet crest hadrosaur' },
  { id: 'allo', name: 'Allo (Allosaurus)', icon: '🔥', description: 'Twin red brow crests and sharp teeth' },
  { id: 'raptor', name: 'Raptor (Velociraptor)', icon: '⚡', description: 'Feathered crest and giant curved foot claw' },
  { id: 'pachy', name: 'Pachy (Pachycephalo)', icon: '🥊', description: 'Thick bone dome helmet and spikes' },
  { id: 'ptery', name: 'Ptery (Pterosaur)', icon: '🪽', description: 'Soaring wings and backward crest' },
];

export function renderDinosaurSvg({
  species = 'rex',
  word = 'word',
  state = 'neutral', // 'neutral' | 'correct' | 'incorrect'
  correctWord = '',
}) {
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';

  // Dynamic font size for placard word
  const cleanWord = word || '';
  let fontSize = 48;
  if (cleanWord.length > 7) {
    fontSize = Math.max(26, Math.floor(340 / cleanWord.length));
  } else if (cleanWord.length > 5) {
    fontSize = 38;
  }

  const signColor = '#bdebb6';
  const signBorder = '#1a491e';

  // Overlay Badges
  let overlaySvg = '';
  if (isCorrect) {
    overlaySvg = `
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
      <g filter="url(#badgeShadow)">
        <line x1="160" y1="140" x2="240" y2="220" stroke="#ffffff" stroke-width="30" stroke-linecap="round" />
        <line x1="240" y1="140" x2="160" y2="220" stroke="#ffffff" stroke-width="30" stroke-linecap="round" />
      </g>
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

  // Get Species-specific SVG
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
    case 'cory':
      dinoBodySvg = renderCorythosaurus(state, isCorrect, isIncorrect);
      break;
    case 'lambeo':
      dinoBodySvg = renderLambeosaurus(state, isCorrect, isIncorrect);
      break;
    case 'allo':
      dinoBodySvg = renderAllosaurus(state, isCorrect, isIncorrect);
      break;
    case 'raptor':
      dinoBodySvg = renderVelociraptor(state, isCorrect, isIncorrect);
      break;
    case 'pachy':
      dinoBodySvg = renderPachycephalosaurus(state, isCorrect, isIncorrect);
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

      <!-- Dinosaur Body Graphics -->
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

      <!-- Arms Holding Placard -->
      ${renderArms(species)}

      <!-- Overlay Badges -->
      ${overlaySvg}
    </svg>
  `;
}

// 1. T-REX (Green King)
function renderTRex(state, isCorrect, isIncorrect) {
  const skin = '#3da742';
  const shadow = '#2f8833';
  const outline = '#154019';
  const belly = '#cbed93';
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, true, 0);

  return `
    <path d="M 120 310 Q 50 310 40 260 Q 90 280 130 295 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <polygon points="55,275 62,258 75,270" fill="${shadow}" stroke="${outline}" stroke-width="3" />
    <polygon points="80,282 88,266 98,278" fill="${shadow}" stroke="${outline}" stroke-width="3" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />
    <path d="M 120 170 C 105 140, 115 70, 200 70 C 285 70, 295 140, 280 170 C 305 185, 305 220, 265 235 C 240 245, 160 245, 135 235 C 95 220, 95 185, 120 170 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <ellipse cx="184" cy="188" rx="3.5" ry="5" fill="${outline}" />
    <ellipse cx="216" cy="188" rx="3.5" ry="5" fill="${outline}" />
    ${face}
  `;
}

// 2. TRICERATOPS (Blue 3-Horns)
function renderTriceratops(state, isCorrect, isIncorrect) {
  const skin = '#38bdf8';
  const shadow = '#0284c7';
  const outline = '#0c4a6e';
  const belly = '#bae6fd';
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, 0);

  return `
    <path d="M 125 315 Q 60 325 50 280 Q 95 290 135 300 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />
    <!-- Frill Shield -->
    <path d="M 100 160 C 80 100, 110 45, 200 45 C 290 45, 320 100, 300 160 Z" fill="${shadow}" stroke="${outline}" stroke-width="7" />
    <circle cx="140" cy="80" r="12" fill="${belly}" opacity="0.8" />
    <circle cx="200" cy="65" r="14" fill="${belly}" opacity="0.8" />
    <circle cx="260" cy="80" r="12" fill="${belly}" opacity="0.8" />
    <ellipse cx="200" cy="170" rx="72" ry="60" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <!-- Brow Horns -->
    <path d="M 140 120 Q 115 75 125 65 Q 145 80 155 120 Z" fill="#ffffff" stroke="${outline}" stroke-width="4" />
    <path d="M 260 120 Q 285 75 275 65 Q 255 80 245 120 Z" fill="#ffffff" stroke="${outline}" stroke-width="4" />
    <!-- Nose Horn -->
    <path d="M 194 180 Q 200 145 200 145 Q 206 145 206 180 Z" fill="#ffffff" stroke="${outline}" stroke-width="4" />
    ${face}
  `;
}

// 3. STEGOSAURUS (Redesigned: HUGE Distinct Kite Plates & 4 Long Spikes)
function renderStegosaurus(state, isCorrect, isIncorrect) {
  const skin = '#8b5cf6'; // Rich violet
  const shadow = '#6d28d9';
  const outline = '#2e1065';
  const belly = '#ede9fe';
  const plateColor = '#f97316'; // Bright fire orange
  const plateInner = '#fde047'; // Yellow gradient center
  const plateBorder = '#9a3412';

  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, 20);

  return `
    <!-- Back Plates (HUGE Distinct Double-row Kite Plates) -->
    <!-- Rear high plates -->
    <polygon points="90,95 120,30 150,95 130,135" fill="${plateColor}" stroke="${plateBorder}" stroke-width="6" />
    <polygon points="105,95 120,50 135,95 125,115" fill="${plateInner}" />

    <polygon points="150,75 185,15 220,75 200,120" fill="${plateColor}" stroke="${plateBorder}" stroke-width="6" />
    <polygon points="168,75 185,35 202,75 190,105" fill="${plateInner}" />

    <polygon points="220,85 255,25 290,85 270,125" fill="${plateColor}" stroke="${plateBorder}" stroke-width="6" />
    <polygon points="238,85 255,45 272,85 260,110" fill="${plateInner}" />

    <polygon points="280,110 310,55 335,110 315,140" fill="${plateColor}" stroke="${plateBorder}" stroke-width="5" />

    <!-- Famous Thagomizer Tail (4 Sharp Spikes pointing out) -->
    <path d="M 130 320 Q 50 330 30 270 Q 80 290 135 305 Z" fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <!-- 4 Clear Long Spikes -->
    <polygon points="45,260 5,230 40,248" fill="#ffffff" stroke="${outline}" stroke-width="4" />
    <polygon points="40,270 0,265 35,278" fill="#ffffff" stroke="${outline}" stroke-width="4" />
    <polygon points="45,285 10,300 45,295" fill="#ffffff" stroke="${outline}" stroke-width="4" />
    <polygon points="55,295 25,325 58,305" fill="#ffffff" stroke="${outline}" stroke-width="4" />

    <!-- Body -->
    ${renderGenericFeet(skin, outline)}
    <path d="M 125 240 Q 100 320 145 360 Q 200 380 255 360 Q 300 320 275 240 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 155 255 Q 145 320 170 355 Q 200 365 230 355 Q 255 320 245 255 Z" fill="${belly}" opacity="0.9" />

    <!-- Elongated Stegosaurus Beaked Head -->
    <path d="M 150 170 C 140 145, 160 120, 200 120 C 240 120, 260 145, 250 170 C 265 200, 240 230, 200 230 C 160 230, 135 200, 150 170 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" />
    <!-- Cheeks and Beak -->
    <path d="M 180 215 Q 200 235 220 215 Z" fill="${shadow}" />
    ${face}
  `;
}

// 4. BRACHIOSAURUS (Redesigned: ULTRA-TALL Sauropod Neck, Nasal Dome Crest & Pillared Legs)
function renderBrachiosaurus(state, isCorrect, isIncorrect) {
  const skin = '#f59e0b'; // Amber
  const shadow = '#d97706';
  const outline = '#78350f';
  const belly = '#fef3c7';

  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, -55);

  return `
    <!-- Curved Tail -->
    <path d="M 125 320 Q 55 330 45 285 Q 90 295 135 305 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${renderGenericFeet(skin, outline)}

    <!-- Huge Sauropod Body -->
    <path d="M 120 230 Q 95 320 140 360 Q 200 380 260 360 Q 305 320 280 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 155 250 Q 145 320 170 350 Q 200 360 230 350 Q 255 320 245 250 Z" fill="${belly}" opacity="0.9" />

    <!-- DRAMATICALLY TALL EXTENDED SAUROPOD NECK REACHING SKYWARD -->
    <path d="M 160 250 C 150 140, 155 60, 185 35 C 215 35, 220 140, 240 250 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <!-- Neck light under-stripe -->
    <path d="M 180 250 C 175 140, 180 75, 195 50 C 205 75, 210 140, 220 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Distinctive High Bulbous Nasal Head Dome on Top -->
    <ellipse cx="200" cy="50" rx="30" ry="22" fill="${shadow}" stroke="${outline}" stroke-width="6" />
    <!-- Friendly Sauropod Head -->
    <ellipse cx="200" cy="100" rx="55" ry="46" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <!-- Big Sauropod Nostrils on top of head -->
    <ellipse cx="192" cy="78" rx="4" ry="5" fill="${outline}" />
    <ellipse cx="208" cy="78" rx="4" ry="5" fill="${outline}" />

    ${face}
  `;
}

// 5. CORYTHOSAURUS (Cory - Semicircular Helmet Crest)
function renderCorythosaurus(state, isCorrect, isIncorrect) {
  const skin = '#10b981'; // Emerald
  const shadow = '#047857';
  const outline = '#064e3b';
  const belly = '#d1fae5';
  const crestColor = '#f97316'; // Bright helmet comb
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, 0);

  return `
    <path d="M 125 315 Q 60 325 50 280 Q 95 290 135 300 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Famous Semicircular Helmet Crest (Corinthian Helmet) -->
    <path d="M 135 150 C 130 50, 270 50, 265 150 Z" fill="${crestColor}" stroke="${outline}" stroke-width="7" />
    <!-- Crest inner flame stripes -->
    <path d="M 160 140 Q 200 70 240 140" fill="none" stroke="#fef08a" stroke-width="8" stroke-linecap="round" />

    <!-- Head & Duckbill -->
    <ellipse cx="200" cy="170" rx="66" ry="56" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 170 200 Q 200 220 230 200" fill="${shadow}" stroke="${outline}" stroke-width="3" />
    ${face}
  `;
}

// 6. LAMBEOSAURUS (Lambeo - Hatchet / Axe Crest)
function renderLambeosaurus(state, isCorrect, isIncorrect) {
  const skin = '#14b8a6'; // Teal
  const shadow = '#0f766e';
  const outline = '#134e48';
  const belly = '#ccfbf1';
  const crestColor = '#ec4899'; // Vibrant pink/magenta hatchet
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, 0);

  return `
    <path d="M 125 315 Q 60 325 50 280 Q 95 290 135 300 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Distinctive Hatchet / Axe-shaped Crest pointing up and forward with backward spine -->
    <path d="M 175 140 L 140 60 L 210 50 L 225 90 L 280 65 L 245 130 Z" 
          fill="${crestColor}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <polygon points="155,68 195,62 185,110" fill="#fde047" opacity="0.8" />

    <!-- Head -->
    <ellipse cx="200" cy="170" rx="66" ry="56" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${face}
  `;
}

// 7. ALLOSAURUS (Allo - Fierce Twin Brow Horn Crests)
function renderAllosaurus(state, isCorrect, isIncorrect) {
  const skin = '#0284c7'; // Deep cerulean
  const shadow = '#0369a1';
  const outline = '#082f49';
  const belly = '#e0f2fe';
  const crestColor = '#ef4444'; // Red brow horns
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, true, 0);

  return `
    <path d="M 120 310 Q 50 310 40 260 Q 90 280 130 295 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Twin Red Brow Crest Horns -->
    <polygon points="135,140 120,95 155,120" fill="${crestColor}" stroke="${outline}" stroke-width="5" />
    <polygon points="265,140 280,95 245,120" fill="${crestColor}" stroke="${outline}" stroke-width="5" />

    <!-- Predator Head -->
    <path d="M 120 170 C 105 130, 120 80, 200 80 C 280 80, 295 130, 280 170 C 305 185, 305 220, 265 235 C 240 245, 160 245, 135 235 C 95 220, 95 185, 120 170 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" stroke-linejoin="round" />
    <ellipse cx="184" cy="188" rx="3.5" ry="5" fill="${outline}" />
    <ellipse cx="216" cy="188" rx="3.5" ry="5" fill="${outline}" />
    ${face}
  `;
}

// 8. VELOCIRAPTOR (Raptor - Feathered Head Tuft & Sickle Claw)
function renderVelociraptor(state, isCorrect, isIncorrect) {
  const skin = '#ea580c'; // Warm raptor amber
  const shadow = '#c2410c';
  const outline = '#431407';
  const belly = '#ffedd5';
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, true, 0);

  return `
    <!-- Long Agile Raptor Tail with Feather Tuft -->
    <path d="M 125 315 Q 40 310 20 240 Q 75 270 130 295 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <polygon points="25,245 5,215 35,235" fill="#facc15" stroke="${outline}" stroke-width="3" />
    <polygon points="30,255 10,235 40,250" fill="#facc15" stroke="${outline}" stroke-width="3" />

    <!-- Feet with Iconic Giant Sickle Claw Raised Up! -->
    <g>
      <ellipse cx="140" cy="385" rx="30" ry="18" fill="${skin}" stroke="${outline}" stroke-width="6" />
      <!-- Giant Sickle Claw -->
      <path d="M 120 395 C 100 390, 95 365, 110 355 C 112 375, 125 385, 135 390 Z" fill="#ffffff" stroke="${outline}" stroke-width="4" />
      <circle cx="145" cy="396" r="6" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <circle cx="160" cy="392" r="6" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    </g>
    <g>
      <ellipse cx="260" cy="385" rx="30" ry="18" fill="${skin}" stroke="${outline}" stroke-width="6" />
      <!-- Giant Sickle Claw -->
      <path d="M 280 395 C 300 390, 305 365, 290 355 C 288 375, 275 385, 265 390 Z" fill="#ffffff" stroke="${outline}" stroke-width="4" />
      <circle cx="255" cy="396" r="6" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <circle cx="240" cy="392" r="6" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    </g>

    <!-- Body -->
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Feathered Head Crest Tuft -->
    <path d="M 170 90 L 150 40 L 190 70 L 205 30 L 220 70 L 245 40 L 230 90 Z" fill="#facc15" stroke="${outline}" stroke-width="5" />

    <!-- Raptor Head -->
    <path d="M 125 170 C 110 135, 130 85, 200 85 C 270 85, 290 135, 275 170 C 300 185, 295 220, 265 235 C 240 245, 160 245, 135 235 C 105 220, 100 185, 125 170 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${face}
  `;
}

// 9. PACHYCEPHALOSAURUS (Pachy / "Pycho" - Thick Bone Helmet Dome & Spikes)
function renderPachycephalosaurus(state, isCorrect, isIncorrect) {
  const skin = '#84cc16'; // Lime
  const shadow = '#65a30d';
  const outline = '#365314';
  const belly = '#ecfccb';
  const domeColor = '#fef08a'; // Bony dome
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, 10);

  return `
    <path d="M 125 315 Q 60 325 50 280 Q 95 290 135 300 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" fill="${belly}" opacity="0.9" />

    <!-- FAMOUS THICK BONE HELMET DOME -->
    <path d="M 125 140 C 120 40, 280 40, 275 140 Z" fill="${domeColor}" stroke="${outline}" stroke-width="8" />
    <ellipse cx="200" cy="95" rx="50" ry="25" fill="#fef9c3" opacity="0.6" />

    <!-- Crown of Bony Knobs & Spikes around skull -->
    <circle cx="120" cy="140" r="8" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    <circle cx="138" cy="148" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    <circle cx="262" cy="148" r="7" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    <circle cx="280" cy="140" r="8" fill="#ffffff" stroke="${outline}" stroke-width="3" />
    <polygon points="190,145 200,132 210,145" fill="#ffffff" stroke="${outline}" stroke-width="3" />

    <!-- Head -->
    <ellipse cx="200" cy="175" rx="66" ry="52" fill="${skin}" stroke="${outline}" stroke-width="7" />
    ${face}
  `;
}

// 10. PTEROSAUR (Ptery - Flying Wings & Crest)
function renderPterosaur(state, isCorrect, isIncorrect) {
  const skin = '#fb7185';
  const shadow = '#e11d48';
  const outline = '#881337';
  const belly = '#ffe4e6';
  const face = getFaceExpressions(state, outline, isCorrect, isIncorrect, false, 0);

  return `
    <polygon points="185,360 200,385 215,360" fill="${skin}" stroke="${outline}" stroke-width="5" />
    ${renderGenericFeet(skin, outline)}
    <path d="M 140 230 Q 120 320 150 360 Q 200 375 250 360 Q 280 320 260 230 Z" fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 165 250 Q 155 320 175 350 Q 200 360 225 350 Q 245 320 235 250 Z" fill="${belly}" opacity="0.9" />

    <!-- Large Wings Spreading Out -->
    <path d="M 130 230 Q 40 180 20 130 Q 70 180 125 245 Z" fill="${shadow}" stroke="${outline}" stroke-width="6" />
    <path d="M 270 230 Q 360 180 380 130 Q 330 180 275 245 Z" fill="${shadow}" stroke="${outline}" stroke-width="6" />

    <!-- Backward Crest -->
    <path d="M 145 160 C 135 125, 160 55, 255 35 C 235 80, 260 145, 255 165 C 255 200, 145 200, 145 160 Z" 
          fill="${skin}" stroke="${outline}" stroke-width="7" />
    <path d="M 160 180 Q 200 215 240 180 Z" fill="${shadow}" stroke="${outline}" stroke-width="4" />
    ${face}
  `;
}

// Generic Sauropod/Theropod Claws
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

// Species-aware Arms holding Placard
function renderArms(species) {
  let skinColor = '#3da742';
  let outlineColor = '#154019';

  switch (species) {
    case 'trike':
      skinColor = '#38bdf8'; outlineColor = '#0c4a6e'; break;
    case 'steg':
      skinColor = '#8b5cf6'; outlineColor = '#2e1065'; break;
    case 'brachio':
      skinColor = '#f59e0b'; outlineColor = '#78350f'; break;
    case 'cory':
      skinColor = '#10b981'; outlineColor = '#064e3b'; break;
    case 'lambeo':
      skinColor = '#14b8a6'; outlineColor = '#134e48'; break;
    case 'allo':
      skinColor = '#0284c7'; outlineColor = '#082f49'; break;
    case 'raptor':
      skinColor = '#ea580c'; outlineColor = '#431407'; break;
    case 'pachy':
      skinColor = '#84cc16'; outlineColor = '#365314'; break;
    case 'ptery':
      skinColor = '#fb7185'; outlineColor = '#881337'; break;
    default:
      skinColor = '#3da742'; outlineColor = '#154019'; break;
  }

  return `
    <!-- Left Arm & 3 Claws -->
    <g>
      <path d="M 122 250 Q 85 270 75 285" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round" />
      <path d="M 122 250 Q 85 270 75 285" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="76" cy="272" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="72" cy="285" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="76" cy="298" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
    </g>

    <!-- Right Arm & 3 Claws -->
    <g>
      <path d="M 278 250 Q 315 270 325 285" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round" />
      <path d="M 278 250 Q 315 270 325 285" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="324" cy="272" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="328" cy="285" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      <ellipse cx="324" cy="298" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
    </g>
  `;
}

// Shared Face Expressions
function getFaceExpressions(state, outlineColor, isCorrect, isIncorrect, hasTeeth = true, yOffset = 0) {
  let eyesSvg = '';
  let mouthSvg = '';
  let extrasSvg = '';
  const y = yOffset;

  if (isCorrect) {
    // Cheerful / Cherished: Closed happy crescent eyes, blush cheeks, open smile
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
    // Sad: Droopy sad eyes, tear drop, downturned pout
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
    // Neutral: Friendly sparkling cartoon eyes, sweet smile
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
