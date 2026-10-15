// Snap Squad Stylized Dinosaur SVG Generator for DinoTyping
// Inspired by Yoshi's Stylized Dinosaurs & Snap Squad Full-Body Designs

export const DINO_SPECIES = [
  { id: 'carno', name: 'Carno (Carnotaurus)', icon: '🐂', description: 'Bull horns, red body & dark back scutes' },
  { id: 'dilo', name: 'Dilo (Dilophosaurus)', icon: '🦎', description: 'Twin crests & vibrant frill' },
  { id: 'rex', name: 'Rexy (T-Rex)', icon: '🦖', description: 'Massive jaw & tiger stripes' },
  { id: 'spino', name: 'Spino (Spinosaurus)', icon: '🐊', description: 'Croc snout & fiery spine sail' },
  { id: 'raptor', name: 'Blue (Velociraptor)', icon: '⚡', description: 'Electric stripe & sharp sickle claw' },
  { id: 'para', name: 'Para (Parasaurolophus)', icon: '🎺', description: 'Swept-back tube crest & pink flank' },
  { id: 'trike', name: 'Trike (Triceratops)', icon: '🦏', description: '3 ivory horns & shield frill' },
  { id: 'steg', name: 'Steggy (Stegosaurus)', icon: '🛡️', description: 'Kite plates & 4-spike tail' },
];

// Species theme configurations: backdrop colors and accents
const SPECIES_THEMES = {
  carno: { bg: '#3e4c59', glow: '#536577', accent: '#ef4444', name: 'CARNOTAURUS' },
  dilo: { bg: '#2d4a43', glow: '#3b5f56', accent: '#f97316', name: 'DILOPHOSAURUS' },
  rex: { bg: '#423d33', glow: '#5c5445', accent: '#eab308', name: 'TYRANNOSAURUS' },
  spino: { bg: '#334155', glow: '#475569', accent: '#38bdf8', name: 'SPINOSAURUS' },
  raptor: { bg: '#3a3d52', glow: '#4d516d', accent: '#06b6d4', name: 'VELOCIRAPTOR' },
  para: { bg: '#4a3b4c', glow: '#634f66', accent: '#ec4899', name: 'PARASAUROLOPHUS' },
  trike: { bg: '#2b4353', glow: '#3b5b70', accent: '#38bdf8', name: 'TRICERATOPS' },
  steg: { bg: '#453545', glow: '#5c465c', accent: '#f97316', name: 'STEGOSAURUS' },
};

// Normalize legacy species IDs
function normalizeSpeciesId(species) {
  switch (species) {
    case 'allo': return 'carno';
    case 'cory':
    case 'lambeo': return 'para';
    case 'brachio': return 'rex';
    case 'pachy': return 'trike';
    case 'ptery': return 'raptor';
    default:
      return SPECIES_THEMES[species] ? species : 'carno';
  }
}

export function renderDinosaurSvg({
  species = 'carno',
  word = 'word',
  state = 'neutral', // 'neutral' | 'correct' | 'incorrect'
  correctWord = '',
}) {
  const normSpecies = normalizeSpeciesId(species);
  const theme = SPECIES_THEMES[normSpecies] || SPECIES_THEMES.carno;
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';

  // Dynamic font size for placard word
  const cleanWord = word || '';
  let fontSize = 48;
  if (cleanWord.length > 8) {
    fontSize = Math.max(26, Math.floor(340 / cleanWord.length));
  } else if (cleanWord.length > 5) {
    fontSize = 38;
  }

  // Render Species-specific Dinosaur Body
  let dinoSvg = '';
  switch (normSpecies) {
    case 'carno':
      dinoSvg = renderCarnotaurus(state, isCorrect, isIncorrect);
      break;
    case 'dilo':
      dinoSvg = renderDilophosaurus(state, isCorrect, isIncorrect);
      break;
    case 'rex':
      dinoSvg = renderTRex(state, isCorrect, isIncorrect);
      break;
    case 'spino':
      dinoSvg = renderSpinosaurus(state, isCorrect, isIncorrect);
      break;
    case 'raptor':
      dinoSvg = renderVelociraptor(state, isCorrect, isIncorrect);
      break;
    case 'para':
      dinoSvg = renderParasaurolophus(state, isCorrect, isIncorrect);
      break;
    case 'trike':
      dinoSvg = renderTriceratops(state, isCorrect, isIncorrect);
      break;
    case 'steg':
      dinoSvg = renderStegosaurus(state, isCorrect, isIncorrect);
      break;
    default:
      dinoSvg = renderCarnotaurus(state, isCorrect, isIncorrect);
      break;
  }

  // Celebration Confetti Stars for Correct State
  const celebrationStars = isCorrect ? `
    <g class="celebration-particles">
      <!-- Burst Stars -->
      <polygon points="50,60 56,76 72,78 60,90 64,106 50,98 36,106 40,90 28,78 44,76" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
      <polygon points="350,70 355,83 368,85 358,95 361,108 350,102 339,108 342,95 332,85 345,83" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
      <circle cx="95" cy="45" r="7" fill="#38bdf8" />
      <circle cx="310" cy="50" r="6" fill="#ec4899" />
      <circle cx="45" cy="130" r="5" fill="#4ade80" />
      <circle cx="360" cy="140" r="6" fill="#fb923c" />
    </g>
  ` : '';

  // Overlay Badges
  let overlaySvg = '';
  if (isCorrect) {
    overlaySvg = `
      <g filter="url(#dinoDropShadow)" class="badge-pop">
        <!-- Big Green Check Circle -->
        <circle cx="200" cy="205" r="52" fill="#22c55e" stroke="#ffffff" stroke-width="6" />
        <path d="M 175 205 L 193 223 L 230 185" 
              fill="none" 
              stroke="#ffffff" 
              stroke-width="12" 
              stroke-linecap="round" 
              stroke-linejoin="round" />
      </g>
    `;
  } else if (isIncorrect) {
    const displayAns = correctWord || cleanWord;
    overlaySvg = `
      <g filter="url(#dinoDropShadow)" class="badge-pop">
        <!-- Big Red Cross Circle -->
        <circle cx="200" cy="195" r="48" fill="#ef4444" stroke="#ffffff" stroke-width="6" />
        <line x1="180" y1="175" x2="220" y2="215" stroke="#ffffff" stroke-width="11" stroke-linecap="round" />
        <line x1="220" y1="175" x2="180" y2="215" stroke="#ffffff" stroke-width="11" stroke-linecap="round" />
      </g>
      <g filter="url(#bannerShadow)">
        <rect x="40" y="285" width="320" height="46" rx="23" fill="#dc2626" stroke="#ffffff" stroke-width="3" />
        <text x="200" y="314" 
              text-anchor="middle" 
              fill="#ffffff" 
              font-family="'Fredoka', 'Quicksand', system-ui, sans-serif" 
              font-size="18" 
              font-weight="700" 
              letter-spacing="0.5">Correct: ${displayAns}</text>
      </g>
    `;
  }

  return `
    <svg viewBox="0 0 400 425" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="snap-dino-svg dino-${normSpecies} state-${state}">
      <defs>
        <!-- Gradients -->
        <radialGradient id="backdropGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="${theme.glow}" stop-opacity="0.85" />
          <stop offset="100%" stop-color="${theme.bg}" stop-opacity="0.95" />
        </radialGradient>
        
        <linearGradient id="placardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f8fafc" />
        </linearGradient>

        <linearGradient id="carnoEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff6b6b" />
          <stop offset="100%" stop-color="#b91c1c" />
        </linearGradient>

        <linearGradient id="amberEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde047" />
          <stop offset="100%" stop-color="#ea580c" />
        </linearGradient>

        <linearGradient id="cyanEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#67e8f9" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>

        <!-- Shadows -->
        <filter id="dinoDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="rgba(0,0,0,0.3)" />
        </filter>
        <filter id="placardShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="rgba(0,0,0,0.35)" />
        </filter>
        <filter id="bannerShadow" x="-10%" y="-15%" width="120%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.4)" />
        </filter>
      </defs>

      <!-- Portfolio Card Vignette Backdrop -->
      <g id="backdrop-card">
        <rect x="25" y="16" width="350" height="270" rx="30" fill="url(#backdropGlow)" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
        <!-- Soft Circular Backdrop Spotlight -->
        <circle cx="185" cy="140" r="105" fill="${theme.glow}" opacity="0.45" />
      </g>

      <!-- Dinosaur Illustration (Snap Squad Full Body) -->
      <g id="dino-graphics" filter="url(#dinoDropShadow)">
        ${dinoSvg}
      </g>

      ${celebrationStars}

      <!-- Word Placard (Sleek Challenge Sign at Bottom) -->
      <g id="placard-group" filter="url(#placardShadow)">
        <!-- Outer Card Frame -->
        <rect x="45" y="280" width="310" height="114" rx="20" 
              fill="url(#placardGrad)" stroke="#111827" stroke-width="5" />
        
        <!-- Inner Decorative Trim -->
        <rect x="54" y="289" width="292" height="96" rx="14" 
              fill="none" stroke="#e2e8f0" stroke-width="2" />
        
        <!-- Subtle Top Glass Sheen -->
        <path d="M 56 291 L 344 291 C 344 310, 56 316, 56 316 Z" fill="#ffffff" opacity="0.6" />

        <!-- Target Word Text -->
        <text x="200" y="${340 + (fontSize > 40 ? 5 : 3)}" 
              text-anchor="middle" 
              fill="#0f172a" 
              font-family="'Fredoka', 'Quicksand', system-ui, sans-serif" 
              font-size="${fontSize}" 
              font-weight="700" 
              letter-spacing="1">${cleanWord}</text>
      </g>

      <!-- Placard Grip Claws (Species Paws holding or standing on placard top) -->
      ${renderPlacardPaws(normSpecies)}

      <!-- Overlay Badges (Checkmark or Cross Banner) -->
      ${overlaySvg}
    </svg>
  `;
}

