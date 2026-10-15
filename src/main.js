import { renderDinosaurSvg, DINO_SPECIES } from './dinosaur.js';
import { soundManager } from './audio.js';
import { confetti } from './confetti.js';
import { VisualKeyboard } from './keyboard.js';

// DOM Elements
const cardCounter = document.getElementById('card-counter');
const dinoContainer = document.getElementById('dino-container');
const dinoFrame = document.getElementById('dino-frame');
const typingForm = document.getElementById('typing-form');
const wordInput = document.getElementById('word-input');
const feedbackDisplay = document.getElementById('feedback-display');
const feedbackTyped = document.getElementById('feedback-typed');
const feedbackBadge = document.getElementById('feedback-badge');
const progressFill = document.getElementById('progress-fill');
const btnListen = document.getElementById('btn-listen');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const btnSoundToggle = document.getElementById('btn-sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const categorySelect = document.getElementById('category-select');
const dinoSelect = document.getElementById('dino-select');
const btnCustomWords = document.getElementById('btn-custom-words');
const btnToggleKeyboard = document.getElementById('btn-toggle-keyboard');
const keyboardSection = document.getElementById('keyboard-section');

// 5s Auto-advance Cooldown Elements (Triggers ONLY AFTER SUBMIT)
const cooldownPill = document.getElementById('cooldown-pill');
const cooldownSeconds = document.getElementById('cooldown-seconds');
const cooldownProgressBar = document.getElementById('cooldown-progress-bar');

// Modals
const modalVictory = document.getElementById('modal-victory');
const btnPlayAgain = document.getElementById('btn-play-again');
const btnChooseLevel = document.getElementById('btn-choose-level');
const statCorrect = document.getElementById('stat-correct');
const statAccuracy = document.getElementById('stat-accuracy');
const statStreak = document.getElementById('stat-streak');

const modalCustom = document.getElementById('modal-custom-words');
const btnCloseModal = document.getElementById('btn-close-modal');
const customWordForm = document.getElementById('custom-word-form');
const customWordInput = document.getElementById('custom-word-input');
const customWordList = document.getElementById('custom-word-list');
const btnUseCustom = document.getElementById('btn-use-custom');

// App State
let wordsDeck = [];
let currentIndex = 0;
let currentWord = null;
let currentDinoSpecies = 'rex';
let cardState = 'neutral'; // 'neutral' | 'correct' | 'incorrect'
let isAnswerSubmitted = false;
let cooldownTimer = null;
let cooldownInterval = null;

let sessionStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  roundCorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
};

// Check if Tauri invoke is available
function getTauriInvoke() {
  if (window.__TAURI__ && window.__TAURI__.core && typeof window.__TAURI__.core.invoke === 'function') {
    return window.__TAURI__.core.invoke;
  }
  return null;
}

// Fallback deck for standalone browser mode
const FALLBACK_WORDS = {
  kindergarten: [
    { word: 'they' }, { word: 'say' }, { word: 'and' }, { word: 'the' },
    { word: 'you' }, { word: 'see' }, { word: 'can' }, { word: 'look' },
    { word: 'play' }, { word: 'like' }, { word: 'big' }, { word: 'run' }
  ],
  grade1: [
    { word: 'after' }, { word: 'again' }, { word: 'could' }, { word: 'every' },
    { word: 'from' }, { word: 'give' }, { word: 'going' }, { word: 'know' },
    { word: 'round' }, { word: 'some' }, { word: 'thank' }, { word: 'walk' }
  ],
  grade2: [
    { word: 'always' }, { word: 'around' }, { word: 'because' }, { word: 'before' },
    { word: 'best' }, { word: 'both' }, { word: 'fast' }, { word: 'first' },
    { word: 'green' }, { word: 'sleep' }, { word: 'their' }, { word: 'these' }
  ],
  dinosaurs: [
    { word: 'dino' }, { word: 'rex' }, { word: 'bone' }, { word: 'roar' },
    { word: 'nest' }, { word: 'claw' }, { word: 'tail' }, { word: 'egg' },
    { word: 'spino' }, { word: 'raptor' }, { word: 'fossil' }, { word: 'jungle' }
  ],
  animals: [
    { word: 'cat' }, { word: 'dog' }, { word: 'bear' }, { word: 'lion' },
    { word: 'frog' }, { word: 'duck' }, { word: 'fish' }, { word: 'bird' },
    { word: 'wolf' }, { word: 'deer' }, { word: 'panda' }, { word: 'tiger' }
  ],
  trains: [
    { word: 'train' }, { word: 'track' }, { word: 'steam' }, { word: 'engine' },
    { word: 'wheel' }, { word: 'whistle' }, { word: 'caboose' }, { word: 'cargo' },
    { word: 'station' }, { word: 'rail' }, { word: 'tunnel' }, { word: 'chug' }
  ],
  undersea: [
    { word: 'shark' }, { word: 'whale' }, { word: 'coral' }, { word: 'shell' },
    { word: 'dolphin' }, { word: 'octopus' }, { word: 'ocean' }, { word: 'jellyfish' },
    { word: 'starfish' }, { word: 'seahorse' }, { word: 'crab' }, { word: 'waves' }
  ],
  custom: [
    { word: 'happy' }, { word: 'smile' }
  ]
};

