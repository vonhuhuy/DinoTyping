// On-Screen Interactive Visual Keyboard for DinoTyping

// Finger color classes:
// pinky: Q, A, Z, P
// ring: W, S, X, O, L
// middle: E, D, C, I, K
// index: R, T, F, G, V, B, Y, U, H, J, N, M
// thumb: Space

const KEY_LAYOUT = [
  [
    { key: 'q', finger: 'finger-pinky-l' },
    { key: 'w', finger: 'finger-ring-l' },
    { key: 'e', finger: 'finger-mid-l' },
    { key: 'r', finger: 'finger-idx-l' },
    { key: 't', finger: 'finger-idx-l' },
    { key: 'y', finger: 'finger-idx-r' },
    { key: 'u', finger: 'finger-idx-r' },
    { key: 'i', finger: 'finger-mid-r' },
    { key: 'o', finger: 'finger-ring-r' },
    { key: 'p', finger: 'finger-pinky-r' },
  ],
  [
    { key: 'a', finger: 'finger-pinky-l' },
    { key: 's', finger: 'finger-ring-l' },
    { key: 'd', finger: 'finger-mid-l' },
    { key: 'f', finger: 'finger-idx-l' },
    { key: 'g', finger: 'finger-idx-l' },
    { key: 'h', finger: 'finger-idx-r' },
    { key: 'j', finger: 'finger-idx-r' },
    { key: 'k', finger: 'finger-mid-r' },
    { key: 'l', finger: 'finger-ring-r' },
  ],
  [
    { key: 'z', finger: 'finger-pinky-l' },
    { key: 'x', finger: 'finger-ring-l' },
    { key: 'c', finger: 'finger-mid-l' },
    { key: 'v', finger: 'finger-idx-l' },
    { key: 'b', finger: 'finger-idx-l' },
    { key: 'n', finger: 'finger-idx-r' },
    { key: 'm', finger: 'finger-idx-r' },
    { key: 'Backspace', label: '⌫', action: 'backspace', finger: 'finger-pinky-r', wide: true },
  ],
  [
    { key: ' ', label: 'Space', action: 'space', finger: 'finger-thumb', extraWide: true },
    { key: 'Enter', label: 'Check ⏎', action: 'enter', finger: 'finger-pinky-r', wide: true },
  ]
];

export class VisualKeyboard {
  constructor(containerId, onKeyPress) {
    this.container = document.getElementById(containerId);
    this.onKeyPress = onKeyPress;
    this.keyElements = new Map();
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
        btn.className = `keyboard-key ${item.finger || ''} ${item.wide ? 'key-wide' : ''} ${item.extraWide ? 'key-space' : ''}`;
        btn.dataset.key = item.key.toLowerCase();
        btn.textContent = item.label || item.key.toUpperCase();

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.triggerKey(item.key);
        });

        this.keyElements.set(item.key.toLowerCase(), btn);
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

  // Highlight next letter in word to guide kid!
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

    if (cleanTyped.length < cleanTarget.length) {
      const nextChar = cleanTarget[cleanTyped.length];
      const btn = this.keyElements.get(nextChar);
      if (btn) {
        btn.classList.add('key-highlight-target');
        this.targetKey = nextChar;
      }
    } else if (cleanTyped.length === cleanTarget.length && cleanTyped.length > 0) {
      // Suggest Enter key
      const enterBtn = this.keyElements.get('enter');
      if (enterBtn) {
        enterBtn.classList.add('key-highlight-target');
        this.targetKey = 'enter';
      }
    }
  }
}