// -------------------------------------------------------------
// 1. CARNOTAURUS (Snap Squad Chibi Icon: Bull Horns, Crimson, Scutes)
// -------------------------------------------------------------
function renderCarnotaurus(state, isCorrect, isIncorrect) {
  const line = '#181418';
  const bodyRed = '#b93826';
  const darkRed = '#942518';
  const skullBlack = '#231d22';
  const bellyTan = '#f2ddc4';
  const clawBlack = '#191519';

  return `
    <!-- Tail (Curved theropod tail) -->
    <path d="M 235 210 Q 320 200 345 155 Q 355 185 300 235 Q 260 250 230 240 Z" 
          fill="${bodyRed}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <!-- Tail Back Scutes -->
    <polygon points="260,205 272,192 278,206" fill="${skullBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="288,194 298,180 306,195" fill="${skullBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="316,176 325,160 332,175" fill="${skullBlack}" stroke="${line}" stroke-width="2" />

    <!-- Back Left Leg (Shadow Leg) -->
    <path d="M 225 210 Q 255 240 250 278 L 225 278 Q 228 245 210 225 Z" fill="${darkRed}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="${clawBlack}" />

    <!-- Carnotaurus Torso -->
    <path d="M 140 180 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 180 Z" 
          fill="${bodyRed}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />

    <!-- Cream Underbelly / Chest -->
    <path d="M 145 188 C 140 220, 155 255, 185 258 C 160 250, 150 220, 155 188 Z" fill="${bellyTan}" stroke="${line}" stroke-width="3" />

    <!-- Dorsal Scutes / Spikes along arched back -->
    <polygon points="180,165 190,148 198,165" fill="${skullBlack}" stroke="${line}" stroke-width="2.5" />
    <polygon points="204,168 215,152 222,170" fill="${skullBlack}" stroke="${line}" stroke-width="2.5" />
    <polygon points="228,178 238,162 245,182" fill="${skullBlack}" stroke="${line}" stroke-width="2.5" />

    <!-- Foreground Right Leg (Chunky Muscular Theropod Leg) -->
    <path d="M 175 210 Q 215 230 205 285 L 165 285 Q 165 245 155 215 Z" 
          fill="${bodyRed}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <!-- Knee & Muscle Contour -->
    <path d="M 175 235 Q 192 245 185 265" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round" />
    <!-- Foot with 3 Claws -->
    <ellipse cx="185" cy="287" rx="22" ry="8" fill="${bodyRed}" stroke="${line}" stroke-width="4" />
    <polygon points="166,287 160,296 172,291" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="182,289 184,300 193,289" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="198,287 208,296 203,286" fill="${clawBlack}" stroke="${line}" stroke-width="2" />

    <!-- Tiny Vestigial Carnotaurus Arm -->
    <path d="M 148 215 Q 135 220 136 230" fill="none" stroke="${bodyRed}" stroke-width="12" stroke-linecap="round" />
    <path d="M 148 215 Q 135 220 136 230" fill="none" stroke="${line}" stroke-width="4" stroke-linecap="round" />
    <circle cx="135" cy="232" r="3" fill="${clawBlack}" />
    <circle cx="138" cy="235" r="3" fill="${clawBlack}" />

    <!-- BIG CHIBI CARNOTAURUS HEAD (Bulldog Theropod Snout) -->
    <g id="carno-head">
      <!-- Base Head Shape -->
      <path d="M 115 168 C 80 165, 75 125, 95 90 C 115 55, 175 52, 215 75 C 245 95, 235 150, 205 165 C 175 178, 140 172, 115 168 Z" 
            fill="${bodyRed}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />

      <!-- Charcoal Black Head Cap & Brow (Signature Yoshi Marking) -->
      <path d="M 95 90 C 115 55, 175 52, 215 75 C 235 88, 230 115, 210 115 C 175 90, 130 85, 95 90 Z" 
            fill="${skullBlack}" stroke="${line}" stroke-width="4" />

      <!-- Iconic Carnotaurus Brow Horn (Foreground) -->
      <path d="M 175 75 Q 185 35 198 32 Q 198 55 190 80 Z" fill="${skullBlack}" stroke="${line}" stroke-width="4.5" stroke-linejoin="round" />
      <path d="M 182 65 Q 188 45 194 40" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" />

      <!-- Background Horn (Peeking) -->
      <path d="M 135 65 Q 140 38 150 36 Q 152 52 146 72 Z" fill="#141014" stroke="${line}" stroke-width="4" />

      <!-- Snout Nostril Notch -->
      <ellipse cx="102" cy="115" rx="4" ry="7" fill="${skullBlack}" transform="rotate(-15 102 115)" />

      <!-- Pale Cream Lower Jaw & Throat -->
      <path d="M 108 152 C 100 162, 125 175, 165 174 C 185 174, 195 165, 195 155 Z" fill="${bellyTan}" stroke="${line}" stroke-width="3.5" />
      <!-- Skin texture notches on jaw -->
      <line x1="135" y1="165" x2="135" y2="171" stroke="${line}" stroke-width="2" stroke-linecap="round" />
      <line x1="145" y1="166" x2="145" y2="172" stroke="${line}" stroke-width="2" stroke-linecap="round" />
      <line x1="155" y1="165" x2="155" y2="171" stroke="${line}" stroke-width="2" stroke-linecap="round" />

      <!-- Mouth & Sharp Teeth -->
      ${renderTeethAndMouth(line, 104, 150, 195, 148, isCorrect, isIncorrect)}

      <!-- Big Expressive Snap Squad Eye -->
      ${renderSnapEye('carnoEyeGrad', line, 160, 106, 25, isCorrect, isIncorrect, '#ef4444')}
    </g>
  `;
}