// Initialize Virtual Keyboard
const visualKeyboard = new VisualKeyboard('virtual-keyboard-container', (key) => {
  if (isAnswerSubmitted) {
    if (key === 'Enter') {
      nextCard();
    }
    return;
  }

  soundManager.playPop();

  if (key === 'Backspace') {
    wordInput.value = wordInput.value.slice(0, -1);
  } else if (key === 'Enter') {
    submitWord();
    return;
  } else if (key === ' ') {
    wordInput.value += ' ';
  } else if (key.length === 1) {
    wordInput.value += key.toLowerCase();
  }

  wordInput.focus();
  if (currentWord) {
    visualKeyboard.updateTargetKey(currentWord.word, wordInput.value);
  }
});

// Update Target Key when user types on physical keyboard
wordInput.addEventListener('input', () => {
  if (currentWord) {
    visualKeyboard.updateTargetKey(currentWord.word, wordInput.value);
  }
});

// Determine active dinosaur species for current card (10 species rotation!)
function resolveDinoSpecies() {
  const chosen = dinoSelect ? dinoSelect.value : 'auto';
  if (chosen === 'auto') {
    const speciesList = ['rex', 'trike', 'steg', 'brachio', 'cory', 'lambeo', 'allo', 'raptor', 'pachy', 'ptery'];
    return speciesList[currentIndex % speciesList.length];
  }
  return chosen;
}

