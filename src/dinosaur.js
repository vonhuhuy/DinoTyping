// Dinosaur SVG Generator for DinoTyping

export function renderDinosaurSvg({
  word = 'word',
  state = 'neutral', // 'neutral' | 'correct' | 'incorrect'
  correctWord = '',
}) {
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';

  // Base dinosaur green colors
  const skinColor = '#3da742';
  const skinShadow = '#2f8833';
  const outlineColor = '#154019';
  const bellyColor = '#cbed93';
  const signColor = '#bdebb6';
  const signBorder = '#1a491e';

  // Calculate dynamic font size for placard word
  const cleanWord = word || '';
  let fontSize = 48;
  if (cleanWord.length > 7) {
    fontSize = Math.max(26, Math.floor(340 / cleanWord.length));
  } else if (cleanWord.length > 5) {
    fontSize = 38;
  }

  // Eye and face expressions
  let eyesSvg = '';
  let mouthSvg = '';
  let extrasSvg = '';

  if (isCorrect) {
    // Cheerful / Cherished Dinosaur: Big joy, blushing cheeks, sparkling closed crescent eyes or star eyes
    eyesSvg = `
      <!-- Left Happy Eye Crescent -->
      <path d="M 125 155 Q 145 130 165 155" fill="none" stroke="${outlineColor}" stroke-width="9" stroke-linecap="round" />
      <path d="M 125 155 Q 145 136 165 155" fill="none" stroke="#256e29" stroke-width="4" stroke-linecap="round" />
      
      <!-- Right Happy Eye Crescent -->
      <path d="M 235 155 Q 255 130 275 155" fill="none" stroke="${outlineColor}" stroke-width="9" stroke-linecap="round" />
      <path d="M 235 155 Q 255 136 275 155" fill="none" stroke="#256e29" stroke-width="4" stroke-linecap="round" />
    `;

    mouthSvg = `
      <!-- Big Joyful Open Mouth with Tongue and Teeth -->
      <path d="M 160 215 Q 200 280 240 215 Z" fill="#991b1b" stroke="${outlineColor}" stroke-width="6" stroke-linejoin="round" />
      <path d="M 175 240 Q 200 275 225 240 Q 200 235 175 240 Z" fill="#f472b6" />
      <!-- Cute Top Teeth -->
      <polygon points="175,216 182,228 189,216" fill="#ffffff" />
      <polygon points="211,216 218,228 225,216" fill="#ffffff" />
    `;

    extrasSvg = `
      <!-- Blushing Cheeks -->
      <ellipse cx="120" cy="195" rx="20" ry="12" fill="#ff758f" opacity="0.85" />
      <ellipse cx="280" cy="195" rx="20" ry="12" fill="#ff758f" opacity="0.85" />
      <!-- Joyful Little Stars -->
      <path d="M 85 90 L 92 105 L 107 107 L 95 118 L 99 133 L 85 124 L 71 133 L 75 118 L 63 107 L 78 105 Z" fill="#fef08a" />
      <path d="M 315 90 L 322 105 L 337 107 L 325 118 L 329 133 L 315 124 L 301 133 L 305 118 L 293 107 L 308 105 Z" fill="#fef08a" />
    `;
  } else if (isIncorrect) {
    // Sad Dinosaur: droopy sad puppy eyes, downturned pout, tear drop
    eyesSvg = `
      <!-- Left Sad Eye -->
      <ellipse cx="145" cy="155" rx="22" ry="26" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <ellipse cx="150" cy="162" rx="14" ry="17" fill="#1f2937" />
      <circle cx="152" cy="148" r="6" fill="#ffffff" />
      <circle cx="142" cy="166" r="3" fill="#ffffff" />
      <!-- Left Droopy Eyebrow -->
      <path d="M 125 130 Q 145 138 165 126" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />

      <!-- Right Sad Eye -->
      <ellipse cx="255" cy="155" rx="22" ry="26" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <ellipse cx="250" cy="162" rx="14" ry="17" fill="#1f2937" />
      <circle cx="248" cy="148" r="6" fill="#ffffff" />
      <circle cx="258" cy="166" r="3" fill="#ffffff" />
      <!-- Right Droopy Eyebrow -->
      <path d="M 235 126 Q 255 138 275 130" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
    `;

    mouthSvg = `
      <!-- Cute Sad Pout -->
      <path d="M 175 235 Q 200 215 225 235" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
    `;

    extrasSvg = `
      <!-- Cute Tear Drop on cheek -->
      <path d="M 122 185 C 122 178 132 170 132 170 C 132 170 142 178 142 185 C 142 192 137 197 132 197 C 127 197 122 192 122 185 Z" fill="#60a5fa" opacity="0.95" />
    `;
  } else {
    // Neutral Dinosaur: Big sparkling round eyes, sweet friendly smile with 2 cute bottom teeth
    eyesSvg = `
      <!-- Left Eye -->
      <ellipse cx="145" cy="150" rx="23" ry="28" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <!-- Eyeball shine highlights -->
      <circle cx="152" cy="140" r="9" fill="#ffffff" />
      <circle cx="138" cy="162" r="4.5" fill="#ffffff" />

      <!-- Right Eye -->
      <ellipse cx="255" cy="150" rx="23" ry="28" fill="#111827" stroke="${outlineColor}" stroke-width="4" />
      <!-- Eyeball shine highlights -->
      <circle cx="262" cy="140" r="9" fill="#ffffff" />
      <circle cx="248" cy="162" r="4.5" fill="#ffffff" />

      <!-- Cheerful Eyebrows -->
      <path d="M 128 120 Q 145 113 162 120" fill="none" stroke="${outlineColor}" stroke-width="5" stroke-linecap="round" />
      <path d="M 238 120 Q 255 113 272 120" fill="none" stroke="${outlineColor}" stroke-width="5" stroke-linecap="round" />
    `;

    mouthSvg = `
      <!-- Sweet Smile with 2 Bottom Teeth -->
      <path d="M 170 218 Q 200 248 230 218" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
      <polygon points="182,228 188,217 194,228" fill="#ffffff" stroke="${outlineColor}" stroke-width="2" />
      <polygon points="206,228 212,217 218,228" fill="#ffffff" stroke="${outlineColor}" stroke-width="2" />
    `;

    extrasSvg = `
      <!-- Soft Cheek Tint -->
      <ellipse cx="118" cy="190" rx="14" ry="8" fill="#f472b6" opacity="0.4" />
      <ellipse cx="282" cy="190" rx="14" ry="8" fill="#f472b6" opacity="0.4" />
    `;
  }

  // Overlay graphics (Big checkmark or big cross + red banner)
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

  return `
    <svg viewBox="0 0 400 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dino-svg dino-${state}">
      <defs>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="rgba(0,0,0,0.22)" />
        </filter>
        <filter id="bannerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="rgba(0,0,0,0.3)" />
        </filter>
      </defs>

      <!-- Tail on Left -->
      <path d="M 120 310 Q 50 310 40 260 Q 90 280 130 295 Z" fill="${skinColor}" stroke="${outlineColor}" stroke-width="7" stroke-linejoin="round" />
      <!-- Tail Plates / Spikes -->
      <polygon points="55,275 62,258 75,270" fill="${skinShadow}" stroke="${outlineColor}" stroke-width="3" />
      <polygon points="80,282 88,266 98,278" fill="${skinShadow}" stroke="${outlineColor}" stroke-width="3" />

      <!-- Back Feet with 3 Claws each -->
      <!-- Left Foot -->
      <g>
        <ellipse cx="140" cy="385" rx="30" ry="18" fill="${skinColor}" stroke="${outlineColor}" stroke-width="6" />
        <!-- Claws -->
        <circle cx="120" cy="392" r="7" fill="#ffffff" stroke="${outlineColor}" stroke-width="3" />
        <circle cx="138" cy="396" r="7" fill="#ffffff" stroke="${outlineColor}" stroke-width="3" />
        <circle cx="156" cy="392" r="7" fill="#ffffff" stroke="${outlineColor}" stroke-width="3" />
      </g>

      <!-- Right Foot -->
      <g>
        <ellipse cx="260" cy="385" rx="30" ry="18" fill="${skinColor}" stroke="${outlineColor}" stroke-width="6" />
        <!-- Claws -->
        <circle cx="244" cy="392" r="7" fill="#ffffff" stroke="${outlineColor}" stroke-width="3" />
        <circle cx="262" cy="396" r="7" fill="#ffffff" stroke="${outlineColor}" stroke-width="3" />
        <circle cx="280" cy="392" r="7" fill="#ffffff" stroke="${outlineColor}" stroke-width="3" />
      </g>

      <!-- Chubby Body -->
      <path d="M 130 230 Q 110 320 150 360 Q 200 375 250 360 Q 290 320 270 230 Z" 
            fill="${skinColor}" stroke="${outlineColor}" stroke-width="7" stroke-linejoin="round" />

      <!-- Pale Yellow Underbelly -->
      <path d="M 160 250 Q 150 320 170 350 Q 200 360 230 350 Q 250 320 240 250 Z" 
            fill="${bellyColor}" opacity="0.9" />

      <!-- Head Base -->
      <path d="M 120 170 
               C 105 140, 115 70, 200 70 
               C 285 70, 295 140, 280 170 
               C 305 185, 305 220, 265 235 
               C 240 245, 160 245, 135 235 
               C 95 220, 95 185, 120 170 Z" 
            fill="${skinColor}" stroke="${outlineColor}" stroke-width="7" stroke-linejoin="round" />

      <!-- Snout definition -->
      <path d="M 140 185 Q 200 172 260 185 Q 265 220 200 225 Q 135 220 140 185 Z" 
            fill="${skinShadow}" opacity="0.25" />

      <!-- Nostrils -->
      <ellipse cx="184" cy="188" rx="3.5" ry="5" fill="${outlineColor}" />
      <ellipse cx="216" cy="188" rx="3.5" ry="5" fill="${outlineColor}" />

      <!-- Eyes & Expressions -->
      ${eyesSvg}

      <!-- Mouth & Expressions -->
      ${mouthSvg}

      <!-- Extras (Cheeks, Stars, Tears) -->
      ${extrasSvg}

      <!-- Placard / Word Sign -->
      <g id="placard-group">
        <rect x="75" y="240" width="250" height="110" rx="14" 
              fill="${signColor}" stroke="${signBorder}" stroke-width="6" />
        <!-- Inner subtle border -->
        <rect x="83" y="248" width="234" height="94" rx="8" 
              fill="none" stroke="${signBorder}" stroke-width="1.5" opacity="0.3" />
        <!-- Placard Word Text -->
        <text x="200" y="${295 + (fontSize > 40 ? 6 : 4)}" 
              text-anchor="middle" 
              fill="#111827" 
              font-family="'Fredoka', 'Quicksand', 'Nunito', system-ui, sans-serif" 
              font-size="${fontSize}" 
              font-weight="700" 
              letter-spacing="1">${cleanWord}</text>
      </g>

      <!-- Dinosaur Arms & Claws Holding Placard -->
      <!-- Left Arm & Claws -->
      <g>
        <!-- Arm -->
        <path d="M 122 250 Q 85 270 75 285" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round" />
        <path d="M 122 250 Q 85 270 75 285" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
        <!-- 3 Little Green Claws wrapping placard edge -->
        <ellipse cx="76" cy="272" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
        <ellipse cx="72" cy="285" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
        <ellipse cx="76" cy="298" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      </g>

      <!-- Right Arm & Claws -->
      <g>
        <!-- Arm -->
        <path d="M 278 250 Q 315 270 325 285" fill="none" stroke="${skinColor}" stroke-width="20" stroke-linecap="round" />
        <path d="M 278 250 Q 315 270 325 285" fill="none" stroke="${outlineColor}" stroke-width="6" stroke-linecap="round" />
        <!-- 3 Little Green Claws wrapping placard edge -->
        <ellipse cx="324" cy="272" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
        <ellipse cx="328" cy="285" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
        <ellipse cx="324" cy="298" rx="7" ry="6" fill="${skinColor}" stroke="${outlineColor}" stroke-width="3" />
      </g>

      <!-- Overlays (Large Checkmark or Large Cross + Red Banner) -->
      ${overlaySvg}
    </svg>
  `;
}