// -------------------------------------------------------------
// 2. DILOPHOSAURUS (Snap Squad Chibi: Twin Head Crests & Frill)
// -------------------------------------------------------------
function renderDilophosaurus(state, isCorrect, isIncorrect) {
  const line = '#141e17';
  const bodyGreen = '#72b083';
  const darkGreen = '#4e8c60';
  const mintBelly = '#d4eedb';
  const frillOrange = '#f97316';
  const frillYellow = '#fbbf24';
  const clawBlack = '#181f18';

  return `
    <!-- Tail -->
    <path d="M 235 210 Q 320 195 345 150 Q 355 180 295 235 Q 260 250 230 240 Z" 
          fill="${bodyGreen}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <circle cx="280" cy="210" r="5" fill="${darkGreen}" />
    <circle cx="305" cy="190" r="4.5" fill="${darkGreen}" />

    <!-- Back Leg -->
    <path d="M 225 210 Q 255 240 250 278 L 225 278 Q 228 245 210 225 Z" fill="${darkGreen}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="${clawBlack}" />

    <!-- Magnificent Neck Frill (Snap Squad Dilophosaurus Signature!) -->
    <g id="neck-frill">
      <!-- Fan segments with ridges -->
      <path d="M 130 160 C 80 140, 50 185, 75 235 C 100 280, 155 270, 170 250 Z" 
            fill="${frillOrange}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
      <!-- Inner Scalloped Gold Patterns -->
      <path d="M 120 170 C 85 160, 70 195, 88 230 C 105 260, 145 255, 155 240 Z" fill="${frillYellow}" stroke="${line}" stroke-width="2.5" />
      <path d="M 110 185 C 88 180, 85 205, 98 225 Z" fill="#ef4444" opacity="0.8" />

      <!-- Radiating Frill Ribs -->
      <line x1="140" y1="210" x2="68" y2="180" stroke="${line}" stroke-width="3" stroke-linecap="round" />
      <line x1="140" y1="215" x2="72" y2="225" stroke="${line}" stroke-width="3" stroke-linecap="round" />
      <line x1="145" y1="220" x2="98" y2="258" stroke="${line}" stroke-width="3" stroke-linecap="round" />

      <!-- Right Frill Flap (Behind Head) -->
      <path d="M 205 130 C 245 120, 275 155, 260 200 C 248 230, 215 240, 195 230 Z" 
            fill="${frillOrange}" stroke="${line}" stroke-width="4.5" stroke-linejoin="round" />
      <path d="M 210 145 C 240 140, 255 165, 245 195 Z" fill="${frillYellow}" />
    </g>

    <!-- Torso -->
    <path d="M 140 180 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 180 Z" 
          fill="${bodyGreen}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 148 188 C 142 220, 155 255, 185 258 C 165 250, 155 220, 158 188 Z" fill="${mintBelly}" stroke="${line}" stroke-width="3" />

    <!-- Foreground Leg -->
    <path d="M 175 210 Q 215 230 205 285 L 165 285 Q 165 245 155 215 Z" 
          fill="${bodyGreen}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <ellipse cx="185" cy="287" rx="22" ry="8" fill="${bodyGreen}" stroke="${line}" stroke-width="4" />
    <polygon points="166,287 160,296 172,291" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="182,289 184,300 193,289" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="198,287 208,296 203,286" fill="${clawBlack}" stroke="${line}" stroke-width="2" />

    <!-- Cute Claws/Arm -->
    <path d="M 155 215 Q 140 225 142 235" fill="none" stroke="${bodyGreen}" stroke-width="12" stroke-linecap="round" />
    <path d="M 155 215 Q 140 225 142 235" fill="none" stroke="${line}" stroke-width="4" stroke-linecap="round" />
    <circle cx="140" cy="237" r="3" fill="${clawBlack}" />
    <circle cx="145" cy="240" r="3" fill="${clawBlack}" />

    <!-- BIG CHIBI DILOPHOSAURUS HEAD -->
    <g id="dilo-head">
      <!-- Head Base -->
      <path d="M 115 165 C 80 162, 75 125, 95 90 C 115 58, 175 56, 215 78 C 245 98, 235 150, 205 165 Z" 
            fill="${bodyGreen}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />

      <!-- TWIN HEAD CRESTS (Tall Scalloped Comb Fans) -->
      <!-- Background crest -->
      <path d="M 125 72 C 120 30, 165 25, 178 68 Z" fill="#ea580c" stroke="${line}" stroke-width="4" />
      <!-- Foreground crest -->
      <path d="M 145 76 C 135 22, 195 18, 212 78 Z" fill="${frillOrange}" stroke="${line}" stroke-width="4.5" stroke-linejoin="round" />
      <path d="M 152 72 C 145 35, 185 30, 198 72 Z" fill="${frillYellow}" stroke="${line}" stroke-width="2" />
      <!-- Crest Ridges -->
      <line x1="160" y1="70" x2="155" y2="35" stroke="${line}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="175" y1="70" x2="175" y2="30" stroke="${line}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="190" y1="72" x2="195" y2="40" stroke="${line}" stroke-width="2.5" stroke-linecap="round" />

      <!-- Nostril -->
      <ellipse cx="100" cy="112" rx="4" ry="6" fill="${darkGreen}" />

      <!-- Mint Lower Jaw -->
      <path d="M 108 152 C 100 162, 125 174, 165 172 C 185 172, 195 164, 195 154 Z" fill="${mintBelly}" stroke="${line}" stroke-width="3.5" />

      <!-- Teeth & Mouth -->
      ${renderTeethAndMouth(line, 104, 150, 195, 148, isCorrect, isIncorrect)}

      <!-- Eye (Bright Amber) -->
      ${renderSnapEye('amberEyeGrad', line, 160, 106, 25, isCorrect, isIncorrect, '#f59e0b')}
    </g>
  `;
}

