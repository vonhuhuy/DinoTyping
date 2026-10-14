# 🦖 DinoTyping - Fun Dinosaur Typing Game for Kids

An adorable typing practice app crafted for kids, featuring a baby green dinosaur holding word placards, positive reinforcement animations, clear text-to-speech pronunciation, cheerful sound effects, and customizable sight word lists.

Built with **Rust** (Tauri 2 backend) and modern, responsive frontend web technologies.

---

## 📸 Key Features Matching Your Design

1. **Baby Dinosaur with Dynamic Expressions**:
   - **Neutral / Idle**: Friendly baby green T-Rex holding a placard with the target word.
   - **Cherished / Cheerful (Correct Answer)**:
     - Turns card background into vibrant cheerful green (`#7cd768`).
     - Dinosaur beams with closed joyful crescent eyes, rosy pink blushing cheeks, open smiling mouth, and stars!
     - Displays the large white checkmark badge (`✔`).
     - Feedback box shows typed word with `✔ Correct!`.
     - Confetti burst & cheerful chime sound effect.
     - Automatically speaks the word aloud.
   - **Sad / Encouraging (Wrong Answer)**:
     - Turns card background into soft coral red (`#eb695e`).
     - Dinosaur shows droopy puppy eyes with a tear drop and downturned pout.
     - Displays the large white cross (`✖`) and red banner: `Correct answer(s): <word>`.
     - Feedback box shows typed text with `✖ Incorrect!`.
     - Gentle "try again" sound effect.

2. **Audio & Pronunciation ("▶ Listen" Button)**:
   - Click the "▶ Listen" button anytime to hear the word pronounced slowly and clearly using speech synthesis.
   - Built-in Web Audio API synthesizer for offline, instant sound effects (no external audio assets needed).
   - Audio mute / unmute toggle button in the top navigation.

3. **Sight Words & Categories**:
   - **🌱 Kindergarten**: High-frequency starter sight words (including `they`, `say`, `play`, `like`, `run`, `jump`, etc.).
   - **⭐ 1st Grade**: Essential Dolch & Fry 1st grade sight words (`after`, `again`, `could`, `every`, `walk`, `round`, etc.).
   - **🚀 2nd Grade**: Expanded vocabulary (`always`, `around`, `because`, `first`, `green`, `sleep`, etc.).
   - **🦖 Dinosaurs**: Fun prehistoric words (`dino`, `rex`, `bone`, `roar`, `nest`, `claw`, `egg`, etc.).
   - **🐾 Animals**: Friendly animal friends (`cat`, `dog`, `bear`, `lion`, `frog`, `panda`, etc.).
   - **✏️ My Custom Words**: Parents & teachers can input weekly spelling lists or custom homework words!

4. **Progress & Round Complete Celebrations**:
   - "1 / 10" counter and bottom progress pill indicator.
   - Circular Next button (`➔`) with pulsing highlight when ready to advance.
   - 3-star victory modal with accuracy score and celebratory fanfare at the end of every 10-card round.

---

## 🚀 How to Run the App

### Option A: Run as a Native macOS Desktop App (Tauri)
In the project root directory, run:
```bash
npm run dev
```
or directly via Cargo:
```bash
cargo run --manifest-path src-tauri/Cargo.toml
```

### Option B: Run in Any Web Browser
You can also run the web interface directly in your browser:
```bash
npm run serve
```
Then open `http://localhost:4173` in your browser.

---

## 🛠️ Project Structure

```
DinoTyping/
├── src-tauri/                 # Rust Native Desktop Backend (Tauri 2)
│   ├── Cargo.toml             # Rust dependencies (tauri 2, serde, fastrand)
│   ├── tauri.conf.json        # Window & app configuration
│   └── src/
│       ├── main.rs            # Application entry point
│       ├── lib.rs             # Tauri command handlers & state
│       ├── models.rs          # Data structures (WordItem, ValidationResult, Stats)
│       └── words.rs           # Word catalog, category generator, and shuffling logic
├── src/                       # Frontend UI
│   ├── index.html             # Markup and layout matching screenshots
│   ├── styles.css             # Polished CSS with animations and carousel cards
│   ├── main.js                # Game loop, IPC bridge to Rust, input handling
│   ├── dinosaur.js            # Vector SVG generator for the 3 dinosaur emotions
│   ├── audio.js               # Web Audio API sound generator + speech synthesis
│   └── confetti.js            # Celebration particle system
└── package.json               # Scripts and Tauri CLI runner
```
