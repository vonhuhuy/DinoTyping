// On-Screen Interactive Visual Keyboard for DinoTyping
// Finger numbers 1-5 where 1 is the thumb for both hands:
// 1 = Thumb
// 2 = Index
// 3 = Middle
// 4 = Ring
// 5 = Pinky

export const FINGER_INFO = {
  1: { name: 'Thumb', color: '#a855f7' },
  2: { name: 'Index', color: '#38bdf8' },
  3: { name: 'Middle', color: '#facc15' },
  4: { name: 'Ring', color: '#fb923c' },
  5: { name: 'Pinky', color: '#f472b6' },
};

// Hand SVG generator highlighting the specific finger corresponding to 1-5
export function renderHandIconSvg(finger) {
  const is5 = finger === 5;
  const is4 = finger === 4;
  const is3 = finger === 3;
  const is2 = finger === 2;
  const is1 = finger === 1;

  const color5 = is5 ? '#f472b6' : '#475569';
  const color4 = is4 ? '#fb923c' : '#475569';
  const color3 = is3 ? '#facc15' : '#475569';
  const color2 = is2 ? '#38bdf8' : '#475569';
  const color1 = is1 ? '#a855f7' : '#475569';

  const stroke5 = is5 ? '#ffffff' : '#1e293b';
  const stroke4 = is4 ? '#ffffff' : '#1e293b';
  const stroke3 = is3 ? '#ffffff' : '#1e293b';
  const stroke2 = is2 ? '#ffffff' : '#1e293b';
  const stroke1 = is1 ? '#ffffff' : '#1e293b';

  const width5 = is5 ? '1.5' : '0.8';
  const width4 = is4 ? '1.5' : '0.8';
  const width3 = is3 ? '1.5' : '0.8';
  const width2 = is2 ? '1.5' : '0.8';
  const width1 = is1 ? '1.5' : '0.8';

  const glow5 = is5 ? 'filter="drop-shadow(0 0 3px #f472b6)"' : '';
  const glow4 = is4 ? 'filter="drop-shadow(0 0 3px #fb923c)"' : '';
  const glow3 = is3 ? 'filter="drop-shadow(0 0 3px #facc15)"' : '';
  const glow2 = is2 ? 'filter="drop-shadow(0 0 3px #38bdf8)"' : '';
  const glow1 = is1 ? 'filter="drop-shadow(0 0 3px #a855f7)"' : '';

  return `
    <svg viewBox="0 0 32 32" width="26" height="26" xmlns="http://www.w3.org/2000/svg" class="hand-svg-icon finger-${finger}">
      <!-- Palm -->
      <path d="M 6 18 C 6 25, 23 25, 23 18 L 23 15 L 6 15 Z" fill="#334155" stroke="#1e293b" stroke-width="1" />
      <!-- Finger 5: Pinky -->
      <rect x="6.5" y="${is5 ? '8.5' : '11'}" width="3.2" height="${is5 ? '9.5' : '7'}" rx="1.6" fill="${color5}" stroke="${stroke5}" stroke-width="${width5}" ${glow5} />
      <!-- Finger 4: Ring -->
      <rect x="11" y="${is4 ? '5.5' : '8'}" width="3.2" height="${is4 ? '12.5' : '10'}" rx="1.6" fill="${color4}" stroke="${stroke4}" stroke-width="${width4}" ${glow4} />
      <!-- Finger 3: Middle -->
      <rect x="15.5" y="${is3 ? '3.5' : '6'}" width="3.2" height="${is3 ? '14.5' : '12'}" rx="1.6" fill="${color3}" stroke="${stroke3}" stroke-width="${width3}" ${glow3} />
      <!-- Finger 2: Index -->
      <rect x="20" y="${is2 ? '5.5' : '8'}" width="3.2" height="${is2 ? '12.5' : '10'}" rx="1.6" fill="${color2}" stroke="${stroke2}" stroke-width="${width2}" ${glow2} />
      <!-- Finger 1: Thumb -->
      <path d="M 22.5 17 C 27 17.5, 29.5 19.5, 28 22.5 C 26 23.8, 23 21, 21.8 18 Z" fill="${color1}" stroke="${stroke1}" stroke-width="${width1}" ${glow1} />
    </svg>
  `;
}

const KEY_LAYOUT = [
  // Row 1
  [
    { key: 'q', finger: 5, hand: 'L' },
    { key: 'w', finger: 4, hand: 'L' },
    { key: 'e', finger: 3, hand: 'L' },
    { key: 'r', finger: 2, hand: 'L' },
    { key: 't', finger: 2, hand: 'L' },
    { key: 'y', finger: 2, hand: 'R' },
    { key: 'u', finger: 2, hand: 'R' },
    { key: 'i', finger: 3, hand: 'R' },
    { key: 'o', finger: 4, hand: 'R' },
    { key: 'p', finger: 5, hand: 'R' },
  ],
  // Row 2
  [
    { key: 'a', finger: 5, hand: 'L' },
    { key: 's', finger: 4, hand: 'L' },
    { key: 'd', finger: 3, hand: 'L' },
    { key: 'f', finger: 2, hand: 'L' },
    { key: 'g', finger: 2, hand: 'L' },
    { key: 'h', finger: 2, hand: 'R' },
    { key: 'j', finger: 2, hand: 'R' },
    { key: 'k', finger: 3, hand: 'R' },
    { key: 'l', finger: 4, hand: 'R' },
  ],
  // Row 3
  [
    { key: 'z', finger: 5, hand: 'L' },
    { key: 'x', finger: 4, hand: 'L' },
    { key: 'c', finger: 3, hand: 'L' },
    { key: 'v', finger: 2, hand: 'L' },
    { key: 'b', finger: 2, hand: 'L' },
    { key: 'n', finger: 2, hand: 'R' },
    { key: 'm', finger: 2, hand: 'R' },
    { key: 'Backspace', label: '⌫', finger: 5, hand: 'R', wide: true },
  ],
  // Row 4
  [
    { key: ' ', label: 'Space', finger: 1, hand: 'Both', extraWide: true },
    { key: 'Enter', label: 'Check ⏎', finger: 5, hand: 'R', wide: true },
  ]
];