// -------------------------------------------------------------
// 3. TYRANNOSAURUS REX (Rexy: Bone-Crushing Skull & Tiger Stripes)
// -------------------------------------------------------------
function renderTRex(state, isCorrect, isIncorrect) {
  const line = '#191c13';
  const bodyGreen = '#558b2f';
  const darkGreen = '#33691e';
  const stripeColor = '#1f291a';
  const bellyTan = '#fef08a';
  const clawBlack = '#14170f';

  return `
    <!-- Powerful Sweeping Tail -->
    <path d="M 235 210 Q 325 195 350 150 Q 360 180 300 235 Q 260 252 230 242 Z" 
          fill="${bodyGreen}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <!-- Tail Tiger Stripes -->
    <polygon points="275,198 288,212 284,216" fill="${stripeColor}" />
    <polygon points="305,178 318,194 313,198" fill="${stripeColor}" />
    <polygon points="330,160 338,172 334,175" fill="${stripeColor}" />

    <!-- Back Leg -->
    <path d="M 225 210 Q 260 240 252 278 L 225 278 Q 228 245 210 225 Z" fill="${darkGreen}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="${clawBlack}" />

    <!-- Muscular Torso with Dorsal Tiger Stripes -->
    <path d="M 140 180 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 180 Z" 
          fill="${bodyGreen}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <polygon points="190,165 200,190 185,192" fill="${stripeColor}" />
    <polygon points="215,168 225,194 210,195" fill="${stripeColor}" />

    <!-- Golden Underbelly -->
    <path d="M 146 188 C 140 220, 155 255, 185 258 C 165 250, 155 220, 158 188 Z" fill="${bellyTan}" stroke="${line}" stroke-width="3" />

    <!-- Massive Foreground Thigh & Leg -->
    <path d="M 175 205 Q 220 225 208 285 L 165 285 Q 162 240 152 210 Z" 
          fill="${bodyGreen}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 175 230 Q 195 242 188 265" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="185" cy="287" rx="23" ry="8" fill="${bodyGreen}" stroke="${line}" stroke-width="4" />
    <polygon points="165,287 158,297 171,291" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="182,289 184,301 193,289" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="198,287 209,297 204,286" fill="${clawBlack}" stroke="${line}" stroke-width="2" />

    <!-- Tiny T-Rex 2-Clawed Arm -->
    <path d="M 145 210 Q 132 215 133 226" fill="none" stroke="${bodyGreen}" stroke-width="11" stroke-linecap="round" />
    <path d="M 145 210 Q 132 215 133 226" fill="none" stroke="${line}" stroke-width="4" stroke-linecap="round" />
    <circle cx="131" cy="228" r="3" fill="${clawBlack}" />
    <circle cx="136" cy="231" r="3" fill="${clawBlack}" />

    <!-- MASSIVE CHIBI T-REX HEAD (Huge Bone-Crusher Jaw) -->
    <g id="rex-head">
      <path d="M 112 170 C 72 165, 70 120, 90 85 C 110 48, 175 48, 220 72 C 255 92, 245 152, 212 168 Z" 
            fill="${bodyGreen}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      
      <!-- Prominent Brow Ridge -->
      <path d="M 135 78 Q 170 65 205 82" fill="none" stroke="${line}" stroke-width="5" stroke-linecap="round" />
      <polygon points="145,55 155,75 140,76" fill="${stripeColor}" />
      <polygon points="175,56 185,76 170,77" fill="${stripeColor}" />

      <!-- Deep Nostril -->
      <ellipse cx="98" cy="110" rx="5" ry="8" fill="${darkGreen}" transform="rotate(-10 98 110)" />

      <!-- Tan Lower Jaw -->
      <path d="M 106 154 C 98 165, 125 176, 170 174 C 190 174, 202 165, 200 154 Z" fill="${bellyTan}" stroke="${line}" stroke-width="3.5" />

      <!-- Monster Predator Teeth & Mouth -->
      ${renderTeethAndMouth(line, 100, 150, 202, 148, isCorrect, isIncorrect, true)}

      <!-- Sharp Amber Eye -->
      ${renderSnapEye('amberEyeGrad', line, 160, 104, 25, isCorrect, isIncorrect, '#f59e0b')}
    </g>
  `;
}

// -------------------------------------------------------------
// 4. SPINOSAURUS (Spino: Croc Snout & Fiery Arched Spine Sail)
// -------------------------------------------------------------
function renderSpinosaurus(state, isCorrect, isIncorrect) {
  const line = '#14181f';
  const bodySlate = '#475569';
  const darkSlate = '#334155';
  const sailRed = '#dc2626';
  const sailYellow = '#fbbf24';
  const bellyStone = '#cbd5e1';
  const clawBlack = '#0f172a';

  return `
    <!-- SPECTACULAR ARCHED DORSAL SAIL (Spinosaurus Hallmark!) -->
    <g id="spino-sail">
      <!-- Main Sail Membrane -->
      <path d="M 160 160 C 150 40, 280 30, 295 185 Z" fill="${sailRed}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
      <!-- Radiant Golden Sunburst Center -->
      <path d="M 175 155 C 168 65, 260 55, 280 180 Z" fill="${sailYellow}" stroke="${line}" stroke-width="2.5" />
      <path d="M 195 150 C 190 90, 240 85, 255 170 Z" fill="#ffffff" opacity="0.6" />

      <!-- Spine Rib Rays -->
      <line x1="185" y1="155" x2="175" y2="52" stroke="${line}" stroke-width="3.5" stroke-linecap="round" />
      <line x1="210" y1="150" x2="205" y2="40" stroke="${line}" stroke-width="3.5" stroke-linecap="round" />
      <line x1="235" y1="150" x2="238" y2="38" stroke="${line}" stroke-width="3.5" stroke-linecap="round" />
      <line x1="260" y1="155" x2="268" y2="48" stroke="${line}" stroke-width="3.5" stroke-linecap="round" />
    </g>

    <!-- Croc Tail with Ridge Fin -->
    <path d="M 235 210 Q 325 195 350 150 Q 360 180 300 235 Q 260 252 230 242 Z" 
          fill="${bodySlate}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 270 200 L 285 188 L 295 205 L 315 192 L 325 210" fill="none" stroke="${line}" stroke-width="3.5" />

    <!-- Back Leg -->
    <path d="M 225 210 Q 260 240 252 278 L 225 278 Q 228 245 210 225 Z" fill="${darkSlate}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="${clawBlack}" />

    <!-- Torso -->
    <path d="M 140 180 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 180 Z" 
          fill="${bodySlate}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 146 188 C 140 220, 155 255, 185 258 C 165 250, 155 220, 158 188 Z" fill="${bellyStone}" stroke="${line}" stroke-width="3" />

    <!-- Foreground Leg -->
    <path d="M 175 205 Q 220 225 208 285 L 165 285 Q 162 240 152 210 Z" 
          fill="${bodySlate}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <ellipse cx="185" cy="287" rx="23" ry="8" fill="${bodySlate}" stroke="${line}" stroke-width="4" />
    <polygon points="165,287 158,297 171,291" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="182,289 184,301 193,289" fill="${clawBlack}" stroke="${line}" stroke-width="2" />
    <polygon points="198,287 209,297 204,286" fill="${clawBlack}" stroke="${line}" stroke-width="2" />

    <!-- Strong 3-Clawed Arm -->
    <path d="M 152 212 Q 136 220 138 232" fill="none" stroke="${bodySlate}" stroke-width="12" stroke-linecap="round" />
    <path d="M 152 212 Q 136 220 138 232" fill="none" stroke="${line}" stroke-width="4" stroke-linecap="round" />
    <circle cx="135" cy="235" r="3" fill="${clawBlack}" />
    <circle cx="140" cy="238" r="3" fill="${clawBlack}" />

    <!-- ELONGATED CROCODILE SNOUT HEAD -->
    <g id="spino-head">
      <path d="M 115 168 C 65 162, 55 125, 75 92 C 95 62, 175 60, 215 80 C 245 100, 235 152, 205 168 Z" 
            fill="${bodySlate}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      
      <!-- Small Head Crest -->
      <polygon points="175,70 188,48 196,72" fill="${sailRed}" stroke="${line}" stroke-width="3" />

      <!-- Croc Raised Nostril -->
      <ellipse cx="80" cy="115" rx="5" ry="7" fill="${darkSlate}" />

      <!-- Stone Lower Jaw -->
      <path d="M 88 152 C 80 162, 120 174, 165 172 C 185 172, 195 164, 195 154 Z" fill="${bellyStone}" stroke="${line}" stroke-width="3.5" />

      <!-- Crocodilian Interlocking Needle Teeth -->
      ${renderTeethAndMouth(line, 80, 150, 195, 148, isCorrect, isIncorrect)}

      <!-- Cyan/Yellow Eye -->
      ${renderSnapEye('cyanEyeGrad', line, 160, 106, 25, isCorrect, isIncorrect, '#06b6d4')}
    </g>
  `;
}