// Load round words from Rust backend (or local fallback)
async function doLoadRound(category = 'kindergarten') {
  stopAutoAdvanceCooldown();

  const invoke = getTauriInvoke();
  if (invoke) {
    try {
      wordsDeck = await invoke('get_round_words', { category, count: 10 });
    } catch (e) {
      console.error('Tauri invoke error for get_round_words:', e);
      wordsDeck = shuffleArray([...(FALLBACK_WORDS[category] || FALLBACK_WORDS.kindergarten)]).slice(0, 10);
    }
  } else {
    wordsDeck = shuffleArray([...(FALLBACK_WORDS[category] || FALLBACK_WORDS.kindergarten)]).slice(0, 10);
  }

  currentIndex = 0;
  sessionStats.roundCorrect = 0;
  displayCard(0);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Display card at index
function displayCard(index) {
  if (!wordsDeck || wordsDeck.length === 0) return;

  stopAutoAdvanceCooldown();

  currentIndex = index;
  currentWord = wordsDeck[currentIndex];
  currentDinoSpecies = resolveDinoSpecies();
  cardState = 'neutral';
  isAnswerSubmitted = false;

  // Update counter "1 / 10"
  cardCounter.textContent = `${currentIndex + 1} / ${wordsDeck.length}`;

  // Update progress bar
  const progressPercent = ((currentIndex + 1) / wordsDeck.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  // Update Dinosaur Frame State
  dinoFrame.className = 'dino-frame state-neutral';

  // Render Dinosaur SVG with selected species
  dinoContainer.innerHTML = renderDinosaurSvg({
    species: currentDinoSpecies,
    word: currentWord.word,
    state: 'neutral',
  });

  // Reset Input Zone
  typingForm.classList.remove('hidden');
  feedbackDisplay.classList.add('hidden');
  wordInput.value = '';
  wordInput.disabled = false;
  wordInput.focus();

  // Reset Next Button state
  btnNext.classList.remove('pulse');

  // Update visual keyboard next key guide
  visualKeyboard.updateTargetKey(currentWord.word, '');
}

// Submit Word Check
async function submitWord() {
  if (isAnswerSubmitted) {
    // If already checked, pressing enter or button advances to next
    nextCard();
    return;
  }

  const rawInput = wordInput.value;
  const userText = rawInput.trim();
  if (!userText) {
    // Gentle shake animation for empty input
    typingForm.classList.add('shake-anim');
    setTimeout(() => typingForm.classList.remove('shake-anim'), 400);
    wordInput.focus();
    return;
  }

  isAnswerSubmitted = true;
  soundManager.playPop();

  const targetWord = currentWord.word.toLowerCase();
  const typedWord = userText.toLowerCase();

  let isCorrect = targetWord === typedWord;

  // If Tauri is available, validate via Rust command & record attempt
  const invoke = getTauriInvoke();
  if (invoke) {
    try {
      const res = await invoke('check_word', { target: targetWord, input: typedWord });
      isCorrect = res.is_correct;
      await invoke('record_attempt', { isCorrect });
    } catch (e) {
      console.warn('Tauri check error:', e);
    }
  }

  sessionStats.totalAttempted += 1;
  if (isCorrect) {
    sessionStats.totalCorrect += 1;
    sessionStats.roundCorrect += 1;
    sessionStats.currentStreak += 1;
    if (sessionStats.currentStreak > sessionStats.bestStreak) {
      sessionStats.bestStreak = sessionStats.currentStreak;
    }
  } else {
    sessionStats.currentStreak = 0;
  }

  // Update UI for Result
  if (isCorrect) {
    handleCorrect(userText);
  } else {
    handleIncorrect(userText, targetWord);
  }

  // Start 5-second auto advance cooldown ONLY AFTER SUBMIT!
  startAutoAdvanceCooldown(5);
}

// Correct state presentation
function handleCorrect(userText) {
  cardState = 'correct';

  // Update frame background to vibrant green
  dinoFrame.className = 'dino-frame state-correct';

  // Render Cherished / Cheerful Dinosaur with big white checkmark
  dinoContainer.innerHTML = renderDinosaurSvg({
    species: currentDinoSpecies,
    word: currentWord.word,
    state: 'correct',
    correctWord: currentWord.word,
  });

  // Sound & Confetti
  soundManager.playCorrect();
  confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 60);

  // Switch to Feedback Mode
  typingForm.classList.add('hidden');
  feedbackDisplay.className = 'feedback-display feedback-correct';
  feedbackDisplay.classList.remove('hidden');

  feedbackTyped.textContent = userText;
  feedbackBadge.innerHTML = '✔ Correct!';

  // Nudge next button with glowing pulse
  btnNext.classList.add('pulse');

  // Highlight Enter on virtual keyboard
  visualKeyboard.updateTargetKey('', '');

  // Optional auto-speak praise
  setTimeout(() => {
    soundManager.speak(currentWord.word);
  }, 350);
}

// Incorrect state presentation
function handleIncorrect(userText, targetWord) {
  cardState = 'incorrect';

  // Update frame background to soft coral red
  dinoFrame.className = 'dino-frame state-incorrect';

  // Render Sad Dinosaur with big white cross & red banner
  dinoContainer.innerHTML = renderDinosaurSvg({
    species: currentDinoSpecies,
    word: currentWord.word,
    state: 'incorrect',
    correctWord: targetWord,
  });

  // Sound
  soundManager.playIncorrect();

  // Switch to Feedback Mode
  typingForm.classList.add('hidden');
  feedbackDisplay.className = 'feedback-display feedback-incorrect';
  feedbackDisplay.classList.remove('hidden');

  feedbackTyped.textContent = userText;
  feedbackBadge.innerHTML = '✖ Incorrect!';

  btnNext.classList.add('pulse');
  visualKeyboard.updateTargetKey('', '');
}

// 5-Second Cooldown Auto Advance (Triggers ONLY AFTER SUBMIT)
function startAutoAdvanceCooldown(totalSeconds = 5) {
  stopAutoAdvanceCooldown();

  if (!cooldownPill) return;

  let remainingMs = totalSeconds * 1000;
  const intervalMs = 100;

  cooldownPill.classList.remove('hidden');
  cooldownSeconds.textContent = `${totalSeconds}s`;
  cooldownProgressBar.style.width = '100%';

  cooldownInterval = setInterval(() => {
    remainingMs -= intervalMs;

    if (remainingMs <= 0) {
      stopAutoAdvanceCooldown();
      nextCard();
    } else {
      const secLeft = Math.ceil(remainingMs / 1000);
      cooldownSeconds.textContent = `${secLeft}s`;
      const pct = (remainingMs / (totalSeconds * 1000)) * 100;
      cooldownProgressBar.style.width = `${pct}%`;
    }
  }, intervalMs);
}

function stopAutoAdvanceCooldown() {
  if (cooldownInterval) {
    clearInterval(cooldownInterval);
    cooldownInterval = null;
  }
  if (cooldownPill) {
    cooldownPill.classList.add('hidden');
  }
}

// Advance to Next Card
function nextCard() {
  stopAutoAdvanceCooldown();
  soundManager.playPop();

  if (currentIndex + 1 < wordsDeck.length) {
    displayCard(currentIndex + 1);
  } else {
    showVictoryModal();
  }
}

// Show Round Victory Celebration Modal
function showVictoryModal() {
  stopAutoAdvanceCooldown();
  soundManager.playFanfare();
  confetti.burst(window.innerWidth / 2, window.innerHeight / 3, 120);

  const total = wordsDeck.length;
  const correct = sessionStats.roundCorrect;
  const accuracy = Math.round((correct / total) * 100);

  statCorrect.textContent = `${correct} / ${total}`;
  statAccuracy.textContent = `${accuracy}%`;
  statStreak.textContent = sessionStats.bestStreak;

  modalVictory.classList.remove('hidden');
}

// Event Listeners
typingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitWord();
});