export class VisualKeyboard {
  constructor(containerId, onKeyPress, legendContainerId = 'keyboard-legend') {
    this.container = document.getElementById(containerId);
    this.legendContainer = document.getElementById(legendContainerId);
    this.onKeyPress = onKeyPress;
    this.keyElements = new Map();
    this.keyData = new Map();
    this.targetKey = null;

    if (this.legendContainer) {
      this.renderLegend();
    }

    if (this.container) {
      this.render();
      this.attachListeners();
    }
  }

  renderLegend() {
    if (!this.legendContainer) return;
    this.legendContainer.innerHTML = '';

    // In order 5, 4, 3, 2, 1
    [5, 4, 3, 2, 1].forEach((finger) => {
      const item = document.createElement('div');
      item.className = `legend-item legend-finger-${finger}`;
      item.title = `Finger ${finger}: ${FINGER_INFO[finger].name}`;
      item.innerHTML = `
        <span class="legend-hand-icon">${renderHandIconSvg(finger)}</span>
        <strong class="legend-num">${finger}</strong>
      `;

      item.addEventListener('mouseenter', () => this.highlightFingerKeys(finger, true));
      item.addEventListener('mouseleave', () => this.highlightFingerKeys(finger, false));

      this.legendContainer.appendChild(item);
    });
  }

  highlightFingerKeys(finger, active) {
    this.keyElements.forEach((btn, key) => {
      const data = this.keyData.get(key);
      if (data && data.finger === finger) {
        if (active) {
          btn.classList.add('key-finger-preview');
        } else {
          btn.classList.remove('key-finger-preview');
        }
      }
    });
  }

  render() {
    this.container.innerHTML = '';
    const boardEl = document.createElement('div');
    boardEl.className = 'virtual-keyboard';

    KEY_LAYOUT.forEach((row) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard-row';

      row.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `keyboard-key finger-num-${item.finger} ${item.wide ? 'key-wide' : ''} ${item.extraWide ? 'key-space' : ''}`;
        btn.dataset.key = item.key.toLowerCase();
        btn.dataset.finger = item.finger;

        const labelSpan = document.createElement('span');
        labelSpan.className = 'key-label';
        labelSpan.textContent = item.label || item.key.toUpperCase();

        const fingerBadge = document.createElement('span');
        fingerBadge.className = 'finger-badge';
        fingerBadge.textContent = item.finger;
        fingerBadge.title = `Finger ${item.finger}: ${FINGER_INFO[item.finger].name}`;

        btn.appendChild(fingerBadge);
        btn.appendChild(labelSpan);

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.triggerKey(item.key);
        });

        this.keyElements.set(item.key.toLowerCase(), btn);
        this.keyData.set(item.key.toLowerCase(), item);
        rowEl.appendChild(btn);
      });

      boardEl.appendChild(rowEl);
    });

    this.container.appendChild(boardEl);
  }

  attachListeners() {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      const btn = this.keyElements.get(k);
      if (btn) {
        btn.classList.add('key-active');
      }
    });

    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      const btn = this.keyElements.get(k);
      if (btn) {
        btn.classList.remove('key-active');
      }
    });
  }

  triggerKey(key) {
    const k = key.toLowerCase();
    const btn = this.keyElements.get(k);
    if (btn) {
      btn.classList.add('key-active');
      setTimeout(() => btn.classList.remove('key-active'), 120);
    }
    if (this.onKeyPress) {
      this.onKeyPress(key);
    }
  }

  // Highlight next letter matching the specific finger color!
  updateTargetKey(targetWord = '', currentTyped = '') {
    if (this.targetKey) {
      const prevBtn = this.keyElements.get(this.targetKey);
      if (prevBtn) {
        prevBtn.classList.remove('key-highlight-target');
      }
      this.targetKey = null;
    }

    const cleanTarget = targetWord.trim().toLowerCase();
    const cleanTyped = currentTyped.trim().toLowerCase();

    let nextChar = null;
    if (cleanTyped.length < cleanTarget.length) {
      nextChar = cleanTarget[cleanTyped.length];
    } else if (cleanTyped.length === cleanTarget.length && cleanTyped.length > 0) {
      nextChar = 'enter';
    }

    if (nextChar) {
      const btn = this.keyElements.get(nextChar);
      if (btn) {
        btn.classList.add('key-highlight-target');
        this.targetKey = nextChar;
      }
    }
  }
}