// -------------------------------------------------------------
// 5. VELOCIRAPTOR (Blue: Racing Stripe & Iconic Giant Sickle Claw)
// -------------------------------------------------------------
function renderVelociraptor(state, isCorrect, isIncorrect) {
  const line = '#14141d';
  const bodySlate = '#3b4252';
  const darkSlate = '#2e3440';
  const stripeCyan = '#06b6d4';
  const stripeWhite = '#ffffff';
  const bellyCream = '#eceff4';
  const clawWhite = '#ffffff';

  return `
    <!-- Long Agile Raptor Tail with Feathered Tip -->
    <path d="M 235 210 Q 330 190 355 140 Q 365 175 295 235 Q 260 252 230 242 Z" 
          fill="${bodySlate}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <!-- Blue Racing Stripe on Tail -->
    <path d="M 235 215 Q 320 198 348 150" fill="none" stroke="${stripeWhite}" stroke-width="7" stroke-linecap="round" />
    <path d="M 235 215 Q 320 198 348 150" fill="none" stroke="${stripeCyan}" stroke-width="4" stroke-linecap="round" />

    <!-- Back Leg -->
    <path d="M 225 210 Q 260 240 252 278 L 225 278 Q 228 245 210 225 Z" fill="${darkSlate}" stroke="${line}" stroke-width="4.5" />
    
    <!-- Feather Crest Tuft behind head -->
    <polygon points="215,80 245,60 228,95" fill="#facc15" stroke="${line}" stroke-width="3" />
    <polygon points="225,95 255,80 235,110" fill="#facc15" stroke="${line}" stroke-width="3" />

    <!-- Torso -->
    <path d="M 140 180 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 180 Z" 
          fill="${bodySlate}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    
    <!-- Body Racing Stripe -->
    <path d="M 155 180 Q 185 205 235 215" fill="none" stroke="${stripeWhite}" stroke-width="8" stroke-linecap="round" />
    <path d="M 155 180 Q 185 205 235 215" fill="none" stroke="${stripeCyan}" stroke-width="5" stroke-linecap="round" />

    <path d="M 146 195 C 142 220, 155 255, 185 258 C 165 250, 155 220, 158 195 Z" fill="${bellyCream}" />

    <!-- Foreground Leg with GIANT CURVED SICKLE CLAW -->
    <path d="M 175 205 Q 220 225 208 285 L 165 285 Q 162 240 152 210 Z" 
          fill="${bodySlate}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    
    <!-- Foot Pad -->
    <ellipse cx="185" cy="287" rx="20" ry="7" fill="${bodySlate}" stroke="${line}" stroke-width="4" />
    <!-- Regular Toes -->
    <polygon points="175,287 172,298 182,290" fill="#1e293b" />
    <polygon points="190,287 195,298 200,288" fill="#1e293b" />
    <!-- FAMOUS RAISED SICKLE CLAW (Cocked Upward Ready to Strike!) -->
    <path d="M 160 285 C 145 280, 142 255, 155 248 C 158 262, 168 274, 172 278 Z" 
          fill="${clawWhite}" stroke="${line}" stroke-width="3.5" stroke-linejoin="round" />

    <!-- Agile Raptor Arm -->
    <path d="M 150 210 Q 132 218 135 230" fill="none" stroke="${bodySlate}" stroke-width="11" stroke-linecap="round" />
    <path d="M 150 210 Q 132 218 135 230" fill="none" stroke="${line}" stroke-width="4" stroke-linecap="round" />
    <polygon points="130,230 124,236 132,236" fill="${clawWhite}" stroke="${line}" stroke-width="2" />
    <polygon points="136,233 133,242 140,237" fill="${clawWhite}" stroke="${line}" stroke-width="2" />

    <!-- SLEEK CHIBI RAPTOR HEAD -->
    <g id="raptor-head">
      <path d="M 115 165 C 75 160, 70 120, 90 85 C 110 52, 175 52, 215 75 C 245 95, 235 150, 205 165 Z" 
            fill="${bodySlate}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      
      <!-- Blue Stripe through Eye to Snout -->
      <path d="M 98 120 Q 140 100 205 105" fill="none" stroke="${stripeWhite}" stroke-width="10" stroke-linecap="round" />
      <path d="M 98 120 Q 140 100 205 105" fill="none" stroke="${stripeCyan}" stroke-width="6" stroke-linecap="round" />

      <!-- Nostril -->
      <ellipse cx="96" cy="112" rx="4" ry="7" fill="${darkSlate}" />

      <!-- Cream Lower Jaw -->
      <path d="M 106 152 C 98 162, 125 174, 165 172 C 185 172, 195 164, 195 154 Z" fill="${bellyCream}" stroke="${line}" stroke-width="3.5" />

      <!-- Sharp Raptor Teeth & Mouth -->
      ${renderTeethAndMouth(line, 102, 150, 195, 148, isCorrect, isIncorrect)}

      <!-- Intense Amber Raptor Eye -->
      ${renderSnapEye('amberEyeGrad', line, 160, 104, 25, isCorrect, isIncorrect, '#f59e0b')}
    </g>
  `;
}

// -------------------------------------------------------------
// 6. PARASAUROLOPHUS (Para: Swept-Back Hollow Crest & Pink Flank)
// -------------------------------------------------------------
function renderParasaurolophus(state, isCorrect, isIncorrect) {
  const line = '#261b28';
  const bodyOchre = '#eab308';
  const darkOchre = '#ca8a04';
  const pinkFlank = '#ec4899';
  const beakColor = '#fef08a';
  const clawBlack = '#261b28';

  return `
    <!-- DRAMATIC SWEPT-BACK HOLLOW TUBE CREST (Behind Head Arching Back) -->
    <path d="M 170 70 C 185 10, 280 5, 290 55 C 295 75, 260 85, 215 95 Z" 
          fill="${pinkFlank}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
    <!-- Crest Inner Stripe -->
    <path d="M 180 62 C 200 22, 270 20, 275 60 C 278 72, 245 80, 215 88" 
          fill="none" stroke="#fbcfe8" stroke-width="5" stroke-linecap="round" />

    <!-- Tail -->
    <path d="M 235 210 Q 325 195 350 150 Q 360 180 300 235 Q 260 252 230 242 Z" 
          fill="${bodyOchre}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />

    <!-- Back Leg -->
    <path d="M 225 210 Q 260 240 252 278 L 225 278 Q 228 245 210 225 Z" fill="${darkOchre}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="${clawBlack}" />

    <!-- Torso with Vibrant Pink Flank Flash (Yoshi Signature!) -->
    <path d="M 140 180 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 180 Z" 
          fill="${bodyOchre}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 190 190 C 215 195, 235 220, 225 245 C 205 250, 180 230, 190 190 Z" fill="${pinkFlank}" stroke="${line}" stroke-width="3" />

    <!-- Foreground Chunky Leg -->
    <path d="M 175 205 Q 220 225 208 285 L 165 285 Q 162 240 152 210 Z" 
          fill="${bodyOchre}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <ellipse cx="185" cy="287" rx="23" ry="8" fill="${bodyOchre}" stroke="${line}" stroke-width="4" />
    <circle cx="170" cy="290" r="4.5" fill="${clawBlack}" />
    <circle cx="185" cy="293" r="4.5" fill="${clawBlack}" />
    <circle cx="200" cy="290" r="4.5" fill="${clawBlack}" />

    <!-- Front Hand -->
    <path d="M 148 212 Q 134 220 136 230" fill="none" stroke="${bodyOchre}" stroke-width="12" stroke-linecap="round" />
    <path d="M 148 212 Q 134 220 136 230" fill="none" stroke="${line}" stroke-width="4" stroke-linecap="round" />

    <!-- CHIBI DUCKBILL HEAD -->
    <g id="para-head">
      <path d="M 115 168 C 75 162, 70 125, 90 90 C 110 58, 175 58, 215 80 C 245 100, 235 152, 205 168 Z" 
            fill="${bodyOchre}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      
      <!-- Smooth Duckbill Beak -->
      <path d="M 112 135 C 80 135, 78 160, 115 162 Z" fill="${beakColor}" stroke="${line}" stroke-width="4" />
      <ellipse cx="95" cy="142" rx="3.5" ry="5" fill="${darkOchre}" />

      <!-- Mouth & Expression -->
      ${renderFriendlyMouth(line, 105, 155, 185, 155, isCorrect, isIncorrect)}

      <!-- Warm Indigo/Cyan Eye -->
      ${renderSnapEye('cyanEyeGrad', line, 160, 106, 25, isCorrect, isIncorrect, '#0284c7')}
    </g>
  `;
}

