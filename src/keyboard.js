// On-Screen Interactive Visual Keyboard for DinoTyping
// Finger numbers 1-5 where 1 is the thumb for both hands:
// 1 = Thumb
// 2 = Index
// 3 = Middle
// 4 = Ring
// 5 = Pinky

export const FINGER_INFO = {
  1: { name: 'Thumb', color: '#a855f7', label: '1 (Thumb)' },
  2: { name: 'Index', color: '#38bdf8', label: '2 (Index)' },
  3: { name: 'Middle', color: '#facc15', label: '3 (Middle)' },
  4: { name: 'Ring', color: '#fb923c', label: '4 (Ring)' },
  5: { name: 'Pinky', color: '#f472b6', label: '5 (Pinky)' },
};

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
  constructor(containerId, onKeyPress) {
    this.container = document.getElementById(containerId);
    this.onKeyPress = onKeyPress;
    this.keyElements = new Map();
    this.keyData = new Map();
    this.targetKey = null;

    if (this.container) {
      this.render();
      this.attachListeners();
    }
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

        // Key label and little finger number badge (1-5)
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
    // Clear previous highlight
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
