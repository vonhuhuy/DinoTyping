import { renderDinosaurSvg } from './dinosaur.js';
import { soundManager } from './audio.js';
import { confetti } from './confetti.js';

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
const btnCustomWords = document.getElementById('btn-custom-words');

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
let cardState = 'neutral'; // 'neutral' | 'correct' | 'incorrect'
let isAnswerSubmitted = false;
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
  custom: [
    { word: 'happy' }, { word: 'smile' }
  ]
};

// Load round words from Rust backend (or local fallback)
async function doLoadRound(category = 'kindergarten') {
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

  currentIndex = index;
  currentWord = wordsDeck[currentIndex];
  cardState = 'neutral';
  isAnswerSubmitted = false;

  // Update counter "1 / 10"
  cardCounter.textContent = `${currentIndex + 1} / ${wordsDeck.length}`;

  // Update progress bar
  const progressPercent = ((currentIndex + 1) / wordsDeck.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  // Update Dinosaur Frame State
  dinoFrame.className = 'dino-frame state-neutral';

  // Render Dinosaur SVG
  dinoContainer.innerHTML = renderDinosaurSvg({
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
}

// Correct state presentation
function handleCorrect(userText) {
  cardState = 'correct';

  // Update frame background to vibrant green
  dinoFrame.className = 'dino-frame state-correct';

  // Render Cherished / Cheerful Dinosaur with big white checkmark
  dinoContainer.innerHTML = renderDinosaurSvg({
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
}

// Advance to Next Card
function nextCard() {
  soundManager.playPop();

  if (currentIndex + 1 < wordsDeck.length) {
    displayCard(currentIndex + 1);
  } else {
    showVictoryModal();
  }
}

// Show Round Victory Celebration Modal
function showVictoryModal() {
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
    // If not checked yet, check first
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