// -------------------------------------------------------------
// 7. TRICERATOPS (Trike: 3 Ivory Horns & Scalloped Shield Frill)
// -------------------------------------------------------------
function renderTriceratops(state, isCorrect, isIncorrect) {
  const line = '#0f2438';
  const bodyBlue = '#0284c7';
  const darkBlue = '#0369a1';
  const frillSpot = '#f97316';
  const bellyLight = '#bae6fd';
  const hornWhite = '#ffffff';

  return `
    <!-- Perky Sturdy Tail -->
    <path d="M 235 215 Q 310 220 330 180 Q 338 210 285 245 Q 260 252 230 242 Z" 
          fill="${bodyBlue}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />

    <!-- Back Leg -->
    <path d="M 225 215 Q 255 240 250 278 L 225 278 Q 228 245 210 225 Z" fill="${darkBlue}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="#0c4a6e" />

    <!-- Torso -->
    <path d="M 140 185 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 185 Z" 
          fill="${bodyBlue}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 146 195 C 140 220, 155 255, 185 258 C 165 250, 155 220, 158 195 Z" fill="${bellyLight}" stroke="${line}" stroke-width="3" />

    <!-- Foreground Leg with Toenails -->
    <path d="M 175 210 Q 215 230 205 285 L 165 285 Q 162 240 152 215 Z" 
          fill="${bodyBlue}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <ellipse cx="185" cy="287" rx="23" ry="8" fill="${bodyBlue}" stroke="${line}" stroke-width="4" />
    <circle cx="170" cy="290" r="4.5" fill="${hornWhite}" stroke="${line}" stroke-width="2" />
    <circle cx="185" cy="293" r="4.5" fill="${hornWhite}" stroke="${line}" stroke-width="2" />
    <circle cx="200" cy="290" r="4.5" fill="${hornWhite}" stroke="${line}" stroke-width="2" />

    <!-- Front Foot -->
    <ellipse cx="135" cy="272" rx="16" ry="8" fill="${bodyBlue}" stroke="${line}" stroke-width="4" />
    <circle cx="125" cy="274" r="3.5" fill="${hornWhite}" stroke="${line}" stroke-width="1.5" />
    <circle cx="135" cy="276" r="3.5" fill="${hornWhite}" stroke="${line}" stroke-width="1.5" />
    <circle cx="145" cy="274" r="3.5" fill="${hornWhite}" stroke="${line}" stroke-width="1.5" />

    <!-- MASSIVE SCALLOPED SHIELD FRILL -->
    <g id="trike-frill">
      <path d="M 130 145 C 90 90, 115 25, 210 25 C 295 25, 320 90, 275 155 Z" 
            fill="${darkBlue}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      <!-- Frill Edge Scallops / Spikes -->
      <polygon points="120,85 105,75 125,70" fill="${hornWhite}" stroke="${line}" stroke-width="2" />
      <polygon points="142,48 132,32 155,38" fill="${hornWhite}" stroke="${line}" stroke-width="2" />
      <polygon points="190,30 205,15 220,30" fill="${hornWhite}" stroke="${line}" stroke-width="2" />
      <polygon points="260,38 278,30 270,52" fill="${hornWhite}" stroke="${line}" stroke-width="2" />
      <polygon points="295,75 312,70 300,90" fill="${hornWhite}" stroke="${line}" stroke-width="2" />

      <!-- Vivid Decorative Eye-Spots on Frill -->
      <circle cx="160" cy="80" r="14" fill="${frillSpot}" stroke="${line}" stroke-width="3" />
      <circle cx="160" cy="80" r="7" fill="#fde047" />
      <circle cx="215" cy="65" r="16" fill="${frillSpot}" stroke="${line}" stroke-width="3" />
      <circle cx="215" cy="65" r="8" fill="#fde047" />
      <circle cx="265" cy="85" r="14" fill="${frillSpot}" stroke="${line}" stroke-width="3" />
      <circle cx="265" cy="85" r="7" fill="#fde047" />
    </g>

    <!-- TRICERATOPS HEAD & 3 HORNS -->
    <g id="trike-head">
      <path d="M 115 168 C 85 165, 80 125, 100 90 C 115 65, 175 65, 210 85 C 235 105, 230 152, 205 168 Z" 
            fill="${bodyBlue}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      
      <!-- Parrot-like Beak -->
      <path d="M 100 135 C 75 140, 78 165, 108 165 Z" fill="${hornWhite}" stroke="${line}" stroke-width="4" />

      <!-- Long Sharp Brow Horn (Foreground) -->
      <path d="M 145 90 Q 115 40 100 25 Q 128 45 158 85 Z" fill="${hornWhite}" stroke="${line}" stroke-width="4.5" stroke-linejoin="round" />
      <path d="M 132 55 Q 118 38 108 30" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5" />

      <!-- Background Brow Horn -->
      <path d="M 185 80 Q 180 35 170 20 Q 192 40 198 80 Z" fill="#e2e8f0" stroke="${line}" stroke-width="4" stroke-linejoin="round" />

      <!-- Nose Horn -->
      <path d="M 96 132 Q 80 108 75 105 Q 92 118 104 130 Z" fill="${hornWhite}" stroke="${line}" stroke-width="4" stroke-linejoin="round" />

      <!-- Mouth & Expression -->
      ${renderFriendlyMouth(line, 102, 155, 185, 155, isCorrect, isIncorrect)}

      <!-- Eye -->
      ${renderSnapEye('amberEyeGrad', line, 160, 106, 25, isCorrect, isIncorrect, '#f59e0b')}
    </g>
  `;
}