btnNext.addEventListener('click', () => {
  if (!isAnswerSubmitted) {
    submitWord();
  } else {
    nextCard();
  }
});

btnListen.addEventListener('click', () => {
  if (currentWord) {
    soundManager.playPop();
    soundManager.speak(currentWord.word);
  }
});

dinoSelect.addEventListener('change', () => {
  soundManager.playPop();
  currentDinoSpecies = resolveDinoSpecies();
  dinoContainer.innerHTML = renderDinosaurSvg({
    species: currentDinoSpecies,
    word: currentWord ? currentWord.word : '',
    state: cardState,
    correctWord: currentWord ? currentWord.word : '',
  });
});

btnToggleKeyboard.addEventListener('click', () => {
  soundManager.playPop();
  keyboardSection.classList.toggle('hidden');
  btnToggleKeyboard.title = keyboardSection.classList.contains('hidden') 
    ? 'Show On-Screen Keyboard' 
    : 'Hide On-Screen Keyboard';
});

btnSoundToggle.addEventListener('click', () => {
  const isMuted = soundManager.toggleMute();
  soundIcon.textContent = isMuted ? '🔇' : '🔊';
  btnSoundToggle.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
});

btnRestart.addEventListener('click', () => {
  soundManager.playPop();
  doLoadRound(categorySelect.value);
});

categorySelect.addEventListener('change', (e) => {
  soundManager.playPop();
  doLoadRound(e.target.value);
});

btnPlayAgain.addEventListener('click', () => {
  modalVictory.classList.add('hidden');
  soundManager.playPop();
  doLoadRound(categorySelect.value);
});

btnChooseLevel.addEventListener('click', () => {
  modalVictory.classList.add('hidden');
  categorySelect.focus();
});

// Custom Words Modal
btnCustomWords.addEventListener('click', () => {
  soundManager.playPop();
  openCustomModal();
});

btnCloseModal.addEventListener('click', () => {
  modalCustom.classList.add('hidden');
});

async function openCustomModal() {
  modalCustom.classList.remove('hidden');
  refreshCustomList();
  customWordInput.focus();
}

async function refreshCustomList() {
  const invoke = getTauriInvoke();
  let list = [];
  if (invoke) {
    try {
      list = await invoke('get_custom_words');
    } catch (e) {
      list = FALLBACK_WORDS.custom;
    }
  } else {
    list = FALLBACK_WORDS.custom;
  }

  customWordList.innerHTML = '';
  if (list.length === 0) {
    customWordList.innerHTML = '<span style="color:#94a3b8;font-size:0.9rem;">No custom words yet. Add some above!</span>';
  } else {
    list.forEach(item => {
      const chip = document.createElement('span');
      chip.className = 'word-chip';
      chip.textContent = item.word;
      customWordList.appendChild(chip);
    });
  }
}

customWordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const word = customWordInput.value.trim().toLowerCase();
  if (!word) return;

  const invoke = getTauriInvoke();
  if (invoke) {
    try {
      await invoke('add_custom_word', { word, hint: null });
    } catch (err) {
      console.warn(err);
    }
  } else {
    FALLBACK_WORDS.custom.push({ word });
  }

  customWordInput.value = '';
  refreshCustomList();
});

btnUseCustom.addEventListener('click', () => {
  modalCustom.classList.add('hidden');
  categorySelect.value = 'custom';
  doLoadRound('custom');
});

// Global Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (modalVictory && !modalVictory.classList.contains('hidden')) {
      modalVictory.classList.add('hidden');
      doLoadRound(categorySelect.value);
      return;
    }
    if (isAnswerSubmitted) {
      nextCard();
    }
  }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  doLoadRound('kindergarten');
});