// -------------------------------------------------------------
// 8. STEGOSAURUS (Steggy: Double Kite Plates & 4-Spike Tail)
// -------------------------------------------------------------
function renderStegosaurus(state, isCorrect, isIncorrect) {
  const line = '#1e1124';
  const bodyPurple = '#7c3aed';
  const darkPurple = '#5b21b6';
  const plateOrange = '#f97316';
  const plateYellow = '#fde047';
  const bellyLavender = '#ede9fe';
  const spikeWhite = '#ffffff';

  return `
    <!-- MAGNIFICENT DOUBLE-ROW KITE PLATES ALONG ARCHED BACK -->
    <g id="steg-plates">
      <!-- Background Plates (Alternating) -->
      <polygon points="120,110 135,50 160,105 145,130" fill="#ea580c" stroke="${line}" stroke-width="4" />
      <polygon points="175,90 195,30 225,85 205,115" fill="#ea580c" stroke="${line}" stroke-width="4" />
      <polygon points="240,95 265,35 290,90 270,120" fill="#ea580c" stroke="${line}" stroke-width="4" />

      <!-- Foreground Large Glowing Kite Plates -->
      <polygon points="145,120 165,58 190,115 170,140" fill="${plateOrange}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
      <polygon points="155,115 165,75 180,112 168,128" fill="${plateYellow}" />

      <polygon points="205,105 230,40 258,100 238,130" fill="${plateOrange}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
      <polygon points="216,100 230,58 248,98 235,118" fill="${plateYellow}" />

      <polygon points="270,115 295,60 320,110 300,135" fill="${plateOrange}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
      <polygon points="280,110 295,75 310,108 298,122" fill="${plateYellow}" />
    </g>

    <!-- Curled Tail with 4 LONG SHARP THAGOMIZER SPIKES -->
    <path d="M 235 215 Q 320 220 345 170 Q 355 200 295 245 Q 260 252 230 242 Z" 
          fill="${bodyPurple}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    
    <!-- 4 Famous Thagomizer Spikes -->
    <polygon points="340,170 375,145 348,162" fill="${spikeWhite}" stroke="${line}" stroke-width="3" stroke-linejoin="round" />
    <polygon points="346,178 382,175 352,182" fill="${spikeWhite}" stroke="${line}" stroke-width="3" stroke-linejoin="round" />
    <polygon points="338,190 372,210 344,198" fill="${spikeWhite}" stroke="${line}" stroke-width="3" stroke-linejoin="round" />
    <polygon points="328,205 355,230 334,212" fill="${spikeWhite}" stroke="${line}" stroke-width="3" stroke-linejoin="round" />

    <!-- Back Leg -->
    <path d="M 225 215 Q 255 240 250 278 L 225 278 Q 228 245 210 225 Z" fill="${darkPurple}" stroke="${line}" stroke-width="4.5" />
    <ellipse cx="238" cy="282" rx="16" ry="7" fill="#2e1065" />

    <!-- Torso -->
    <path d="M 140 185 C 130 220, 140 260, 195 262 C 240 262, 245 220, 235 185 Z" 
          fill="${bodyPurple}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <path d="M 146 195 C 140 220, 155 255, 185 258 C 165 250, 155 220, 158 195 Z" fill="${bellyLavender}" stroke="${line}" stroke-width="3" />

    <!-- Foreground Leg with Rounded Toenails -->
    <path d="M 175 210 Q 215 230 205 285 L 165 285 Q 162 240 152 215 Z" 
          fill="${bodyPurple}" stroke="${line}" stroke-width="5" stroke-linejoin="round" />
    <ellipse cx="185" cy="287" rx="23" ry="8" fill="${bodyPurple}" stroke="${line}" stroke-width="4" />
    <circle cx="170" cy="290" r="4.5" fill="${spikeWhite}" stroke="${line}" stroke-width="2" />
    <circle cx="185" cy="293" r="4.5" fill="${spikeWhite}" stroke="${line}" stroke-width="2" />
    <circle cx="200" cy="290" r="4.5" fill="${spikeWhite}" stroke="${line}" stroke-width="2" />

    <!-- Front Foot -->
    <ellipse cx="135" cy="272" rx="16" ry="8" fill="${bodyPurple}" stroke="${line}" stroke-width="4" />
    <circle cx="125" cy="274" r="3.5" fill="${spikeWhite}" stroke="${line}" stroke-width="1.5" />
    <circle cx="135" cy="276" r="3.5" fill="${spikeWhite}" stroke="${line}" stroke-width="1.5" />
    <circle cx="145" cy="274" r="3.5" fill="${spikeWhite}" stroke="${line}" stroke-width="1.5" />

    <!-- CHIBI BEAKED STEGO HEAD -->
    <g id="steg-head">
      <path d="M 115 168 C 85 165, 80 125, 100 90 C 115 65, 175 65, 210 85 C 235 105, 230 152, 205 168 Z" 
            fill="${bodyPurple}" stroke="${line}" stroke-width="6" stroke-linejoin="round" />
      
      <!-- Small Beak -->
      <path d="M 102 138 C 80 142, 82 165, 110 162 Z" fill="#fde047" stroke="${line}" stroke-width="3.5" />

      <!-- Head Plate (Baby Plate on Head) -->
      <polygon points="175,70 188,42 200,68" fill="${plateOrange}" stroke="${line}" stroke-width="3" />

      <!-- Mouth & Expression -->
      ${renderFriendlyMouth(line, 106, 155, 185, 155, isCorrect, isIncorrect)}

      <!-- Eye -->
      ${renderSnapEye('amberEyeGrad', line, 160, 106, 25, isCorrect, isIncorrect, '#f59e0b')}
    </g>
  `;
}

// -------------------------------------------------------------
// Shared Placard Claws / Paws
// -------------------------------------------------------------
function renderPlacardPaws(species) {
  let pawColor = '#b93826';
  let clawColor = '#191519';
  const line = '#111827';

  switch (species) {
    case 'dilo': pawColor = '#72b083'; break;
    case 'rex': pawColor = '#558b2f'; break;
    case 'spino': pawColor = '#475569'; break;
    case 'raptor': pawColor = '#3b4252'; clawColor = '#ffffff'; break;
    case 'para': pawColor = '#eab308'; break;
    case 'trike': pawColor = '#0284c7'; clawColor = '#ffffff'; break;
    case 'steg': pawColor = '#7c3aed'; clawColor = '#ffffff'; break;
    default: pawColor = '#b93826'; break;
  }

  return `
    <!-- Left Paw resting on top edge of placard -->
    <g id="paw-left">
      <ellipse cx="115" cy="282" rx="18" ry="11" fill="${pawColor}" stroke="${line}" stroke-width="4.5" />
      <circle cx="102" cy="286" r="4.5" fill="${clawColor}" stroke="${line}" stroke-width="2" />
      <circle cx="115" cy="288" r="4.5" fill="${clawColor}" stroke="${line}" stroke-width="2" />
      <circle cx="128" cy="286" r="4.5" fill="${clawColor}" stroke="${line}" stroke-width="2" />
    </g>

    <!-- Right Paw resting on top edge of placard -->
    <g id="paw-right">
      <ellipse cx="285" cy="282" rx="18" ry="11" fill="${pawColor}" stroke="${line}" stroke-width="4.5" />
      <circle cx="272" cy="286" r="4.5" fill="${clawColor}" stroke="${line}" stroke-width="2" />
      <circle cx="285" cy="288" r="4.5" fill="${clawColor}" stroke="${line}" stroke-width="2" />
      <circle cx="298" cy="286" r="4.5" fill="${clawColor}" stroke="${line}" stroke-width="2" />
    </g>
  `;
}

// -------------------------------------------------------------
// Shared Teeth & Mouth (Carnivore / Theropod)
// -------------------------------------------------------------
function renderTeethAndMouth(line, x1, y1, x2, y2, isCorrect, isIncorrect, isRex = false) {
  if (isCorrect) {
    // Triumphant Roaring Open Mouth with Tongue and Teeth!
    return `
      <path d="M ${x1} ${y1} Q 145 ${y1 + 45} ${x2} ${y2} Q 145 ${y1 + 15} ${x1} ${y1} Z" 
            fill="#991b1b" stroke="${line}" stroke-width="4.5" stroke-linejoin="round" />
      <!-- Pink Tongue -->
      <path d="M 125 ${y1 + 25} Q 150 ${y1 + 42} 175 ${y1 + 25} Z" fill="#f472b6" stroke="${line}" stroke-width="2" />
      <!-- Top Teeth -->
      <polygon points="${x1 + 6},${y1 + 5} ${x1 + 16},${y1 + 18} ${x1 + 24},${y1 + 7}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
      <polygon points="${x1 + 28},${y1 + 7} ${x1 + 38},${y1 + 22} ${x1 + 48},${y1 + 9}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
      <polygon points="${x1 + 52},${y1 + 9} ${x1 + 62},${y1 + 24} ${x1 + 72},${y1 + 11}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
      <!-- Bottom Teeth -->
      <polygon points="${x1 + 20},${y1 + 26} ${x1 + 28},${y1 + 15} ${x1 + 36},${y1 + 28}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
      <polygon points="${x1 + 44},${y1 + 30} ${x1 + 52},${y1 + 18} ${x1 + 60},${y1 + 32}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
    `;
  }

  if (isIncorrect) {
    // Startled / Pouting Mouth
    return `
      <path d="M ${x1 + 10} ${y1 + 8} Q 135 ${y1 - 6} 165 ${y1 + 6} Q 185 ${y1} ${x2 - 10} ${y2 + 4}" 
            fill="none" stroke="${line}" stroke-width="4.5" stroke-linecap="round" />
    `;
  }

  // Neutral: Badass Sharp Tooth Grin
  return `
    <path d="M ${x1} ${y1} Q 145 ${y1 + 10} ${x2} ${y2}" fill="none" stroke="${line}" stroke-width="4.5" stroke-linecap="round" />
    <!-- Sharp Teeth sticking down from upper jaw -->
    <polygon points="${x1 + 8},${y1 + 2} ${x1 + 16},${y1 + 14} ${x1 + 22},${y1 + 4}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
    <polygon points="${x1 + 26},${y1 + 4} ${x1 + 34},${y1 + 18} ${x1 + 42},${y1 + 6}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
    <polygon points="${x1 + 46},${y1 + 6} ${x1 + 55},${y1 + 19} ${x1 + 64},${y1 + 8}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
    ${isRex ? `
      <polygon points="${x1 + 68},${y1 + 8} ${x1 + 77},${y1 + 21} ${x1 + 86},${y1 + 9}" fill="#ffffff" stroke="${line}" stroke-width="1.5" />
    ` : ''}
  `;
}

// -------------------------------------------------------------
// Shared Friendly Mouth (Herbivores: Trike, Steg, Para)
// -------------------------------------------------------------
function renderFriendlyMouth(line, x1, y1, x2, y2, isCorrect, isIncorrect) {
  if (isCorrect) {
    return `
      <path d="M ${x1} ${y1} Q 145 ${y1 + 35} ${x2} ${y2} Z" 
            fill="#991b1b" stroke="${line}" stroke-width="4.5" stroke-linejoin="round" />
      <path d="M 130 ${y1 + 20} Q 145 ${y1 + 32} 165 ${y1 + 20} Z" fill="#f472b6" />
    `;
  }
  if (isIncorrect) {
    return `
      <path d="M ${x1 + 10} ${y1 + 10} Q 145 ${y1 - 4} ${x2 - 10} ${y2 + 8}" 
            fill="none" stroke="${line}" stroke-width="4.5" stroke-linecap="round" />
    `;
  }
  return `
    <path d="M ${x1} ${y1} Q 145 ${y1 + 14} ${x2} ${y2}" fill="none" stroke="${line}" stroke-width="4.5" stroke-linecap="round" />
  `;
}

// -------------------------------------------------------------
// Shared Snap Squad Big Expressive Eye
// -------------------------------------------------------------
function renderSnapEye(gradId, line, cx, cy, r, isCorrect, isIncorrect, fallbackColor) {
  if (isCorrect) {
    // Joyous Curved Crescent Eyes or Star Eye
    return `
      <g class="eye-correct">
        <path d="M ${cx - r + 3} ${cy + 6} Q ${cx} ${cy - r - 4} ${cx + r - 3} ${cy + 6}" 
              fill="none" stroke="${line}" stroke-width="7" stroke-linecap="round" />
        <!-- Blush Cheek -->
        <ellipse cx="${cx - 10}" cy="${cy + 28}" rx="14" ry="7" fill="#ff6b81" opacity="0.8" />
        <!-- Sparkle star above eye -->
        <polygon points="${cx + 18},${cy - 18} ${cx + 21},${cy - 10} ${cx + 29},${cy - 7} ${cx + 23},${cy - 2} ${cx + 25},${cy + 6} ${cx + 18},${cy + 1} ${cx + 11},${cy + 6} ${cx + 13},${cy - 2} ${cx + 7},${cy - 7} ${cx + 15},${cy - 10}" fill="#facc15" />
      </g>
    `;
  }

  if (isIncorrect) {
    // Worried / Surprised Droop Eye + Sweat Drop
    return `
      <g class="eye-incorrect">
        <!-- Furrowed Brow Angle -->
        <line x1="${cx - r - 2}" y1="${cy - r + 2}" x2="${cx + r + 2}" y2="${cy - r + 14}" stroke="${line}" stroke-width="5" stroke-linecap="round" />
        
        <!-- Big Round Eye with small pupil -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${line}" stroke-width="4.5" />
        <circle cx="${cx}" cy="${cy + 2}" r="${r * 0.72}" fill="url(#${gradId})" />
        <circle cx="${cx}" cy="${cy + 3}" r="${r * 0.38}" fill="#111827" />
        <circle cx="${cx - 4}" cy="${cy - 3}" r="${r * 0.2}" fill="#ffffff" />
        
        <!-- Animated Cartoon Sweat Drop on Brow -->
        <path d="M ${cx + r + 6} ${cy - 8} C ${cx + r + 6} ${cy - 14} ${cx + r + 13} ${cy - 22} ${cx + r + 13} ${cy - 22} C ${cx + r + 13} ${cy - 22} ${cx + r + 20} ${cy - 14} ${cx + r + 20} ${cy - 8} C ${cx + r + 20} ${cy - 2} ${cx + r + 17} ${cy + 2} ${cx + r + 13} ${cy + 2} C ${cx + r + 9} ${cy + 2} ${cx + r + 6} ${cy - 2} ${cx + r + 6} ${cy - 8} Z" 
              fill="#38bdf8" stroke="${line}" stroke-width="2.5" />
      </g>
    `;
  }

  // Neutral: Big alert, glossy Snap Squad eye with specular highlight
  return `
    <g class="eye-neutral">
      <!-- Dark Eye Socket / Eyelid Arc -->
      <path d="M ${cx - r - 3} ${cy - 4} Q ${cx} ${cy - r - 5} ${cx + r + 3} ${cy - 4}" fill="none" stroke="${line}" stroke-width="5.5" stroke-linecap="round" />
      
      <!-- Eye Base -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#181820" stroke="${line}" stroke-width="4" />
      
      <!-- Vibrant Reptilian Iris -->
      <circle cx="${cx}" cy="${cy}" r="${r * 0.88}" fill="url(#${gradId})" />
      
      <!-- Dark Pupil -->
      <ellipse cx="${cx + 1}" cy="${cy}" rx="${r * 0.5}" ry="${r * 0.6}" fill="#0f172a" />
      
      <!-- Big Glossy Specular Reflections (Snap Squad Characteristic!) -->
      <circle cx="${cx - 6}" cy="${cy - 6}" r="${r * 0.3}" fill="#ffffff" />
      <circle cx="${cx + 7}" cy="${cy + 7}" r="${r * 0.16}" fill="#ffffff" />
    </g>
  `;
}
